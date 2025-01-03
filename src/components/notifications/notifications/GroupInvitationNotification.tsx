import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Users } from 'lucide-react';
import { GroupInvitation } from '../../../types/notifications';

interface GroupInvitationNotificationProps {
  notification: GroupInvitation;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  groupProfiles?: { [key: string]: any };
}

export function GroupInvitationNotification({ 
  notification, 
  onAccept, 
  onDecline,
  groupProfiles
}: GroupInvitationNotificationProps) {
  // Find the group profile using the groupId from the notification
  const groupProfile = groupProfiles?.[notification.content.groupId];
  
  // Get the first image from the group's images array
  const groupImage = groupProfile?.images?.[0];

  return (
    <div className="bg-emerald-50 p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          {groupImage ? (
            <AvatarImage src={groupImage} alt={notification.content.groupName} />
          ) : (
            <AvatarFallback>
              <Users className="h-6 w-6 text-emerald-500" />
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1">
          <p className="text-emerald-900">
            <span className="font-semibold">{notification.content.invitedBy}</span> has invited you to join{' '}
            <span className="font-semibold">{notification.content.groupName}</span>
          </p>
          {notification.content.status === 'pending' && (
            <div className="mt-2 flex gap-2">
              <Button 
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
                onClick={() => onAccept?.(notification.content.id)}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDecline?.(notification.content.id)}
              >
                Decline
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}