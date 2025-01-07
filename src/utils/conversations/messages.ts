import { Message } from '../../types/conversation';

export function createMessage(
  senderUsername: string, 
  content: string,
  media?: { type: 'image' | 'video'; url: string }[]
): Message {
  console.log('Creating message with media:', media);
  return {
    id: Date.now().toString(),
    senderId: senderUsername,
    content,
    media: media || undefined,
    timestamp: Date.now()
  };
}

export function formatMessageTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}