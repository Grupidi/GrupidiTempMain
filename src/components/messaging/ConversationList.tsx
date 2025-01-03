import { useState } from 'react';
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from 'lucide-react';
import { Conversation } from '../../types/conversation';
import { MemberProfile } from '../../types/profiles';
import { getOtherParticipant } from '../../utils/conversations/participants';

interface ConversationListProps {
  conversations: { [key: string]: Conversation };
  currentUser: MemberProfile;
  memberProfiles: { [key: string]: MemberProfile };
  onSelectConversation: (conversationId: string) => void;
  searchQuery?: string;
}

export function ConversationList({
  conversations,
  currentUser,
  memberProfiles,
  onSelectConversation,
  searchQuery = ''
}: ConversationListProps) {
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Filter conversations based on search query
  const filteredConversations = Object.entries(conversations).filter(([_, conversation]) => {
    const otherParticipant = getOtherParticipant(conversation.participants, currentUser.id, memberProfiles);
    if (!otherParticipant) return false;

    const searchLower = searchQuery.toLowerCase();
    return (
      otherParticipant.name.toLowerCase().includes(searchLower) ||
      otherParticipant.username.toLowerCase().includes(searchLower) ||
      (conversation.lastMessage?.content || '').toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-2">
      {filteredConversations.map(([id, conversation]) => {
        const otherUser = getOtherParticipant(conversation.participants, currentUser.id, memberProfiles);
        if (!otherUser) return null;

        return (
          <Button
            key={id}
            variant="ghost"
            className="w-full justify-start p-3 hover:bg-gray-100"
            onClick={() => onSelectConversation(id)}
          >
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={otherUser.profilePicture} alt={otherUser.name} />
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <div className="flex justify-between items-start">
                <span className="font-medium">{otherUser.name}</span>
                {conversation.lastMessage && (
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(conversation.lastMessage.timestamp)}
                  </span>
                )}
              </div>
              {conversation.lastMessage && (
                <p className="text-sm text-gray-500 truncate">
                  {conversation.lastMessage.content}
                </p>
              )}
            </div>
            {conversation.unreadCount > 0 && (
              <div className="ml-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {conversation.unreadCount}
              </div>
            )}
          </Button>
        );
      })}

      {filteredConversations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchQuery ? 'No conversations match your search' : 'No conversations yet'}
        </div>
      )}
    </div>
  );
}