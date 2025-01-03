import { ProfileStatus, ProfileStatusContext } from './types';
import { MemberProfile, PotentialFollower, FriendRequest } from '../../types/profiles';

interface StatusCallbacks {
  updateMemberProfile: (id: string, updates: Partial<MemberProfile>) => void;
  setFollowedUsers: React.Dispatch<React.SetStateAction<PotentialFollower[]>>;
  setFriendRequests: React.Dispatch<React.SetStateAction<FriendRequest[]>>;
}

export function handleStatusTransition(
  profileId: string,
  newStatus: ProfileStatus,
  context: ProfileStatusContext,
  callbacks: StatusCallbacks
): void {
  const { currentUser, memberProfiles } = context;
  if (!currentUser) return;

  switch (newStatus) {
    case 'friend':
      handleFriendTransition(profileId, context, callbacks);
      break;
    case 'following':
      handleFollowingTransition(profileId, context, callbacks);
      break;
    case 'none':
      handleNoneTransition(profileId, currentUser, memberProfiles?.[profileId], callbacks);
      break;
  }
}

function handleFriendTransition(
  profileId: string,
  context: ProfileStatusContext,
  callbacks: StatusCallbacks
) {
  const { currentUser, friendRequests } = context;
  const { updateMemberProfile, setFollowedUsers, setFriendRequests } = callbacks;

  // Find the follower's data
  const follower = friendRequests.find(request => request.id === profileId);
  if (!follower) return;

  // Create a new member profile for the follower if it doesn't exist
  const newFriendProfile: MemberProfile = {
    id: follower.id,
    name: follower.name,
    username: follower.username,
    birthday: "1995-01-01", // Default birthday
    location: follower.location,
    bio: follower.bio,
    profilePicture: follower.profilePicture,
    profileImages: [follower.profilePicture],
    interests: [],
    quirks: [],
    emeraldScore: 1000,
    friends: [currentUser.id]
  };

  // Update both profiles
  updateMemberProfile(currentUser.id, {
    friends: [...currentUser.friends, profileId]
  });
  updateMemberProfile(profileId, newFriendProfile);

  // Remove from followed users and friend requests
  setFollowedUsers(prev => prev.filter(user => user.id !== profileId));
  setFriendRequests(prev => prev.filter(request => request.id !== profileId));
}

function handleFollowingTransition(
  profileId: string,
  context: ProfileStatusContext,
  callbacks: StatusCallbacks
) {
  const { friendRequests } = context;
  const { setFollowedUsers, setFriendRequests } = callbacks;

  const userToFollow = friendRequests.find(request => request.id === profileId);
  if (userToFollow) {
    setFollowedUsers(prev => [...prev, {
      id: userToFollow.id,
      name: userToFollow.name,
      username: userToFollow.username,
      bio: userToFollow.bio,
      location: userToFollow.location,
      profilePicture: userToFollow.profilePicture
    }]);
    setFriendRequests(prev => prev.filter(request => request.id !== profileId));
  }
}

function handleNoneTransition(
  profileId: string,
  currentUser: MemberProfile,
  otherProfile: MemberProfile | undefined,
  callbacks: StatusCallbacks
) {
  const { updateMemberProfile, setFollowedUsers, setFriendRequests } = callbacks;

  // Remove from current user's friends list
  updateMemberProfile(currentUser.id, {
    friends: currentUser.friends.filter(id => id !== profileId)
  });

  // Remove from other user's friends list if they exist
  if (otherProfile) {
    updateMemberProfile(profileId, {
      friends: otherProfile.friends.filter(id => id !== currentUser.id)
    });
  }
  
  // Remove from followed users and friend requests
  setFollowedUsers(prev => prev.filter(user => user.id !== profileId));
  setFriendRequests(prev => prev.filter(request => request.id !== profileId));
}