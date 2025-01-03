import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { User } from 'lucide-react';
import { MemberProfile } from '../../../types/profiles';
import { MemberCard } from '../../ui/members/MemberCard';
import { useNotificationSettingsContext } from '../../../contexts/NotificationSettingsContext';

interface MembersListProps {
  members: string[];
  memberProfiles: { [key: string]: MemberProfile };
}

export function MembersList({ members, memberProfiles }: MembersListProps) {
  const { mutedMembers, toggleMemberMute } = useNotificationSettingsContext();

  // Filter out Alice Johnson from the members list
  const otherMembers = members.filter(memberId => 
    memberProfiles[memberId]?.name !== "Alice Johnson"
  );

  return (
    <div className="space-y-4 p-4">
      {otherMembers.map((memberId) => {
        const member = memberProfiles[memberId];
        if (!member) return null;
        
        return (
          <MemberCard
            key={memberId}
            member={member}
            isMuted={mutedMembers.has(memberId)}
            onMuteToggle={toggleMemberMute}
          />
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