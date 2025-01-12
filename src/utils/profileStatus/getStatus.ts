import { ProfileStatus, ProfileStatusContext } from './types';

export function getProfileStatus(
  context: ProfileStatusContext,
  profileId: string
): ProfileStatus {
  const { currentUser, followedUsers, friendRequests, requestedProfiles } = context;

  // Detailed debug logs
  console.log('---Status Check---');
  console.log(`Checking profile: ${profileId}`);
  console.log('Friend Requests:', JSON.stringify(friendRequests, null, 2));
  console.log('Followed Users:', JSON.stringify(followedUsers, null, 2));
  
  // Check pending status
  const pendingRequest = friendRequests.find(req => {
    console.log(`Comparing request username ${req.username} with profile username ${profileId}`);
    console.log(`Request status: ${req.status}`);
    return req.username === profileId && req.status === 'pending';
  });

  if (pendingRequest) {
    console.log('Found pending request:', pendingRequest);
    return 'pending';
  }

  // Check following status
  const isFollowing = followedUsers.some(user => {
    console.log(`Comparing followed user username ${user.username} with profile username ${profileId}`);
    return user.username === profileId;
  });

  if (isFollowing) {
    console.log('Found following relationship');
    return 'following';
  }

  // Check if they're already friends
  if (currentUser.friends.includes(profileId)) {
    return 'friend';
  }

  // Check if we've sent them a request
  if (requestedProfiles?.has(profileId)) {
    return 'requested';
  }

  // Check if they're just following us
  const isFollower = friendRequests.some(req => 
    req.id === profileId && !req.status
  );
  if (isFollower) {
    return 'follower';
  }

  // No relationship
  return 'none';
}