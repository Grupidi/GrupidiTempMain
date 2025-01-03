import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { User } from "lucide-react";
import { MemberProfile } from "../../../types/profiles";

interface FriendsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  friends: string[];
  memberProfiles: { [key: string]: MemberProfile };
  onViewProfile: (memberId: string) => void;
}

export function FriendsDialog({
  isOpen,
  onClose,
  friends,
  memberProfiles,
  onViewProfile
}: FriendsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Friends</DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-4">
          {friends.map((friendId) => {
            const friend = memberProfiles[friendId];
            if (!friend) return null;

            return (
              <div 
                key={friendId}
                className="flex items-center gap-3 p-4 bg-white rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => {
                  onViewProfile(friendId);
                  onClose();
                }}
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={friend.profilePicture} alt={friend.name} />
                  <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{friend.name}</h3>
                  <p className="text-sm text-gray-500">@{friend.username}</p>
                </div>
              </div>
            );
          })}
          {friends.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No friends yet
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}