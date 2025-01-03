import { GroupProfile, MemberProfile } from '../../types/profiles';
import { isMemberOfGroup } from './membership';
import { calculateGroupAgeStats } from '../groupAgeCalculations';
import { normalizeUsername } from '../profile/username';

interface LeaveGroupResult {
  success: boolean;
  message: string;
  updatedGroup?: GroupProfile;
}

export async function leaveGroup(
  userId: string,
  groupId: string,
  currentUser: MemberProfile,
  groupProfile: GroupProfile,
  memberProfiles: { [key: string]: MemberProfile },
  updateGroupProfile: (groupId: string, updates: Partial<GroupProfile>) => void
): Promise<LeaveGroupResult> {
  try {
    // Verify membership
    if (!isMemberOfGroup(currentUser, groupProfile)) {
      return {
        success: false,
        message: 'You are not currently a member of this group'
      };
    }

    // Remove user from members list - handle all possible username formats
    const updatedMembers = groupProfile.members.filter(member => 
      member !== userId &&
      member !== currentUser.username &&
      member !== `@${currentUser.username}` &&
      normalizeUsername(member) !== normalizeUsername(currentUser.username)
    );

    // Recalculate group stats
    const { ageRange, avgAge } = calculateGroupAgeStats(updatedMembers, memberProfiles);

    // Create updated group profile
    const updatedGroup = {
      ...groupProfile,
      members: updatedMembers,
      ageRange,
      avgAge
    };

    // Update the group profile immediately
    updateGroupProfile(groupId, updatedGroup);

    return {
      success: true,
      message: `You have successfully left ${groupProfile.name}`,
      updatedGroup
    };

  } catch (error) {
    console.error('Error leaving group:', error);
    return {
      success: false,
      message: 'Failed to leave group. Please try again.'
    };
  }
}