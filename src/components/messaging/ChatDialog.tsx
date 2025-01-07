import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowLeft, User } from 'lucide-react';
import { Message } from '../../types/conversation';
import { MemberProfile } from '../../types/profiles';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from '../ui/chat/ChatInput';
import { processImageFile } from '../../utils/images/processing';
import { createMessage } from '../../utils/conversations/messages';

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: MemberProfile;
  otherUser: MemberProfile | null;
  conversationId: string;
  messages: Message[];
  onSendMessage: (content: string, files?: File[], media?: { type: string; url: string }[]) => void;
}

export function ChatDialog({
  isOpen,
  onClose,
  currentUser,
  otherUser,
  conversationId,
  messages,
  onSendMessage
}: ChatDialogProps) {
  const [messageText, setMessageText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (files?: File[]) => {
    if (messageText.trim() || files?.length) {
      try {
        const mediaPromises = files?.map(async (file) => {
          const url = await processImageFile(file);
          return {
            type: file.type.startsWith('video/') ? 'video' : 'image',
            url
          };
        }) || [];

        const media = await Promise.all(mediaPromises);
        
        const message = createMessage(currentUser.id, messageText, media);
        console.log('Created message:', message);
        
        onSendMessage(message.content, files, message.media);
        setMessageText('');
        setError(null);
      } catch (error) {
        console.error('Error sending message:', error);
        setError('Failed to send message. Please try again.');
      }
    }
  };

  if (!otherUser) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p className="text-gray-500">Unable to load conversation. Please try again later.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage src={otherUser.profilePicture} alt={otherUser.name} />
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle>{otherUser.name}</DialogTitle>
              <p className="text-sm text-gray-500">@{otherUser.username}</p>
            </div>
          </div>
        </DialogHeader>

        {error && (
          <div className="p-2 bg-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isSelf={message.senderId === currentUser.id}
              sender={message.senderId === currentUser.id ? currentUser : otherUser}
            />
          ))}
        </div>

        <ChatInput
          value={messageText}
          onChange={setMessageText}
          onSend={handleSend}
          placeholder="Type a message..."
        />
      </DialogContent>
    </Dialog>
  );
}