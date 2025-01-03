import { validateImageFile } from './validation';
import { processImageFile } from './processing';

export async function uploadImage(file: File): Promise<{ url: string; error?: string }> {
  try {
    // Validate the image
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return { url: '', error: validation.error };
    }

    // Process the image
    const url = await processImageFile(file);
    return { url };

  } catch (error) {
    console.error('Image upload failed:', error);
    return { 
      url: '', 
      error: 'Failed to upload image. Please try again.' 
    };
  }
}