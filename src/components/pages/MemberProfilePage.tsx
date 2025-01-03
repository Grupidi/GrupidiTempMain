import { useState } from 'react';
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ArrowLeft, MapPin, Users, UserSquare2, Heart, Sparkles } from 'lucide-react';
import { ProfileHeader } from './member-profile/ProfileHeader';
import { GroupsDialog } from './member-profile/GroupsDialog';
import { FriendsDialog } from './member-profile/FriendsDialog';
import { FollowingDialog } from './member-profile/FollowingDialog';
import { NavigationBar } from '../ui/navigation/NavigationBar';
import { getMemberGroups } from '../../utils/groups/membership';
import type { MemberProfileProps } from '../../types/profiles';

export default function MemberProfilePage({
  memberId,
  onNavigate,
  profile,
  groupProfiles = {},
  memberProfiles = {},
  followedUsers = []
}: MemberProfileProps) {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGroupsDialog, setShowGroupsDialog] = useState(false);
  const [showFriendsDialog, setShowFriendsDialog] = useState(false);
  const [showFollowingDialog, setShowFollowingDialog] = useState(false);

  const memberGroups = getMemberGroups(memberId, groupProfiles, memberProfiles);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === profile.profileImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? profile.profileImages.length - 1 : prevIndex - 1
    );
  };

  const handleViewGroup = (groupId: string) => {
    onNavigate('groupProfile', undefined, groupId);
  };

  const handleViewProfile = (userId: string) => {
    onNavigate('memberProfile', userId);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-pink-500">
        <div className="absolute top-4 left-4 z-10">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('back')}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>

        <ProfileHeader 
          profile={profile}
          onNavigate={onNavigate}
          onImageClick={() => setIsImageExpanded(true)}
          isImageExpanded={isImageExpanded}
          currentImageIndex={currentImageIndex}
          onNextImage={handleNextImage}
          onPreviousImage={handlePreviousImage}
          setIsImageExpanded={setIsImageExpanded}
        />
      </div>

      <div className="p-4 bg-white">
        <div className="bg-pink-50 rounded-lg p-4 mb-4">
          <h2 className="font-semibold text-lg mb-2">About Me</h2>
          <p className="text-black">{profile.bio}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-pink-500" />
                <h2 className="font-semibold">Location</h2>
              </div>
              <p className="text-black">{profile.location}</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setShowGroupsDialog(true)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-pink-500" />
                <h2 className="font-semibold">Groups</h2>
              </div>
              <p className="text-black">{memberGroups.length}</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setShowFriendsDialog(true)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <UserSquare2 className="h-5 w-5 text-pink-500" />
                <h2 className="font-semibold">Friends</h2>
              </div>
              <p className="text-black">{profile.friends.length}</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setShowFollowingDialog(true)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-pink-500" />
                <h2 className="font-semibold">Following</h2>
              </div>
              <p className="text-black">{followedUsers.length}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-sm mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-5 w-5 text-pink-500" />
              <h2 className="font-semibold">Interests & Hobbies</h2>
            </div>
            <ul className="list-disc list-inside">
              {profile.interests.map((interest, index) => (
                <li key={index} className="text-black">{interest}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-pink-500" />
              <h2 className="font-semibold">Personal Quirks</h2>
            </div>
            <ul className="list-disc list-inside">
              {profile.quirks.map((quirk, index) => (
                <li key={index} className="text-black">{quirk}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <GroupsDialog
          isOpen={showGroupsDialog}
          onClose={() => setShowGroupsDialog(false)}
          groups={memberGroups}
          onViewGroup={handleViewGroup}
        />

        <FriendsDialog
          isOpen={showFriendsDialog}
          onClose={() => setShowFriendsDialog(false)}
          friends={profile.friends}
          memberProfiles={memberProfiles}
          onViewProfile={handleViewProfile}
        />

        <FollowingDialog
          isOpen={showFollowingDialog}
          onClose={() => setShowFollowingDialog(false)}
          followedUsers={followedUsers}
          onViewProfile={handleViewProfile}
        />

        <NavigationBar onNavigate={onNavigate} />
      </div>
    </div>
  );
}