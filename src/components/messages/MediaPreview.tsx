import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface MediaPreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

export function MediaPreview({ files, onRemove }: MediaPreviewProps) {
  if (files.length === 0) return null;

  return (
    <div className="flex gap-2 p-2 bg-gray-50 rounded-lg">
      {files.map((file, index) => (
        <div key={index} className="relative">
          <img
            src={URL.createObjectURL(file)}
            alt={`Preview ${index + 1}`}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 hover:bg-red-600 text-white p-0"
            onClick={() => onRemove(index)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}