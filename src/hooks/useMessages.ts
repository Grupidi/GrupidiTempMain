import { useState } from 'react';
import { Message } from '../types/conversation';

export function useMessages() {
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});

  const getMessages = (conversationId: string): Message[] => {
    return messages[conversationId] || [];
  };

  const addMessage = (conversationId: string, message: Message) => {
    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), message]
    }));
  };

  return {
    messages,
    getMessages,
    addMessage
  };
}