export async function searchNearbyPlaces(
  location: google.maps.LatLngLiteral,
  type: string,
  radius: number
): Promise<google.maps.places.PlaceResult[]> {
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
          resolve(results);
        } else {
          resolve([]);
        }
      }
    );
  });
}

export async function getPlaceDetails(
  placeId: string,
  fields: string[] = ['place_id', 'name', 'formatted_address', 'geometry']
): Promise<google.maps.places.PlaceResult | null> {
  const service = new google.maps.places.PlacesService(
    new google.maps.Map(document.createElement('div'))
  );

  return new Promise((resolve, reject) => {
    service.getDetails(
      { placeId, fields },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          resolve(place);
        } else {
          resolve(null);
        }
      }
    );
  });
}