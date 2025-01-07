import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from 'lucide-react';
import { Message } from '../../types/conversation';
import { MemberProfile } from '../../types/profiles';
import { Dialog, DialogContent } from "../ui/dialog";

interface MessageBubbleProps {
  message: Message;
  isSelf: boolean;
  sender: MemberProfile;
}

export function MessageBubble({ message, isSelf, sender }: MessageBubbleProps) {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  console.log('MessageBubble rendering with:', { message, isSelf, sender });

  return (
    <>
      <div className={`flex gap-2 ${isSelf ? 'flex-row-reverse' : ''}`}>
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={sender.profilePicture} alt={sender.name} />
          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
        </Avatar>
        <div className={`max-w-[70%] ${isSelf ? 'items-end' : 'items-start'}`}>
          <div
            className={`rounded-2xl ${
              message.media?.length 
                ? 'overflow-hidden p-0 bg-transparent' 
                : `${isSelf ? 'bg-pink-500 text-white' : 'bg-gray-100'} px-4 py-2`
            }`}
          >
            {message.content && (
              <div className={message.media?.length ? 'px-4 py-2 bg-pink-500 text-white rounded-t-2xl' : ''}>
                {message.content}
              </div>
            )}
            
            {message.media && message.media.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {message.media.map((media, index) => (
                  <div 
                    key={index}
                    className="cursor-pointer"
                    onClick={() => setSelectedMedia(media.url)}
                  >
                    {media.type === 'image' ? (
                      <img 
                        src={media.url}
                        alt={`Message attachment ${index + 1}`}
                        className="max-w-[200px] max-h-[200px] rounded-lg"
                      />
                    ) : (
                      <video
                        src={media.url}
                        className="max-w-[200px] max-h-[200px] rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <span className="text-xs text-gray-500 mt-1">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>

      {/* Media Preview Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="sm:max-w-[800px] p-0">
          <div className="relative">
            {selectedMedia?.endsWith('.mp4') ? (
              <video 
                src={selectedMedia} 
                controls 
                className="w-full h-auto"
              />
            ) : (
              <img 
                src={selectedMedia || ''} 
                alt="Media preview"
                className="w-full h-auto"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}