import { Page } from '../types/navigation';
import {
  ActivityPage,
  AuthPage,
  GroupsPage,
  NotificationsPage,
  ProfilePage,
  GroupProfilePage,
  GroupChatPage,
  FriendsPage,
  FollowersPage,
  FriendRequestsPage,
  AddFriendsPage,
  FollowingPage,
  AddFollowersPage,
  FindGroupPage,
  CreateFriendGroupPage,
  SocialCreditScorePage,
  MemberProfilePage
} from '../components/pages';
import { discoverableMemberProfiles } from '../data/discoverableMemberProfiles';
import { discoverableGroupProfiles } from '../data/discoverableGroupProfiles';
import { PageRendererProps } from '../types/pageRenderer';
import { GroupProfile } from '../types/profiles';

export function renderCurrentPage({
  currentPage,
  memberProfiles,
  groupProfiles,
  savedGroups,
  followedUsers,
  friendRequests,
  selectedMemberId,
  selectedGroupId,
  previousPage,
  onNavigate,
  onUpdateProfile,
  setFriendRequests,
  setFollowedUsers,
  setSavedGroups,
  onAddGroup,
  onUpdateGroup,
  onDeleteGroup,
}: PageRendererProps) {
  const allMemberProfiles = {
    ...memberProfiles,
    ...discoverableMemberProfiles
  };

  console.log('All member profiles:', allMemberProfiles);
  const currentUser = allMemberProfiles["alice_adventurer"];
  console.log('Current user:', currentUser);
  if (!currentUser) return null;

  switch (currentPage) {
    case 'auth':
      return <AuthPage onLoginSuccess={() => onNavigate('activity')} />;

    case 'activity':
      return <ActivityPage onNavigate={onNavigate} />;

    case 'groups':
      return (
        <GroupsPage 
          onNavigate={onNavigate} 
          groupProfiles={groupProfiles}
          savedGroups={savedGroups}
          deleteGroup={onDeleteGroup}
          leaveGroup={(groupId) => {
            const updatedGroup = { ...groupProfiles[groupId] };
            updatedGroup.members = updatedGroup.members.filter(id => id !== currentUser.id);
            onUpdateGroup(groupId, updatedGroup);
          }}
          updateGroupProfile={onUpdateGroup}
        />
      );

    case 'notifications':
      return (
        <NotificationsPage 
          onNavigate={onNavigate}
          memberProfiles={allMemberProfiles}
          followedUsers={followedUsers}
        />
      );

    case 'profile':
      return (
        <ProfilePage 
          onNavigate={onNavigate}
          profile={currentUser}
          onUpdateProfile={onUpdateProfile}
          groupProfiles={groupProfiles}
          followedUsers={followedUsers}
        />
      );

    case 'groupProfile':
      if (selectedGroupId) {
        const originalGroup = groupProfiles[selectedGroupId] || 
                            discoverableGroupProfiles[selectedGroupId];

        const group = savedGroups[selectedGroupId] ? {
          ...originalGroup,
          id: selectedGroupId,
          members: originalGroup?.members || [],
          interests: originalGroup?.interests || [],
          quirks: originalGroup?.quirks || [],
          location: originalGroup?.location || '',
          locationCoordinates: originalGroup?.locationCoordinates || null,
          images: originalGroup?.images || [],
          bio: originalGroup?.bio || '',
          name: originalGroup?.name || '',
          username: originalGroup?.username || '',
          ageRange: originalGroup?.ageRange || '',
          avgAge: originalGroup?.avgAge || 0
        } : originalGroup;

        console.log('Loading group profile:', {
          selectedGroupId,
          group,
          fromSaved: Boolean(savedGroups[selectedGroupId]),
          hasMembers: Boolean(group?.members)
        });

        if (!group) {
          console.error('Group not found:', selectedGroupId);
          return null;
        }

        return (
          <GroupProfilePage 
            groupProfile={group}
            memberProfiles={allMemberProfiles}
            isSavedGroup={Boolean(savedGroups[selectedGroupId])}
            updateGroupProfile={(updates) => {
              if (savedGroups[selectedGroupId]) {
                const updatedGroup = { ...savedGroups[selectedGroupId], ...updates };
                onUpdateGroup(selectedGroupId, updatedGroup);
              } else {
                onUpdateGroup(selectedGroupId, updates);
              }
            }}
            onNavigate={onNavigate}
          />
        );
      }
      return null;

    case 'groupChat':
      const chatGroup = groupProfiles[selectedGroupId];
      if (!chatGroup) return null;
      return (
        <GroupChatPage 
          onNavigate={onNavigate}
          groupProfile={chatGroup}
          memberProfiles={allMemberProfiles}
        />
      );

    case 'friends':
      return (
        <FriendsPage 
          onNavigate={onNavigate}
          friends={currentUser.friends}
          memberProfiles={allMemberProfiles}
          currentUser={currentUser}
          followedUsers={followedUsers}
          friendRequests={friendRequests}
          updateMemberProfile={onUpdateProfile}
          setFollowedUsers={setFollowedUsers}
          setFriendRequests={setFriendRequests}
        />
      );

    case 'followers':
      return (
        <FollowersPage 
          onNavigate={onNavigate}
          currentUser={currentUser}
          followedUsers={followedUsers}
          friendRequests={friendRequests}
          updateMemberProfile={onUpdateProfile}
          setFollowedUsers={setFollowedUsers}
          setFriendRequests={setFriendRequests}
        />
      );

    case 'friendRequests':
      return (
        <FriendRequestsPage 
          onNavigate={onNavigate}
          currentUser={currentUser}
          followedUsers={followedUsers}
          friendRequests={friendRequests}
          updateMemberProfile={onUpdateProfile}
          setFollowedUsers={setFollowedUsers}
          setFriendRequests={setFriendRequests}
        />
      );

    case 'addFriends':
      return (
        <AddFriendsPage 
          onNavigate={onNavigate}
          currentUser={currentUser}
          memberProfiles={allMemberProfiles}
          followedUsers={followedUsers}
          friendRequests={friendRequests}
          updateMemberProfile={onUpdateProfile}
          setFollowedUsers={setFollowedUsers}
          setFriendRequests={setFriendRequests}
        />
      );

    case 'following':
      return (
        <FollowingPage 
          onNavigate={onNavigate}
          currentUser={currentUser}
          followedUsers={followedUsers}
          friendRequests={friendRequests}
          updateMemberProfile={onUpdateProfile}
          setFollowedUsers={setFollowedUsers}
          setFriendRequests={setFriendRequests}
        />
      );

    case 'addFollowers':
      return (
        <AddFollowersPage 
          onNavigate={onNavigate}
          onFollow={(follower) => setFollowedUsers(prev => [...prev, follower])}
          followedUsers={followedUsers}
        />
      );

    case 'findGroup':
      return (
        <FindGroupPage 
          onNavigate={onNavigate}
          groupProfiles={groupProfiles}
          savedGroups={savedGroups}
          memberProfiles={allMemberProfiles}
          onSaveGroup={(groupId, group) => setSavedGroups(prev => ({ ...prev, [groupId]: group }))}
        />
      );

    case 'createGroup':
      return (
        <CreateFriendGroupPage 
          onNavigate={onNavigate}
          addNewGroup={onAddGroup}
        />
      );

    case 'socialCreditScore':
      return (
        <SocialCreditScorePage 
          onNavigate={onNavigate}
          score={currentUser.emeraldScore}
        />
      );

    case 'memberProfile':
      const profile = allMemberProfiles[selectedMemberId];
      if (!profile) return null;
      return (
        <MemberProfilePage 
          memberId={selectedMemberId}
          onNavigate={(page, memberId, groupId) => {
            if (page === 'back') {
              onNavigate(previousPage);
            } else {
              onNavigate(page, memberId, groupId);
            }
          }}
          profile={profile}
          groupProfiles={groupProfiles}
          memberProfiles={allMemberProfiles}
          followedUsers={followedUsers}
        />
      );

    default:
      return <ActivityPage onNavigate={onNavigate} />;
  }
}