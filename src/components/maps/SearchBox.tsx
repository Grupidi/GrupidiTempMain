import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface SearchBoxProps {
  onPlaceSelect: (location: google.maps.LatLngLiteral) => void;
  map: google.maps.Map | null;
}

interface Prediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export default function SearchBox({ onPlaceSelect, map }: SearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.google && map) {
      setAutocompleteService(new google.maps.places.AutocompleteService());
      setPlacesService(new google.maps.places.PlacesService(map));
      setGeocoder(new google.maps.Geocoder());
    }
  }, [map]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowPredictions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (debouncedQuery && autocompleteService) {
      autocompleteService.getPlacePredictions(
        { input: debouncedQuery },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            setPredictions(predictions);
            setShowPredictions(true);
          } else {
            setPredictions([]);
            setShowPredictions(false);
          }
        }
      );
    } else {
      setPredictions([]);
      setShowPredictions(false);
    }
  }, [debouncedQuery, autocompleteService]);

  const handlePredictionSelect = (prediction: Prediction) => {
    if (placesService) {
      placesService.getDetails(
        { placeId: prediction.place_id },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
            setSearchQuery(prediction.description);
            setShowPredictions(false);
            onPlaceSelect({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            });
          }
        }
      );
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && geocoder && searchQuery.trim()) {
      geocoder.geocode({ address: searchQuery }, (results, status) => {
        if (status === 'OK' && results?.[0]?.geometry?.location) {
          const location = results[0].geometry.location;
          onPlaceSelect({
            lat: location.lat(),
            lng: location.lng()
          });
          setShowPredictions(false);
        }
      });
    }
  };

  return (
    <div className="relative" ref={searchBoxRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => predictions.length > 0 && setShowPredictions(true)}
          onKeyPress={handleEnterPress}
          placeholder="Search locations"
          className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 bg-white focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
        />
      </div>

      {showPredictions && predictions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {predictions.map((prediction) => (
            <button
              key={prediction.place_id}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              onClick={() => handlePredictionSelect(prediction)}
            >
              <div className="font-medium text-gray-900">
                {prediction.structured_formatting.main_text}
              </div>
              <div className="text-sm text-gray-500">
                {prediction.structured_formatting.secondary_text}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}