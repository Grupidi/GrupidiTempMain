import { useState, useEffect, useCallback, useRef } from 'react';
import { useGoogleMaps } from './GoogleMapsContext';
import { createInfoWindowContent } from './InfoWindowContent';
import { GoogleMapProps, SavedLocation } from './types';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194
};

const options = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false
};

export default function GoogleMap({ 
  onMapLoad, 
  searchLocation, 
  selectedFilter, 
  onMapRef, 
  onSaveLocation 
}: GoogleMapProps) {
  const { isLoaded, loadError } = useGoogleMaps();
  const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [zoom, setZoom] = useState(16);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  const initialLocationSet = useRef(false);
  const previousSearchLocation = useRef<google.maps.LatLngLiteral | null>(null);
  const previousFilter = useRef<string | null>(null);
  
  const locationMarkerRef = useRef<google.maps.Marker | null>(null);
  const searchMarkerRef = useRef<google.maps.Marker | null>(null);
  const placeMarkersRef = useRef<google.maps.Marker[]>([]);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const currentInfoWindow = useRef<google.maps.InfoWindow | null>(null);

  const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    placesServiceRef.current = new google.maps.places.PlacesService(mapInstance);
    if (onMapLoad) {
      onMapLoad(mapInstance);
    }
  }, [onMapLoad]);

  // Clear existing place markers
  const clearPlaceMarkers = useCallback(() => {
    if (currentInfoWindow.current) {
      currentInfoWindow.current.close();
    }
    placeMarkersRef.current.forEach(marker => marker.setMap(null));
    placeMarkersRef.current = [];
  }, []);

  // Clear search marker
  const clearSearchMarker = useCallback(() => {
    if (searchMarkerRef.current) {
      searchMarkerRef.current.setMap(null);
      searchMarkerRef.current = null;
    }
  }, []);

  // Handle saving location
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).originalHandleSaveLocation = (placeId: string) => {
        if (!placesServiceRef.current) return;

        placesServiceRef.current.getDetails(
          {
            placeId,
            fields: ['name', 'formatted_address', 'geometry', 'rating', 'photos', 
                    'formatted_phone_number', 'website', 'types']
          },
          (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
              const savedLocation: SavedLocation = {
                id: placeId,
                name: place.name || '',
                address: place.formatted_address || '',
                location: {
                  lat: place.geometry?.location?.lat() || 0,
                  lng: place.geometry?.location?.lng() || 0
                },
                placeId,
                rating: place.rating,
                photos: place.photos?.map(photo => photo.getUrl({ maxWidth: 400 })),
                phone: place.formatted_phone_number,
                website: place.website,
                types: place.types
              };
              onSaveLocation?.(savedLocation);
            }
          }
        );
      };
    }
  }, [onSaveLocation]);

  // Search for places based on filter
  const searchPlaces = useCallback((location: google.maps.LatLngLiteral, type: string) => {
    if (!placesServiceRef.current || !map) return;

    clearPlaceMarkers();

    const request = {
      location,
      radius: 1500,
      type: type.toLowerCase()
    };

    placesServiceRef.current.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
        results.forEach(place => {
          if (place.geometry?.location) {
            const marker = new google.maps.Marker({
              map,
              position: place.geometry.location,
              title: place.name,
              icon: {
                url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png',
                scaledSize: new google.maps.Size(27, 43),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(13, 43)
              }
            });

            placeMarkersRef.current.push(marker);

            marker.addListener('click', () => {
              if (currentInfoWindow.current) {
                currentInfoWindow.current.close();
              }

              placesServiceRef.current?.getDetails(
                {
                  placeId: place.place_id!,
                  fields: ['name', 'rating', 'formatted_phone_number', 'website', 
                          'opening_hours', 'price_level', 'user_ratings_total', 
                          'photos', 'vicinity', 'place_id', 'formatted_address', 'types']
                },
                (placeDetails, detailsStatus) => {
                  if (detailsStatus === google.maps.places.PlacesServiceStatus.OK && placeDetails) {
                    const infoWindow = new google.maps.InfoWindow({
                      content: createInfoWindowContent(placeDetails),
                      maxWidth: 320
                    });

                    infoWindow.open(map, marker);
                    currentInfoWindow.current = infoWindow;
                  }
                }
              );
            });
          }
        });
      }
    });
  }, [map, clearPlaceMarkers]);

  // Get user's location first
  useEffect(() => {
    if (!isLoaded || initialLocationSet.current) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(pos);
          initialLocationSet.current = true;
        },
        (error) => {
          console.warn('Error getting location:', error);
          setCurrentPosition(defaultCenter);
          initialLocationSet.current = true;
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      console.warn('Geolocation is not supported');
      setCurrentPosition(defaultCenter);
      initialLocationSet.current = true;
    }
  }, [isLoaded]);

  // Initialize map after we have the position
  useEffect(() => {
    if (!isLoaded || !mapContainer || map || !currentPosition) return;

    const newMap = new google.maps.Map(mapContainer, {
      zoom,
      center: currentPosition,
      ...options,
      styles: [
        {
          featureType: 'all',
          elementType: 'all',
          stylers: [{ saturation: 0 }]
        }
      ]
    });

    handleMapLoad(newMap);

    return () => {
      if (map) {
        google.maps.event.clearInstanceListeners(map);
      }
    };
  }, [mapContainer, map, handleMapLoad, currentPosition, zoom, isLoaded]);

  // Handle current position marker
  useEffect(() => {
    if (!map || !currentPosition) return;

    if (locationMarkerRef.current) {
      locationMarkerRef.current.setPosition(currentPosition);
    } else {
      locationMarkerRef.current = new google.maps.Marker({
        map,
        position: currentPosition,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#4285F4',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
        }
      });
    }

    return () => {
      if (locationMarkerRef.current) {
        locationMarkerRef.current.setMap(null);
        locationMarkerRef.current = null;
      }
    };
  }, [map, currentPosition]);

  // Handle search location marker and places search
  useEffect(() => {
    if (!map || !searchLocation) return;

    // Clear existing markers if search location has changed
    if (previousSearchLocation.current?.lat !== searchLocation.lat || 
        previousSearchLocation.current?.lng !== searchLocation.lng) {
      clearPlaceMarkers();
      clearSearchMarker();
    }

    if (searchMarkerRef.current) {
      searchMarkerRef.current.setPosition(searchLocation);
    } else {
      searchMarkerRef.current = new google.maps.Marker({
        map,
        position: searchLocation,
        icon: {
          url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png',
          scaledSize: new google.maps.Size(27, 43),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(13, 43)
        }
      });

      searchMarkerRef.current.addListener('click', () => {
        if (currentInfoWindow.current) {
          currentInfoWindow.current.close();
        }

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: searchLocation }, (results, status) => {
          if (status === 'OK' && results?.[0]) {
            const placeId = results[0].place_id;
            
            placesServiceRef.current?.getDetails(
              {
                placeId,
                fields: ['name', 'rating', 'formatted_phone_number', 'website', 
                        'opening_hours', 'price_level', 'user_ratings_total', 
                        'photos', 'vicinity', 'place_id', 'formatted_address', 'types']
              },
              (placeDetails, detailsStatus) => {
                if (detailsStatus === google.maps.places.PlacesServiceStatus.OK && placeDetails) {
                  const infoWindow = new google.maps.InfoWindow({
                    content: createInfoWindowContent(placeDetails),
                    maxWidth: 320
                  });

                  infoWindow.open(map, searchMarkerRef.current);
                  currentInfoWindow.current = infoWindow;
                }
              }
            );
          }
        });
      });
    }

    map.panTo(searchLocation);
    setZoom(16);

    previousSearchLocation.current = searchLocation;

    return () => {
      if (searchMarkerRef.current) {
        searchMarkerRef.current.setMap(null);
        searchMarkerRef.current = null;
      }
    };
  }, [map, searchLocation, clearPlaceMarkers, clearSearchMarker]);

  // Handle filter changes
  useEffect(() => {
    if (!map || !currentPosition) {
      clearPlaceMarkers();
      return;
    }

    // Clear markers if filter has changed
    if (previousFilter.current !== selectedFilter) {
      clearPlaceMarkers();
      if (!selectedFilter) {
        clearSearchMarker();
      }
    }

    if (selectedFilter) {
      const searchCenter = searchLocation || currentPosition;
      searchPlaces(searchCenter, selectedFilter);
    }

    previousFilter.current = selectedFilter;
  }, [map, currentPosition, selectedFilter, searchLocation, searchPlaces, clearPlaceMarkers, clearSearchMarker]);

  // Watch position changes
  useEffect(() => {
    if (!isLoaded) return;

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(pos);
        },
        (error) => {
          console.warn('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isLoaded]);

  // Expose map methods to parent
  useEffect(() => {
    if (map && onMapRef) {
      onMapRef({
        centerOnCurrentLocation: () => {
          if (currentPosition) {
            map.panTo(currentPosition);
            setZoom(16);
          }
        }
      });
    }
  }, [map, currentPosition, onMapRef]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return <div ref={setMapContainer} style={containerStyle} />;
}

export type { SavedLocation };