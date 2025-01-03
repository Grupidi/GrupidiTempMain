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
}

export interface GroupProfileStateProps {
  state: GroupProfileState;
  updateState: (updates: Partial<GroupProfileState>) => void;
}

export interface GroupProfileProps {
  onNavigate: (page: string, memberId?: string, groupId?: string) => void;
  memberProfiles: { [key: string]: {
    id: string;
    name: string;
    username: string;
    profilePicture: string;
  }};
  groupProfile: {
    id: string;
    name: string;
    description: string;
    ageRange: string;
    avgAge: number;
    location: string;
    members: string[];
    bio: string;
    interests: string[];
    quirks: string[];
    images: string[];
  };
  updateGroupProfile: (groupId: string, updates: Partial<GroupProfileProps['groupProfile']>) => void;
}