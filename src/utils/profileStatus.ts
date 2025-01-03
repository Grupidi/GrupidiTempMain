import { MemberProfile, PotentialFollower, FriendRequest } from '../types/profiles';

export type ProfileStatus = 'friend' | 'following' | 'follower' | 'none';

export interface ProfileVisibility {
  addFriends: boolean;
  friendRequests: boolean;
  friends: boolean;
  followers: boolean;
  following: boolean;
  addFollowers: boolean;
}

export function getProfileStatus(
  currentUser: MemberProfile | null | undefined,
  profileId: string,
  followedUsers: PotentialFollower[],
  friendRequests: FriendRequest[]
): ProfileStatus {
  // Return 'none' if no current user
  if (!currentUser) {
    return 'none';
  }

  // Check if they're friends
  if (currentUser.friends.includes(profileId)) {
    return 'friend';
  }

  // Check if current user is following them
  if (followedUsers.some(user => user.id === profileId)) {
    return 'following';
  }

  // Check if they're following the current user (a follower)
  if (friendRequests.some(request => request.id === profileId)) {
    return 'follower';
  }

  return 'none';
}

// Define valid transitions between profile statuses
const validTransitions: Record<ProfileStatus, ProfileStatus[]> = {
  'none': ['following', 'friend', 'follower'],
  'following': ['none', 'friend'],
  'follower': ['friend', 'none'],
  'friend': ['none']
};

export function validateProfileTransition(
  currentStatus: ProfileStatus,
  newStatus: ProfileStatus
): boolean {
  return validTransitions[currentStatus]?.includes(newStatus) ?? false;
}

export function getProfileVisibility(status: ProfileStatus): ProfileVisibility {
  switch (status) {
    case 'friend':
      return {
        addFriends: false,
        friendRequests: false,
        friends: true,
        followers: false,
        following: false,
        addFollowers: false
      };
    
    case 'following':
      return {
        addFriends: true,
        friendRequests: false,
        friends: false,
        followers: false,
        following: true,
        addFollowers: false
      };
    
    case 'follower':
      return {
        addFriends: true,
        friendRequests: false,
        friends: false,
        followers: true,
        following: false,
        addFollowers: true
      };
    
    case 'none':
      return {
        addFriends: true,
        friendRequests: true,
        friends: false,
        followers: false,
        following: false,
        addFollowers: true
      };
  }
}