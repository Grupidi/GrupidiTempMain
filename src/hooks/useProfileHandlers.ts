import { useRef } from 'react';
import { ProfileProps } from '../types/profile';

interface ProfileHandlersProps {
  profile: ProfileProps;
  onUpdateProfile: (updates: Partial<ProfileProps>) => void;
  state: ReturnType<typeof import('./useProfileState').useProfileState>;
}

export function useProfileHandlers({ profile, onUpdateProfile, state }: ProfileHandlersProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpdateProfile({ profilePicture: e.target?.result as string });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveBio = () => {
    onUpdateProfile({ bio: state.editedBio });
    state.setIsEditingBio(false);
  };

  const handleSaveLocation = () => {
    onUpdateProfile({ location: state.editedLocation });
    state.setIsEditingLocation(false);
  };

  const handleSaveAge = (birthday: string) => {
    onUpdateProfile({ birthday });
    state.setIsEditingAge(false);
  };

  const handleAddInterest = () => {
    if (state.newInterest.trim()) {
      state.setEditedInterests([...state.editedInterests, state.newInterest.trim()]);
      state.setNewInterest("");
    }
  };

  const handleRemoveInterest = (index: number) => {
    state.setEditedInterests(state.editedInterests.filter((_, i) => i !== index));
  };

  const handleSaveInterests = () => {
    onUpdateProfile({ interests: state.editedInterests });
    state.setIsEditingInterests(false);
  };

  const handleAddQuirk = () => {
    if (state.newQuirk.trim()) {
      state.setEditedQuirks([...state.editedQuirks, state.newQuirk.trim()]);
      state.setNewQuirk("");
    }
  };

  const handleRemoveQuirk = (index: number) => {
    state.setEditedQuirks(state.editedQuirks.filter((_, i) => i !== index));
  };

  const handleSaveQuirks = () => {
    onUpdateProfile({ quirks: state.editedQuirks });
    state.setIsEditingQuirks(false);
  };

  return {
    fileInputRef,
    handleFileSelect,
    handleCameraClick,
    handleSaveBio,
    handleSaveLocation,
    handleSaveAge,
    handleAddInterest,
    handleRemoveInterest,
    handleSaveInterests,
    handleAddQuirk,
    handleRemoveQuirk,
    handleSaveQuirks
  };
}