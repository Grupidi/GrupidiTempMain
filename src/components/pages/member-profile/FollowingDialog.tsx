import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { User } from "lucide-react";
import { PotentialFollower } from "../../../types/profiles";

interface FollowingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  followedUsers: PotentialFollower[];
  onViewProfile: (userId: string) => void;
}

export function FollowingDialog({
  isOpen,
  onClose,
  followedUsers,
  onViewProfile
}: FollowingDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Following</DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-4">
          {followedUsers.map((user) => (
            <div 
              key={user.id}
              className="flex items-center gap-3 p-4 bg-white rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => {
                onViewProfile(user.id);
                onClose();
              }}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.profilePicture} alt={user.name} />
                <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>
          ))}
          {followedUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Not following anyone yet
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}