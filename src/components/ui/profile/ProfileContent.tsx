import { Card, CardContent } from "../card";
import { Button } from "../button";
import { MapPin, Users, UserSquare2, Heart, Sparkles } from 'lucide-react';
import { InterestInput } from "../InterestInput";
import { interestSuggestions } from "../../../data/interestSuggestions";

interface ProfileContentProps {
  profile: any;
  state: any;
  counts: {
    groupCount: number;
    friendsCount: number;
    followingCount: number;
  };
  onNavigate: (page: string) => void;
}

export function ProfileContent({ profile, state, counts, onNavigate }: ProfileContentProps) {
  return (
    <div className="p-4 space-y-6 pb-20">
      <div 
        className="bg-pink-50 rounded-lg p-4 cursor-pointer hover:bg-pink-100 transition-colors"
        onClick={() => state.setIsEditingBio(true)}
      >
        <h2 className="font-semibold text-lg mb-2">About Me</h2>
        <p className="text-black">{profile.bio}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card 
          className="bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => state.setIsEditingLocation(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-pink-500" />
              <h2 className="font-semibold">Location</h2>
            </div>
            <p className="text-black">{profile.location}</p>
          </CardContent>
        </Card>

        <Card 
          className="bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => onNavigate('groups')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-pink-500" />
              <h2 className="font-semibold">Groups</h2>
            </div>
            <p className="text-black">{counts.groupCount}</p>
          </CardContent>
        </Card>

        <Card 
          className="bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => onNavigate('friends')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <UserSquare2 className="h-5 w-5 text-pink-500" />
              <h2 className="font-semibold">Friends</h2>
            </div>
            <p className="text-black">{counts.friendsCount}</p>
          </CardContent>
        </Card>

        <Card 
          className="bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => onNavigate('following')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-pink-500" />
              <h2 className="font-semibold">Following</h2>
            </div>
            <p className="text-black">{counts.followingCount}</p>
          </CardContent>
        </Card>
      </div>

      <div 
        className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => state.setIsEditingInterests(true)}
      >
        <div className="flex items-center gap-2 mb-2">
          <Heart className="h-5 w-5 text-pink-500" />
          <h2 className="font-semibold">Interests & Hobbies</h2>
        </div>
        <ul className="list-disc list-inside">
          {profile.interests.map((interest: string, index: number) => (
            <li key={index} className="text-black">{interest}</li>
          ))}
        </ul>
      </div>

      <div 
        className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => state.setIsEditingQuirks(true)}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-pink-500" />
          <h2 className="font-semibold">Personal Quirks</h2>
        </div>
        <ul className="list-disc list-inside">
          {profile.quirks.map((quirk: string, index: number) => (
            <li key={index} className="text-black">{quirk}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}