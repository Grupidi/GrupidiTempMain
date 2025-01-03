import { useState } from 'react';
import { leaveGroup } from '../utils/groups/leaveGroup';
import { GroupProfile, MemberProfile } from '../types/profiles';

export function useLeaveGroup(
  memberProfiles: { [key: string]: MemberProfile },
  updateGroupProfile: (groupId: string, updates: Partial<GroupProfile>) => void
) {
  const [isLeaving, setIsLeaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLeaveGroup = async (
    userId: string,
    groupId: string,
    currentUser: MemberProfile,
    groupProfile: GroupProfile
  ) => {
    setIsLeaving(true);
    setError(null);

    try {
      const result = await leaveGroup(
        userId,
        groupId,
        currentUser,
        groupProfile,
        memberProfiles,
        updateGroupProfile
      );

      // Clear any cached group chat data if needed
      if (result.success) {
        // You could add additional cleanup here if needed
        localStorage.removeItem(`groupChat_${groupId}`);
      }

      return result;

    } catch (err) {
      const message = 'Failed to leave group. Please try again.';
      setError(message);
      return { success: false, message };

    } finally {
      setIsLeaving(false);
    }
  };

  return {
    handleLeaveGroup,
    isLeaving,
    error,
    clearError: () => setError(null)
  };
}