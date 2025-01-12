import { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowLeft, Map, Users, Bell, User, UserPlus, Check, Clock } from 'lucide-react';
import { useProfileStatus } from '../../hooks/useProfileStatus';
import { MemberProfile } from '../../types/profiles';
import { getProfileStatus } from '../../utils/profileStatus/getStatus';
import { validateUsername, ProfileValidationError } from '../../utils/validation/profileValidation';

interface AddFriendsPageProps {
  onNavigate: (page: string) => void;
  currentUser: MemberProfile;
  memberProfiles: { [key: string]: MemberProfile };
  followedUsers: any[];
  friendRequests: any[];
  updateMemberProfile: (id: string, updates: Partial<MemberProfile>) => void;
  setFollowedUsers: React.Dispatch<React.SetStateAction<any[]>>;
  setFriendRequests: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function AddFriendsPage({
  onNavigate,
  currentUser,
  memberProfiles,
  followedUsers,
  friendRequests,
  updateMemberProfile,
  setFollowedUsers,
  setFriendRequests
}: AddFriendsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [requestedProfiles, setRequestedProfiles] = useState<Set<string>>(new Set());
  const { updateStatus } = useProfileStatus(
    currentUser,
    followedUsers,
    friendRequests,
    updateMemberProfile,
    setFollowedUsers,
    setFriendRequests
  );

  const handleAddFriend = (profile: MemberProfile) => {
    try {
      const validUsername = validateUsername(profile.username);
      const context = { currentUser, followedUsers, friendRequests, requestedProfiles };
      const status = getProfileStatus(context, validUsername);

      if (status === 'follower') {
        updateStatus(validUsername, 'friend');
        setRequestedProfiles(prev => {
          const newSet = new Set(prev);
          newSet.delete(validUsername);
          return newSet;
        });
      } else if (status === 'following' || status === 'none') {
        setRequestedProfiles(prev => new Set([...prev, validUsername]));
        updateStatus(validUsername, 'requested');
        
        setFriendRequests(prev => [...prev, {
          id: validUsername,
          name: profile.name,
          username: validUsername,
          bio: profile.bio,
          location: profile.location,
          profilePicture: profile.profilePicture,
          status: 'pending'
        }]);
      }
    } catch (error) {
      if (error instanceof ProfileValidationError) {
        console.error(`Profile validation failed: ${error.message}`);
        // You could show this error in the UI
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const availableProfiles = Object.values(memberProfiles).filter(profile => {
    const context = { currentUser, followedUsers, friendRequests, requestedProfiles };
    const status = getProfileStatus(context, profile.username);
    
    console.log(`Profile ${profile.name} (${profile.username}):`, {
      status,
      isInFriendRequests: friendRequests.some(req => req.username === profile.username),
      isInFollowedUsers: followedUsers.some(user => user.username === profile.username),
      isPending: friendRequests.some(req => req.username === profile.username && req.status === 'pending'),
      isRequested: requestedProfiles.has(profile.username)
    });
    
    return (
      profile.username !== currentUser.username &&
      !currentUser.friends.includes(profile.username) &&
      ['none', 'following', 'follower', 'pending'].includes(status)
    );
  });

  const filteredProfiles = availableProfiles.filter(profile => {
    if (!profile || !profile.name || !profile.username) {
      return false;
    }
    
    return (
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onNavigate('friends')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">Add Friends</h1>
            <p className="text-sm text-gray-500">
              {filteredProfiles.length} suggestions
            </p>
          </div>
        </div>
      </header>

      <div className="bg-white border-b p-4 sticky top-[73px] z-10">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex-1 overflow-y-auto pb-16">
        <div className="divide-y">
          {filteredProfiles.map((profile) => {
            const isRequested = requestedProfiles.has(profile.username);
            const context = { 
              currentUser, 
              followedUsers, 
              friendRequests,
              requestedProfiles 
            };
            const status = getProfileStatus(context, profile.username);

            return (
              <div key={profile.username} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={profile.profilePicture} alt={profile.name} />
                    <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{profile.name}</h3>
                    <p className="text-sm text-gray-500">@{profile.username}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddFriend(profile)}
                  disabled={status === 'pending'}
                  className={`flex items-center gap-2 ${
                    status === 'pending'
                      ? 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-50 cursor-not-allowed'
                      : isRequested 
                        ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-50'
                        : 'text-blue-500 hover:text-blue-600'
                  }`}
                >
                  {status === 'pending' ? (
                    <>
                      <Clock className="h-4 w-4" />
                      Pending
                    </>
                  ) : isRequested ? (
                    <>
                      <Check className="h-4 w-4" />
                      Requested!
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      Add Friend
                    </>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-pink-500 text-white">
        <div className="flex justify-around items-center py-2">
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