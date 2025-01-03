import { FriendActivityNotification as FriendActivityNotificationType } from '../../../types/notifications';

interface FriendActivityNotificationProps {
  notification: FriendActivityNotificationType;
}

export function FriendActivityNotification({ notification }: FriendActivityNotificationProps) {
  return (
    <div className="bg-indigo-50 p-4 rounded-lg">
      <p className="text-indigo-900">
        <span className="font-semibold">{notification.content.friendName}</span>{' '}
        {notification.content.activityType === 'joined_group' && 'joined '}
        {notification.content.activityType === 'created_event' && 'created an event in '}
        {notification.content.activityType === 'location_shared' && 'shared a location in '}
        {notification.content.details}
      </p>
    </div>
  );
}