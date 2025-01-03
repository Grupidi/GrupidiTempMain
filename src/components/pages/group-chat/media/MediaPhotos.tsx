import { useState } from 'react';
import { MediaProps } from './types';

export function MediaPhotos({ groupProfile, memberProfiles }: MediaProps) {
  const [photos] = useState(() => 
    groupProfile.members.flatMap(memberId => {
      const member = memberProfiles[memberId];
      if (!member) return [];
      return [
        { 
          id: `${memberId}-1`, 
          url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3', 
          type: 'image', 
          date: '2024-03-15',
          sender: member.name
        }
      ];
    })
  );

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-1">
        {photos.map((photo) => (
          <div key={photo.id} className="aspect-square">
            <img 
              src={photo.url} 
              alt="" 
              className="w-full h-full object-cover"
            />
            <div className="text-xs text-gray-500 mt-1">{photo.sender}</div>
          </div>
        ))}
      </div>
      {photos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No photos shared yet
        </div>
      )}
    </div>
  );
}