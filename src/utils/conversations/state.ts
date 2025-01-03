import { Conversation, Message } from '../../types/conversation';

export function initializeConversation(participants: string[]): Conversation {
  return {
    id: participants.sort().join('_'),
    participants,
    lastMessage: null,
    unreadCount: 0
  };
}

export function updateConversationWithMessage(
  conversation: Conversation,
  message: Message
): Conversation {
  return {
    ...conversation,
    lastMessage: message,
    unreadCount: conversation.unreadCount + 1
  };
}

export function markConversationAsRead(conversation: Conversation): Conversation {
  return {
    ...conversation,
    unreadCount: 0
  };
}