import { useState } from 'react';
import { MediaProps } from './types';

export function MediaVoice({ groupProfile, memberProfiles }: MediaProps) {
  const [voiceMemos] = useState(() =>
    groupProfile.members.flatMap(memberId => {
      const member = memberProfiles[memberId];
      if (!member) return [];
      return [
        { 
          id: `${memberId}-1`, 
          duration: '0:45', 
          sender: member.name, 
          date: '2024-03-15'
        }
      ];
    })
  );

  return (
    <div className="p-4">
      <div className="space-y-4">
        {voiceMemos.map((memo) => (
          <div key={memo.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{memo.sender}</span>
              <span className="text-sm text-gray-500">{memo.duration}</span>
            </div>
            <div className="text-sm text-gray-500">{memo.date}</div>
          </div>
        ))}
      </div>
      {voiceMemos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No voice memos shared yet
        </div>
      )}
    </div>
  );
}