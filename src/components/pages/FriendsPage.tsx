import { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowLeft, Map, Users, Bell, User, UserPlus, UserPlus2, UserX } from 'lucide-react';
import { useProfileStatus } from '../../hooks/useProfileStatus';
import { MemberProfile } from '../../types/profiles';
import { validateUsername, ProfileValidationError } from '../../utils/validation/profileValidation';

interface FriendsPageProps {
  onNavigate: (page: string) => void;
  friends: string[];
  memberProfiles: { [key: string]: MemberProfile };
  currentUser: MemberProfile;
  followedUsers: any[];
  friendRequests: any[];
  updateMemberProfile: (id: string, updates: Partial<MemberProfile>) => void;
  setFollowedUsers: React.Dispatch<React.SetStateAction<any[]>>;
  setFriendRequests: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function FriendsPage({
  onNavigate,
  friends,
  memberProfiles,
  currentUser,
  followedUsers,
  friendRequests,
  updateMemberProfile,
  setFollowedUsers,
  setFriendRequests
}: FriendsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { updateStatus } = useProfileStatus(
    currentUser,
    followedUsers,
    friendRequests,
    updateMemberProfile,
    setFollowedUsers,
    setFriendRequests
  );

  // Filter friends based on search query
  const filteredFriends = friends
    .map(friendUsername => memberProfiles[friendUsername])
    .filter(friend => 
      friend && (
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  const handleUnfriend = (username: string) => {
    try {
      const validUsername = validateUsername(username);
      const context = { currentUser, followedUsers, friendRequests, memberProfiles };
      updateStatus(validUsername, 'none');
    } catch (error) {
      if (error instanceof ProfileValidationError) {
        console.error(`Cannot unfriend: ${error.message}`);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onNavigate('profile')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Friends</h1>
              <p className="text-sm text-gray-500">
                {filteredFriends.length} friends
              </p>
            </div>
          </div>
          <Button 
            onClick={() => onNavigate('addFriends')}
            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600"
          >
            <UserPlus className="h-4 w-4" />
            Add Friends
          </Button>
        </div>
      </header>

      <div className="p-4">
        <Input
          type="text"
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="divide-y">
        {filteredFriends.map((friend) => (
          <div key={friend.username} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={friend.profilePicture} alt={friend.name} />
                <AvatarFallback>{friend.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{friend.name}</h3>
                <p className="text-sm text-gray-500">@{friend.username}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUnfriend(friend.username)}
              className="text-red-500 hover:text-red-600"
            >
              Unfriend
            </Button>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-20 left-4">
        <Button 
          size="lg" 
          className="rounded-full bg-blue-500 hover:bg-blue-600 p-3"
          onClick={() => onNavigate('followers')}
        >
          <UserX className="h-6 w-6" />
        </Button>
      </div>

      <div className="fixed bottom-20 right-4">
        <Button 
          size="lg" 
          className="rounded-full bg-orange-500 hover:bg-orange-600 p-3"
          onClick={() => onNavigate('friendRequests')}
        >
          <UserPlus2 className="h-6 w-6" />
        </Button>
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