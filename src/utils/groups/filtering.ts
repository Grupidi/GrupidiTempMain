import { GroupProfile } from '../../types/profiles';

export function filterAvailableGroups(
  discoverableGroups: { [key: string]: GroupProfile },
  savedGroups: { [key: string]: GroupProfile }
): { [key: string]: GroupProfile } {
  return Object.fromEntries(
    Object.entries(discoverableGroups).filter(([id]) => !savedGroups[id])
  );
}

export function filterGroupsBySearch(
  groups: { [key: string]: GroupProfile },
  searchQuery: string
): { [key: string]: GroupProfile } {
  if (!searchQuery.trim()) return groups;

  const query = searchQuery.toLowerCase();
  return Object.fromEntries(
    Object.entries(groups).filter(([_, group]) =>
      group.name.toLowerCase().includes(query) ||
      group.description.toLowerCase().includes(query) ||
      group.location.toLowerCase().includes(query) ||
      group.interests.some(interest => interest.toLowerCase().includes(query)) ||
      group.quirks.some(quirk => quirk.toLowerCase().includes(query))
    )
  );
}