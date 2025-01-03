import { useState } from 'react';
import { uploadImage } from '../utils/images/upload';

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    setError(null);

    try {
      const { url, error } = await uploadImage(file);
      
      if (error) {
        setError(error);
        return null;
      }

      return url;

    } catch (err) {
      setError('Failed to upload image. Please try again.');
      return null;
      
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    error,
    handleImageUpload,
    clearError: () => setError(null)
  };
}