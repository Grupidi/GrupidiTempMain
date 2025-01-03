import { useState } from 'react';
import { GroupImageGallery } from './GroupImageGallery';
import { MemberProfile } from '../../../types/profiles';

interface GroupHeaderProps {
  group: {
    name: string;
    username: string;
    ageRange: string;
    avgAge: number;
    bio: string;
    members: string[];
    images: string[];
  };
  isRejecting: boolean;
  isAccepting: boolean;
  onMemberClick: (memberId: string) => void;
  memberProfiles: { [key: string]: MemberProfile };
}

export function GroupHeader({ 
  group, 
  isRejecting, 
  isAccepting, 
  onMemberClick,
  memberProfiles 
}: GroupHeaderProps) {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter out members that don't have profiles
  const validMembers = group.members.filter(memberId => memberProfiles[memberId]);

  return (
    <div className={`bg-pink-500 p-6 relative transition-transform duration-300 ${isRejecting ? 'translate-x-full' : ''} ${isAccepting ? 'translate-y-full' : ''}`}>
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <div 
            className="w-24 h-24 border-4 border-white rounded-full overflow-hidden cursor-pointer mb-4"
            onClick={() => setIsImageExpanded(true)}
          >
            <img 
              src={group.images[0]}
              alt={group.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-white text-center space-y-1">
            <div className="text-sm">Ages: {group.ageRange}</div>
            <div className="text-sm">Avg: {group.avgAge}</div>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white mb-1">{group.name}</h1>
          <p className="text-pink-100 text-sm mb-2">{group.username}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {validMembers.map((memberId) => {
              const member = memberProfiles[memberId];
              return (
                <button
                  key={memberId}
                  onClick={() => onMemberClick(memberId)}
                  className="bg-white/20 rounded-full px-3 py-1 text-sm text-white hover:bg-white/30 transition-colors cursor-pointer"
                >
                  {member.name}
                </button>
              );
            })}
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h2 className="font-semibold text-white mb-2">About Us</h2>
            <p className="text-sm text-white">{group.bio}</p>
          </div>
        </div>
      </div>

      <GroupImageGallery
        images={group.images}
        groupName={group.name}
        isOpen={isImageExpanded}
        onClose={() => setIsImageExpanded(false)}
        initialImageIndex={currentImageIndex}
      />
    </div>
  );
}