import { useState } from 'react';
import { Message } from '../types/conversation';

export function useConversations() {
  const [conversations, setConversations] = useState<{
    [key: string]: {
      id: string;
      participants: string[];
      lastMessage: Message | null;
      unreadCount: number;
    };
  }>({});

  const startConversation = (currentUser: any, otherUser: any) => {
    const conversationId = [currentUser.id, otherUser.id].sort().join('_');
    
    if (!conversations[conversationId]) {
      setConversations(prev => ({
        ...prev,
        [conversationId]: {
          id: conversationId,
          participants: [currentUser.id, otherUser.id],
          lastMessage: null,
          unreadCount: 0
        }
      }));
    }
    
    return conversationId;
  };

  const sendMessage = (conversationId: string, senderId: string, content: string) => {
    const message = {
      id: Date.now().toString(),
      senderId,
      content,
      timestamp: Date.now()
    };

    setConversations(prev => ({
      ...prev,
      [conversationId]: {
        ...prev[conversationId],
        lastMessage: message,
        unreadCount: prev[conversationId].unreadCount + 1
      }
    }));

    return message;
  };

  const markAsRead = (conversationId: string) => {
    setConversations(prev => ({
      ...prev,
      [conversationId]: {
        ...prev[conversationId],
        unreadCount: 0
      }
    }));
  };

  return {
    conversations,
    startConversation,
    sendMessage,
    markAsRead
  };
}