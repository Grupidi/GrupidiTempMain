import { useState } from 'react';
import { MediaProps } from './types';
import { ExternalLink } from 'lucide-react';
import { Button } from '../../../ui/button';

export function MediaLinks({ groupProfile, memberProfiles }: MediaProps) {
  const [links] = useState(() =>
    groupProfile.members.flatMap(memberId => {
      const member = memberProfiles[memberId];
      if (!member) return [];
      return [
        { 
          id: `${memberId}-1`, 
          url: 'https://example.com/shared-article',
          title: 'Interesting Article About Group Activities',
          preview: 'A comprehensive guide to organizing successful group events...',
          date: '2024-03-15',
          sender: member.name
        },
        { 
          id: `${memberId}-2`, 
          url: 'https://example.com/cool-place',
          title: 'New Hangout Spot Opening Soon',
          preview: 'Check out this amazing new venue perfect for our next meetup!',
          date: '2024-03-14',
          sender: member.name
        }
      ];
    })
  );

  const handleOpenLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        {links.map((link) => (
          <div key={link.id} className="bg-white border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer" 
                    onClick={() => handleOpenLink(link.url)}>
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{link.preview}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-500">{link.sender}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{link.date}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => handleOpenLink(link.url)}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {links.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No links shared yet
        </div>
      )}
    </div>
  );
}