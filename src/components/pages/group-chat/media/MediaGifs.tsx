import { useState } from 'react';
import { MediaProps } from './types';

export function MediaGifs({ groupProfile, memberProfiles }: MediaProps) {
  const [gifs] = useState(() =>
    groupProfile.members.flatMap(memberId => {
      const member = memberProfiles[memberId];
      if (!member) return [];
      return [
        { 
          id: `${memberId}-1`, 
          url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd6Y2E4OWF1dWF6NXJ0M2t5Y3Jxc2t4ZXE2aHd0ZmF6Y2tzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKnrAkwZAd4cYBW/giphy.gif', 
          date: '2024-03-15',
          sender: member.name
        }
      ];
    })
  );

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
      {gifs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No GIFs shared yet
        </div>
      )}
    </div>
  );
}