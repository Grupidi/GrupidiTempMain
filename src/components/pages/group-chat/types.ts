export interface ChatMessage {
  id: string;
  content: string;
  isSelf: boolean;
}

export interface GroupChatDetailsProps {
  onClose: () => void;
  onNavigate: (page: string, memberId?: string) => void;
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