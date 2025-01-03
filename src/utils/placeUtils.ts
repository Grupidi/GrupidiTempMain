import { BusyPlace } from '../types/places';

// Mock busyness data since the Places API doesn't provide real-time busyness
function getMockBusynessLevel(): number {
  return Math.floor(Math.random() * 100);
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

// ... rest of the file remains the same ...