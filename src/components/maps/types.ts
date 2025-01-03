export interface SavedLocation {
  id: string;
  name: string;
  address: string;
  location: google.maps.LatLngLiteral;
  placeId?: string;
  rating?: number;
  photos?: string[];
  phone?: string;
  website?: string;
  types?: string[];
}

export interface GoogleMapProps {
  apiKey: string;
  onMapLoad?: (map: google.maps.Map) => void;
  searchLocation?: google.maps.LatLngLiteral | null;
  selectedFilter?: string | null;
  onMapRef?: (ref: { centerOnCurrentLocation: () => void }) => void;
  onSaveLocation?: (location: SavedLocation) => void;
}