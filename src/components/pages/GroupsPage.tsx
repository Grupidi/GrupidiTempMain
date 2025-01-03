import { useState } from 'react';
import { GroupList } from "./groups/GroupList";
import { GroupInvitations } from "./groups/GroupInvitations";
import { SavedGroups } from "./groups/SavedGroups";
import { NavigationBar } from "./groups/NavigationBar";
import { ActionButtons } from "./groups/ActionButtons";
import { GroupProfile } from '../../types/profiles';
import { currentGroupProfiles } from '../../data/currentGroupProfiles';
import { initialMemberProfiles } from '../../data/memberProfiles';

interface GroupsPageProps {
  onNavigate: (page: string, memberId?: string, groupId?: string) => void;
  groupProfiles?: { [key: string]: GroupProfile };
  savedGroups: { [key: string]: GroupProfile };
  deleteGroup?: (groupId: string) => void;
  leaveGroup?: (groupId: string) => void;
  updateGroupProfile: (groupId: string, updates: Partial<GroupProfile>) => void;
  memberProfiles?: { [key: string]: any };
}

export default function GroupsPage({ 
  onNavigate, 
  groupProfiles = currentGroupProfiles,
  savedGroups,
  deleteGroup,
  leaveGroup,
  updateGroupProfile,
  memberProfiles = initialMemberProfiles
}: GroupsPageProps) {
  const [showAddButtons, setShowAddButtons] = useState(false);
  const [showInvitations, setShowInvitations] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleGroupNavigation = (groupId: string) => {
    onNavigate('groupProfile', undefined, groupId);
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