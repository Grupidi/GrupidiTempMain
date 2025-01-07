import { useState } from 'react';
import { Message } from '../types/conversation';
import { createMessage } from '../utils/conversations/messages';

export function useMessages() {
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});

  const getMessages = (conversationId: string): Message[] => {
    return messages[conversationId] || [];
  };

  const addMessage = (
    conversationId: string, 
    content: string,
    senderId: string,
    media?: { type: 'image' | 'video'; url: string }[]
  ) => {
    try {
      const newMessage = createMessage(senderId, content, media);
      console.log('Adding new message with media:', newMessage);

      setMessages(prev => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), newMessage]
      }));
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  return {
    messages,
    getMessages,
    addMessage
  };
}