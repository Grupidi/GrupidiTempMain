import { MemberProfile } from '../../types/profiles';

// Helper function to normalize username (strip @ if present)
function normalizeUsername(username: string): string {
  return username.startsWith('@') ? username.substring(1) : username;
}

export function getGroupMembers(
  memberUsernames: string[],
  memberProfiles: { [key: string]: MemberProfile }
): MemberProfile[] {
  // Get member profiles by matching either username or ID
  return memberUsernames
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
    .filter((member): member is MemberProfile => !!member);
}