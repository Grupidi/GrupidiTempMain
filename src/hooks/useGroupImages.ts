import { useState, useRef } from 'react';
import { useImageUpload } from './useImageUpload';
import { GroupProfile } from '../types/profiles';

export function useGroupImages(
  groupProfile: GroupProfile,
  updateGroupProfile: (groupId: string, updates: Partial<GroupProfile>) => void
) {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);
  const { handleImageUpload, isUploading, error } = useImageUpload();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = await handleImageUpload(file);
    if (imageUrl) {
      const currentImages = groupProfile.images || [];
      const newImages = [imageUrl, ...currentImages];
      
      updateGroupProfile(groupProfile.id, {
        images: newImages
      });
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the input
      fileInputRef.current.click();
    }
  };

  const handleReplaceImage = async (index: number) => {
    if (replaceFileInputRef.current) {
      replaceFileInputRef.current.value = ''; // Clear the input
      replaceFileInputRef.current.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const imageUrl = await handleImageUpload(file);
        if (imageUrl) {
          const newImages = [...groupProfile.images];
          newImages[index] = imageUrl;
          
          updateGroupProfile(groupProfile.id, {
            images: newImages
          });
        }
      };
      replaceFileInputRef.current.click();
    }
  };

  return {
    fileInputRef,
    replaceFileInputRef,
    isImageExpanded,
    currentImageIndex,
    isUploading,
    error,
    handleFileSelect,
    handleCameraClick,
    handleReplaceImage,
    handleDeleteImage: (index: number) => {
      const newImages = groupProfile.images.filter((_, i) => i !== index);
      updateGroupProfile(groupProfile.id, {
        images: newImages
      });
      if (currentImageIndex >= newImages.length) {
        setCurrentImageIndex(Math.max(0, newImages.length - 1));
      }
    },
    handleNextImage: () => {
      if (!groupProfile.images?.length) return;
      setCurrentImageIndex((prevIndex) => 
        prevIndex === groupProfile.images.length - 1 ? 0 : prevIndex + 1
      );
    },
    handlePreviousImage: () => {
      if (!groupProfile.images?.length) return;
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? groupProfile.images.length - 1 : prevIndex - 1
      );
    },
    setIsImageExpanded,
    setCurrentImageIndex
  };
}