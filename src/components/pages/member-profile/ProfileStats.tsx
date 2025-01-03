import { Card, CardContent } from "../../ui/card";
import { MapPin, UserSquare2, UsersIcon } from "lucide-react";

interface ProfileStatsProps {
  groupCount: number;
  friendCount: number;
  followingCount: number;
  onShowGroups: () => void;
  onNavigate: (page: string) => void;
}

export function ProfileStats({ 
  groupCount, 
  friendCount, 
  followingCount,
  onShowGroups,
  onNavigate 
}: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card 
        className="bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onShowGroups}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-pink-500" />
            <h2 className="font-semibold">Groups</h2>
          </div>
          <p className="text-black">{groupCount}</p>
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
          <p className="text-black">{friendCount}</p>
        </CardContent>
      </Card>

      <Card 
        className="bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => onNavigate('following')}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <UsersIcon className="h-5 w-5 text-pink-500" />
            <h2 className="font-semibold">Following</h2>
          </div>
          <p className="text-black">{followingCount}</p>
        </CardContent>
      </Card>
    </div>
  );
}