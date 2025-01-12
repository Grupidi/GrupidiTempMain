import { useState } from 'react';
import { GroupList } from "./groups/GroupList";
import { GroupInvitations } from "./groups/GroupInvitations";
import { NavigationBar } from "./groups/NavigationBar";
import { ActionButtons } from "./groups/ActionButtons";
import { GroupProfile } from '../../types/profiles';
import { currentGroupProfiles } from '../../data/currentGroupProfiles';
import { initialMemberProfiles } from '../../data/memberProfiles';
import { initialGroupProfiles } from '../../data/groupProfiles';
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

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

// Separate SavedGroups component
const SavedGroupsDialog = ({ 
  savedGroups, 
  onNavigate, 
  onUnsave,
  open,
  onOpenChange
}: {
  savedGroups: { [key: string]: GroupProfile };
  onNavigate: (page: string, memberId?: string, groupId?: string) => void;
  onUnsave: (groupId: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Saved Groups</h2>
        <div className="space-y-4">
          {Object.entries(savedGroups).map(([groupId, group]) => (
            <Card key={groupId}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{group.name}</h3>
                    <p className="text-sm text-gray-500">{group.bio}</p>
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        onNavigate('groupProfile', undefined, groupId);
                        onOpenChange(false);
                      }}
                    >
                      View Group
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => onUnsave(groupId)}
                    >
                      Unsave
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button 
          className="mt-4 w-full"
          onClick={() => onOpenChange(false)}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

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
      members: [currentUser.username],
      createdAt: Date.now(),
      createdBy: currentUser.username
    };

    console.log('Creating group with data:', {
      currentUser,
      username: currentUser.username,
      members: newGroup.members,
      groupData: newGroup
    });
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

      <SavedGroupsDialog 
        savedGroups={savedGroups}
        onNavigate={onNavigate}
        onUnsave={(groupId) => {
          // Implement onUnsave function
          console.log('Unsaving group:', groupId);
        }}
        open={showSaved}
        onOpenChange={setShowSaved}
      />

      <NavigationBar onNavigate={onNavigate} />
    </div>
  );
}