import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { User, UserPlus, UserMinus } from 'lucide-react';
import { MemberProfile } from "../../../../types/profiles";
import { isMemberOfGroup } from "../../../../utils/groups/membership";

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

export function MembersDialog({
  isOpen,
  onClose,
  groupProfile,
  memberProfiles,
  onUpdateMembers,
  canEdit
}: MembersDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleRemoveMember = (memberId: string) => {
    if (memberId === "Alice Johnson") return; // Prevent removing Alice
    const member = memberProfiles[memberId];
    if (!member) return;
    
    const updatedMembers = groupProfile.members.filter(username => 
      username !== member.username && username !== `@${member.username}`
    );
    onUpdateMembers(updatedMembers);
  };

  const handleAddMember = (memberId: string) => {
    const member = memberProfiles[memberId];
    if (!member) return;

    if (!isMemberOfGroup(member.username, groupProfile)) {
      const updatedMembers = [...groupProfile.members, member.username];
      onUpdateMembers(updatedMembers);
    }
  };

  // Get current members by matching usernames
  const currentMembers = Object.values(memberProfiles)
    .filter(member => isMemberOfGroup(member.username, groupProfile));

  // Get available members (not already in the group)
  const availableMembers = Object.values(memberProfiles)
    .filter(member => !isMemberOfGroup(member.username, groupProfile));

  // Filter members based on search
  const filteredMembers = currentMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

          {/* Current Members */}
          <div className="space-y-4">
            {filteredMembers.map((member) => (
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

          {/* Available Members to Add */}
          {canEdit && availableMembers.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Add Members</h3>
              <div className="space-y-4">
                {availableMembers.map((member) => (
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