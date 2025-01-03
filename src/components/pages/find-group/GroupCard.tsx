import { Card, CardContent } from "../../ui/card";
import { MapPin, Users, Heart, Sparkles } from 'lucide-react';

interface GroupCardProps {
  group: {
    name: string;
    location: string;
    members: string[];
    interests: string[];
    quirks: string[];
  };
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 mr-2 text-pink-500" />
              <h3 className="font-semibold text-gray-700">Location</h3>
            </div>
            <p className="text-sm text-gray-600">{group.location}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center mb-2">
              <Users className="h-5 w-5 mr-2 text-pink-500" />
              <h3 className="font-semibold text-gray-700">Members</h3>
            </div>
            <p className="text-sm text-gray-600">{group.members.length} members</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            <Heart className="h-5 w-5 mr-2 text-pink-500" />
            <h3 className="font-semibold text-gray-700">Interests & Hobbies</h3>
          </div>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {group.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            <Sparkles className="h-5 w-5 mr-2 text-pink-500" />
            <h3 className="font-semibold text-gray-700">Group Quirks</h3>
          </div>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {group.quirks.map((quirk, index) => (
              <li key={index}>{quirk}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}