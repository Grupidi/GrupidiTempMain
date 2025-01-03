import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Gift, Camera, Mic, BarChart2, Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onGifClick: () => void;
  onCameraClick: () => void;
  onVoiceClick: () => void;
  onPollClick: () => void;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  onGifClick,
  onCameraClick,
  onVoiceClick,
  onPollClick
}: ChatInputProps) {
  return (
    <footer className="bg-gray-200 p-4 w-full flex-shrink-0">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between mb-4">
          <Button variant="ghost" size="icon" className="text-teal-500" onClick={onGifClick}>
            <Gift className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-blue-500" onClick={onCameraClick}>
            <Camera className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-green-500" onClick={onVoiceClick}>
            <Mic className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-purple-500" onClick={onPollClick}>
            <BarChart2 className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex items-center bg-white rounded-full">
          <Input
            type="text"
            placeholder="Chat.."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSend();
              }
            }}
            className="flex-1 border-none focus:ring-0 rounded-l-full"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onSend} 
            className="text-pink-500 rounded-r-full"
          >
            <Send className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </footer>
  );
}