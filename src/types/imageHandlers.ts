export interface ImageHandlers {
  handleNextImage: () => void;
  handlePreviousImage: () => void;
  handleAddImage: (imageUrl: string) => Promise<void>;
  handleReplaceImage: (index: number, imageUrl: string) => Promise<void>;
  handleDeleteImage: (index: number) => Promise<void>;
} 