import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowLeft, Map, Users, Bell, User } from "lucide-react";

interface FollowRequestsPageProps {
  onNavigate: (page: string) => void;
}

interface FollowRequest {
  id: string;
  name: string;
  username: string;
  bio: string;
  location: string;
  profilePicture: string;
}

export default function FollowRequestsPage({ onNavigate }: FollowRequestsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState<FollowRequest[]>([
    {
      id: "1",
      name: "Ryan Martinez",
      username: "ryan_codes",
      bio: "Full-stack developer and open source contributor",
      location: "San Francisco, CA",
      profilePicture: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3"
    },
    {
      id: "2",
      name: "Sophie Anderson",
      username: "sophie_creates",
      bio: "UX designer and accessibility advocate",
      location: "San Francisco, CA",
      profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3"
    },
    {
      id: "3",
      name: "Alex Rivera",
      username: "alex_photo",
      bio: "Street photographer and visual storyteller",
      location: "San Francisco, CA",
      profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3"
    }
  ]);

  const handleAccept = (id: string) => {
    setRequests(current => current.filter(req => req.id !== id));
  };

  const handleDecline = (id: string) => {
    setRequests(current => current.filter(req => req.id !== id));
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-xl font-semibold">Follow Requests</h1>
            <p className="text-sm text-gray-500">
              {filteredRequests.length} {filteredRequests.length === 1 ? 'request' : 'requests'}
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white"
          />
        </div>

        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-lg border p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={request.profilePicture} alt={request.name} />
                  <AvatarFallback>{request.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{request.name}</h3>
                  <p className="text-gray-500">@{request.username}</p>
                  <p className="text-gray-600 mt-1">{request.bio}</p>
                  <p className="text-gray-400 text-sm">{request.location}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAccept(request.id)}
                  className="text-green-500 hover:text-green-600 hover:bg-green-50"
                >
                  Accept
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecline(request.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  Decline
                </Button>
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No follow requests found
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
            <span className="text-xs">Map</span>
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