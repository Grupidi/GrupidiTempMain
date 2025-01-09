import { Dialog, DialogContent } from "../dialog";
import { Button } from "../button";
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageControls } from './ImageControls';

interface ImageGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onAddImage: () => void;
  onReplaceImage: (index: number) => void;
  onDeleteImage: (index: number) => void;
  fileInputRef?: React.RefObject<HTMLInputElement>;
  replaceFileInputRef?: React.RefObject<HTMLInputElement>;
  handleFileSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImageGallery({
  images = [],
  isOpen,
  onClose,
  currentIndex,
  onNext,
  onPrevious,
  onAddImage,
  onReplaceImage,
  onDeleteImage,
  fileInputRef,
  replaceFileInputRef,
  handleFileSelect
}: ImageGalleryProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div className="relative">
          {images.length > 0 ? (
            <>
              <img
                src={images[currentIndex]}
                alt={`Photo ${currentIndex + 1}`}
                className="w-full h-auto"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70"
                onClick={onClose}
              >
                <X className="h-6 w-6" />
              </Button>

              <ImageControls 
                onAdd={onAddImage}
                onReplace={() => onReplaceImage(currentIndex)}
                onDelete={() => onDeleteImage(currentIndex)}
              />

              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 left-2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
                    onClick={onPrevious}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
                    onClick={onNext}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-100">
              <Button
                variant="ghost"
                className="text-gray-500"
                onClick={onAddImage}
              >
                Click to add your first photo
              </Button>
            </div>
          )}

          {fileInputRef && (
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          )}
          {replaceFileInputRef && (
            <input
              type="file"
              ref={replaceFileInputRef}
              accept="image/*"
              className="hidden"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}