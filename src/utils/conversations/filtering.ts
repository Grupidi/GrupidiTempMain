import { Conversation } from '../../types/conversation';
import { MemberProfile } from '../../types/profiles';
import { getProfileById } from '../profileUtils';

export function filterConversations(
  conversations: { [key: string]: Conversation },
  currentUser: MemberProfile,
  memberProfiles: { [key: string]: MemberProfile },
  searchQuery: string
): { [key: string]: Conversation } {
  if (!searchQuery.trim()) {
    return conversations;
  }

  const query = searchQuery.toLowerCase();
  return Object.entries(conversations).reduce((filtered, [id, conversation]) => {
    const otherParticipantUsername = conversation.participants.find(
      username => username !== currentUser.username
    );
    
    if (!otherParticipantUsername) return filtered;

    const otherParticipant = getProfileById(memberProfiles, otherParticipantUsername);
    if (!otherParticipant) return filtered;

    const matchesSearch = 
      otherParticipant.name.toLowerCase().includes(query) ||
      otherParticipant.username.toLowerCase().includes(query) ||
      (conversation.lastMessage?.content || '').toLowerCase().includes(query);

    if (matchesSearch) {
      filtered[id] = conversation;
    }

    return filtered;
  }, {} as { [key: string]: Conversation });
}