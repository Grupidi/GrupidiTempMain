import { useRef, useState } from 'react';
import { Button } from "../ui/button";
import { X } from 'lucide-react';

interface MediaInputProps {
  onFilesSelected: (files: File[]) => void;
}

export function MediaInput({ onFilesSelected }: MediaInputProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
    onFilesSelected(files);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />
      
      <div className="flex flex-wrap gap-2">
        {selectedFiles.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 hover:bg-red-600 text-white p-1"
              onClick={() => handleRemoveFile(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {selectedFiles.length === 0 && (
        <Button
          variant="ghost"
          className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-gray-400 flex flex-col items-center justify-center gap-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="text-gray-500">Click to select images</span>
        </Button>
      )}
    </div>
  );
} 