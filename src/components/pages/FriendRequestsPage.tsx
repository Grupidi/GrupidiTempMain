import { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowLeft, Map, Users, Bell, User } from 'lucide-react';
import { useProfileStatus } from '../../hooks/useProfileStatus';
import { MemberProfile, FriendRequest } from '../../types/profiles';

interface FriendRequestsPageProps {
  onNavigate: (page: string) => void;
  currentUser: MemberProfile;
  followedUsers: any[];
  friendRequests: FriendRequest[];
  updateMemberProfile: (id: string, updates: Partial<MemberProfile>) => void;
  setFollowedUsers: React.Dispatch<React.SetStateAction<any[]>>;
  setFriendRequests: React.Dispatch<React.SetStateAction<FriendRequest[]>>;
}

export default function FriendRequestsPage({
  onNavigate,
  currentUser,
  followedUsers,
  friendRequests,
  updateMemberProfile,
  setFollowedUsers,
  setFriendRequests
}: FriendRequestsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { updateStatus } = useProfileStatus(
    currentUser,
    followedUsers,
    friendRequests,
    updateMemberProfile,
    setFollowedUsers,
    setFriendRequests
  );

  const handleAccept = (requestId: string) => {
    updateStatus(requestId, 'friend');
  };

  const handleDecline = (requestId: string) => {
    updateStatus(requestId, 'none');
  };

  const filteredRequests = friendRequests.filter(request =>
    request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onNavigate('friends')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">Friend Requests</h1>
            <p className="text-sm text-gray-500">
              {filteredRequests.length} requests
            </p>
          </div>
        </div>
      </header>

      <div className="p-4">
        <Input
          type="text"
          placeholder="Search requests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="divide-y">
        {filteredRequests.map((request) => (
          <div key={request.id} className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar>
                <AvatarImage src={request.profilePicture} alt={request.name} />
                <AvatarFallback>{request.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{request.name}</h3>
                <p className="text-sm text-gray-500">@{request.username}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleAccept(request.id)}
                className="flex-1 bg-pink-500 hover:bg-pink-600"
              >
                Accept
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDecline(request.id)}
                className="flex-1"
              >
                Decline
              </Button>
            </div>
          </div>
        ))}
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