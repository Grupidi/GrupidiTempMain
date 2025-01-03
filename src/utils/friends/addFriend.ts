import { MemberProfile, FriendRequest } from '../../types/profiles';

export function addFriend(
  currentUser: MemberProfile,
  request: FriendRequest,
  memberProfiles: { [key: string]: MemberProfile },
  updateMemberProfile: (id: string, updates: Partial<MemberProfile>) => void
) {
  // Add friend to Alice's profile
  if (!currentUser.friends.includes(request.id)) {
    // Create a new profile for the friend if it doesn't exist
    const newFriendProfile: MemberProfile = {
      id: request.id,
      name: request.name,
      username: request.username,
      birthday: "1995-01-01", // Default birthday
      location: request.location,
      bio: request.bio,
      profilePicture: request.profilePicture,
      profileImages: [request.profilePicture],
      interests: [],
      quirks: [],
      emeraldScore: 1000, // Default score
      friends: [currentUser.id] // They are now friends with Alice
    };

    // Update both profiles
    updateMemberProfile(currentUser.id, { 
      friends: [...currentUser.friends, request.id] 
    });
    updateMemberProfile(request.id, newFriendProfile);
  }
}