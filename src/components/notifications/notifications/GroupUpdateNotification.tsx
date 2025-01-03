import { GroupUpdateNotification as GroupUpdateNotificationType } from '../../../types/notifications';

interface GroupUpdateNotificationProps {
  notification: GroupUpdateNotificationType;
}

export function GroupUpdateNotification({ notification }: GroupUpdateNotificationProps) {
  return (
    <div className="bg-pink-50 p-4 rounded-lg">
      <p className="text-pink-900">
        <span className="font-semibold">{notification.content.groupName}</span>:{' '}
        {notification.content.details}
      </p>
    </div>
  );
}