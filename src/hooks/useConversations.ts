import { useState } from 'react';
import { Conversation, Message } from '../types/conversation';
import { MemberProfile } from '../types/profiles';
import { getConversationId } from '../utils/conversations/participants';
import { createMessage } from '../utils/conversations/messages';
import { 
  initializeConversation, 
  updateConversationWithMessage, 
  markConversationAsRead 
} from '../utils/conversations/state';

export function useConversations() {
  const [conversations, setConversations] = useState<{ [key: string]: Conversation }>({});

  const startConversation = (currentUser: MemberProfile, recipient: MemberProfile) => {
    const conversationId = getConversationId(currentUser.id, recipient.id);
    
    if (!conversations[conversationId]) {
      const newConversation = initializeConversation([currentUser.id, recipient.id]);
      setConversations(prev => ({
        ...prev,
        [conversationId]: newConversation
      }));
    }

    return conversationId;
  };

  const sendMessage = (conversationId: string, senderId: string, content: string) => {
    const message = createMessage(senderId, content);

    setConversations(prev => {
      const conversation = prev[conversationId];
      if (!conversation) return prev;

      return {
        ...prev,
        [conversationId]: updateConversationWithMessage(conversation, message)
      };
    });

    return message;
  };

  const markAsRead = (conversationId: string) => {
    setConversations(prev => {
      const conversation = prev[conversationId];
      if (!conversation) return prev;

      return {
        ...prev,
        [conversationId]: markConversationAsRead(conversation)
      };
    });
  };

  return {
    conversations,
    startConversation,
    sendMessage,
    markAsRead
  };
}