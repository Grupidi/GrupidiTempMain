export interface MediaProps {
  groupProfile: {
    id: string;
    name: string;
    members: string[];
  };
  memberProfiles: {
    [key: string]: {
      id: string;
      name: string;
      username: string;
      profilePicture: string;
    };
  };
}