import { ProfileImage } from "../ui/profile/ProfileImage";
import { ImageGallery } from "../ui/profile/ImageGallery";
import { ProfileHeader } from "../ui/profile/ProfileHeader";
import { ProfileContent } from "../ui/profile/ProfileContent";
import { ProfileDialogs } from "../ui/profile/ProfileDialogs";
import { NavigationBar } from "../ui/profile/NavigationBar";
import { useProfileImages } from "../../hooks/useProfileImages";
import { useProfileState } from "../../hooks/useProfileState";
import { useProfileHandlers } from "../../hooks/useProfileHandlers";
import { ProfilePageProps } from "../../types/profile";
import { getCurrentTier } from "../../utils/tiers";
import { calculateCounts } from "../../utils/profileUtils";
import { useEffect } from 'react';
import { parseLocation } from '../../utils/location/distance';

export default function ProfilePage({ 
  onNavigate, 
  profile, 
  onUpdateProfile,
  groupProfiles,
  followedUsers 
}: ProfilePageProps) {
  const state = useProfileState(profile);
  const imageHandlers = useProfileImages(profile, (updates) => onUpdateProfile("Alice Johnson", updates));
  const handlers = useProfileHandlers({ profile, onUpdateProfile, state });
  const currentTier = getCurrentTier(profile.emeraldScore);
  const { groupCount, friendsCount, followingCount } = calculateCounts(profile, groupProfiles, followedUsers);

  useEffect(() => {
    const validateAndParseLocation = async () => {
      if (profile.location) {
        try {
          const coords = await parseLocation(profile.location);
          
          onUpdateProfile("Alice Johnson", {
            locationCoordinates: coords
          });
        } catch (error) {
          console.error('Error parsing location:', error);
        }
      }
    };

    validateAndParseLocation();
  }, [profile.location, onUpdateProfile]);

  const handleProfileUpdate = (updates: Partial<typeof profile>) => {
    onUpdateProfile("Alice Johnson", updates);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full bg-white">
        <ProfileHeader
          profile={profile}
          currentTier={currentTier}
          imageHandlers={imageHandlers}
          state={state}
          handlers={handlers}
          onNavigate={onNavigate}
          onUpdateProfile={handleProfileUpdate}
        />

        <ProfileContent
          profile={profile}
          state={state}
          counts={{ groupCount, friendsCount, followingCount }}
          onNavigate={onNavigate}
        />

        <ProfileDialogs
          profile={profile}
          state={state}
          handlers={handlers}
        />

        <NavigationBar onNavigate={onNavigate} />
      </div>
    </div>
  );
}