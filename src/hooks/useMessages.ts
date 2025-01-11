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
      
      setMessages(prev => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), newMessage]
      }));
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  const clearMessages = (conversationId: string) => {
    setMessages(prev => {
      const newMessages = { ...prev };
      delete newMessages[conversationId];
      return newMessages;
    });
  };

  return {
    messages,
    getMessages,
    addMessage,
    clearMessages
  };
}