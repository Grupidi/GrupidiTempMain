import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from "../ui/button";

interface GroupInvitationsPageProps {
  onNavigate: (page: string) => void;
}

interface GroupInvitation {
  id: string;
  name: string;
  invitedBy: string;
}

export default function GroupInvitationsPage({ onNavigate }: GroupInvitationsPageProps) {
  const [invitations, setInvitations] = useState<GroupInvitation[]>([
    { id: '1', name: 'Invited Group 1', invitedBy: 'John Doe' },
    { id: '2', name: 'Invited Group 2', invitedBy: 'Jane Smith' },
    { id: '3', name: 'Invited Group 3', invitedBy: 'Alice Johnson' },
  ]);

  const handleAccept = (id: string) => {
    setInvitations(current => current.filter(inv => inv.id !== id));
  };

  const handleDecline = (id: string) => {
    setInvitations(current => current.filter(inv => inv.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Group Invitations</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full hover:bg-gray-100"
            onClick={() => onNavigate('groups')}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4 space-y-4">
          {invitations.map((invitation) => (
            <div
              key={invitation.id}
              className="bg-white rounded-lg border p-4 space-y-2"
            >
              <div className="font-medium">{invitation.name}</div>
              <div className="text-sm text-gray-500">
                Invited by: {invitation.invitedBy}
              </div>
              <div className="flex gap-2 mt-2">
                <Button
                  className="bg-[#ff80df] hover:bg-[#ff60d0] text-white px-6"
                  onClick={() => handleAccept(invitation.id)}
                >
                  Accept
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:bg-gray-100"
                  onClick={() => handleDecline(invitation.id)}
                >
                  Decline
                </Button>
              </div>
            </div>
          ))}

          {invitations.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No pending invitations
            </div>
          )}
        </div>
      </div>
    </div>
  );
}