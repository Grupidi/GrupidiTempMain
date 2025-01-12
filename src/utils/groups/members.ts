import { MemberProfile } from '../../types/profiles';

export function getGroupMembers(
  memberIds: string[],
  memberProfiles: { [key: string]: MemberProfile }
) {
  console.log('Getting members for:', { 
    memberIds, 
    availableUsernames: Object.keys(memberProfiles)
  });

  return memberIds
    .map(memberId => {
      // Remove @ symbol if present
      const cleanId = memberId.replace('@', '');
      
      // Try different ways to find the member
      const member = memberProfiles[cleanId] || 
        Object.values(memberProfiles).find(profile => 
          profile.username === cleanId ||
          profile.id === cleanId ||
          profile.name.toLowerCase().replace(/\s+/g, '_') === cleanId
        );

      if (!member) {
        console.warn(`Member not found for ID: ${cleanId}`);
      }

      return member;
    })
    .filter((member): member is MemberProfile => member !== undefined);
}