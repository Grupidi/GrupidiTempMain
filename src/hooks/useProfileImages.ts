import { useState, useRef } from 'react';
import { useImageUpload } from './useImageUpload';
import { MemberProfile } from '../types/profiles';

export function useProfileImages(
  profile: MemberProfile,
  onUpdateProfile: (updates: Partial<MemberProfile>) => void
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
      const currentImages = profile.profileImages || [];
      const newImages = [imageUrl, ...currentImages];
      
      onUpdateProfile({
        profilePicture: imageUrl,
        profileImages: newImages
      });
    }
  };

  const handleReplaceImage = async (index: number) => {
    if (!replaceFileInputRef.current) return;
    replaceFileInputRef.current.click();
    
    replaceFileInputRef.current.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const imageUrl = await handleImageUpload(file);
      if (imageUrl) {
        const newImages = [...profile.profileImages];
        newImages[index] = imageUrl;
        
        onUpdateProfile({
          profilePicture: index === 0 ? imageUrl : profile.profilePicture,
          profileImages: newImages
        });
      }
    };
  };

  const handleDeleteImage = (index: number) => {
    const newImages = profile.profileImages.filter((_, i) => i !== index);
    
    onUpdateProfile({
      profilePicture: index === 0 ? newImages[0] : profile.profilePicture,
      profileImages: newImages
    });

    if (currentImageIndex >= newImages.length) {
      setCurrentImageIndex(Math.max(0, newImages.length - 1));
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageClick = () => {
    if (profile.profileImages?.length > 0) {
      setIsImageExpanded(true);
    }
  };

  const handleNextImage = () => {
    if (!profile.profileImages?.length) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === profile.profileImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    if (!profile.profileImages?.length) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? profile.profileImages.length - 1 : prevIndex - 1
    );
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
    handleImageClick,
    handleNextImage,
    handlePreviousImage,
    handleReplaceImage,
    handleDeleteImage,
    setIsImageExpanded
  };
}