import { useState } from 'react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Star, X } from "lucide-react";
import { SavedLocation } from '../maps/GoogleMap';
import { GroupedLocation, filterGroupedLocations } from '../../utils/locationUtils';

interface SavedLocationsListProps {
  groupedLocations: GroupedLocation[];
  onLocationClick: (location: SavedLocation) => void;
  onRemoveLocation: (locationId: string) => void;
  onClose: () => void;
}

export function SavedLocationsList({
  groupedLocations,
  onLocationClick,
  onRemoveLocation,
  onClose
}: SavedLocationsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredGroups = filterGroupedLocations(groupedLocations, searchQuery);

  return (
    <div className="p-4">
      <Input
        placeholder="Search saved locations..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      <div className="space-y-6 max-h-[60vh] overflow-y-auto">
        {filteredGroups.length === 0 ? (
          <p className="text-center text-gray-500">No saved locations found</p>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.type} className="space-y-2">
              <h3 className="font-semibold text-gray-700 mb-2">{group.type}</h3>
              {group.locations.map((location) => (
                <div 
                  key={location.id} 
                  className="bg-white rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => onLocationClick(location)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{location.name}</h3>
                      <p className="text-sm text-gray-500">{location.address}</p>
                      {location.rating && (
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm">{location.rating}</span>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveLocation(location.id);
                      }}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}