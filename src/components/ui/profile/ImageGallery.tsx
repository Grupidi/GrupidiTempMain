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
}

export function ImageGallery({
  images,
  isOpen,
  onClose,
  currentIndex,
  onNext,
  onPrevious,
  onAddImage,
  onReplaceImage,
  onDeleteImage
}: ImageGalleryProps) {
  if (!images.length) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div className="relative">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}