import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from 'lucide-react';
import { Message } from '../../types/conversation';
import { MemberProfile } from '../../types/profiles';

interface MessageBubbleProps {
  message: Message;
  isSelf: boolean;
  sender: MemberProfile;
}

export function MessageBubble({ message, isSelf, sender }: MessageBubbleProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex gap-2 ${isSelf ? 'flex-row-reverse' : ''}`}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage src={sender.profilePicture} alt={sender.name} />
        <AvatarFallback>
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className={`max-w-[70%] ${isSelf ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-2 ${
            isSelf 
              ? 'bg-pink-500 text-white' 
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          {message.content}
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}