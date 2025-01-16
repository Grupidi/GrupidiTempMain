import { useMemo, useRef } from 'react';
import { ImageHandlers } from '../types/imageHandlers';
import { MemberProfile } from '../types/profiles';

interface ProfileState {
  currentImageIndex: number;
  isImageExpanded: boolean;
  setCurrentImageIndex: (index: number) => void;
  setIsImageExpanded: (expanded: boolean) => void;
}

export function useProfileImages(
  profile: MemberProfile,
  updateProfile: (updates: Partial<MemberProfile>) => Promise<void>,
  state: ProfileState,
  setState: (updates: Partial<ProfileState>) => void
): ImageHandlers {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  const handleAddImage = async (imageUrl: string) => {
    console.log('handleAddImage called with:', imageUrl);
    const newImages = [...(profile.profileImages || []), imageUrl];
    console.log('New images array:', newImages);
    await updateProfile({
      ...profile,
      profileImages: newImages,
    });
  };

  return useMemo(() => ({
    handleNextImage() {
      const images = profile.profileImages || [];
      console.log('handleNextImage called', {
        currentIndex: state.currentImageIndex,
        imagesLength: images.length
      });
      const nextIndex = (state.currentImageIndex + 1) % images.length;
      state.setCurrentImageIndex(nextIndex);
      console.log('Updated to index:', nextIndex);
    },

    handlePreviousImage() {
      const images = profile.profileImages || [];
      const prevIndex =
        state.currentImageIndex === 0
          ? images.length - 1
          : state.currentImageIndex - 1;
      state.setCurrentImageIndex(prevIndex);
    },

    handleAddImage,

    async handleReplaceImage(index: number) {
      console.log('handleReplaceImage called for index:', index);
      if (replaceFileInputRef.current) {
        replaceFileInputRef.current.dataset.index = index.toString();
        replaceFileInputRef.current.click();
      }
    },

    handleReplaceFileSelect: async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      const index = Number(replaceFileInputRef.current?.dataset.index || 0);
      
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        console.log('Created URL for replacement file:', imageUrl);
        
        try {
          const images = profile.profileImages || [];
          const newImages = [...images];
          newImages[index] = imageUrl;
          await updateProfile({
            ...profile,
            profileImages: newImages,
          });
        } catch (error) {
          console.error('Error replacing image:', error);
          URL.revokeObjectURL(imageUrl);
        }
      }
    },

    async handleDeleteImage(index: number) {
      console.log('handleDeleteImage called with index:', index);
      const images = profile.profileImages || [];
      const newImages = images.filter((_, i) => i !== index);
      await updateProfile({
        ...profile,
        profileImages: newImages,
      });
    },

    setIsImageExpanded(expanded: boolean) {
      console.log('setIsImageExpanded called with:', expanded);
      state.setIsImageExpanded(expanded);
      console.log('State after update:', { isImageExpanded: expanded });
    },

    handleCameraClick: () => {
      console.log('Camera click handler called');
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    },

    handleFileSelect: async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        console.log('Created URL for uploaded file:', imageUrl);
        
        try {
          await handleAddImage(imageUrl);
        } catch (error) {
          console.error('Error adding image:', error);
          URL.revokeObjectURL(imageUrl);
        }
      }
    },

    fileInputRef,
    replaceFileInputRef
  }), [profile, updateProfile, state]);
}