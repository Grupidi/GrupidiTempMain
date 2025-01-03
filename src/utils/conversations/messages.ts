import { Message } from '../../types/conversation';

export function createMessage(senderUsername: string, content: string): Message {
  return {
    id: Date.now().toString(),
    senderId: senderUsername,
    content,
    timestamp: Date.now()
  };
}

export function formatMessageTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}