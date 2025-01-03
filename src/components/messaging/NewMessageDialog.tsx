import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Search, User } from 'lucide-react';
import { MemberProfile } from '../../types/profiles';

interface NewMessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStartConversation: (recipient: MemberProfile) => void;
  currentUser: MemberProfile | null;
  memberProfiles: { [key: string]: MemberProfile };
  followedUsers: any[];
}

export function NewMessageDialog({
  isOpen,
  onClose,
  onStartConversation,
  currentUser,
  memberProfiles,
  followedUsers
}: NewMessageDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [availableUsers, setAvailableUsers] = useState<MemberProfile[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    // Combine friends and followed users
    const friends = (currentUser.friends || []).map(friendId => memberProfiles[friendId]).filter(Boolean);
    const followed = (followedUsers || []).map(user => ({
      ...user,
      id: user.name,
      friends: []
    }));

    // Remove duplicates and current user
    const uniqueUsers = [...friends, ...followed].filter((user, index, self) =>
      user && 
      user.id !== currentUser.id && 
      index === self.findIndex(u => u.id === user.id)
    );

    setAvailableUsers(uniqueUsers);
  }, [currentUser, memberProfiles, followedUsers]);

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (user: MemberProfile) => {
    onStartConversation(user);
    onClose();
  };

  if (!currentUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredUsers.map((user) => (
              <Button
                key={user.id}
                variant="ghost"
                className="w-full justify-start p-2 hover:bg-gray-100"
                onClick={() => handleUserSelect(user)}
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={user.profilePicture} alt={user.name} />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500">@{user.username}</div>
                </div>
              </Button>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No users found
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}