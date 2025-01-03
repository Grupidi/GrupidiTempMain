import { CalendarNotification as CalendarNotificationType } from '../../../types/notifications';

interface CalendarNotificationProps {
  notification: CalendarNotificationType;
}

export function CalendarNotification({ notification }: CalendarNotificationProps) {
  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <p className="text-green-900">
        {notification.content.action === 'created' && 'New event: '}
        {notification.content.action === 'updated' && 'Event updated: '}
        {notification.content.action === 'reminder' && 'Upcoming event: '}
        <span className="font-semibold">{notification.content.event.title}</span>
        {' in '}
        <span className="font-semibold">{notification.content.groupName}</span>
      </p>
      <p className="text-sm text-green-700 mt-1">
        {new Date(notification.content.event.startDate).toLocaleDateString()}{' '}
        at {notification.content.event.startTime}
      </p>
    </div>
  );
}