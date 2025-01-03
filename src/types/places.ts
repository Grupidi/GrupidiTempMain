export interface BusyPlace {
  id: string;
  name: string;
  address: string;
  busynessLevel: number; // 0-100
  location: google.maps.LatLngLiteral;
}