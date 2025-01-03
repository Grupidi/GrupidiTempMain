import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { User } from 'lucide-react';
import { FollowNotification as FollowNotificationType } from '../../../types/notifications';

interface FollowNotificationProps {
  notification: FollowNotificationType;
}

export function FollowNotification({ notification }: FollowNotificationProps) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={notification.content.profilePicture} />
          <AvatarFallback><User /></AvatarFallback>
        </Avatar>
        <div>
          <p className="text-blue-900">
            <span className="font-semibold">{notification.content.name}</span> started following you
          </p>
          <p className="text-sm text-blue-700">@{notification.content.username}</p>
        </div>
      </div>
    </div>
  );
}