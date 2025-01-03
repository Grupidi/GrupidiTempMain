import { Notification } from '../types/notifications';

export function searchNotification(notification: Notification, query: string): boolean {
  const searchTerm = query.toLowerCase();

  switch (notification.type) {
    case 'group_invitation':
      return (
        notification.content.groupName.toLowerCase().includes(searchTerm) ||
        notification.content.invitedBy.toLowerCase().includes(searchTerm)
      );

    case 'friend_request':
      return (
        notification.content.name.toLowerCase().includes(searchTerm) ||
        notification.content.username.toLowerCase().includes(searchTerm)
      );

    case 'follow':
      return (
        notification.content.name.toLowerCase().includes(searchTerm) ||
        notification.content.username.toLowerCase().includes(searchTerm)
      );

    case 'calendar_event':
      return (
        notification.content.event.title.toLowerCase().includes(searchTerm) ||
        notification.content.groupName.toLowerCase().includes(searchTerm)
      );

    case 'message':
      return (
        notification.content.senderName.toLowerCase().includes(searchTerm) ||
        notification.content.messagePreview.toLowerCase().includes(searchTerm)
      );

    case 'group_chat':
      return (
        notification.content.groupName.toLowerCase().includes(searchTerm) ||
        notification.content.senderName.toLowerCase().includes(searchTerm) ||
        notification.content.messagePreview.toLowerCase().includes(searchTerm)
      );

    case 'group_update':
      return (
        notification.content.groupName.toLowerCase().includes(searchTerm) ||
        notification.content.details.toLowerCase().includes(searchTerm)
      );

    case 'friend_activity':
      return (
        notification.content.friendName.toLowerCase().includes(searchTerm) ||
        notification.content.details.toLowerCase().includes(searchTerm)
      );

    default:
      return false;
  }
}