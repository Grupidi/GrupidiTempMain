import { Camera } from 'lucide-react';
import { Button } from "../button";
import { Spinner } from "../spinner";

interface ProfileImageProps {
  src: string;
  alt: string;
  onImageClick: () => void;
  onCameraClick: () => void;
  isUploading?: boolean;
  error?: string | null;
  hasGallery?: boolean;
  className?: string;
}

export function ProfileImage({
  src,
  alt,
  onImageClick,
  onCameraClick,
  isUploading = false,
  error = null,
  hasGallery = false,
  className = ''
}: ProfileImageProps) {
  return (
    <div className="relative">
      <div 
        className={`w-24 h-24 border-4 border-white rounded-full overflow-hidden ${hasGallery ? 'cursor-pointer' : ''} ${className}`}
        onClick={hasGallery ? onImageClick : undefined}
      >
        {isUploading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Spinner className="h-8 w-8 text-pink-500" />
          </div>
        ) : (
          <img 
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <Button 
        size="icon"
        className="absolute bottom-0 right-0 rounded-full bg-white text-pink-500 hover:bg-pink-50"
        onClick={onCameraClick}
        disabled={isUploading}
      >
        <Camera className="h-4 w-4" />
      </Button>
      {error && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm text-red-500">
          {error}
        </div>
      )}
    </div>
  );
}