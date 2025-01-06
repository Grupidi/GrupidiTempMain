import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Eye } from 'lucide-react';

interface SavedGroupsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  savedGroups: { [key: string]: any };
  onNavigate: (groupId: string) => void;
}

export function SavedGroups({ 
  open, 
  onOpenChange, 
  savedGroups,
  onNavigate 
}: SavedGroupsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Saved Groups</DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {Object.entries(savedGroups).map(([groupId, group]) => (
            <div key={groupId} className="bg-white rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">{group.name.slice(0, 2)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{group.name}</h3>
                  <p className="text-gray-500">{group.username}</p>
                  <p className="text-sm text-gray-500">Members: {group.members?.length || 0}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button 
                  variant="outline" 
                  className="ml-auto"
                  onClick={() => {
                    onNavigate('groupProfile', undefined, groupId);
                    onOpenChange(false);
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Group
                </Button>
              </div>
            </div>
          ))}
          {Object.keys(savedGroups).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No saved groups
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}