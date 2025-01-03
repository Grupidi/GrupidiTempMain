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

export interface ProfilePageProps {
  onNavigate: (page: string) => void;
  profile: ProfileProps;
  onUpdateProfile: (updates: Partial<ProfileProps>) => void;
  groupProfiles: {
    [key: string]: {
      id: string;
      name: string;
      members: string[];
    };
  };
  followedUsers: {
    id: string;
    name: string;
    username: string;
    bio: string;
    location: string;
    profilePicture: string;
  }[];
}