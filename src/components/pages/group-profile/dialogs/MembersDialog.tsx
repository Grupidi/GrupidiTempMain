import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { User, UserPlus, UserMinus } from 'lucide-react';
import { MemberProfile } from '../../../../types/profiles';

interface MembersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  members: MemberProfile[];
  memberProfiles: { [key: string]: MemberProfile };
  onAddMember?: (username: string) => void;
  onRemoveMember?: (username: string) => void;
  canEdit?: boolean;
}

export function MembersDialog({
  isOpen,
  onClose,
  members,
  memberProfiles,
  onAddMember,
  onRemoveMember,
  canEdit = false
}: MembersDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Ensure members and memberProfiles are defined before filtering
  const filteredMembers = members?.filter(member => {
    const profile = memberProfiles[member.username];
    return profile && (
      profile.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }) || [];

  // Filter available profiles for adding new members
  const availableProfiles = Object.values(memberProfiles || {}).filter(profile => {
    // Ensure profile and username exist before using toLowerCase
    if (!profile?.username) return false;
    
    const isAlreadyMember = members?.some(member => 
      member.username?.toLowerCase() === profile.username?.toLowerCase()
    );
    
    return !isAlreadyMember && (
      profile.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Members</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />

        <div className="space-y-4">
          {/* Current Members */}
          {filteredMembers.map(member => {
            const profile = memberProfiles[member.username];
            if (!profile) return null;

            return (
              <div key={profile.username} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={profile.avatarUrl} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{profile.name}</div>
                    <div className="text-sm text-gray-500">@{profile.username}</div>
                  </div>
                </div>
                {canEdit && onRemoveMember && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveMember(profile.username)}
                  >
                    <UserMinus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            );
          })}

          {/* Available Profiles to Add */}
          {canEdit && onAddMember && (
            <>
              <div className="border-t my-4" />
              <div className="text-sm text-gray-500 mb-2">Add Members</div>
              {availableProfiles.map(profile => (
                <div key={profile.username} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={profile.avatarUrl} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{profile.name}</div>
                      <div className="text-sm text-gray-500">@{profile.username}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onAddMember(profile.username)}
                  >
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}