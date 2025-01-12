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
  messages: any[];
  lastMessage: any | null;
  unreadCount: number;
  createdAt: number;
}