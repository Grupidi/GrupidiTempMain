import { MemberProfile, FriendRequest } from '../types/profiles';

export function addFriend(
  currentUser: MemberProfile,
  request: FriendRequest,
  memberProfiles: { [key: string]: MemberProfile }
): { [key: string]: MemberProfile } {
  const updatedProfiles = { ...memberProfiles };

  // Update current user's friends list
  updatedProfiles[currentUser.id] = {
    ...currentUser,
    friends: [...currentUser.friends, request.username]
  };

  // Create or update friend's profile
  const friendProfile = memberProfiles[request.username] || {
    id: request.username,
    name: request.name,
    username: request.username,
    birthday: "1995-01-01",
    location: request.location,
    bio: request.bio,
    profilePicture: request.profilePicture,
    profileImages: [request.profilePicture],
    interests: [],
    quirks: [],
    emeraldScore: 1000,
    friends: []
  };

  // Add current user to friend's friends list
  updatedProfiles[request.username] = {
    ...friendProfile,
    friends: [...(friendProfile.friends || []), currentUser.username]
  };

  return updatedProfiles;
}