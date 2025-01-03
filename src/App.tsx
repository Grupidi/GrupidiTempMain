import { useState } from 'react';
import { Page } from './types/navigation';
import { renderCurrentPage } from './utils/pageRenderer';
import { useAppState } from './hooks/useAppState';
import { NotificationSettingsProvider } from './contexts/NotificationSettingsContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('auth');
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [previousPage, setPreviousPage] = useState<Page>('groups');

  const {
    memberProfiles,
    groupProfiles,
    savedGroups,
    followedUsers,
    friendRequests,
    updateMemberProfile,
    updateGroupProfile,
    setSavedGroups,
    setFollowedUsers,
    setFriendRequests
  } = useAppState();

  const handleNavigate = (page: Page, memberId?: string, groupId?: string) => {
    if (page === 'memberProfile') {
      setPreviousPage(currentPage);
    }
    if (memberId) {
      setSelectedMemberId(memberId);
    }
    if (groupId) {
      setSelectedGroupId(groupId);
    }
    setCurrentPage(page);
  };

  const handleLeaveGroup = (groupId: string) => {
    // Update the group profiles state
    const updatedGroups = { ...groupProfiles };
    const group = updatedGroups[groupId];
    if (!group) return;

    const currentUser = memberProfiles["Alice Johnson"];
    if (!currentUser) return;

    // Remove the current user from the group's members
    group.members = group.members.filter(member => 
      member !== currentUser.id && 
      member !== currentUser.username && 
      member !== `@${currentUser.username}`
    );

    // Update the group profile
    updateGroupProfile(groupId, group);
    handleNavigate('groups');
  };

  return (
    <NotificationSettingsProvider>
      {renderCurrentPage({
        currentPage,
        memberProfiles,
        groupProfiles,
        savedGroups,
        followedUsers,
        friendRequests,
        selectedMemberId,
        selectedGroupId,
        previousPage,
        onNavigate: handleNavigate,
        onUpdateProfile: updateMemberProfile,
        setFriendRequests,
        setFollowedUsers,
        setSavedGroups,
        onAddGroup: (group) => updateGroupProfile(group.id, group),
        onUpdateGroup: updateGroupProfile,
        onLeaveGroup: handleLeaveGroup,
        onDeleteGroup: (groupId) => {
          const updatedGroups = { ...groupProfiles };
          delete updatedGroups[groupId];
          updateGroupProfile(groupId, updatedGroups[groupId]);
        }
      })}
    </NotificationSettingsProvider>
  );
}