import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: Error | null;
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
  loadError: null,
});

interface GoogleMapsProviderProps {
  apiKey: string;
  children: ReactNode;
}

let loadPromise: Promise<void> | null = null;

export function GoogleMapsProvider({ apiKey, children }: GoogleMapsProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google?.maps) {
        setIsLoaded(true);
        return Promise.resolve();
      }

      if (loadPromise) {
        return loadPromise;
      }

      loadPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        
        script.onload = () => {
          setIsLoaded(true);
          setLoadError(null);
          resolve();
        };
        
        script.onerror = (error) => {
          setLoadError(error as Error);
          setIsLoaded(false);
          reject(error);
        };

        document.head.appendChild(script);
      });

      return loadPromise;
    };

    loadGoogleMaps().catch((error) => {
      console.error('Error loading Google Maps:', error);
    });

    return () => {
      setIsLoaded(false);
      setLoadError(null);
    };
  }, [apiKey]);

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

export function useGoogleMaps() {
  const context = useContext(GoogleMapsContext);
  if (context === undefined) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider');
  }
  return context;
}