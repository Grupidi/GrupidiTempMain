import { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Map, Users, Bell, User, Search, MessageSquarePlus } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import { useConversations } from '../../hooks/useConversations';
import { useMessages } from '../../hooks/useMessages';
import { NotificationItem } from '../notifications/NotificationItem';
import { AlertFilters } from '../notifications/AlertFilters';
import { NotificationType } from '../../types/notifications';
import { searchNotification } from '../../utils/notificationUtils';
import { currentGroupProfiles } from '../../data/currentGroupProfiles';
import { ConversationList } from '../messaging/ConversationList';
import { ChatDialog } from '../messaging/ChatDialog';
import { NewMessageDialog } from '../messaging/NewMessageDialog';

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
  const [activeTab, setActiveTab] = useState<'alerts' | 'conversations'>('alerts');
  const [filterType, setFilterType] = useState<NotificationType | 'all'>('all');
  const [alertSearchQuery, setAlertSearchQuery] = useState('');
  const [conversationSearchQuery, setConversationSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [showNewMessage, setShowNewMessage] = useState(false);

  const { notifications, handleInvitationResponse } = useNotifications();
  const { conversations, startConversation, sendMessage, markAsRead } = useConversations();
  const { messages, getMessages, addMessage } = useMessages();

  // Current user (Alice)
  const currentUser = memberProfiles["Alice Johnson"];

  // Filter and search notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filterType === 'all' || notification.type === filterType;
    const matchesSearch = alertSearchQuery ? searchNotification(notification, alertSearchQuery) : true;
    return matchesFilter && matchesSearch;
  });

  // Handle starting a new conversation
  const handleStartConversation = (recipient: any) => {
    const conversationId = startConversation(currentUser, recipient);
    setSelectedConversation(conversationId);
    setShowNewMessage(false);
  };

  // Handle sending a message
  const handleSendMessage = (content: string, files?: File[], media?: { type: string; url: string }[]) => {
    if (!selectedConversation) return;

    try {
      // Create message with media
      const message = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        content,
        media,
        timestamp: Date.now()
      };

      // Add message to conversation
      addMessage(selectedConversation, content, currentUser.id, media);
      
      // Optional: Add to conversations state if you have it
      if (sendMessage) {
        sendMessage(selectedConversation, currentUser.id, content);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Get the other participant in a conversation
  const getOtherParticipant = (conversationId: string) => {
    const conversation = conversations[conversationId];
    if (!conversation) return null;

    const otherId = conversation.participants.find(id => id !== currentUser.id);
    return otherId ? memberProfiles[otherId] : null;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white p-4 flex items-center justify-center border-b">
        <h1 className="text-xl font-semibold">Notifications</h1>
      </header>

      <div className="grid grid-cols-2 bg-white border-b">
        <button
          className={`py-3 text-sm font-medium ${
            activeTab === 'alerts'
              ? 'text-gray-900 border-b-2 border-pink-500'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('alerts')}
        >
          Alerts
        </button>
        <button
          className={`py-3 text-sm font-medium ${
            activeTab === 'conversations'
              ? 'text-gray-900 border-b-2 border-pink-500'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('conversations')}
        >
          Conversations
        </button>
      </div>

      <div className="p-4 bg-white border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={activeTab === 'alerts' ? "Search alerts..." : "Search conversations..."}
            value={activeTab === 'alerts' ? alertSearchQuery : conversationSearchQuery}
            onChange={(e) => {
              if (activeTab === 'alerts') {
                setAlertSearchQuery(e.target.value);
              } else {
                setConversationSearchQuery(e.target.value);
              }
            }}
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {activeTab === 'alerts' ? (
          <div className="flex flex-col divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onAccept={handleInvitationResponse}
                onDecline={(id) => handleInvitationResponse(id, false)}
                onNavigate={onNavigate}
                groupProfiles={currentGroupProfiles}
              />
            ))}
            {filteredNotifications.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No alerts found
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <ConversationList
              conversations={conversations}
              currentUser={currentUser}
              memberProfiles={memberProfiles}
              onSelectConversation={(id) => {
                setSelectedConversation(id);
                markAsRead(id);
              }}
              searchQuery={conversationSearchQuery}
            />
            <Button
              className="fixed bottom-24 right-4 rounded-full bg-pink-500 hover:bg-pink-600 shadow-lg"
              onClick={() => setShowNewMessage(true)}
            >
              <MessageSquarePlus className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      {activeTab === 'alerts' && (
        <AlertFilters
          currentFilter={filterType}
          onFilterChange={setFilterType}
        />
      )}

      {/* Chat Dialog */}
      {selectedConversation && (
        <ChatDialog
          isOpen={true}
          onClose={() => setSelectedConversation(null)}
          currentUser={currentUser}
          otherUser={getOtherParticipant(selectedConversation)}
          conversationId={selectedConversation}
          messages={getMessages(selectedConversation)}
          onSendMessage={handleSendMessage}
        />
      )}

      {/* New Message Dialog */}
      <NewMessageDialog
        isOpen={showNewMessage}
        onClose={() => setShowNewMessage(false)}
        onStartConversation={handleStartConversation}
        currentUser={currentUser}
        memberProfiles={memberProfiles}
        followedUsers={followedUsers}
      />

      <nav className="fixed bottom-0 left-0 right-0 bg-pink-500 text-white">
        <div className="flex justify-around items-center py-2">
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-pink-600"
            onClick={() => onNavigate('activity')}
          >
            <Map className="h-6 w-6" />
            <span className="text-xs">Activity</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-pink-600"
            onClick={() => onNavigate('groups')}
          >
            <Users className="h-6 w-6" />
            <span className="text-xs">Groups</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-pink-600"
            onClick={() => onNavigate('notifications')}
          >
            <Bell className="h-6 w-6" />
            <span className="text-xs">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-pink-600"
            onClick={() => onNavigate('profile')}
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}