import { CalendarEvent } from './calendar';

export type NotificationType = 
  | 'group_invitation'
  | 'friend_request'
  | 'follow'
  | 'calendar_event'
  | 'message'
  | 'group_chat'
  | 'group_update'
  | 'friend_activity';

export interface BaseNotification {
  id: string;
  type: NotificationType;
  read: boolean;
  timestamp: number;
}

export interface GroupInvitation extends BaseNotification {
  type: 'group_invitation';
  content: {
    id: string;
    groupId: string;
    groupName: string;
    invitedBy: string;
    status: 'pending' | 'accepted' | 'declined';
  };
}

export interface FriendRequest extends BaseNotification {
  type: 'friend_request';
  content: {
    id: string;
    name: string;
    username: string;
    profilePicture: string;
    status: 'pending' | 'accepted' | 'declined';
  };
}

export interface FollowNotification extends BaseNotification {
  type: 'follow';
  content: {
    id: string;
    name: string;
    username: string;
    profilePicture: string;
  };
}

export interface CalendarNotification extends BaseNotification {
  type: 'calendar_event';
  content: {
    event: CalendarEvent;
    action: 'created' | 'updated' | 'reminder';
    groupName: string;
  };
}

export interface MessageNotification extends BaseNotification {
  type: 'message';
  content: {
    senderId: string;
    senderName: string;
    senderProfilePicture: string;
    messagePreview: string;
    conversationId: string;
  };
}

export interface GroupChatNotification extends BaseNotification {
  type: 'group_chat';
  content: {
    groupId: string;
    groupName: string;
    senderId: string;
    senderName: string;
    messagePreview: string;
  };
}

export interface GroupUpdateNotification extends BaseNotification {
  type: 'group_update';
  content: {
    groupId: string;
    groupName: string;
    updateType: 'member_joined' | 'member_left' | 'settings_changed' | 'event_created';
    details: string;
  };
}

export interface FriendActivityNotification extends BaseNotification {
  type: 'friend_activity';
  content: {
    friendId: string;
    friendName: string;
    activityType: 'joined_group' | 'created_event' | 'location_shared';
    details: string;
  };
}

export type Notification =
  | GroupInvitation
  | FriendRequest
  | FollowNotification
  | CalendarNotification
  | MessageNotification
  | GroupChatNotification
  | GroupUpdateNotification
  | FriendActivityNotification;