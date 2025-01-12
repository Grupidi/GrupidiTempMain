import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowLeft, Map, Users, Bell, User } from "lucide-react";
import { validateUsername, ProfileValidationError } from '../../utils/validation/profileValidation';

interface AddFollowersPageProps {
  onNavigate: (page: string) => void;
  onFollow: (follower: PotentialFollower) => void;
  followedUsers: PotentialFollower[];
}

export interface PotentialFollower {
  username: string;
  name: string;
  bio: string;
  location: string;
  profilePicture: string;
}

export default function AddFollowersPage({ onNavigate, onFollow, followedUsers }: AddFollowersPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const initialPotentialFollowers: PotentialFollower[] = [
    {
      username: "emma_creates",
      name: "Emma Wilson",
      bio: "Digital artist and creative director",
      location: "San Francisco, CA",
      profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3"
    },
    {
      username: "james_tech",
      name: "James Anderson",
      bio: "Software architect and open source contributor",
      location: "San Francisco, CA",
      profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3"
    },
    {
      username: "sophia_designs",
      name: "Sophia Lee",
      bio: "UI/UX Designer | Creating delightful experiences",
      location: "San Francisco, CA",
      profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3"
    }
  ];

  // Filter out users that are already being followed
  const availableFollowers = initialPotentialFollowers.filter(
    follower => !followedUsers.some(followed => followed.username === follower.username)
  );

  const filteredFollowers = availableFollowers.filter(
    (follower) =>
      follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      follower.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      follower.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      follower.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFollow = (profile: PotentialFollower) => {
    try {
      const validUsername = validateUsername(profile.username);
      
      // Check if username is unique among followed users
      if (followedUsers.some(user => user.username === validUsername)) {
        throw new ProfileValidationError('Already following this user');
      }
      
      onFollow({
        ...profile,
        username: validUsername
      });
    } catch (error) {
      if (error instanceof ProfileValidationError) {
        console.error(`Cannot follow user: ${error.message}`);
        // Could show error in UI
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => onNavigate('following')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">Add Followers</h1>
            <p className="text-sm text-gray-500">
              {filteredFollowers.length} suggestions
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white"
          />
        </div>

        <div className="space-y-4">
          {filteredFollowers.map((follower) => (
            <div
              key={follower.username}
              className="bg-white rounded-lg border p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={follower.profilePicture} alt={follower.name} />
                  <AvatarFallback>{follower.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{follower.name}</h3>
                  <p className="text-gray-500">@{follower.username}</p>
                  <p className="text-gray-600 mt-1">{follower.bio}</p>
                  <p className="text-gray-400 text-sm">{follower.location}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFollow(follower)}
                  className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                  disabled={followedUsers.some(u => u.username === follower.username)}
                >
                  Follow
                </Button>
              </div>
            </div>
          ))}

          {filteredFollowers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No suggestions found
            </div>
          )}
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