import { Card, CardContent } from "../../ui/card";
import { MapPin, Heart, Sparkles, Users } from "lucide-react";
import { GroupProfile } from "../../../types/profiles";

interface ProfileContentProps {
  bio: string;
  location: string;
  interests: string[];
  quirks: string[];
  memberGroups: GroupProfile[];
  onViewGroup: (groupId: string) => void;
  friendCount: number;
  followingCount: number;
}

export function ProfileContent({ 
  bio, 
  location, 
  interests, 
  quirks,
  memberGroups,
  onViewGroup,
  friendCount,
  followingCount
}: ProfileContentProps) {
  return (
    <div className="space-y-4">
      <div className="bg-pink-50 rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-2">About Me</h2>
        <p className="text-black">{bio}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-pink-500" />
              <h2 className="font-semibold">Location</h2>
            </div>
            <p className="text-black mt-2">{location}</p>
          </CardContent>
        </Card>

        <Card 
          className="bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => memberGroups.length > 0 && onViewGroup(memberGroups[0].id)}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-pink-500" />
              <h2 className="font-semibold">Groups</h2>
            </div>
            <p className="text-black mt-2">{memberGroups.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              <h2 className="font-semibold">Friends</h2>
            </div>
            <p className="text-black mt-2">{friendCount}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              <h2 className="font-semibold">Following</h2>
            </div>
            <p className="text-black mt-2">{followingCount}</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Heart className="h-5 w-5 text-pink-500" />
          <h2 className="font-semibold">Interests & Hobbies</h2>
        </div>
        <ul className="list-disc list-inside">
          {interests.map((interest, index) => (
            <li key={index} className="text-black">{interest}</li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-pink-500" />
          <h2 className="font-semibold">Personal Quirks</h2>
        </div>
        <ul className="list-disc list-inside">
          {quirks.map((quirk, index) => (
            <li key={index} className="text-black">{quirk}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}