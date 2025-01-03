import { useRef, useState } from 'react';
import { CameraRollButton } from './CameraRollButton';
import { MediaPreview } from './MediaPreview';

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
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />
      <CameraRollButton onClick={() => fileInputRef.current?.click()} />
      <MediaPreview files={selectedFiles} onRemove={handleRemoveFile} />
    </div>
  );
}