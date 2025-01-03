import { MemberProfile, PotentialFollower, FriendRequest } from '../../types/profiles';

export type ProfileStatus = 'friend' | 'following' | 'follower' | 'none';

export interface ProfileStatusContext {
  currentUser: MemberProfile | null;
  followedUsers: PotentialFollower[];
  friendRequests: FriendRequest[];
  memberProfiles?: { [key: string]: MemberProfile };
}

export interface ProfileVisibility {
  addFriends: boolean;
  friendRequests: boolean;
  friends: boolean;
  followers: boolean;
  following: boolean;
  addFollowers: boolean;
}