import { useState, useCallback } from 'react';
import { GroupProfile } from '../types/profiles';
import { initialGroupProfiles } from '../data/groupProfiles';

export function useGroupManagement() {
  const [groupProfiles, setGroupProfiles] = useState<{ [key: string]: GroupProfile }>(initialGroupProfiles);

  const addGroup = useCallback((newGroup: GroupProfile) => {
    setGroupProfiles(prevGroups => ({
      ...prevGroups,
      [newGroup.id]: newGroup
    }));
  }, []);

  const updateGroup = useCallback((groupId: string, updates: Partial<GroupProfile>) => {
    setGroupProfiles(prevGroups => ({
      ...prevGroups,
      [groupId]: { ...prevGroups[groupId], ...updates }
    }));
  }, []);

  const deleteGroup = useCallback((groupId: string) => {
    setGroupProfiles(prevGroups => {
      const updatedGroups = { ...prevGroups };
      delete updatedGroups[groupId];
      return updatedGroups;
    });
  }, []);

  return {
    groupProfiles,
    addGroup,
    updateGroup,
    deleteGroup
  };
}