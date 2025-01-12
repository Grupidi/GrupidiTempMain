// Add state interface
export interface GroupProfileState {
  isImageExpanded: boolean;
  currentImageIndex: number;
  showMembersDialog: boolean;
  memberSearchQuery: string;
  isEditingInterests: boolean;
  isEditingQuirks: boolean;
  isEditingBio: boolean;
  isEditingLocation: boolean;
  newInterest: string;
  newQuirk: string;
  editedLocation: string;
  editedInterests: string[];
  editedQuirks: string[];
  editedBio: string;
  locationCoordinates: { lat: number; lng: number } | null;
}

export interface GroupProfileStateProps {
  state: GroupProfileState;
  updateState: (updates: Partial<GroupProfileState>) => void;
}

export interface GroupProfileProps {
  groupProfile: GroupProfile;
  memberProfiles: { [key: string]: MemberProfile };
  isSavedGroup?: boolean;
  updateGroupProfile: (updates: Partial<GroupProfile>) => void;
  onNavigate: (page: string, memberId?: string, groupId?: string) => void;
}