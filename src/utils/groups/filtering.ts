import { GroupProfile } from '../../types/profiles';

// Add this interface for location data
interface Coordinates {
  lat: number;
  lng: number;
}

// Add geocoding function (using a basic geocoding service)
async function getCoordinates(address: string): Promise<Coordinates | null> {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_GOOGLE_MAPS_API_KEY`
    );
    const data = await response.json();
    
    if (data.results && data.results[0]) {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

// Add distance calculation function
function calculateDistance(coords1: Coordinates, coords2: Coordinates): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (coords2.lat - coords1.lat) * Math.PI / 180;
  const dLon = (coords2.lng - coords1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coords1.lat * Math.PI / 180) * Math.cos(coords2.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in miles
}

// Modify existing functions and add distance filtering
export function filterAvailableGroups(
  discoverableGroups: { [key: string]: GroupProfile },
  savedGroups: { [key: string]: GroupProfile },
  userLocation?: Coordinates,
  maxDistance?: number
): { [key: string]: GroupProfile } {
  // First filter out saved groups
  const availableGroups = Object.fromEntries(
    Object.entries(discoverableGroups).filter(([id]) => !savedGroups[id])
  );

  // If no location filtering is needed, return all available groups
  if (!userLocation || !maxDistance) {
    return availableGroups;
  }

  // Filter by distance
  return Object.fromEntries(
    Object.entries(availableGroups).filter(async ([_, group]) => {
      // Get coordinates for group location if not already cached
      const groupCoords = await getCoordinates(group.location);
      if (!groupCoords) return false;

      // Calculate distance
      const distance = calculateDistance(userLocation, groupCoords);
      return distance <= maxDistance;
    })
  );
}

export function filterGroupsBySearch(
  groups: { [key: string]: GroupProfile },
  searchQuery: string
): { [key: string]: GroupProfile } {
  if (!searchQuery.trim()) return groups;

  const query = searchQuery.toLowerCase();
  return Object.fromEntries(
    Object.entries(groups).filter(([_, group]) =>
      group.name.toLowerCase().includes(query) ||
      group.description.toLowerCase().includes(query) ||
      group.location.toLowerCase().includes(query) ||
      group.interests.some(interest => interest.toLowerCase().includes(query)) ||
      group.quirks.some(quirk => quirk.toLowerCase().includes(query))
    )
  );
}