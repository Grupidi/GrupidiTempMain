import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Users } from "lucide-react";
import { GroupProfile } from "../../../types/profiles";

interface GroupsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  groups: GroupProfile[];
  onViewGroup: (groupId: string) => void;
}

export function GroupsDialog({ isOpen, onClose, groups, onViewGroup }: GroupsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Member Groups</DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-4">
          {groups.map((group) => (
            <div 
              key={group.id} 
              className="bg-white rounded-lg border p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-medium">{group.name}</h3>
                  <p className="text-sm text-gray-500">{group.username}</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  onViewGroup(group.id);
                  onClose();
                }}
                className="w-full mt-2"
              >
                View Group
              </Button>
            </div>
          ))}
          {groups.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Not a member of any groups
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}