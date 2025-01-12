import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { User, UserPlus, UserMinus } from 'lucide-react';
import { MemberProfile } from "../../../../types/profiles";

interface MembersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  groupProfile: {
    id: string;
    name: string;
    members: string[];
  };
  memberProfiles: { [key: string]: MemberProfile };
  onUpdateMembers: (members: string[]) => void;
  canEdit: boolean;
}

// Helper functions at the top
function normalizeUsername(username: string): string {
  if (!username) return '';
  return username.replace(/^@/, '').toLowerCase();
}

export function MembersDialog({
  isOpen,
  onClose,
  groupProfile,
  memberProfiles,
  onUpdateMembers,
  canEdit
}: MembersDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Debug logging
  console.log('MembersDialog data:', {
    groupProfile,
    memberProfiles,
    members: groupProfile.members,
    normalizedMembers: groupProfile.members.map(m => normalizeUsername(m))
  });

  // Add null check for members
  const validMembers = groupProfile?.members ? 
    groupProfile.members
      .map(memberId => {
        const normalizedId = normalizeUsername(memberId);
        let member = memberProfiles[normalizedId] ||
          Object.values(memberProfiles).find(profile => 
            normalizeUsername(profile.username) === normalizedId ||
            normalizeUsername(profile.id) === normalizedId ||
            normalizeUsername(profile.name) === normalizedId
          );

        if (!member) {
          console.warn(`Member not found for ID: ${memberId}`);
        }
        return member;
      })
      .filter((member): member is MemberProfile => member !== undefined)
    : [];

  // Fix: Properly filter current members
  const currentMembers = Object.values(memberProfiles)
    .filter(member => 
      groupProfile.members.some(m => {
        const normalizedMember = normalizeUsername(m);
        const isMatch = 
          normalizedMember === normalizeUsername(member.username) ||
          normalizedMember === normalizeUsername(member.id) ||
          normalizedMember === normalizeUsername(member.name);
        
        if (isMatch) {
          console.log('Matched member:', { 
            memberName: member.name, 
            username: member.username,
            normalizedMember,
            groupMember: m 
          });
        }
        return isMatch;
      })
    );

  // Fix: Properly filter available members
  const availableMembers = Object.values(memberProfiles)
    .filter(member => 
      !groupProfile.members.some(m => 
        normalizeUsername(m) === normalizeUsername(member.username) ||
        normalizeUsername(m) === normalizeUsername(member.id) ||
        normalizeUsername(m) === normalizeUsername(member.name)
      )
    );

  // Filter based on search query
  const filteredCurrentMembers = currentMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAvailableMembers = availableMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fix: Properly handle member removal
  const handleRemoveMember = (memberId: string) => {
    const member = memberProfiles[memberId];
    if (!member) return;
    
    // Use username for consistency
    const updatedMembers = groupProfile.members.filter(m => 
      normalizeUsername(m) !== member.username
    );
    onUpdateMembers(updatedMembers);
  };

  // Fix: Properly handle member addition
  const handleAddMember = (memberId: string) => {
    const member = memberProfiles[memberId];
    if (!member) return;

    // Use username for consistency
    if (!groupProfile.members.some(m => normalizeUsername(m) === member.username)) {
      const updatedMembers = [...groupProfile.members, member.username];
      onUpdateMembers(updatedMembers);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {canEdit ? 'Manage Members' : 'Group Members'}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-6">
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />

          {/* Current Members Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Current Members</h3>
            {filteredCurrentMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.profilePicture} alt={member.name} />
                    <AvatarFallback>
                      <User className="h-6 w-6 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-lg">{member.name}</p>
                    <p className="text-gray-500">@{member.username}</p>
                  </div>
                </div>
                
                {canEdit && member.name !== "Alice Johnson" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <UserMinus className="h-5 w-5 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Available Members Section */}
          {canEdit && filteredAvailableMembers.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Add Members</h3>
              <div className="space-y-4">
                {filteredAvailableMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.profilePicture} alt={member.name} />
                        <AvatarFallback>
                          <User className="h-6 w-6 text-gray-400" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-lg">{member.name}</p>
                        <p className="text-gray-500">@{member.username}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddMember(member.id)}
                      className="text-green-500 hover:text-green-600 hover:bg-green-50"
                    >
                      <UserPlus className="h-5 w-5 mr-2" />
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}