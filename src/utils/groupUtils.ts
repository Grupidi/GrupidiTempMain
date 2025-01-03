import { GroupProfile } from '../types/profiles';

export function getGroupById(groups: { [key: string]: GroupProfile }, id: string): GroupProfile | undefined {
  return groups[id] || Object.values(groups).find(group => group.id === id);
}

export function getGroupUsername(group: GroupProfile): string {
  return group.username.startsWith('@') ? group.username : `@${group.username}`;
}