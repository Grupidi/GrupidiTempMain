import { GroupProfileProps } from '../types/groupProfile';
import { calculateGroupAgeStats } from '../utils/groupAgeCalculations';

interface GroupProfileHandlersProps {
  groupProfile: GroupProfileProps['groupProfile'];
  updateGroupProfile: (groupId: string, updates: Partial<GroupProfileProps['groupProfile']>) => void;
  state: ReturnType<typeof import('./useGroupProfileState').useGroupProfileState>;
  memberProfiles: { [key: string]: any };
}

export function useGroupProfileHandlers({ 
  groupProfile, 
  updateGroupProfile, 
  state,
  memberProfiles
}: GroupProfileHandlersProps) {
  const updateAgeStats = (members: string[]) => {
    const { ageRange, avgAge } = calculateGroupAgeStats(members, memberProfiles);
    return { ageRange, avgAge };
  };

  const handleSaveLocation = () => {
    updateGroupProfile(groupProfile.id, { 
      location: state.state.editedLocation 
    });
    state.updateState({ isEditingLocation: false });
  };

  const handleSaveBio = () => {
    updateGroupProfile(groupProfile.id, { 
      bio: state.state.editedBio 
    });
    state.updateState({ isEditingBio: false });
  };

  const handleSaveInterests = () => {
    updateGroupProfile(groupProfile.id, { 
      interests: [...state.state.editedInterests] 
    });
    state.updateState({ isEditingInterests: false });
  };

  const handleSaveQuirks = () => {
    updateGroupProfile(groupProfile.id, { 
      quirks: [...state.state.editedQuirks] 
    });
    state.updateState({ isEditingQuirks: false });
  };

  const handleSaveMembers = (members: string[]) => {
    // Calculate new age stats when members change
    const ageStats = updateAgeStats(members);
    
    updateGroupProfile(groupProfile.id, { 
      members,
      ...ageStats
    });
    state.updateState({ showMembersDialog: false });
  };

  return {
    handleSaveLocation,
    handleSaveBio,
    handleSaveInterests,
    handleSaveQuirks,
    handleSaveMembers
  };
}