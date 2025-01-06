import { useState, useEffect, useMemo } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowLeft, Search } from 'lucide-react';
import { GroupHeader } from './find-group/GroupHeader';
import { GroupCard } from './find-group/GroupCard';
import { DistanceFilter } from './find-group/DistanceFilter';
import { ActionButtons } from './find-group/ActionButtons';
import { NavigationBar } from './find-group/NavigationBar';
import { discoverableGroupProfiles } from '../../data/discoverableGroupProfiles';
import { discoverableMemberProfiles } from '../../data/discoverableMemberProfiles';
import { filterAvailableGroups, filterGroupsBySearch } from '../../utils/groups/filtering';
import { getNextGroupIndex, handleGroupTransition } from '../../utils/groups/transitions';
import { calculateDistance, parseLocation } from '../../utils/location/distance';

interface FindGroupPageProps {
  onNavigate: (page: string, memberId?: string, groupId?: string) => void;
  groupProfiles: { [key: string]: any };
  savedGroups: { [key: string]: any };
  memberProfiles: { [key: string]: any };
  onSaveGroup: (groupId: string, group: any) => void;
}

export default function FindGroupPage({ 
  onNavigate, 
  groupProfiles,
  savedGroups,
  memberProfiles,
  onSaveGroup 
}: FindGroupPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sliderValue, setSliderValue] = useState(15);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDistanceFilterEnabled, setIsDistanceFilterEnabled] = useState(false);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [distanceEnabled, setDistanceEnabled] = useState(false);
  const [maxDistance, setMaxDistance] = useState(15); // Default 15 miles
  const [filteredGroupsList, setFilteredGroupsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Combine regular and discoverable member profiles
  const allMemberProfiles = useMemo(() => ({
    ...memberProfiles,
    ...discoverableMemberProfiles
  }), [memberProfiles]);

  // Filter groups effect
  useEffect(() => {
    const filterGroups = async () => {
      setIsLoading(true);
      try {
        let groups = Object.values(discoverableGroupProfiles).filter(group => 
          !Object.keys(groupProfiles).includes(group.id)
        );

        if (distanceEnabled && currentLocation) {
          const groupsWithDistance = await Promise.all(
            groups.map(async (group) => {
              try {
                const groupLocation = await parseLocation(group.location);
                const distance = calculateDistance(
                  currentLocation.lat,
                  currentLocation.lng,
                  groupLocation.lat,
                  groupLocation.lng
                );
                return { ...group, distance };
              } catch (error) {
                console.error(`Error calculating distance for group ${group.id}:`, error);
                return { ...group, distance: Infinity };
              }
            })
          );

          groups = groupsWithDistance
            .filter(group => group.distance <= maxDistance)
            .sort((a, b) => (a.distance || 0) - (b.distance || 0));
        }

        setFilteredGroupsList(groups);
      } catch (error) {
        console.error('Error filtering groups:', error);
        setFilteredGroupsList([]);
      } finally {
        setIsLoading(false);
      }
    };

    filterGroups();
  }, [discoverableGroupProfiles, groupProfiles, distanceEnabled, currentLocation, maxDistance]);

  // Get current group
  const currentGroup = filteredGroupsList[currentGroupIndex];

  // Handle transitions
  const handleNext = () => {
    const totalGroups = Object.keys(filteredGroupsList).length;
    setCurrentGroupIndex(getNextGroupIndex(currentGroupIndex, totalGroups));
  };

  const handleReject = async () => {
    setIsRejecting(true);
    await handleGroupTransition(() => {
      setIsRejecting(false);
      handleNext();
    });
  };

  const handleAccept = async () => {
    setIsAccepting(true);
    await handleGroupTransition(() => {
      setIsAccepting(false);
      if (currentGroup) {
        onSaveGroup(currentGroup.id, currentGroup);
      }
      handleNext();
    });
  };

  const handleMemberClick = (memberId: string) => {
    onNavigate('memberProfile', memberId);
  };

  // Get user location
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

  // Get user's current location when distance filter is enabled
  useEffect(() => {
    if (distanceEnabled && !currentLocation) {
      setIsLoadingLocation(true);
      setLocationError(null);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          setLocationError('Unable to get your location. Please enable location services.');
          setIsLoadingLocation(false);
        }
      );
    }
  }, [distanceEnabled]);

  if (isLoadingLocation || isLoading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mb-4"></div>
          <p className="text-gray-600">
            {isLoadingLocation ? 'Getting your location...' : 'Loading groups...'}
          </p>
        </div>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="max-w-md mx-auto p-4 bg-red-50 border-l-4 border-red-500">
          <p className="text-red-700">{locationError}</p>
        </div>
      </div>
    );
  }

  if (filteredGroupsList.length === 0) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 text-center">
          <p className="text-gray-500">
            {distanceEnabled 
              ? `No groups found within ${maxDistance} miles of your location.`
              : 'No available groups found.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 w-full">
      <div className="w-full bg-white shadow-lg">
        <header className="border-b border-pink-200 p-4">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('groups')} className="text-pink-600">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <Input
              type="text"
              placeholder="Search groups"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
        </header>

        <DistanceFilter
          isEnabled={distanceEnabled}
          onToggle={setDistanceEnabled}
          value={maxDistance}
          onChange={setMaxDistance}
        />

        {currentGroup && (
          <main className="relative">
            <GroupHeader
              group={currentGroup}
              isRejecting={isRejecting}
              isAccepting={isAccepting}
              onMemberClick={handleMemberClick}
              memberProfiles={allMemberProfiles}
            />
            <GroupCard group={currentGroup} />
          </main>
        )}

        <ActionButtons
          onReject={handleReject}
          onLike={() => onSaveGroup(currentGroup.id, currentGroup)}
          onAccept={handleAccept}
        />
        <NavigationBar onNavigate={onNavigate} />
      </div>
    </div>
  );
}