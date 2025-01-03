import { ReactNode } from 'react';
import { GoogleMapsProvider } from './GoogleMapsContext';

interface MapContainerProps {
  apiKey: string;
  children: ReactNode;
}

export default function MapContainer({ apiKey, children }: MapContainerProps) {
  return (
    <GoogleMapsProvider apiKey={apiKey}>
      {children}
    </GoogleMapsProvider>
  );
}