import { useState, useRef, useEffect } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogContent } from "../ui/dialog";
import { Map, Users, Bell, User, Mail, SlidersHorizontal, Heart, Search, Flame } from 'lucide-react';
import { GOOGLE_MAPS_API_KEY } from "../../config/constants";
import MapContainer from "../maps/MapContainer";
import GoogleMap from "../maps/GoogleMap";
import SearchBox from "../maps/SearchBox";
import { SavedLocationsList } from "../locations/SavedLocationsList";
import { WhatsPoppin } from "../activity/WhatsPoppin";
import { placeFilters } from "../../data/placeFilters";
import { groupLocationsByType } from "../../utils/locationUtils";
import type { SavedLocation } from "../maps/types";

interface ActivityPageProps {
  onNavigate: (page: string) => void;
}

export default function ActivityPage({ onNavigate }: ActivityPageProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchLocation, setSearchLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [showSavedLocations, setShowSavedLocations] = useState(false);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showWhatsPoppin, setShowWhatsPoppin] = useState(false);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const mapRef = useRef<{ centerOnCurrentLocation: () => void }>(null);

  const handleMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const handlePlaceSelect = (location: google.maps.LatLngLiteral) => {
    setSearchLocation(location);
    setSelectedFilter(null);
  };

  const handleFilterSelect = (filterId: string) => {
    const filter = placeFilters.find(f => f.id === filterId);
    setSelectedFilter(filter?.type[0] || null);
    setShowFilters(false);
    setSearchLocation(null);
  };

  const handleClearFilters = () => {
    setSelectedFilter(null);
    setShowFilters(false);
  };

  const handleSaveLocation = (location: SavedLocation) => {
    setSavedLocations(prev => {
      if (!prev.some(loc => loc.id === location.id)) {
        return [...prev, location];
      }
      return prev;
    });
  };

  const handleRemoveSavedLocation = (locationId: string) => {
    setSavedLocations(prev => prev.filter(loc => loc.id !== locationId));
  };

  const handleSavedLocationClick = (location: SavedLocation) => {
    setSearchLocation(location.location);
    setSelectedFilter(null);
    setShowSavedLocations(false);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const groupedLocations = groupLocationsByType(savedLocations);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-pink-500 text-white p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-pink-600"
            onClick={() => setShowFilters(true)}
          >
            <SlidersHorizontal className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-pink-600"
            onClick={() => setShowWhatsPoppin(true)}
          >
            <Flame className="h-6 w-6" />
          </Button>
        </div>
        <h1 className="text-2xl font-bold">Activity</h1>
        <div className="w-12"></div>
      </header>

      {/* Search Bar */}
      <div className="bg-gray-200 p-4">
        <SearchBox onPlaceSelect={handlePlaceSelect} map={map} />
      </div>

      {/* Main Content (Map) */}
      <main className="flex-1 relative">
        <div className="absolute inset-0">
          <MapContainer apiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap 
              apiKey={GOOGLE_MAPS_API_KEY} 
              onMapLoad={handleMapLoad}
              searchLocation={searchLocation}
              selectedFilter={selectedFilter}
              onMapRef={(ref) => { mapRef.current = ref; }}
              onSaveLocation={handleSaveLocation}
            />
          </MapContainer>
        </div>
      </main>

      {/* Filter Dialog */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <h2 className="text-lg font-semibold">Filter Places</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleClearFilters}
              className="text-pink-500 hover:text-pink-600"
            >
              Clear Filters
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 p-4 max-h-[60vh] overflow-y-auto">
            {placeFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.type[0] ? 'default' : 'outline'}
                className={`flex items-center gap-2 ${
                  selectedFilter === filter.type[0] ? 'bg-pink-500 text-white' : ''
                }`}
                onClick={() => handleFilterSelect(filter.id)}
              >
                <filter.icon className="h-5 w-5" />
                <span className="text-sm">{filter.name}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Saved Locations Dialog */}
      <Dialog open={showSavedLocations} onOpenChange={setShowSavedLocations}>
        <DialogContent className="sm:max-w-[425px]">
          <SavedLocationsList
            groupedLocations={groupedLocations}
            onLocationClick={handleSavedLocationClick}
            onRemoveLocation={handleRemoveSavedLocation}
            onClose={() => setShowSavedLocations(false)}
          />
        </DialogContent>
      </Dialog>

      {/* What's Poppin Dialog */}
      <WhatsPoppin
        isOpen={showWhatsPoppin}
        onClose={() => setShowWhatsPoppin(false)}
        userLocation={userLocation}
      />

      {/* Floating Action Buttons */}
      <div className="absolute bottom-16 left-4">
        <button 
          className="bg-pink-500 text-white rounded-full p-3 shadow-lg hover:bg-pink-600 transition-colors"
          onClick={() => setShowSavedLocations(true)}
        >
          <Heart className="h-6 w-6" />
        </button>
      </div>
      <div className="absolute bottom-16 right-4">
        <button 
          className="bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition-colors"
          onClick={() => mapRef.current?.centerOnCurrentLocation()}
        >
          <Map className="h-6 w-6" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-pink-500 text-white py-2 fixed bottom-0 left-0 right-0 w-full">
        <div className="flex justify-around items-center">
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-pink-600"
            onClick={() => onNavigate('activity')}
          >
            <Map className="h-6 w-6" />
            <span className="text-xs">Activity</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-pink-600"
            onClick={() => onNavigate('groups')}
          >
            <Users className="h-6 w-6" />
            <span className="text-xs">Groups</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-pink-600"
            onClick={() => onNavigate('notifications')}
          >
            <Bell className="h-6 w-6" />
            <span className="text-xs">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-pink-600"
            onClick={() => onNavigate('profile')}
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}