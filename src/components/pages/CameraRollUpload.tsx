import { useState, useRef, ChangeEvent } from 'react';
import { CameraIcon, ArrowLeft } from 'lucide-react';
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";

interface CameraRollUploadProps {
  onClose: () => void;
}

// Example media files (you would typically fetch these from an API or local storage)
const exampleMedia = Array(15).fill({ type: 'image', url: '/placeholder.svg' });

export default function CameraRollUpload({ onClose }: CameraRollUploadProps) {
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setMediaFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files as FileList)]);
    }
  };

  const toggleFileSelection = (index: number) => {
    setSelectedFiles(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        newSelected.add(index);
      }
      return newSelected;
    });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <header className="bg-white border-b p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={onClose} className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold">Camera Roll</h1>
      </header>

      <ScrollArea className="flex-1">
        <div className="grid grid-cols-3 gap-2 p-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="Add new photo or video"
          >
            <CameraIcon className="w-8 h-8 text-gray-600" />
          </button>
          {exampleMedia.map((_, index) => (
            <button
              key={`example-${index}`}
              onClick={() => toggleFileSelection(index)}
              className={`relative aspect-square rounded-lg overflow-hidden ${
                selectedFiles.has(index) ? 'ring-2 ring-pink-500' : ''
              }`}
              aria-pressed={selectedFiles.has(index)}
              aria-label={`Select image ${index + 1}`}
            >
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <CameraIcon className="w-8 h-8 text-gray-600" />
              </div>
              {selectedFiles.has(index) && (
                <div className="absolute inset-0 bg-pink-500 bg-opacity-30 flex items-center justify-center">
                  <div className="w-6 h-6 bg-pink-500 rounded-full border-2 border-white" />
                </div>
              )}
            </button>
          ))}
          {mediaFiles.map((_, index) => (
            <button
              key={`upload-${index}`}
              onClick={() => toggleFileSelection(index + exampleMedia.length)}
              className={`relative aspect-square rounded-lg overflow-hidden ${
                selectedFiles.has(index + exampleMedia.length) ? 'ring-2 ring-pink-500' : ''
              }`}
              aria-pressed={selectedFiles.has(index + exampleMedia.length)}
              aria-label={`Select uploaded image ${index + 1}`}
            >
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <CameraIcon className="w-8 h-8 text-gray-600" />
              </div>
              {selectedFiles.has(index + exampleMedia.length) && (
                <div className="absolute inset-0 bg-pink-500 bg-opacity-30 flex items-center justify-center">
                  <div className="w-6 h-6 bg-pink-500 rounded-full border-2 border-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </ScrollArea>

      {selectedFiles.size > 0 && (
        <footer className="border-t p-4">
          <Button 
            className="w-full bg-pink-500 hover:bg-pink-600 text-white"
            onClick={onClose}
          >
            Send {selectedFiles.size} {selectedFiles.size === 1 ? 'Photo' : 'Photos'}
          </Button>
        </footer>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}