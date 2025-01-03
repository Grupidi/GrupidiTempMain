import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../ui/tabs";
import { ImageIcon, Gift, Mic, BarChart2, Link } from 'lucide-react';
import { MediaPhotos } from './media/MediaPhotos';
import { MediaGifs } from './media/MediaGifs';
import { MediaVoice } from './media/MediaVoice';
import { MediaPolls } from './media/MediaPolls';
import { MediaLinks } from './media/MediaLinks';

interface MediaGalleryProps {
  activeTab: 'gifs' | 'photos' | 'voice' | 'polls' | 'links';
  onTabChange: (tab: 'gifs' | 'photos' | 'voice' | 'polls' | 'links') => void;
  groupProfile: {
    id: string;
    name: string;
    members: string[];
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

export function MediaGallery({ 
  activeTab, 
  onTabChange,
  groupProfile,
  memberProfiles 
}: MediaGalleryProps) {
  return (
    <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as 'gifs' | 'photos' | 'voice' | 'polls' | 'links')} className="h-full flex flex-col">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="photos" className="flex flex-col items-center py-2">
          <ImageIcon className="h-5 w-5 mb-1" />
          <span className="text-xs">Photos</span>
        </TabsTrigger>
        <TabsTrigger value="gifs" className="flex flex-col items-center py-2">
          <Gift className="h-5 w-5 mb-1" />
          <span className="text-xs">GIFs</span>
        </TabsTrigger>
        <TabsTrigger value="voice" className="flex flex-col items-center py-2">
          <Mic className="h-5 w-5 mb-1" />
          <span className="text-xs">Voice</span>
        </TabsTrigger>
        <TabsTrigger value="polls" className="flex flex-col items-center py-2">
          <BarChart2 className="h-5 w-5 mb-1" />
          <span className="text-xs">Polls</span>
        </TabsTrigger>
        <TabsTrigger value="links" className="flex flex-col items-center py-2">
          <Link className="h-5 w-5 mb-1" />
          <span className="text-xs">Links</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="photos" className="flex-1 overflow-y-auto">
        <MediaPhotos groupProfile={groupProfile} memberProfiles={memberProfiles} />
      </TabsContent>

      <TabsContent value="gifs" className="flex-1 overflow-y-auto">
        <MediaGifs groupProfile={groupProfile} memberProfiles={memberProfiles} />
      </TabsContent>

      <TabsContent value="voice" className="flex-1 overflow-y-auto">
        <MediaVoice groupProfile={groupProfile} memberProfiles={memberProfiles} />
      </TabsContent>

      <TabsContent value="polls" className="flex-1 overflow-y-auto">
        <MediaPolls groupProfile={groupProfile} memberProfiles={memberProfiles} />
      </TabsContent>

      <TabsContent value="links" className="flex-1 overflow-y-auto">
        <MediaLinks groupProfile={groupProfile} memberProfiles={memberProfiles} />
      </TabsContent>
    </Tabs>
  );
}