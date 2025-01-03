import { useState, useCallback, useEffect } from 'react';
import { GroupProfileProps, GroupProfileState } from '../types/groupProfile';

const initialState = (groupProfile?: GroupProfileProps['groupProfile']): GroupProfileState => ({
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
  editedBio: groupProfile?.bio || ''
});

export function useGroupProfileState(groupProfile?: GroupProfileProps['groupProfile']) {
  const [state, setState] = useState<GroupProfileState>(() => initialState(groupProfile));

  // Update state when groupProfile changes
  useEffect(() => {
    if (groupProfile) {
      setState(prev => ({
        ...prev,
        editedLocation: groupProfile.location,
        editedInterests: [...groupProfile.interests],
        editedQuirks: [...groupProfile.quirks],
        editedBio: groupProfile.bio
      }));
    }
  }, [groupProfile]);

  const updateState = useCallback((updates: Partial<GroupProfileState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  return {
    state,
    updateState
  };
}