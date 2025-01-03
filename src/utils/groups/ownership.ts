import { GroupProfile, MemberProfile } from '../../types/profiles';
import { normalizeUsername } from '../profile/username';

export function selectNewCreator(
  group: GroupProfile,
  currentCreator: MemberProfile,
  memberProfiles: { [key: string]: MemberProfile }
): MemberProfile | null {
  // Get all active members except current creator
  const activeMembers = group.members
    .map(memberId => {
      // Try to find member by direct ID match first
      let member = memberProfiles[memberId];
      
      // If not found by ID, try to find by normalized username
      if (!member) {
        member = Object.values(memberProfiles).find(profile => 
          normalizeUsername(profile.username) === normalizeUsername(memberId)
        );
      }
      
      return member;
    })
    .filter((member): member is MemberProfile => 
      !!member && 
      member.id !== currentCreator.id &&
      normalizeUsername(member.username) !== normalizeUsername(currentCreator.username)
    );

  if (activeMembers.length === 0) {
    return null;
  }

  // Select random member as new creator
  return activeMembers[Math.floor(Math.random() * activeMembers.length)];
}