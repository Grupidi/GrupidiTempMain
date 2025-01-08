import { useState } from 'react';
import { MediaProps } from './types';

export function MediaGifs({ groupProfile, memberProfiles }: MediaProps) {
  const [gifs] = useState(() => {
    const memberGifs = groupProfile.members.map(memberId => {
      const member = memberProfiles[memberId];
      if (!member) return null;
      
      const gifExamples = {
        'alice_adventurer': {
          id: 'alice-gif-1',
          url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd6Y2E4OWF1dWF6NXJ0M2t5Y3Jxc2t4ZXE2aHd0ZmF6Y2tzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKnrAkwZAd4cYBW/giphy.gif',
          sender: 'Alice Johnson',
          date: '2024-03-15'
        },
        'bob_hiker': {
          id: 'bob-gif-1',
          url: 'https://media.giphy.com/media/3o7TKnrAkwZAd4cYBW/giphy.gif',
          sender: 'Bob Smith',
          date: '2024-03-15'
        },
        'carol_reads': {
          id: 'carol-gif-1',
          url: 'https://media.giphy.com/media/3o7TKnrAkwZAd4cYBW/giphy.gif',
          sender: 'Carol White',
          date: '2024-03-14'
        },
        'dave_foodie': {
          id: 'dave-gif-1',
          url: 'https://media.giphy.com/media/3o7TKnrAkwZAd4cYBW/giphy.gif',
          sender: 'David Brown',
          date: '2024-03-13'
        }
      };

      return gifExamples[member.username];
    }).filter(Boolean);

    return memberGifs;
  });

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-2">
        {gifs.map((gif) => (
          <div key={gif.id} className="rounded-lg overflow-hidden">
            <img 
              src={gif.url} 
              alt="" 
              className="w-full h-auto"
            />
            <div className="text-xs text-gray-500 mt-1">{gif.sender}</div>
          </div>
        ))}
      </div>
    </div>
  );
}