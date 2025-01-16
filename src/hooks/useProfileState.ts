import { useState } from 'react';

export function useProfileState() {
  const [state, setState] = useState({
    currentImageIndex: 0,
    isImageExpanded: false,
    isEditingAge: false,
    isEditingBio: false,
    isEditingLocation: false,
    isEditingInterests: false,
    isEditingQuirks: false
  });

  // Add setter functions
  const setters = {
    setIsEditingAge: (value: boolean) => setState(prev => ({ ...prev, isEditingAge: value })),
    setIsEditingBio: (value: boolean) => setState(prev => ({ ...prev, isEditingBio: value })),
    setIsEditingLocation: (value: boolean) => setState(prev => ({ ...prev, isEditingLocation: value })),
    setIsEditingInterests: (value: boolean) => setState(prev => ({ ...prev, isEditingInterests: value })),
    setIsEditingQuirks: (value: boolean) => setState(prev => ({ ...prev, isEditingQuirks: value })),
    setIsImageExpanded: (value: boolean) => setState(prev => ({ ...prev, isImageExpanded: value })),
    setCurrentImageIndex: (value: number) => setState(prev => ({ ...prev, currentImageIndex: value }))
  };

  return {
    ...state,
    ...setters
  };
}