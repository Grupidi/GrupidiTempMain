import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { User } from 'lucide-react';
import { FriendRequest } from '../../../types/notifications';

interface FriendRequestNotificationProps {
  notification: FriendRequest;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
}

export function FriendRequestNotification({ 
  notification, 
  onAccept, 
  onDecline 
}: FriendRequestNotificationProps) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={notification.content.profilePicture} />
          <AvatarFallback><User /></AvatarFallback>
        </Avatar>
        <div>
          <p className="text-blue-900">
            <span className="font-semibold">{notification.content.name}</span> sent you a friend request
          </p>
          {notification.content.status === 'pending' && (
            <div className="mt-2 flex gap-2">
              <Button 
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white"
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