import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { MessageSquarePlus } from 'lucide-react';
import { ChatDialog } from '../messaging/ChatDialog';
import { NewMessageDialog } from '../messaging/NewMessageDialog';
import { NotificationItem } from '../notifications/NotificationItem';
import { AlertFilters } from '../notifications/AlertFilters';
import { ConversationList } from '../messaging/ConversationList';
import { useNotifications } from '../../hooks/useNotifications';
import { NotificationType } from '../../types/notifications';
import { NavigationBar } from "./group-profile/NavigationBar";
import { useConversations } from '../../hooks/useConversations';

interface NotificationsPageProps {
  onNavigate: (page: string, memberId?: string, groupId?: string) => void;
  memberProfiles: { [key: string]: any };
  followedUsers: any[];
}

export default function NotificationsPage({
  onNavigate,
  memberProfiles,
  followedUsers
}: NotificationsPageProps) {
  const [activeTab, setActiveTab] = useState("alerts");
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<NotificationType | 'all'>('all');
  
  const { notifications, handleInvitationResponse } = useNotifications();
  const currentUser = memberProfiles["alice_adventurer"];
  const { conversations, createConversation } = useConversations();

  const handleStartConversation = (recipient: any) => {
    console.log('Starting conversation with:', recipient);
    
    // Create a unique conversation ID by sorting usernames
    const participants = [currentUser.username, recipient.username].sort();
    const conversationId = participants.join('_');
    
    // Check if conversation already exists
    if (conversations[conversationId]) {
      setSelectedConversation(conversationId);
      setShowNewMessage(false);
      return;
    }

    // Create new conversation
    try {
      createConversation({
        id: conversationId,
        participants: participants,
        messages: [],
        lastMessage: null,
        unreadCount: 0,
        createdAt: Date.now()
      });

      setSelectedConversation(conversationId);
      setShowNewMessage(false);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  // Add cleanup when closing chat
  const handleCloseChat = () => {
    setSelectedConversation(null);
  };

  useEffect(() => {
    console.log('Current conversations:', conversations);
    console.log('Selected conversation:', selectedConversation);
  }, [conversations, selectedConversation]);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-pink-500 p-4 fixed top-0 left-0 right-0 z-10">
        <h1 className="text-2xl font-bold text-center text-white">Notifications</h1>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-16">
        <TabsList className="w-full">
          <TabsTrigger value="alerts" className="flex-1">Alerts</TabsTrigger>
          <TabsTrigger value="conversations" className="flex-1">Conversations</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="pb-20">
          {/* Alerts content */}
          {notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onAccept={handleInvitationResponse}
              onDecline={handleInvitationResponse}
              onNavigate={onNavigate}
            />
          ))}
        </TabsContent>

        <TabsContent value="conversations" className="pb-20 relative">
          <ConversationList
            conversations={conversations}
            currentUser={currentUser}
            memberProfiles={memberProfiles}
            onSelectConversation={setSelectedConversation}
          />

          <Button
            onClick={() => setShowNewMessage(true)}
            className="fixed bottom-24 right-4 rounded-full p-3 bg-pink-500 hover:bg-pink-600 shadow-lg"
          >
            <MessageSquarePlus className="h-6 w-6 text-white" />
          </Button>
        </TabsContent>
      </Tabs>

      {/* Chat Dialog */}
      <ChatDialog
        isOpen={Boolean(selectedConversation)}
        onClose={handleCloseChat}
        conversationId={selectedConversation}
        currentUser={currentUser}
        memberProfiles={memberProfiles}
      />

      {/* New Message Dialog */}
      <NewMessageDialog
        isOpen={showNewMessage}
        onClose={() => setShowNewMessage(false)}
        onStartConversation={handleStartConversation}
        currentUser={currentUser}
        memberProfiles={memberProfiles}
        followedUsers={followedUsers}
      />

      <AlertFilters
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />

      <NavigationBar onNavigate={onNavigate} />
    </div>
  );
}