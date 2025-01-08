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

  // Get member usernames from the profiles
  const memberUsernames = groupProfile.members.map(member => {
    // If it's a display name, find the corresponding username
    if (member.includes(' ')) {
      const profile = Object.values(memberProfiles).find(p => p.name === member);
      return profile ? profile.username : member;
    }
    // Remove @ if present
    return member.replace('@', '');
  });

  console.log('GroupChatDetailsPage received:', {
    groupProfile,
    memberProfiles,
    originalMembers: groupProfile.members,
    normalizedUsernames: memberUsernames
  });

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <header className="bg-white border-b px-4 py-3 flex items-center">
        <Button 
          variant="ghost" 
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
            Members ({memberUsernames.length})
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-white rounded-md">
            Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="flex-1 overflow-y-auto">
          <MembersList
            members={memberUsernames}
            memberProfiles={memberProfiles}
            onViewProfile={(username) => onNavigate('memberProfile', username)}
          />
        </TabsContent>

        <TabsContent value="media" className="flex-1 overflow-hidden">
          <MediaGallery
            activeTab="photos"
            onTabChange={() => {}}
            groupProfile={groupProfile}
            memberProfiles={memberProfiles}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}