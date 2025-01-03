import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { User } from 'lucide-react';
import { MessageNotification as MessageNotificationType } from '../../../types/notifications';

interface MessageNotificationProps {
  notification: MessageNotificationType;
  onNavigate: (page: string, memberId?: string, groupId?: string) => void;
}

export function MessageNotification({ notification, onNavigate }: MessageNotificationProps) {
  return (
    <div 
      className="bg-purple-50 p-4 rounded-lg cursor-pointer"
      onClick={() => onNavigate('notifications', undefined, notification.content.conversationId)}
    >
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={notification.content.senderProfilePicture} />
          <AvatarFallback><User /></AvatarFallback>
        </Avatar>
        <div>
          <p className="text-purple-900">
            <span className="font-semibold">{notification.content.senderName}</span> sent you a message
          </p>
          <p className="text-sm text-purple-700 mt-1">{notification.content.messagePreview}</p>
        </div>
      </div>
    </div>
  );
}