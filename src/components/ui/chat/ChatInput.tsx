import { useState, useRef } from 'react';
import { Button } from "../button";
import { Input } from "../input";
import { Send } from 'lucide-react';
import { MediaInput } from '../../messages/MediaInput';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (files?: File[]) => void;
  placeholder?: string;
}

export function ChatInput({ value, onChange, onSend, placeholder = "Type a message..." }: ChatInputProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    console.log('Files selected:', files); // Debug log
    setSelectedFiles(files);
  };

  const handleSend = () => {
    onSend(selectedFiles);
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-4 border-t space-y-2">
      <MediaInput onFilesSelected={files => setSelectedFiles(files)} />
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button 
          onClick={handleSend}
          disabled={!value.trim() && selectedFiles.length === 0}
          className="bg-pink-500 hover:bg-pink-600"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}