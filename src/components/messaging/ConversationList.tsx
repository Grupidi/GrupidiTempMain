import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { User } from 'lucide-react';

interface ConversationListProps {
  conversations: { [key: string]: any };
  currentUser: any;
  memberProfiles: { [key: string]: any };
  onSelectConversation: (id: string) => void;
}

export function ConversationList({
  conversations,
  currentUser,
  memberProfiles,
  onSelectConversation
}: ConversationListProps) {
  console.log('ConversationList props:', {
    conversations,
    currentUser,
    memberProfiles
  });

  const getOtherUser = (conversationId: string) => {
    // Get the other username from participants array instead of conversation ID
    const conversation = conversations[conversationId];
    if (!conversation) return null;

    const otherUsername = conversation.participants.find(
      (username: string) => username !== currentUser.username
    );
    
    console.log('Getting other user:', {
      conversationId,
      participants: conversation.participants,
      otherUsername,
      foundUser: memberProfiles[otherUsername]
    });

    return memberProfiles[otherUsername];
  };

  return (
    <div className="space-y-2">
      {Object.entries(conversations).map(([id, conversation]) => {
        const otherUser = getOtherUser(id);
        if (!otherUser) {
          console.log('Could not find other user for conversation:', id);
          return null;
        }

        return (
          <button
            key={id}
            className="w-full p-3 flex items-center gap-3 hover:bg-gray-50"
            onClick={() => onSelectConversation(id)}
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={otherUser.profilePicture} alt={otherUser.name} />
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <h3 className="font-semibold">{otherUser.name}</h3>
              <p className="text-sm text-gray-500">@{otherUser.username}</p>
              {conversation.lastMessage && (
                <p className="text-sm text-gray-500 truncate">
                  {conversation.lastMessage.content}
                </p>
              )}
            </div>
          </button>
        );
      })}
      {Object.keys(conversations).length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No conversations yet
        </div>
      )}
    </div>
  );
}