import { MemberProfile } from '../types/profiles';

export function calculateGroupAgeStats(
  memberIds: string[], 
  memberProfiles: { [key: string]: MemberProfile }
): { ageRange: string; avgAge: number } {
  console.log('Calculating age stats for members:', memberIds);
  console.log('Available member profiles:', memberProfiles);

  const ages = memberIds
    .map(memberId => {
      // Try finding member by username without @ symbol
      const cleanMemberId = memberId.replace('@', '');
      
      // Find member by checking both ID and username
      const member = Object.values(memberProfiles).find(profile => 
        profile.id === cleanMemberId ||
        profile.username === cleanMemberId ||
        profile.username === `@${cleanMemberId}`
      );

      if (!member) {
        console.log(`Member not found for ID: ${memberId}`);
        return null;
      }

      console.log(`Found member:`, member);
      
      if (!member.birthday) {
        console.log(`No birthday for member: ${memberId}`);
        return null;
      }

      const today = new Date();
      const birthDate = new Date(member.birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      console.log(`Calculated age for ${member.name}:`, age);
      return age;
    })
    .filter((age): age is number => age !== null && !isNaN(age));

  console.log('Final ages array:', ages);

  if (ages.length === 0) {
    return { ageRange: "N/A", avgAge: 0 };
  }

  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);
  const avgAge = Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length);

  const result = {
    ageRange: `${minAge}-${maxAge}`,
    avgAge
  };

  console.log('Final age stats:', result);
  return result;
}