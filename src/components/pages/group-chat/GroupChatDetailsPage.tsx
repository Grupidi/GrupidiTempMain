import { useState } from 'react';
import { Button } from "../../ui/button";
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../ui/tabs";
import { MembersList } from './MembersList';
import { MediaGallery } from './MediaGallery';
import { GroupChatDetailsProps } from './types';

export default function GroupChatDetailsPage({ 
  onClose, 
  onNavigate, 
  groupProfile, 
  memberProfiles 
}: GroupChatDetailsProps) {
  const [activeTab, setActiveTab] = useState<'members' | 'media'>('members');
  const [activeMediaTab, setActiveMediaTab] = useState<'gifs' | 'photos' | 'voice' | 'polls' | 'links'>('photos');

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <header className="bg-white border-b px-4 py-3 flex items-center">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Group Details</h1>
      </header>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'members' | 'media')} className="flex-1">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1">
          <TabsTrigger value="members" className="data-[state=active]:bg-white rounded-md">
            Members ({groupProfile.members.length})
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-white rounded-md">
            Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="flex-1 overflow-y-auto">
          <MembersList
            members={groupProfile.members}
            memberProfiles={memberProfiles}
            onViewProfile={(memberId) => onNavigate('memberProfile', memberId)}
          />
        </TabsContent>

        <TabsContent value="media" className="flex-1 overflow-hidden">
          <MediaGallery
            activeTab={activeMediaTab}
            onTabChange={setActiveMediaTab}
            groupProfile={groupProfile}
            memberProfiles={memberProfiles}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}