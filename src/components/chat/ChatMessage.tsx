import { useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    media?: {
      type: 'image' | 'video';
      url: string;
    }[];
    timestamp: string;
    senderId: string;
  };
  isCurrentUser: boolean;
}

export function ChatMessage({ message, isCurrentUser }: ChatMessageProps) {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const renderMedia = (media: { type: 'image' | 'video'; url: string }) => {
    if (media.type === 'image') {
      return (
        <img 
          src={media.url} 
          alt="Message attachment"
          className="w-32 h-32 object-cover rounded-lg cursor-pointer"
          onClick={() => setSelectedMedia(media.url)}
        />
      );
    }
    return (
      <video 
        src={media.url}
        className="w-32 h-32 object-cover rounded-lg cursor-pointer"
        onClick={() => setSelectedMedia(media.url)}
      />
    );
  };

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isCurrentUser ? 'bg-pink-500 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
        {message.text && <p className="mb-2">{message.text}</p>}
        {message.media && (
          <div className="flex flex-wrap gap-2">
            {message.media.map((media, index) => (
              <div key={index}>
                {renderMedia(media)}
              </div>
            ))}
          </div>
        )}
        <span className="text-xs opacity-70">{message.timestamp}</span>
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
    </div>
  );
} 