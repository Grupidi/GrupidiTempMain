import { useState, useCallback, useEffect } from 'react';
import { MemberProfile, GroupProfile, PotentialFollower, FriendRequest } from '../types/profiles';
import { initialMemberProfiles } from '../data/memberProfiles';
import { initialGroupProfiles } from '../data/groupProfiles';
import { initialFollowedUsers } from '../data/followedUsers';
import { initialFriendRequests } from '../data/friendRequests';
import { calculateGroupAgeStats } from '../utils/groupAgeCalculations';

export function useAppState() {
  const [memberProfiles, setMemberProfiles] = useState<{ [key: string]: MemberProfile }>(
    initialMemberProfiles
  );
  const [groupProfiles, setGroupProfiles] = useState<{ [key: string]: GroupProfile }>(initialGroupProfiles);
  const [savedGroups, setSavedGroups] = useState<{ [key: string]: GroupProfile }>({});
  const [followedUsers, setFollowedUsers] = useState<PotentialFollower[]>(initialFollowedUsers);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(initialFriendRequests);

  useEffect(() => {
    console.log('Initial member profiles:', memberProfiles);
  }, []);

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

  // Update group age stats whenever member profiles change
  useEffect(() => {
    if (!memberProfiles) return;
    
    // Add a debounce to prevent rapid updates
    const timeoutId = setTimeout(() => {
      console.log('Member profiles changed, updating group ages');
      updateGroupAges();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [memberProfiles]);

  // Add a function to manually trigger age updates
  const updateGroupAges = useCallback(() => {
    setGroupProfiles(prevGroups => {
      const updatedGroups = { ...prevGroups };
      
      Object.keys(updatedGroups).forEach(groupId => {
        const group = updatedGroups[groupId];
        const ageStats = calculateGroupAgeStats(group.members, memberProfiles);
        
        updatedGroups[groupId] = {
          ...group,
          ageRange: ageStats.ageRange,
          avgAge: ageStats.avgAge
        };
      });
      
      return updatedGroups;
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
    updateGroupAges,
    setSavedGroups,
    setFollowedUsers,
    setFriendRequests
  };
}