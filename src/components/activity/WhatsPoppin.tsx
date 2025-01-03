import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select } from "../ui/select";
import { Loader2, MapPin, Users, Flame } from 'lucide-react';
import { placeFilters } from '../../data/placeFilters';
import { getBusyPlaces, searchPlaceBusyness } from '../../utils/places';
import { PlaceAutocomplete } from './PlaceAutocomplete';
import type { BusyPlace } from '../../types/places';

interface WhatsPoppin {
  isOpen: boolean;
  onClose: () => void;
  userLocation: google.maps.LatLngLiteral | null;
}

export function WhatsPoppin({ isOpen, onClose, userLocation }: WhatsPoppin) {
  const [selectedType, setSelectedType] = useState('restaurant');
  const [busyPlaces, setBusyPlaces] = useState<BusyPlace[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<BusyPlace | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isOpen && userLocation && selectedType) {
      loadBusyPlaces();
    }
  }, [isOpen, userLocation, selectedType]);

  const loadBusyPlaces = async () => {
    if (!userLocation) return;
    
    setIsLoading(true);
    try {
      const places = await getBusyPlaces(userLocation, selectedType, 10);
      setBusyPlaces(places);
    } catch (error) {
      console.error('Error loading busy places:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceSelect = async (place: google.maps.places.PlaceResult) => {
    if (!place.place_id) return;

    setIsSearching(true);
    try {
      const result = await searchPlaceBusyness(place.place_id);
      setSearchResult(result);
    } catch (error) {
      console.error('Error searching place:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const renderBusynessIndicator = (level: number) => {
    let color = 'bg-green-500';
    if (level > 66) color = 'bg-red-500';
    else if (level > 33) color = 'bg-yellow-500';

    return (
      <div className="flex items-center gap-2">
        <div className={`h-3 rounded-full ${color}`} style={{ width: `${level}%` }} />
        <span className="text-sm font-medium">{level}%</span>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-red-500" />
            What's Poppin
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-6">
          {/* Place Search */}
          <div className="space-y-2">
            <Label>Search Any Location</Label>
            <PlaceAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              onPlaceSelect={handlePlaceSelect}
              placeholder="Search for any place..."
            />
            {isSearching && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-pink-500" />
              </div>
            )}
            {searchResult && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{searchResult.name}</h3>
                    <p className="text-sm text-gray-500">{searchResult.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">{searchResult.busynessLevel}%</span>
                  </div>
                </div>
                {renderBusynessIndicator(searchResult.busynessLevel)}
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Nearby Places (10mi radius)</Label>
                <Select
                  value={selectedType}
                  onChange={(value) => setSelectedType(value)}
                >
                  {placeFilters.map(filter => (
                    <option key={filter.id} value={filter.type[0]}>
                      {filter.name}
                    </option>
                  ))}
                </Select>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
                </div>
              ) : (
                <div className="space-y-3">
                  {busyPlaces.map((place, index) => (
                    <div key={place.id} className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-pink-500">#{index + 1}</span>
                            <h3 className="font-medium">{place.name}</h3>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            <p>{place.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-gray-400" />
                          <span className="font-medium">{place.busynessLevel}%</span>
                        </div>
                      </div>
                      {renderBusynessIndicator(place.busynessLevel)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}