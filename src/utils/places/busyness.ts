import { BusyPlace } from '../../types/places';

// Mock busyness data since the Places API doesn't provide real-time busyness
function getMockBusynessLevel(): number {
  return Math.floor(Math.random() * 100);
}

export async function getBusyPlaces(
  location: google.maps.LatLngLiteral,
  type: string,
  radius: number
): Promise<BusyPlace[]> {
  const service = new google.maps.places.PlacesService(
    new google.maps.Map(document.createElement('div'))
  );

  return new Promise((resolve, reject) => {
    service.nearbySearch(
      {
        location,
        radius: radius * 1609.34, // Convert miles to meters
        type: type.toLowerCase()
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          // Sort by busyness level in descending order (most busy first)
          const busyPlaces = results
            .map(place => ({
              id: place.place_id || '',
              name: place.name || '',
              address: place.vicinity || '',
              busynessLevel: getMockBusynessLevel(),
              location: {
                lat: place.geometry?.location?.lat() || 0,
                lng: place.geometry?.location?.lng() || 0
              }
            }))
            .sort((a, b) => b.busynessLevel - a.busynessLevel)
            .slice(0, 10); // Get top 10 busiest places

          resolve(busyPlaces);
        } else {
          resolve([]);
        }
      }
    );
  });
}

export async function searchPlaceBusyness(
  placeId: string
): Promise<BusyPlace | null> {
  const service = new google.maps.places.PlacesService(
    new google.maps.Map(document.createElement('div'))
  );

  return new Promise((resolve, reject) => {
    service.getDetails(
      {
        placeId,
        fields: ['place_id', 'name', 'formatted_address', 'geometry']
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          const busynessLevel = getMockBusynessLevel();

          resolve({
            id: place.place_id || '',
            name: place.name || '',
            address: place.formatted_address || '',
            busynessLevel,
            location: {
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0
            }
          });
        } else {
          resolve(null);
        }
      }
    );
  });
}