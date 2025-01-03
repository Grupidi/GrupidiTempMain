import { ProfileStatus, ProfileStatusContext } from './types';

export function getProfileStatus(
  context: ProfileStatusContext,
  profileId: string
): ProfileStatus {
  const { currentUser, followedUsers, friendRequests } = context;

  // Return 'none' if no current user or friends array is missing
  if (!currentUser?.friends) {
    return 'none';
  }

  // Check if they're friends
  if (currentUser.friends.includes(profileId)) {
    return 'friend';
  }

  // Check if current user is following them
  if (followedUsers?.some(user => user.id === profileId)) {
    return 'following';
  }

  // Check if they're following the current user (a follower)
  if (friendRequests?.some(request => request.id === profileId)) {
    return 'follower';
  }

  return 'none';
}