import { useState } from 'react';
import { GroupList } from "./groups/GroupList";
import { GroupInvitations } from "./groups/GroupInvitations";
import { SavedGroups } from "./groups/SavedGroups";
import { NavigationBar } from "./groups/NavigationBar";
import { ActionButtons } from "./groups/ActionButtons";
import { GroupProfile } from '../../types/profiles';
import { currentGroupProfiles } from '../../data/currentGroupProfiles';
import { initialMemberProfiles } from '../../data/memberProfiles';
import { initialGroupProfiles } from '../../data/groupProfiles';

interface GroupsPageProps {
  onNavigate: (page: string, memberId?: string, groupId?: string) => void;
  groupProfiles?: { [key: string]: GroupProfile };
  savedGroups: { [key: string]: GroupProfile };
  deleteGroup?: (groupId: string) => void;
  leaveGroup?: (groupId: string) => void;
  updateGroupProfile: (groupId: string, updates: Partial<GroupProfile>) => void;
  memberProfiles?: { [key: string]: any };
  currentUser: any;
}

export default function GroupsPage({ 
  onNavigate, 
  groupProfiles = initialGroupProfiles,
  savedGroups,
  deleteGroup,
  leaveGroup,
  updateGroupProfile,
  memberProfiles = initialMemberProfiles,
  currentUser
}: GroupsPageProps) {
  const [showAddButtons, setShowAddButtons] = useState(false);
  const [showInvitations, setShowInvitations] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleGroupNavigation = (groupId: string) => {
    console.log('Navigating to group:', groupId);
    onNavigate('groupProfile', undefined, groupId);
  };

  const handleCreateGroup = (groupData: GroupProfile) => {
    // Ensure we're using username for members
    const newGroup = {
      ...groupData,
      // Ensure we're using the username, not the display name
      members: [currentUser.username], // Should be 'alice_adventurer'
      createdAt: Date.now(),
      createdBy: currentUser.username
    };

    console.log('Creating group with data:', {
      currentUser,
      username: currentUser.username,
      members: newGroup.members,
      groupData: newGroup
    });

    // Update groups with the new group
    setGroups(prev => ({
      ...prev,
      [newGroup.id]: newGroup
    }));
  };

  return (
    <div className="min-h-screen bg-pink-100">
      <header className="bg-pink-500 p-4 fixed top-0 left-0 right-0 z-10">
        <h1 className="text-2xl font-bold text-center text-white">Friend Groups</h1>
      </header>

      <main className="flex-1 p-4 mt-16 mb-20">
        <div className="space-y-2">
          <GroupList 
            groups={groupProfiles}
            onNavigate={handleGroupNavigation}
            onDelete={deleteGroup}
            onLeaveGroup={leaveGroup}
            memberProfiles={memberProfiles}
            updateGroupProfile={updateGroupProfile}
          />
        </div>
      </main>

      <ActionButtons 
        showAddButtons={showAddButtons}
        setShowAddButtons={setShowAddButtons}
        setShowInvitations={setShowInvitations}
        setShowSaved={setShowSaved}
        savedGroupsCount={Object.keys(savedGroups).length}
        onNavigate={onNavigate}
      />

      <GroupInvitations 
        open={showInvitations}
        onOpenChange={setShowInvitations}
        onNavigate={onNavigate}
      />

      <SavedGroups 
        open={showSaved}
        onOpenChange={setShowSaved}
        savedGroups={savedGroups}
        onNavigate={onNavigate}
      />

      <NavigationBar onNavigate={onNavigate} />
    </div>
  );
}