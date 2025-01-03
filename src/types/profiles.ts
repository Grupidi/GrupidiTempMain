export interface MemberProfile {
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

export interface GroupProfile {
  id: string;
  name: string;
  username: string;
  description: string;
  ageRange: string;
  avgAge: number;
  location: string;
  members: string[];
  bio: string;
  interests: string[];
  quirks: string[];
  images: string[];
}

export interface FriendRequest {
  id: string;
  name: string;
  username: string;
  bio: string;
  location: string;
  profilePicture: string;
}

export interface PotentialFollower {
  id: string;
  name: string;
  username: string;
  bio: string;
  location: string;
  profilePicture: string;
}

export function createDefaultMemberProfile(): MemberProfile {
  return {
    id: '',
    name: '',
    username: '',
    birthday: new Date().toISOString().split('T')[0],
    location: '',
    bio: '',
    profilePicture: '',
    profileImages: [],
    interests: [],
    quirks: [],
    emeraldScore: 0,
    friends: []
  };
}