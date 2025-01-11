import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { ArrowLeft, Send, Camera } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { User } from 'lucide-react';
import { MediaInput } from './MediaInput';
import { useMessages } from '../../hooks/useMessages';

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string | null;
  currentUser: any;
  memberProfiles: { [key: string]: any };
}

export function ChatDialog({
  isOpen,
  onClose,
  conversationId,
  currentUser,
  memberProfiles
}: ChatDialogProps) {
  const [messageText, setMessageText] = useState('');
  const { messages, getMessages, addMessage } = useMessages();
  const [otherUser, setOtherUser] = useState<any>(null);
  const [showMediaInput, setShowMediaInput] = useState(false);

  useEffect(() => {
    if (!conversationId || !currentUser) {
      console.log('Missing data:', { conversationId, currentUser });
      return;
    }

    // Get the other username directly from the conversation ID
    const otherUsername = conversationId
      .replace(`${currentUser.username}_`, '')
      .replace(`_${currentUser.username}`, '');
    
    console.log('Finding other user:', {
      conversationId,
      currentUsername: currentUser.username,
      otherUsername,
      memberProfiles
    });

    if (otherUsername && memberProfiles[otherUsername]) {
      const otherUserProfile = memberProfiles[otherUsername];
      console.log('Found other user profile:', otherUserProfile);
      
      setOtherUser({
        name: otherUserProfile.name,
        username: otherUserProfile.username,
        profilePicture: otherUserProfile.profilePicture
      });
    }
  }, [conversationId, currentUser, memberProfiles]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !conversationId) return;

    addMessage(
      conversationId,
      messageText,
      currentUser.username
    );
    setMessageText('');
  };

  const handleSendMedia = (files: File[]) => {
    if (!conversationId) return;
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        addMessage(
          conversationId,
          '',
          currentUser.username,
          [{
            type: 'image',
            url: e.target?.result as string
          }]
        );
      };
      reader.readAsDataURL(file);
    });
    
    setShowMediaInput(false);
  };

  // Get messages for current conversation only
  const currentMessages = conversationId ? getMessages(conversationId) : [];

  const renderMessage = (message: any) => {
    const isCurrentUser = message.senderId === currentUser.username;
    const sender = memberProfiles[message.senderId];

    return (
      <div key={message.id} className={`flex gap-2 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
        <Avatar className="h-8 w-8">
          <AvatarImage src={sender?.profilePicture} />
          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
        </Avatar>
        <div className={`flex flex-col ${isCurrentUser ? 'items-end' : ''}`}>
          {message.content && (
            <div className={`rounded-2xl px-4 py-2 ${
              isCurrentUser ? 'bg-pink-500 text-white' : 'bg-gray-100'
            }`}>
              {message.content}
            </div>
          )}
          {message.media && message.media.map((media: any, index: number) => (
            <img 
              key={index}
              src={media.url}
              alt="Shared media"
              className="max-w-[200px] rounded-lg mt-1"
            />
          ))}
          <span className="text-xs text-gray-500 mt-1">
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] h-[600px] flex flex-col p-0">
        <div className="p-3 bg-pink-500 text-white flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-pink-400 h-8 w-8"
            onClick={onClose}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          {otherUser ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={otherUser.profilePicture} alt={otherUser.name} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-sm leading-tight">{otherUser.name}</h2>
                <p className="text-xs text-pink-100">@{otherUser.username}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-sm leading-tight">Loading...</h2>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentMessages.map(renderMessage)}
          {currentMessages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No messages yet. Start the conversation!
            </div>
          )}
        </div>

        {showMediaInput && (
          <div className="border-t">
            <MediaInput onFilesSelected={handleSendMedia} />
          </div>
        )}

        <form onSubmit={handleSendMessage} className="border-t p-4 flex items-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
            onClick={() => setShowMediaInput(!showMediaInput)}
          >
            <Camera className="h-5 w-5" />
          </Button>
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" className="bg-pink-500 hover:bg-pink-600">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}