import { MemberProfile, PotentialFollower, FriendRequest, GroupProfile } from '../types/profiles';

interface ProfileActionsProps {
  memberProfiles: { [key: string]: MemberProfile };
  updateMemberProfile: (memberId: string, updates: Partial<MemberProfile>) => void;
  setFollowedUsers: React.Dispatch<React.SetStateAction<PotentialFollower[]>>;
  setFriendRequests: React.Dispatch<React.SetStateAction<FriendRequest[]>>;
  setSavedGroups: React.Dispatch<React.SetStateAction<{ [key: string]: GroupProfile }>>;
}

export function useProfileActions({
  memberProfiles,
  updateMemberProfile,
  setFollowedUsers,
  setFriendRequests,
  setSavedGroups
}: ProfileActionsProps) {
  const handleAddFriend = (request: FriendRequest) => {
    // Add friend to Alice's profile
    const aliceProfile = memberProfiles["Alice Johnson"];
    if (!aliceProfile.friends.includes(request.name)) {
      // Create a new profile for the friend if it doesn't exist
      const newFriendProfile: MemberProfile = {
        id: request.name,
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
        friends: ["Alice Johnson"] // They are now friends with Alice
      };

      // Update Alice's friends list
      const updatedAliceFriends = [...aliceProfile.friends, request.name];
      
      // Update both profiles
      updateMemberProfile("Alice Johnson", { friends: updatedAliceFriends });
      updateMemberProfile(request.name, newFriendProfile);
    }

    // Remove from friend requests list
    setFriendRequests(prev => prev.filter(req => req.id !== request.id));
  };

  const handleUnfriend = (friendId: string) => {
    const aliceProfile = memberProfiles["Alice Johnson"];
    const updatedFriends = aliceProfile.friends.filter(friend => friend !== friendId);
    updateMemberProfile("Alice Johnson", { friends: updatedFriends });

    // Also remove Alice from the friend's friends list if they exist
    if (memberProfiles[friendId]) {
      const friendProfile = memberProfiles[friendId];
      const updatedFriendFriends = friendProfile.friends.filter(friend => friend !== "Alice Johnson");
      updateMemberProfile(friendId, { friends: updatedFriendFriends });
    }
  };

  const handleFollow = (follower: PotentialFollower) => {
    setFollowedUsers(prev => {
      if (!prev.some(user => user.id === follower.id)) {
        return [...prev, follower];
      }
      return prev;
    });
  };

  const handleUnfollow = (userId: string) => {
    setFollowedUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handleSaveGroup = (groupId: string, group: GroupProfile) => {
    setSavedGroups(prev => ({
      ...prev,
      [groupId]: group
    }));
  };

  const handleUpdateProfile = (updates: Partial<MemberProfile>) => {
    updateMemberProfile("Alice Johnson", updates);
  };

  return {
    handleAddFriend,
    handleUnfriend,
    handleFollow,
    handleUnfollow,
    handleSaveGroup,
    handleUpdateProfile
  };
}