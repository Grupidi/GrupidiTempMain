import { MemberProfile } from '../types/profiles';

// Helper function to normalize username (strip @ if present)
function normalizeUsername(username: string | undefined): string {
  if (!username) return '';
  return username.startsWith('@') ? username.substring(1) : username;
}

export function calculateGroupAgeStats(
  memberUsernames: string[], 
  memberProfiles: { [key: string]: MemberProfile }
): { ageRange: string; avgAge: number } {
  // Get ages of members by matching normalized usernames
  const ages = memberUsernames
    .filter(username => !!username) // Filter out undefined/null usernames
    .map(username => {
      // Find member profile by normalized username or direct ID match
      const member = Object.values(memberProfiles).find(profile => 
        profile.id === username || 
        normalizeUsername(profile.username) === normalizeUsername(username)
      );
      
      if (!member?.birthday) return null;

      const birthDate = new Date(member.birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    })
    .filter((age): age is number => age !== null);

  if (ages.length === 0) {
    return { ageRange: "N/A", avgAge: 0 };
  }

  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);
  const avgAge = Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length);

  return {
    ageRange: `${minAge}-${maxAge}`,
    avgAge
  };
}