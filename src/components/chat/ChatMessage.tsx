import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { User } from 'lucide-react';

interface ChatMessageProps {
  message: {
    content?: string;
    timestamp: number;
    media?: { type: 'image'; url: string; }[];
  };
  isCurrentUser: boolean;
  sender: any;
}

export function ChatMessage({ message, isCurrentUser, sender }: ChatMessageProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex gap-2 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage src={sender?.profilePicture} />
        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : ''}`}>
        {message.content && (
          <div
            className={`rounded-2xl px-4 py-2 max-w-[80%] ${
              isCurrentUser 
                ? 'bg-pink-500 text-white' 
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            {message.content}
          </div>
        )}
        
        {message.media && message.media.map((media, index) => (
          <div key={index} className="mt-1 rounded-lg overflow-hidden">
            <img 
              src={media.url} 
              alt="Media" 
              className="max-w-[200px] max-h-[200px] object-cover"
            />
          </div>
        ))}
        
        <span className="text-xs text-gray-500 mt-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
} 