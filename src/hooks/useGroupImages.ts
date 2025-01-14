import { useRef, useState } from 'react';
import { GroupProfile } from '../types/profiles';

export function useGroupImages(
  groupProfile: GroupProfile,
  updateGroupProfile: (updates: Partial<GroupProfile>) => Promise<void>
) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === groupProfile.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? groupProfile.images.length - 1 : prev - 1
    );
  };

  return {
    currentImageIndex,
    handleNextImage,
    handlePreviousImage,
    fileInputRef,
    replaceFileInputRef
  };
}