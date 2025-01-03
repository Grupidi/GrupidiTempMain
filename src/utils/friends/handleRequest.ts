import { ProfileStatus, getProfileStatus } from '../profileStatus';
import { MemberProfile, FriendRequest, PotentialFollower } from '../../types/profiles';
import { addFriend } from './addFriend';
import { sendFriendRequest } from './sendRequest';

export function handleFriendRequest(
  request: FriendRequest,
  currentUser: MemberProfile,
  followedUsers: PotentialFollower[],
  friendRequests: FriendRequest[],
  memberProfiles: { [key: string]: MemberProfile },
  callbacks: {
    updateMemberProfile: (id: string, updates: Partial<MemberProfile>) => void;
    setFriendRequests: React.Dispatch<React.SetStateAction<FriendRequest[]>>;
    setFollowedUsers: React.Dispatch<React.SetStateAction<PotentialFollower[]>>;
  }
) {
  const status = getProfileStatus(currentUser, request.id, followedUsers, friendRequests);

  switch (status) {
    case 'follower':
      // They already follow Alice, directly add as friend
      addFriend(currentUser, request, memberProfiles, callbacks.updateMemberProfile);
      // Remove from followers/requests
      callbacks.setFriendRequests(prev => prev.filter(req => req.id !== request.id));
      callbacks.setFollowedUsers(prev => prev.filter(user => user.id !== request.id));
      break;

    case 'following':
    case 'none':
      // Send friend request since they don't follow Alice yet
      sendFriendRequest(request, callbacks.setFriendRequests);
      break;
  }
}