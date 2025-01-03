import { useState, useCallback } from 'react';
import { GroupProfile, MemberProfile } from '../types/profiles';
import { leaveGroup } from '../utils/groups/leaveGroup';
import { isMemberOfGroup } from '../utils/groups/membership';

export function useGroupMembership(
  updateGroupProfile: (groupId: string, updates: Partial<GroupProfile>) => void,
  onLeaveSuccess?: () => void
) {
  const handleLeaveGroup = useCallback(async (
    userId: string,
    groupId: string,
    currentUser: MemberProfile,
    groupProfile: GroupProfile,
    memberProfiles: { [key: string]: MemberProfile }
  ) => {
    try {
      const result = await leaveGroup(
        userId,
        groupId,
        currentUser,
        groupProfile,
        memberProfiles,
        updateGroupProfile
      );

      if (result.success && result.updatedGroup) {
        // Immediately update the group profile
        updateGroupProfile(groupId, result.updatedGroup);

        // Force immediate UI update by clearing caches
        window.localStorage.removeItem(`group_${groupId}_members`);
        window.localStorage.removeItem(`group_${groupId}_chat`);
        window.localStorage.removeItem(`group_${groupId}_status`);

        // Navigate away from group profile
        onLeaveSuccess?.();
      }

      return result;

    } catch (error) {
      console.error('Error leaving group:', error);
      return {
        success: false,
        message: 'Failed to leave group. Please try again.'
      };
    }
  }, [updateGroupProfile, onLeaveSuccess]);

  return {
    handleLeaveGroup
  };
}