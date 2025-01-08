import { useState } from 'react';
import { MediaProps } from './types';

export function MediaPhotos({ groupProfile, memberProfiles }: MediaProps) {
  console.log('MediaPhotos received:', {
    groupProfile,
    memberProfiles,
    members: groupProfile.members
  });

  const [photos] = useState(() => {
    const memberPhotos = groupProfile.members.map(memberId => {
      const member = memberProfiles[memberId];
      console.log('Processing member:', { memberId, member });
      if (!member) return null;
      
      const photoExamples = {
        'alice_adventurer': {
          id: 'alice-1',
          url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3',
          sender: 'Alice Johnson',
          date: '2024-03-15'
        },
        'bob_hiker': {
          id: 'bob-1',
          url: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-4.0.3',
          sender: 'Bob Smith',
          date: '2024-03-15'
        },
        'carol_reads': {
          id: 'carol-1',
          url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3',
          sender: 'Carol White',
          date: '2024-03-14'
        },
        'dave_foodie': {
          id: 'dave-1',
          url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3',
          sender: 'David Brown',
          date: '2024-03-13'
        }
      };

      return photoExamples[member.username];
    }).filter(Boolean);

    console.log('Final photos:', memberPhotos);
    return memberPhotos;
  });

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