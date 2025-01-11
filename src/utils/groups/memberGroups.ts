import { GroupProfile, MemberProfile } from '../../types/profiles';
import { discoverableGroupProfiles } from '../../data/discoverableGroupProfiles';

export function getMemberGroups(
  memberProfile: MemberProfile,
  groupProfiles: { [key: string]: GroupProfile }
) {
  // Combine both regular and discoverable group profiles
  const allGroupProfiles = {
    ...groupProfiles,
    ...discoverableGroupProfiles
  };

  // Debug logging
  console.log('Looking for groups for member:', memberProfile.username);
  console.log('Available groups:', Object.keys(allGroupProfiles));
  console.log('Checking against members:', 
    Object.values(allGroupProfiles).map(g => ({
      groupName: g.name,
      members: g.members
    }))
  );

  // Get all groups where this member is listed
  return Object.values(allGroupProfiles)
    .filter(group => {
      // Check if member's username is in the group's members array
      const isMember = group.members.some(memberId => {
        const cleanMemberId = memberId.replace('@', '');
        const isMatch = cleanMemberId === memberProfile.username;
        if (isMatch) {
          console.log(`Found match: ${memberProfile.username} is member of ${group.name}`);
        }
        return isMatch;
      });
      return isMember;
    });
} 