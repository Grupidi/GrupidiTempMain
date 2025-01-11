import { ProfileImage } from "../ui/profile/ProfileImage";
import { ImageGallery } from "../ui/profile/ImageGallery";
import { ProfileHeader } from "../ui/profile/ProfileHeader";
import { ProfileContent } from "../ui/profile/ProfileContent";
import { ProfileDialogs } from "../ui/profile/ProfileDialogs";
import { NavigationBar } from "../ui/profile/NavigationBar";
import { GroupCard } from "../ui/group/GroupCard";
import { useProfileImages } from "../../hooks/useProfileImages";
import { useProfileState } from "../../hooks/useProfileState";
import { useProfileHandlers } from "../../hooks/useProfileHandlers";
import { ProfilePageProps } from "../../types/profile";
import { getCurrentTier } from "../../utils/tiers";
import { calculateCounts } from "../../utils/profileUtils";
import { getMemberGroups } from "../../utils/groups/memberGroups";
import { useEffect, useCallback, useState } from 'react';
import { parseLocation } from '../../utils/location/distance';

export default function ProfilePage({ 
  onNavigate, 
  profile, 
  onUpdateProfile,
  groupProfiles,
  followedUsers 
}: ProfilePageProps) {
  // Add local state to track profile updates
  const [localProfile, setLocalProfile] = useState(profile);
  const state = useProfileState(localProfile);
  
  // Update local state when profile prop changes
  useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  // Create a memoized update handler
  const handleProfileUpdate = useCallback(async (updates: Partial<typeof profile>) => {
    if (!updates) {
      console.error('Invalid updates object:', updates);
      return;
    }
    try {
      await onUpdateProfile(profile.username, updates);
      // Update local state immediately after successful update
      setLocalProfile(prev => ({
        ...prev,
        ...updates
      }));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }, [onUpdateProfile, profile.username]);

  // Pass the memoized handler to useProfileImages
  const imageHandlers = useProfileImages(localProfile, handleProfileUpdate);
  
  const handlers = useProfileHandlers({ 
    profile: localProfile, 
    onUpdateProfile: handleProfileUpdate, 
    state 
  });

  const currentTier = getCurrentTier(localProfile.emeraldScore);
  const { groupCount, friendsCount, followingCount } = calculateCounts(localProfile, groupProfiles, followedUsers);

  useEffect(() => {
    const validateAndParseLocation = async () => {
      if (localProfile.location && !localProfile.locationCoordinates) {
        try {
          const coords = await parseLocation(localProfile.location);
          if (coords && localProfile.username) {
            await handleProfileUpdate({
              locationCoordinates: coords
            });
          }
        } catch (error) {
          console.error('Error parsing location:', error);
        }
      }
    };

    validateAndParseLocation();
  }, [localProfile.location, localProfile.locationCoordinates, localProfile.username]);

  // Get groups where this member is listed as a member
  const memberGroups = getMemberGroups(localProfile, groupProfiles);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full bg-white">
        <ProfileHeader
          profile={localProfile}
          currentTier={currentTier}
          imageHandlers={imageHandlers}
          state={state}
          handlers={handlers}
          onNavigate={onNavigate}
          onUpdateProfile={handleProfileUpdate}
        />

        <ProfileContent
          profile={localProfile}
          state={state}
          counts={{ groupCount, friendsCount, followingCount }}
          onNavigate={onNavigate}
        />

        <div className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Member Groups</h2>
          {memberGroups.length > 0 ? (
            <div className="space-y-4">
              {memberGroups.map(group => (
                <GroupCard 
                  key={group.id}
                  group={group}
                  onClick={() => onNavigate(`/groups/${group.id}`)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Not a member of any groups</p>
          )}
        </div>

        <ProfileDialogs
          profile={localProfile}
          state={state}
          handlers={handlers}
        />

        <NavigationBar onNavigate={onNavigate} />
      </div>
    </div>
  );
}