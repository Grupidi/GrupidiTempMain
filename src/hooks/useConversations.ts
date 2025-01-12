import { useState } from 'react';
import { Conversation } from '../types/conversation';

export function useConversations() {
  const [conversations, setConversations] = useState<{ [key: string]: Conversation }>({});

  const createConversation = (newConversation: Conversation) => {
    // Check if conversation already exists
    if (conversations[newConversation.id]) {
      console.log('Conversation already exists:', newConversation.id);
      return;
    }

    setConversations(prev => ({
      ...prev,
      [newConversation.id]: {
        ...newConversation,
        messages: [],
        lastMessage: null,
        unreadCount: 0,
        createdAt: Date.now()
      }
    }));
  };

  return {
    conversations,
    createConversation
  };
}