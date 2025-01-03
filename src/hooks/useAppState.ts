import { useState, useCallback } from 'react';
import { MemberProfile, GroupProfile, PotentialFollower, FriendRequest } from '../types/profiles';
import { initialMemberProfiles } from '../data/memberProfiles';
import { initialGroupProfiles } from '../data/groupProfiles';
import { initialFollowedUsers } from '../data/followedUsers';
import { initialFriendRequests } from '../data/friendRequests';
import { calculateGroupAgeStats } from '../utils/groupAgeCalculations';

export function useAppState() {
  const [memberProfiles, setMemberProfiles] = useState<{ [key: string]: MemberProfile }>(initialMemberProfiles);
  const [groupProfiles, setGroupProfiles] = useState<{ [key: string]: GroupProfile }>(initialGroupProfiles);
  const [savedGroups, setSavedGroups] = useState<{ [key: string]: GroupProfile }>({});
  const [followedUsers, setFollowedUsers] = useState<PotentialFollower[]>(initialFollowedUsers);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(initialFriendRequests);

  const updateMemberProfile = useCallback((memberId: string, updates: Partial<MemberProfile>) => {
    setMemberProfiles(prev => ({
      ...prev,
      [memberId]: { ...prev[memberId], ...updates }
    }));
  }, []);

  const updateGroupProfile = useCallback((groupId: string, updates: Partial<GroupProfile>) => {
    setGroupProfiles(prev => {
      const updatedGroup = { ...prev[groupId], ...updates };
      
      if (updates.members) {
        const { ageRange, avgAge } = calculateGroupAgeStats(updates.members, memberProfiles);
        updatedGroup.ageRange = ageRange;
        updatedGroup.avgAge = avgAge;
      }

      // Update both groupProfiles and savedGroups atomically
      const newState = {
        ...prev,
        [groupId]: updatedGroup
      };

      // Also update savedGroups if this group exists there
      setSavedGroups(savedPrev => {
        if (savedPrev[groupId]) {
          return {
            ...savedPrev,
            [groupId]: updatedGroup
          };
        }
        return savedPrev;
      });

      return newState;
    });
  }, [memberProfiles]);

  return {
    memberProfiles,
    groupProfiles,
    savedGroups,
    followedUsers,
    friendRequests,
    updateMemberProfile,
    updateGroupProfile,
    setSavedGroups,
    setFollowedUsers,
    setFriendRequests
  };
}