import { MemberProfile } from '../../types/profiles';

export function getProfileById(profiles: { [key: string]: MemberProfile }, id: string): MemberProfile | undefined {
  return profiles[id];
}

export function getProfileUsername(profile: MemberProfile): string {
  return `@${profile.username}`;
}