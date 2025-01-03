import { useState, useCallback } from 'react';
import { MemberProfile, PotentialFollower, FriendRequest } from '../types/profiles';
import { ProfileStatus } from '../utils/profileStatus/types';
import { getProfileStatus } from '../utils/profileStatus/getStatus';
import { validateProfileTransition } from '../utils/profileStatus/transitions';
import { handleStatusTransition } from '../utils/profileStatus/handlers';

export function useProfileStatus(
  currentUser: MemberProfile | null,
  followedUsers: PotentialFollower[],
  friendRequests: FriendRequest[],
  updateMemberProfile: (id: string, updates: Partial<MemberProfile>) => void,
  setFollowedUsers: React.Dispatch<React.SetStateAction<PotentialFollower[]>>,
  setFriendRequests: React.Dispatch<React.SetStateAction<FriendRequest[]>>
) {
  const [error, setError] = useState<string | null>(null);

  const updateStatus = useCallback((profileId: string, newStatus: ProfileStatus) => {
    if (!currentUser) {
      setError('No current user');
      return;
    }

    const context = { currentUser, followedUsers, friendRequests };
    const currentStatus = getProfileStatus(context, profileId);

    if (!validateProfileTransition(currentStatus, newStatus)) {
      setError(`Invalid transition from ${currentStatus} to ${newStatus}`);
      return;
    }

    handleStatusTransition(profileId, newStatus, context, {
      updateMemberProfile,
      setFollowedUsers,
      setFriendRequests
    });

    // Force a re-render by updating the current user's friends list
    if (newStatus === 'none' && currentStatus === 'friend') {
      const updatedFriends = currentUser.friends.filter(id => id !== profileId);
      updateMemberProfile(currentUser.id, { friends: updatedFriends });
    }

    setError(null);
  }, [currentUser, followedUsers, friendRequests, updateMemberProfile, setFollowedUsers, setFriendRequests]);

  return {
    updateStatus,
    error
  };
}