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

  const currentUser = allMemberProfiles["Alice Johnson"];
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
      const group = groupProfiles[selectedGroupId] || savedGroups[selectedGroupId];
      if (!group) return null;
      return (
        <GroupProfilePage 
          onNavigate={onNavigate}
          memberProfiles={allMemberProfiles}
          groupProfile={group}
          updateGroupProfile={onUpdateGroup}
          isSavedGroup={Boolean(savedGroups[selectedGroupId])}
        />
      );

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