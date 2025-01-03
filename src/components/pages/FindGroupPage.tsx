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

  // Combine regular and discoverable member profiles
  const allMemberProfiles = useMemo(() => ({
    ...memberProfiles,
    ...discoverableMemberProfiles
  }), [memberProfiles]);

  // Get available groups (excluding saved ones)
  const availableGroups = filterAvailableGroups(discoverableGroupProfiles, savedGroups);
  
  // Apply search filter
  const filteredGroups = filterGroupsBySearch(availableGroups, searchQuery);
  
  // Get current group
  const currentGroup = Object.values(filteredGroups)[currentGroupIndex];

  // Handle transitions
  const handleNext = () => {
    const totalGroups = Object.keys(filteredGroups).length;
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

  // Render no groups found state
  if (Object.keys(filteredGroups).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200">
        {/* ... rest of the no groups found JSX ... */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200">
      <div className="w-full mx-auto min-h-screen flex flex-col">
        <DistanceFilter
          isEnabled={isDistanceFilterEnabled}
          onToggle={setIsDistanceFilterEnabled}
          value={sliderValue}
          onChange={setSliderValue}
        />

        <header className="flex items-center justify-between p-4 border-b border-pink-200 bg-pink-50 sticky top-0 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-pink-600 hover:bg-pink-100"
            onClick={() => onNavigate('groups')}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex-1 px-4">
            <Input
              type="text"
              placeholder="Search groups"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-pink-200 text-pink-800 placeholder-pink-400 focus:ring-2 focus:ring-pink-300"
            />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <GroupHeader
            group={currentGroup}
            isRejecting={isRejecting}
            isAccepting={isAccepting}
            onMemberClick={handleMemberClick}
            memberProfiles={allMemberProfiles}
          />
          <GroupCard group={currentGroup} />
        </main>

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