import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  User, Calendar, MessageSquare, Users, Activity,
  UserPlus, Heart, Bell, Settings, MapPin
} from 'lucide-react';
import { Notification } from '../../types/notifications';
import { formatRelativeTime } from '../../utils/dateUtils';
import { GroupInvitationNotification } from './notifications/GroupInvitationNotification';
import { FriendRequestNotification } from './notifications/FriendRequestNotification';
import { FollowNotification } from './notifications/FollowNotification';
import { CalendarNotification } from './notifications/CalendarNotification';
import { MessageNotification } from './notifications/MessageNotification';
import { GroupChatNotification } from './notifications/GroupChatNotification';
import { GroupUpdateNotification } from './notifications/GroupUpdateNotification';
import { FriendActivityNotification } from './notifications/FriendActivityNotification';

interface NotificationItemProps {
  notification: Notification;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  onNavigate: (page: string, memberId?: string, groupId?: string) => void;
  groupProfiles?: { [key: string]: any };
}

function getNotificationIcon(type: Notification['type']) {
  switch (type) {
    case 'group_invitation':
      return <Users className="h-4 w-4 text-emerald-500" />;
    case 'friend_request':
      return <UserPlus className="h-4 w-4 text-blue-500" />;
    case 'follow':
      return <Heart className="h-4 w-4 text-pink-500" />;
    case 'calendar_event':
      return <Calendar className="h-4 w-4 text-green-500" />;
    case 'message':
      return <MessageSquare className="h-4 w-4 text-purple-500" />;
    case 'group_chat':
      return <MessageSquare className="h-4 w-4 text-pink-500" />;
    case 'group_update':
      return <Settings className="h-4 w-4 text-orange-500" />;
    case 'friend_activity':
      return <Activity className="h-4 w-4 text-indigo-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
}

export function NotificationItem({ 
  notification, 
  onAccept, 
  onDecline,
  onNavigate,
  groupProfiles
}: NotificationItemProps) {
  const renderNotification = () => {
    switch (notification.type) {
      case 'group_invitation':
        return (
          <GroupInvitationNotification 
            notification={notification} 
            onAccept={onAccept}
            onDecline={onDecline}
            groupProfiles={groupProfiles}
          />
        );
      case 'friend_request':
        return (
          <FriendRequestNotification 
            notification={notification}
            onAccept={onAccept}
            onDecline={onDecline}
          />
        );
      case 'follow':
        return <FollowNotification notification={notification} />;
      case 'calendar_event':
        return <CalendarNotification notification={notification} />;
      case 'message':
        return <MessageNotification notification={notification} onNavigate={onNavigate} />;
      case 'group_chat':
        return <GroupChatNotification notification={notification} onNavigate={onNavigate} />;
      case 'group_update':
        return <GroupUpdateNotification notification={notification} />;
      case 'friend_activity':
        return <FriendActivityNotification notification={notification} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {getNotificationIcon(notification.type)}
          <span>{formatRelativeTime(notification.timestamp)}</span>
        </div>
        {!notification.read && (
          <div className="w-2 h-2 rounded-full bg-pink-500" />
        )}
      </div>
      {renderNotification()}
    </div>
  );
}