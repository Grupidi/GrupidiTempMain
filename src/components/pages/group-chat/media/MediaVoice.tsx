import { useState } from 'react';
import { MediaProps } from './types';

export function MediaVoice({ groupProfile, memberProfiles }: MediaProps) {
  const [voiceMemos] = useState(() => {
    const memberMemos = groupProfile.members.map(memberId => {
      const member = memberProfiles[memberId];
      if (!member) return null;
      
      const voiceExamples = {
        'alice_adventurer': {
          id: 'alice-voice-1',
          duration: '0:45',
          sender: 'Alice Johnson',
          date: '2024-03-15'
        },
        'bob_hiker': {
          id: 'bob-voice-1',
          duration: '1:30',
          sender: 'Bob Smith',
          date: '2024-03-15'
        },
        'carol_reads': {
          id: 'carol-voice-1',
          duration: '1:20',
          sender: 'Carol White',
          date: '2024-03-14'
        },
        'dave_foodie': {
          id: 'dave-voice-1',
          duration: '0:55',
          sender: 'David Brown',
          date: '2024-03-13'
        }
      };

      return voiceExamples[member.username];
    }).filter(Boolean);

    return memberMemos;
  });

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