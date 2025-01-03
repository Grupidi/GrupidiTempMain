import { Button } from "../ui/button";
import { LogOut } from 'lucide-react';
import { useLeaveGroup } from '../../hooks/useLeaveGroup';
import { GroupProfile, MemberProfile } from '../../types/profiles';

interface LeaveGroupButtonProps {
  userId: string;
  groupId: string;
  currentUser: MemberProfile;
  groupProfile: GroupProfile;
  memberProfiles: { [key: string]: MemberProfile };
  updateGroupProfile: (groupId: string, updates: Partial<GroupProfile>) => void;
  onSuccess?: () => void;
}

export function LeaveGroupButton({
  userId,
  groupId,
  currentUser,
  groupProfile,
  memberProfiles,
  updateGroupProfile,
  onSuccess
}: LeaveGroupButtonProps) {
  const { handleLeaveGroup, isLeaving, error } = useLeaveGroup(memberProfiles, updateGroupProfile);

  const onLeaveClick = async () => {
    if (!confirm(`Are you sure you want to leave ${groupProfile.name}?`)) {
      return;
    }

    const result = await handleLeaveGroup(
      userId,
      groupId,
      currentUser,
      groupProfile
    );

    if (result.success) {
      alert(result.message); // Show success message
      onSuccess?.();
    } else {
      alert(result.message || error || 'Failed to leave group');
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onLeaveClick}
      disabled={isLeaving}
      className="text-white bg-red-500/20 hover:bg-red-500/30"
    >
      <LogOut className="h-4 w-4 mr-2" />
      {isLeaving ? 'Leaving...' : 'Leave Group'}
    </Button>
  );
}