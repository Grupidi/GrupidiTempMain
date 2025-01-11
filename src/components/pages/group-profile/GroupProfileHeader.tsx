import { Button } from "../../ui/button";
import { ImageGallery } from './GroupImageGallery';
import { MemberProfile } from '../../../types/profiles';
import { getGroupMembers } from '../../../utils/groups/members';

interface GroupProfileHeaderProps {
  group: {
    name: string;
    username: string;
    ageRange: string;
    avgAge: number;
    bio: string;
    members: string[];
    images: string[];
  };
  state: any;
  updateState: (updates: Partial<any>) => void;
  onMemberClick: (memberId: string) => void;
  memberProfiles: { [key: string]: MemberProfile };
  imageHandlers: any;
  isSavedGroup?: boolean;
  isMember?: boolean;
}

export function GroupProfileHeader({ 
  group,
  state,
  updateState,
  onMemberClick,
  memberProfiles,
  imageHandlers,
  isSavedGroup = false,
  isMember = false
}: GroupProfileHeaderProps) {
  // Add null check for group
  if (!group) {
    console.warn('Group is undefined');
    return <div>Loading group profile...</div>;
  }

  // Log the incoming data
  console.log('GroupProfileHeader data:', {
    group,
    memberProfiles,
    members: group.members
  });

  // Ensure members array uses usernames
  const members = getGroupMembers(
    group.members.map(member => 
      // If member is a full name, try to find corresponding username
      memberProfiles[member]?.username || member
    ), 
    memberProfiles
  );

  const canEdit = isMember && !isSavedGroup;

  const handleMemberClick = (member: MemberProfile) => {
    console.log('Member clicked:', { member });
    // Pass the username instead of id
    onMemberClick(member.username);
  };

  return (
    <div className="bg-pink-500 p-6 relative">
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <div 
            className="w-24 h-24 border-4 border-white rounded-full overflow-hidden cursor-pointer mb-4"
            onClick={() => imageHandlers.setIsImageExpanded(true)}
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
          {/* Fix #1: Ensure member buttons are rounded */}
          <div className="flex flex-wrap gap-2 mb-4">
            {members.map((member) => (
              <Button
                key={member.id}
                variant="ghost"
                onClick={() => handleMemberClick(member)}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full px-3 py-1 h-auto text-sm"
              >
                {member.name}
              </Button>
            ))}
          </div>
          <div 
            className={`bg-white/20 rounded-lg p-4 ${canEdit ? 'cursor-pointer hover:bg-white/30' : ''} transition-colors`}
            onClick={() => canEdit && updateState({ isEditingBio: true })}
          >
            <h2 className="font-semibold text-white mb-2">About Us</h2>
            <p className="text-sm text-white">{group.bio}</p>
          </div>
        </div>
      </div>

      <ImageGallery
        images={group.images}
        groupName={group.name}
        isOpen={imageHandlers.isImageExpanded}
        onClose={() => imageHandlers.setIsImageExpanded(false)}
        currentIndex={imageHandlers.currentImageIndex}
        onNext={imageHandlers.handleNextImage}
        onPrevious={imageHandlers.handlePreviousImage}
        onAddImage={imageHandlers.handleCameraClick}
        onReplaceImage={imageHandlers.handleReplaceImage}
        onDeleteImage={imageHandlers.handleDeleteImage}
        isMember={isMember}
        fileInputRef={imageHandlers.fileInputRef}
        replaceFileInputRef={imageHandlers.replaceFileInputRef}
        handleFileSelect={imageHandlers.handleFileSelect}
      />
    </div>
  );
}