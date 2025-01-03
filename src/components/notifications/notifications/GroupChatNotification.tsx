import { GroupChatNotification as GroupChatNotificationType } from '../../../types/notifications';

interface GroupChatNotificationProps {
  notification: GroupChatNotificationType;
  onNavigate: (page: string, memberId?: string, groupId?: string) => void;
}

export function GroupChatNotification({ notification, onNavigate }: GroupChatNotificationProps) {
  return (
    <div 
      className="bg-pink-50 p-4 rounded-lg cursor-pointer"
      onClick={() => onNavigate('groupChat', undefined, notification.content.groupId)}
    >
      <p className="text-pink-900">
        <span className="font-semibold">{notification.content.senderName}</span> sent a message in{' '}
        <span className="font-semibold">{notification.content.groupName}</span>
      </p>
      <p className="text-sm text-pink-700 mt-1">{notification.content.messagePreview}</p>
    </div>
  );
}