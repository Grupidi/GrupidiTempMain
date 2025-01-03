import { useState } from 'react';
import { MediaProps } from './types';

export function MediaPolls({ groupProfile, memberProfiles }: MediaProps) {
  const [polls] = useState(() =>
    groupProfile.members.flatMap(memberId => {
      const member = memberProfiles[memberId];
      if (!member) return [];
      return [
        { 
          id: `${memberId}-1`, 
          question: 'Next meetup location?', 
          options: ['Park', 'Coffee Shop', 'Library'],
          votes: [3, 2, 1],
          date: '2024-03-15',
          sender: member.name
        }
      ];
    })
  );

  return (
    <div className="p-4">
      <div className="space-y-6">
        {polls.map((poll) => (
          <div key={poll.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{poll.question}</h3>
              <span className="text-sm text-gray-500">{poll.sender}</span>
            </div>
            <div className="space-y-2">
              {poll.options.map((option, index) => {
                const totalVotes = poll.votes.reduce((a, b) => a + b, 0);
                const percentage = (poll.votes[index] / totalVotes) * 100;
                
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{option}</span>
                      <span>{poll.votes[index]} votes</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-pink-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 text-sm text-gray-500">{poll.date}</div>
          </div>
        ))}
      </div>
      {polls.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No polls created yet
        </div>
      )}
    </div>
  );
}