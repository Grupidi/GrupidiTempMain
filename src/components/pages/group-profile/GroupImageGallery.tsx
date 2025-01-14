import { Dialog, DialogContent } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { X, ChevronLeft, ChevronRight, Plus, Replace, Trash2 } from 'lucide-react';

interface GroupImageGalleryProps {
  images: string[];
  groupName: string;
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onAddImage: () => void;
  onReplaceImage: (index: number) => void;
  onDeleteImage: (index: number) => void;
  isMember: boolean;
  canEdit: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  replaceFileInputRef: React.RefObject<HTMLInputElement>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleReplaceFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

// Export as ImageGallery to match the import in GroupProfileHeader
export const ImageGallery = ({
  images,
  groupName,
  isOpen,
  onClose,
  currentIndex,
  onNext,
  onPrevious,
  onAddImage,
  onReplaceImage,
  onDeleteImage,
  isMember,
  canEdit,
  fileInputRef,
  replaceFileInputRef,
  handleFileSelect,
  handleReplaceFileSelect
}: GroupImageGalleryProps) => {
  console.log('🔵 [ImageGallery] Component State:', {
    imagesCount: images.length,
    currentIndex,
    canEdit,
    isOpen,
    isMember,
    hasFileInputRef: !!fileInputRef?.current,
    hasReplaceFileInputRef: !!replaceFileInputRef?.current,
    currentImage: images[currentIndex]
  });

  if (!images.length) return null;

  const handleAddClick = () => {
    console.log('🔵 [ImageGallery] Add button clicked');
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleReplace = () => {
    console.log('🔵 [ImageGallery] Replace Image Button Clicked', {
      replaceFileInputRef: !!replaceFileInputRef?.current,
      currentIndex,
      imageToReplace: images[currentIndex],
      canEdit
    });
    
    if (replaceFileInputRef.current) {
      console.log('✅ [ImageGallery] Triggering file input click for Replace');
      replaceFileInputRef.current.click();
    } else {
      console.error('❌ [ImageGallery] Replace image file input ref not found');
    }
  };

  const handleDelete = () => {
    console.log('🔵 [ImageGallery] Delete Image Button Clicked', {
      currentIndex,
      imageToDelete: images[currentIndex],
      totalImages: images.length,
      canEdit
    });
    
    onDeleteImage(currentIndex);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div className="relative">
          <img
            src={images[currentIndex]}
            alt={`${groupName}'s photo ${currentIndex + 1}`}
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

          {canEdit && (
            <div className="absolute top-2 left-2 flex flex-row gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAddClick}
                className="text-white bg-black/50 hover:bg-black/70"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Image
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReplace}
                className="text-white bg-black/50 hover:bg-black/70 flex items-center"
              >
                <Replace className="h-4 w-4 mr-1" />
                Replace Image
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-white bg-black/50 hover:bg-black/70 flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete Image
              </Button>
            </div>
          )}

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

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <input
            type="file"
            ref={replaceFileInputRef}
            accept="image/*"
            onChange={handleReplaceFileSelect}
            className="hidden"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};