import { useState } from 'react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Calendar, Gift, Camera, Mic, BarChart2, Send } from 'lucide-react';
import CalendarPage from './CalendarPage';
import GIFMaker from './GIFMaker';
import CameraRollUpload from './CameraRollUpload';
import VoiceMemoRecorder from './VoiceMemoRecorder';
import PollCreator from './PollCreator';
import GroupChatDetailsPage from './group-chat/GroupChatDetailsPage';
import { ChatMessage } from './group-chat/types';
import { ChatMessageList } from './group-chat/ChatMessageList';
import { ChatInput } from './group-chat/ChatInput';
import { getGroupMembers } from '../../utils/groups/members';

interface GroupChatPageProps {
  onNavigate: (page: string, memberId?: string, groupId?: string) => void;
  groupProfile: {
    id: string;
    name: string;
    description: string;
    ageRange: string;
    avgAge: number;
    location: string;
    members: string[];
    bio: string;
    interests: string[];
    quirks: string[];
    images: string[];
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

export default function GroupChatPage({ onNavigate, groupProfile, memberProfiles }: GroupChatPageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', content: 'Hello Grupidi!', isSelf: false },
    { id: '2', content: 'Hi Grupidi!', isSelf: true },
  ]);
  const [inputText, setInputText] = useState('');
  const [currentView, setCurrentView] = useState<'chat' | 'calendar' | 'gifmaker' | 'cameraroll' | 'voicerecorder' | 'pollcreator' | 'details'>('chat');

  // Get valid members
  const members = getGroupMembers(groupProfile.members, memberProfiles);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        content: inputText,
        isSelf: true,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const handleMembersClick = () => {
    setCurrentView('details');
  };

  const handleBackClick = () => {
    if (currentView !== 'chat') {
      setCurrentView('chat');
    } else {
      onNavigate('groupProfile', undefined, groupProfile.id);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'calendar':
        return <CalendarPage onClose={() => setCurrentView('chat')} groupId={groupProfile.id} />;
      case 'gifmaker':
        return <GIFMaker onClose={() => setCurrentView('chat')} />;
      case 'cameraroll':
        return <CameraRollUpload onClose={() => setCurrentView('chat')} />;
      case 'voicerecorder':
        return <VoiceMemoRecorder onClose={() => setCurrentView('chat')} />;
      case 'pollcreator':
        return <PollCreator onClose={() => setCurrentView('chat')} />;
      case 'details':
        return (
          <GroupChatDetailsPage 
            onClose={() => setCurrentView('chat')}
            onNavigate={onNavigate}
            groupProfile={{
              id: groupProfile.id,
              name: groupProfile.name,
              members: members.map(m => m.id)
            }}
            memberProfiles={memberProfiles}
          />
        );
      default:
        return (
          <>
            <ChatMessageList messages={messages} />
            <ChatInput
              value={inputText}
              onChange={setInputText}
              onSend={handleSend}
              onGifClick={() => setCurrentView('gifmaker')}
              onCameraClick={() => setCurrentView('cameraroll')}
              onVoiceClick={() => setCurrentView('voicerecorder')}
              onPollClick={() => setCurrentView('pollcreator')}
            />
          </>
        );
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      <header className="bg-white p-4 flex items-center justify-between border-b w-full">
        <Button variant="ghost" size="icon" className="text-gray-500" onClick={handleBackClick}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="text-center flex-1">
          <h1 className="text-xl font-semibold">{groupProfile.name}</h1>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm text-gray-500 font-normal"
            onClick={handleMembersClick}
          >
            {members.length} Members
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="text-pink-500" onClick={() => setCurrentView('calendar')}>
          <Calendar className="h-6 w-6" />
        </Button>
      </header>
      {renderView()}
    </div>
  );
}