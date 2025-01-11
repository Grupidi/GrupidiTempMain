import { MemberProfile } from '../../types/profiles';

export function getGroupMembers(memberIds: string[], memberProfiles: { [key: string]: MemberProfile }) {
  console.log('Getting members for:', { 
    memberIds, 
    availableUsernames: Object.keys(memberProfiles),
    memberProfiles 
  });
  
  return memberIds
    .map(id => {
      // Remove @ symbol if present
      const cleanId = id.startsWith('@') ? id.substring(1) : id;
      
      // Try direct lookup first
      let member = memberProfiles[cleanId];
      
      // If not found, try to find by name
      if (!member) {
        member = Object.values(memberProfiles).find(
          profile => 
            profile.username === cleanId || 
            profile.name === cleanId ||
            profile.id === cleanId
        );
      }
      
      if (!member) {
        console.warn(`Member not found for ID: ${cleanId}`);
        console.log('Available profiles:', Object.keys(memberProfiles));
        console.log('Looking for:', cleanId);
      } else {
        console.log('Found member:', member);
      }
      
      return member;
    })
    .filter((member): member is MemberProfile => member !== undefined);
}