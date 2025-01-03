import { ProfileStatus, ProfileVisibility } from './types';

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