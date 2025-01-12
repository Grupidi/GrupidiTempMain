export interface ProfileProps {
  id: string;
  name: string;
  username: string;
  birthday: string;
  location: string;
  bio: string;
  profilePicture: string;
  profileImages: string[];
  interests: string[];
  quirks: string[];
  emeraldScore: number;
  friends: string[];
}

export interface UpdateMemberProfileParams {
  username: string;
  updates: Partial<MemberProfile>;
}

export interface ProfilePageProps {
  onNavigate: (page: Page) => void;
  profile: MemberProfile;
  onUpdateProfile: (username: string, updates: Partial<MemberProfile>) => Promise<void>;
  groupProfiles: Record<string, GroupProfile>;
  followedUsers: string[];
}