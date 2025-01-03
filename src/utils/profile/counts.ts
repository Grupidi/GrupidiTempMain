import { MemberProfile, GroupProfile } from '../../types/profiles';
import { normalizeUsername } from './username';

export function calculateCounts(
  profile: MemberProfile,
  groupProfiles: { [key: string]: GroupProfile },
  followedUsers: any[]
) {
  // Normalize username to have @ prefix for comparison
  const username = normalizeUsername(profile.username);

  // Count groups where user's normalized username is in members array
  const groupCount = Object.values(groupProfiles).filter(
    group => group.members.some(member => 
      normalizeUsername(member) === username
    )
  ).length;

  const friendsCount = profile.friends.length;
  const followingCount = followedUsers.length;

  return {
    groupCount,
    friendsCount,
    followingCount
  };
}