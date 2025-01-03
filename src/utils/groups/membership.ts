import { GroupProfile, MemberProfile } from '../../types/profiles';
import { normalizeUsername } from '../profile/username';

export function isMemberOfGroup(user: MemberProfile | null | undefined, group: GroupProfile): boolean {
  if (!user || !group || !group.members) return false;

  const normalizedUsername = normalizeUsername(user.username);
  
  return group.members.some(member => {
    const normalizedMember = normalizeUsername(member);
    return (
      member === user.id || 
      normalizedMember === normalizedUsername ||
      member === user.username ||
      member === `@${user.username}`
    );
  });
}

export function getMemberGroups(
  memberId: string,
  groupProfiles: { [key: string]: GroupProfile },
  memberProfiles: { [key: string]: MemberProfile }
): GroupProfile[] {
  const member = memberProfiles[memberId];
  if (!member) return [];

  return Object.values(groupProfiles).filter(group => 
    isMemberOfGroup(member, group)
  );
}