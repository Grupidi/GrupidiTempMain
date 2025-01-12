import { useState, useCallback } from 'react';
import { useAppState } from './hooks/useAppState';
import { NotificationSettingsProvider } from './contexts/NotificationSettingsContext';
import { MemberProfile } from './types/profiles';
import { Page } from './types/navigation';
import { renderCurrentPage } from './utils/pageRenderer';

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
    setGroupProfiles,
    setSavedGroups,
    setFollowedUsers,
    friendRequests,
    setFriendRequests,
    updateMemberProfile,
    updateGroupProfile
  } = useAppState();

  const handleNavigate = useCallback((page: Page, memberId?: string, groupId?: string) => {
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
  }, [currentPage]);

  const handleUpdateMemberProfile = useCallback((username: string, updates: Partial<MemberProfile>) => {
    if (!username || !updates) {
      console.error('Invalid update params:', { username, updates });
      return Promise.reject(new Error('Invalid update parameters'));
    }

    return new Promise<void>((resolve) => {
      updateMemberProfile(username, updates);
      resolve();
    });
  }, [updateMemberProfile]);

  const handleLeaveGroup = useCallback((groupId: string) => {
    const updatedGroups = { ...groupProfiles };
    const group = updatedGroups[groupId];
    if (!group) return;

    const currentUser = memberProfiles["alice_adventurer"];
    if (!currentUser) return;

    group.members = group.members.filter(member => 
      member !== currentUser.id && 
      member !== currentUser.username && 
      member !== `@${currentUser.username}`
    );

    updateGroupProfile(groupId, group);
    handleNavigate('groups');
  }, [groupProfiles, memberProfiles, updateGroupProfile]);

  return (
    <NotificationSettingsProvider>
      <div className="App">
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
          onUpdateProfile: handleUpdateMemberProfile,
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
      </div>
    </NotificationSettingsProvider>
  );
}