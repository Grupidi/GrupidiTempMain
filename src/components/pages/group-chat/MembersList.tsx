import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { User, Bell } from 'lucide-react';
import { MemberProfile } from '../../../types/profiles';
import { useNotificationSettingsContext } from '../../../contexts/NotificationSettingsContext';
import { Switch } from "../../ui/switch";
import { useState } from 'react';

interface MembersListProps {
  members: string[];
  memberProfiles: { [key: string]: MemberProfile };
  onViewProfile: (username: string) => void;
}

export function MembersList({ members, memberProfiles, onViewProfile }: MembersListProps) {
  const { mutedMembers, toggleMemberMute } = useNotificationSettingsContext();
  const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>({});

  // Filter out current user
  const otherMembers = members.filter(username => username !== 'alice_adventurer');

  const handleSwitchChange = (username: string) => {
    setSwitchStates(prev => ({
      ...prev,
      [username]: !prev[username]
    }));
    toggleMemberMute(username);
  };

  return (
    <div className="space-y-4">
      {otherMembers.map((username) => {
        const member = memberProfiles[username];
        if (!member) {
          console.warn(`Member profile not found for username: ${username}`);
          return null;
        }

        const isMuted = mutedMembers.has(username);
        const isChecked = switchStates[username] || false;

        return (
          <div key={username} className="flex items-center justify-between px-4 py-2 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={member.profilePicture} alt={member.name} />
                <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-gray-500">@{member.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                {isChecked ? 'Unmuted' : 'Mute'}
              </span>
              <Switch
                checked={isChecked}
                onCheckedChange={() => handleSwitchChange(username)}
                aria-label="Toggle notifications"
              />
            </div>
          </div>
        );
      })}

      {otherMembers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No other members in this group
        </div>
      )}
    </div>
  );
}