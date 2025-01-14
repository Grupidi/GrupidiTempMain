import { useState, useCallback, useEffect } from 'react';
import { GroupProfile } from '../types/profiles';
import { GroupProfileState } from '../types/groupProfile';

const initialState = (groupProfile?: GroupProfile): GroupProfileState => ({
  isImageExpanded: false,
  currentImageIndex: 0,
  showMembersDialog: false,
  memberSearchQuery: '',
  isEditingInterests: false,
  isEditingQuirks: false,
  isEditingBio: false,
  isEditingLocation: false,
  newInterest: '',
  newQuirk: '',
  editedLocation: groupProfile?.location || '',
  editedInterests: groupProfile?.interests ? [...groupProfile.interests] : [],
  editedQuirks: groupProfile?.quirks ? [...groupProfile.quirks] : [],
  editedBio: groupProfile?.bio || '',
  locationCoordinates: groupProfile?.locationCoordinates || null
});

export function useGroupProfileState(groupProfile?: GroupProfile) {
  const [state, setState] = useState<GroupProfileState>(() => initialState(groupProfile));

  // Update state when groupProfile changes
  useEffect(() => {
    if (groupProfile) {
      setState(prev => ({
        ...prev,
        editedLocation: groupProfile.location || '',
        editedInterests: groupProfile.interests ? [...groupProfile.interests] : [],
        editedQuirks: groupProfile.quirks ? [...groupProfile.quirks] : [],
        editedBio: groupProfile.bio || ''
      }));
    }
  }, [groupProfile]);

  const updateState = useCallback((updates: Partial<GroupProfileState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleUpdateProfile = async (updates: Partial<GroupProfile>) => {
    try {
      // Update parent state first
      await updateGroupProfile(updates);
      
      // Then update local state
      updateState({
        [`edited${field}`]: value,
        [`isEditing${field}`]: false
      });
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  return {
    state,
    updateState
  };
}