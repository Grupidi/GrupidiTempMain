import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Switch } from "../switch";
import { User, BellOff, Bell } from 'lucide-react';
import { MemberProfile } from '../../../types/profiles';

interface MemberCardProps {
  member: MemberProfile;
  isMuted: boolean;
  onMuteToggle: (memberId: string) => void;
}

export function MemberCard({ member, isMuted, onMuteToggle }: MemberCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={member.profilePicture} alt={member.name} />
          <AvatarFallback>
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{member.name}</h3>
          <p className="text-sm text-gray-500">@{member.username}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-gray-500 pointer-events-none">
          {isMuted ? (
            <>
              <BellOff className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-500">Muted</span>
            </>
          ) : (
            <>
              <Bell className="h-4 w-4" />
              <span className="text-sm">Unmuted</span>
            </>
          )}
        </div>
        <Switch
          checked={isMuted}
          onCheckedChange={() => onMuteToggle(member.id)}
          className="ml-2"
        />
      </div>
    </div>
  );
}