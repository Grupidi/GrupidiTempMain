import { useState, useRef, useCallback } from 'react';
import { useImageUpload } from './useImageUpload';
import { MemberProfile } from '../types/profiles';

export function useProfileImages(
  profile: MemberProfile,
  onUpdateProfile: (updates: Partial<MemberProfile>) => Promise<void>
) {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);
  const { handleImageUpload, isUploading, error } = useImageUpload();

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await handleImageUpload(file);
      if (imageUrl) {
        const currentImages = profile.profileImages || [];
        const newImages = [...currentImages, imageUrl];
        
        await onUpdateProfile({
          profilePicture: currentImages.length === 0 ? imageUrl : profile.profilePicture,
          profileImages: newImages
        });
        setCurrentImageIndex(newImages.length - 1);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      if (event.target) {
        event.target.value = '';
      }
    }
  }, [profile.profileImages, handleImageUpload, onUpdateProfile]);

  const handleReplaceImage = useCallback(async (index: number) => {
    console.log('=== Starting Image Replacement Process ===');
    console.log('Attempting to replace image at index:', index);
    
    if (!replaceFileInputRef.current || !profile.profileImages) {
      console.error('Missing required refs or profile images');
      return;
    }

    const fileInput = replaceFileInputRef.current;
    fileInput.value = '';

    try {
      await new Promise<void>((resolve, reject) => {
        const handleChange = async (event: Event) => {
          const target = event.target as HTMLInputElement;
          const file = target.files?.[0];
          
          // Cleanup listener immediately
          fileInput.removeEventListener('change', handleChange);
          
          if (!file) {
            console.error('No file selected');
            reject(new Error('No file selected'));
            return;
          }

          try {
            const imageUrl = await handleImageUpload(file);
            if (!imageUrl) {
              reject(new Error('Failed to upload image'));
              return;
            }

            // Create a new array with the replaced image
            const newImages = profile.profileImages.slice(); // Create a copy
            console.log('Before replacement:', {
              originalImages: [...newImages],
              replacementIndex: index,
              newImageUrl: imageUrl
            });

            // Replace the image at the specified index
            newImages.splice(index, 1, imageUrl);
            
            console.log('After replacement:', {
              updatedImages: newImages,
              replacedImage: newImages[index]
            });

            // Create the updates object
            const updates: Partial<MemberProfile> = {
              profileImages: newImages
            };

            // Update profile picture if replacing first image
            if (index === 0) {
              updates.profilePicture = imageUrl;
            }

            // Update the profile
            await onUpdateProfile(updates);
            
            // Maintain the current index
            setCurrentImageIndex(index);
            setIsImageExpanded(true);

            console.log('=== Replacement Complete ===');
            console.log('Final state:', {
              finalImages: newImages,
              currentIndex: index
            });

            resolve();
          } catch (error) {
            console.error('Error during replacement:', error);
            reject(error);
          } finally {
            if (target) {
              target.value = '';
            }
          }
        };

        fileInput.addEventListener('change', handleChange, { once: true });
        fileInput.click();
      });
    } catch (error) {
      console.error('Failed to replace image:', error);
    }
  }, [profile.profileImages, handleImageUpload, onUpdateProfile]);

  const handleDeleteImage = useCallback((index: number) => {
    if (!profile.profileImages) return;
    
    const newImages = profile.profileImages.filter((_, i) => i !== index);
    
    onUpdateProfile({
      profilePicture: index === 0 ? newImages[0] || profile.profilePicture : profile.profilePicture,
      profileImages: newImages
    }).then(() => {
      if (newImages.length === 0) {
        setIsImageExpanded(false);
      } else {
        if (index <= currentImageIndex) {
          setCurrentImageIndex(Math.max(0, currentImageIndex - 1));
        }
      }
    });
  }, [profile.profileImages, currentImageIndex, onUpdateProfile]);

  const handleCameraClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  }, []);

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
    handleDeleteImage,
    handleNextImage: useCallback(() => {
      if (!profile.profileImages?.length) return;
      setCurrentImageIndex((prevIndex) => 
        prevIndex === profile.profileImages!.length - 1 ? 0 : prevIndex + 1
      );
    }, [profile.profileImages]),
    handlePreviousImage: useCallback(() => {
      if (!profile.profileImages?.length) return;
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? profile.profileImages!.length - 1 : prevIndex - 1
      );
    }, [profile.profileImages]),
    setIsImageExpanded
  };
}