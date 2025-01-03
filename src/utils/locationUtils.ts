import { SavedLocation } from '../components/maps/GoogleMap';
import { GroupProfile } from '../types/profiles';

export interface GroupedLocation {
  type: string;
  locations: SavedLocation[];
}

// Calculate distance between two points using the Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Cache for geocoded locations
const geocodeCache: { [key: string]: google.maps.LatLngLiteral } = {};

// Get coordinates from a location string using Google Maps Geocoding
export async function getCoordinates(location: string): Promise<google.maps.LatLngLiteral | null> {
  // Check cache first
  if (geocodeCache[location]) {
    return geocodeCache[location];
  }

  const geocoder = new google.maps.Geocoder();
  
  try {
    const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === 'OK' && results) {
          resolve(results);
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });

    if (result[0]?.geometry?.location) {
      const coords = {
        lat: result[0].geometry.location.lat(),
        lng: result[0].geometry.location.lng()
      };
      
      // Cache the result
      geocodeCache[location] = coords;
      
      return coords;
    }
  } catch (error) {
    console.error('Error geocoding location:', error);
  }
  
  return null;
}

// Filter groups based on distance from user
export async function filterGroupsByDistance(
  groups: { [key: string]: GroupProfile },
  userLocation: google.maps.LatLngLiteral,
  maxDistance: number
): Promise<{ [key: string]: GroupProfile }> {
  const filteredGroups: { [key: string]: GroupProfile } = {};
  
  // Process all groups in parallel for better performance
  const groupEntries = Object.entries(groups);
  const results = await Promise.all(
    groupEntries.map(async ([id, group]) => {
      try {
        const groupCoords = await getCoordinates(group.location);
        
        if (groupCoords) {
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            groupCoords.lat,
            groupCoords.lng
          );
          
          // Only include groups within the specified distance
          if (distance <= maxDistance) {
            return {
              id,
              group: {
                ...group,
                distance // Add distance to the group object for display purposes
              }
            };
          }
        }
      } catch (error) {
        console.error(`Error processing group ${id}:`, error);
      }
      return null;
    })
  );

  // Filter out null results and build the filtered groups object
  results.forEach(result => {
    if (result) {
      filteredGroups[result.id] = result.group;
    }
  });
  
  return filteredGroups;
}

export function groupLocationsByType(locations: SavedLocation[]): GroupedLocation[] {
  // Create a map to group locations by type
  const groupedMap = locations.reduce((acc, location) => {
    // Get the location type from the place's types array
    const type = getLocationType(location);
    
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(location);
    return acc;
  }, {} as Record<string, SavedLocation[]>);

  // Convert the map to an array of GroupedLocation objects
  return Object.entries(groupedMap)
    .map(([type, locations]) => ({
      type: formatLocationType(type),
      locations
    }))
    .sort((a, b) => a.type.localeCompare(b.type));
}

function formatLocationType(type: string): string {
  // Convert snake_case to Title Case
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function getLocationType(location: SavedLocation): string {
  // If the location has types from the Places API, use the first relevant type
  if (location.types && location.types.length > 0) {
    // Filter out generic types
    const genericTypes = new Set([
      'point_of_interest',
      'establishment',
      'premise',
      'business',
      'place'
    ]);
    
    // Find the first specific type
    const specificType = location.types.find(type => !genericTypes.has(type));
    if (specificType) {
      return specificType;
    }
  }

  // Fallback: Try to determine type from the name or other properties
  const name = location.name.toLowerCase();
  if (name.includes('restaurant') || name.includes('café') || name.includes('bistro')) return 'restaurant';
  if (name.includes('gym') || name.includes('fitness')) return 'gym';
  if (name.includes('café') || name.includes('coffee')) return 'cafe';
  if (name.includes('bar') || name.includes('pub')) return 'bar';
  if (name.includes('park')) return 'park';
  if (name.includes('store') || name.includes('shop')) return 'store';
  
  // If no specific type can be determined
  return 'other';
}

export function filterGroupedLocations(
  groupedLocations: GroupedLocation[],
  searchQuery: string
): GroupedLocation[] {
  return groupedLocations
    .map(group => ({
      type: group.type,
      locations: group.locations.filter(location =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(group => group.locations.length > 0);
}