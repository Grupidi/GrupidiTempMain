import { useState } from 'react';
import { MediaProps } from './types';
import { ExternalLink } from 'lucide-react';
import { Button } from '../../../ui/button';

export function MediaLinks({ groupProfile, memberProfiles }: MediaProps) {
  const [links] = useState(() => {
    const memberLinks = groupProfile.members.map(memberId => {
      const member = memberProfiles[memberId];
      if (!member) return null;
      
      const linkExamples = {
        'alice_adventurer': {
          id: 'alice-link-1',
          url: 'https://example.com/hiking-guide',
          title: 'Best Hiking Trails in Bay Area',
          preview: 'A comprehensive guide to the most scenic hiking trails...',
          sender: 'Alice Johnson',
          date: '2024-03-15'
        },
        'bob_hiker': {
          id: 'bob-link-1',
          url: 'https://example.com/hiking-gear',
          title: 'Essential Hiking Gear Guide',
          preview: 'Everything you need to know about hiking equipment...',
          sender: 'Bob Smith',
          date: '2024-03-15'
        },
        'carol_reads': {
          id: 'carol-link-1',
          url: 'https://example.com/book-review',
          title: 'Monthly Book Review: Classic Literature',
          preview: 'An in-depth analysis of this month\'s book club selection...',
          sender: 'Carol White',
          date: '2024-03-14'
        },
        'dave_foodie': {
          id: 'dave-link-1',
          url: 'https://example.com/reading-snacks',
          title: 'Perfect Snacks for Book Club Meetings',
          preview: 'Curated selection of snacks that won\'t damage books...',
          sender: 'David Brown',
          date: '2024-03-13'
        }
      };

      return linkExamples[member.username];
    }).filter(Boolean);

    return memberLinks;
  });

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