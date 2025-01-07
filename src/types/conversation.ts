export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: number;
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message | null;
  unreadCount: number;
}