import { MemberProfile } from '../../types/profiles';

export function getConversationId(userId1: string, userId2: string): string {
  return [userId1, userId2].sort().join('_');
}

export function getOtherParticipant(
  participants: string[],
  currentUserId: string,
  memberProfiles: { [key: string]: MemberProfile }
): MemberProfile | null {
  const otherId = participants.find(id => id !== currentUserId);
  return otherId ? memberProfiles[otherId] : null;
}