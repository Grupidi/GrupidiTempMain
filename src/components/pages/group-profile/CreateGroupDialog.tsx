import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { GroupProfile } from '../../../types/profiles';

interface CreateGroupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (group: GroupProfile) => void;
  currentUser: {
    username: string;
    id: string;
  };
}

export function CreateGroupDialog({
  isOpen,
  onClose,
  onCreateGroup,
  currentUser
}: CreateGroupDialogProps) {
  const [groupData, setGroupData] = useState<Partial<GroupProfile>>({
    name: '',
    description: '',
    location: '',
    interests: [],
    quirks: [],
    members: []  // Initialize empty
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser?.username) {
      console.error('No current user found');
      return;
    }

    // Generate a simple ID from the name
    const groupId = groupData.name?.toLowerCase().replace(/\s+/g, '_') || '';

    // Create new group with current user as member
    const newGroup = {
      ...groupData,
      id: groupId,
      username: `@${groupId}`,
      // Use username (alice_adventurer) not full name
      members: [currentUser.username], // This should be 'alice_adventurer'
      ageRange: "25-35",
      avgAge: 29,
      images: [],
      createdBy: currentUser.username,
      createdAt: Date.now()
    } as GroupProfile;

    // Log the data to verify
    console.log('Creating group with data:', {
      currentUser,
      username: currentUser.username,
      members: newGroup.members,
      groupData: newGroup
    });

    onCreateGroup(newGroup);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Friend Group</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Group Name"
              value={groupData.name || ''}
              onChange={(e) => setGroupData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Description"
              value={groupData.description || ''}
              onChange={(e) => setGroupData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>
          <div>
            <Input
              placeholder="Location"
              value={groupData.location || ''}
              onChange={(e) => setGroupData(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Group</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 