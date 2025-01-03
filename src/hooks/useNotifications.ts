import { useState } from 'react';
import { Notification } from '../types/notifications';

// Example notifications to showcase functionality
const initialNotifications: Notification[] = [
  // Group Invitations - removed Hiking Enthusiasts and Book Club since user is already a member
  {
    id: '3',
    type: 'friend_request',
    content: {
      id: 'fr_1',
      name: 'Ryan Martinez',
      username: 'ryan_codes',
      profilePicture: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3',
      status: 'pending'
    },
    read: false,
    timestamp: Date.now() - 1000 * 60 * 20 // 20 minutes ago
  },
  // ... rest of the notifications remain unchanged
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const sendGroupInvitation = (groupId: string, groupName: string, memberId: string) => {
    const invitation: Notification = {
      id: `notif_${Date.now()}`,
      type: 'group_invitation',
      content: {
        id: `inv_${Date.now()}`,
        groupId,
        groupName,
        invitedBy: 'Alice Johnson',
        status: 'pending'
      },
      read: false,
      timestamp: Date.now()
    };

    addNotification(invitation);
    alert(`Invitation sent to join ${groupName}`);
  };

  const handleInvitationResponse = (invitationId: string, accept: boolean) => {
    setNotifications(prev => 
      prev.map(notif => {
        if (notif.type === 'group_invitation' && notif.content.id === invitationId) {
          return {
            ...notif,
            content: {
              ...notif.content,
              status: accept ? 'accepted' : 'declined'
            }
          };
        }
        return notif;
      })
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({
        ...notif,
        read: true
      }))
    );
  };

  return {
    notifications,
    sendGroupInvitation,
    handleInvitationResponse,
    markAllAsRead
  };
}