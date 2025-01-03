import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Eye } from 'lucide-react';
import { useNotifications } from '../../../hooks/useNotifications';

interface GroupInvitationsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (page: string, memberId?: string, groupId?: string) => void;
}

export function GroupInvitations({ open, onOpenChange, onNavigate }: GroupInvitationsProps) {
  const { notifications, handleInvitationResponse } = useNotifications();

  const pendingInvitations = notifications.filter(
    notif => notif.type === 'group_invitation' && notif.content.status === 'pending'
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Group Invitations</DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {pendingInvitations.map((invitation) => (
            <div key={invitation.id} className="bg-white rounded-lg border p-4">
              <h3 className="font-medium">{invitation.content.groupName}</h3>
              <p className="text-sm text-gray-500">Invited by: {invitation.content.invitedBy}</p>
              <div className="mt-3 flex gap-2">
                <Button 
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                  onClick={() => handleInvitationResponse(invitation.content.id, true)}
                >
                  Accept
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => handleInvitationResponse(invitation.content.id, false)}
                >
                  Decline
                </Button>
                <Button 
                  variant="outline" 
                  className="ml-auto"
                  onClick={() => {
                    onNavigate('groupProfile', undefined, invitation.content.groupId);
                    onOpenChange(false);
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Group
                </Button>
              </div>
            </div>
          ))}
          {pendingInvitations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No pending invitations
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}