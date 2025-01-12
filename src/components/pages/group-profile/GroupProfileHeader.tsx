import { Button } from "../../ui/button";
import { ImageGallery } from './GroupImageGallery';
import { MemberProfile } from '../../../types/profiles';
import { getGroupMembers } from '../../../utils/groups/members';
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { User } from "lucide-react";

interface GroupProfileHeaderProps {
  groupProfile: GroupProfile;
  memberProfiles: { [key: string]: MemberProfile };
  onMemberClick: (username: string) => void;
  isSavedGroup?: boolean;
  isMember?: boolean;
  state: GroupProfileState;
  updateState: (updates: Partial<GroupProfileState>) => void;
  imageHandlers: {
    isImageExpanded: boolean;
    setIsImageExpanded: (value: boolean) => void;
    currentImageIndex: number;
    handleNextImage: () => void;
    handlePreviousImage: () => void;
    handleCameraClick: () => void;
    handleReplaceImage: (index: number) => void;
    handleDeleteImage: (index: number) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    replaceFileInputRef: React.RefObject<HTMLInputElement>;
    handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

export function GroupProfileHeader({ 
  groupProfile,
  memberProfiles,
  onMemberClick,
  isSavedGroup = false,
  isMember = false,
  state,
  updateState,
  imageHandlers
}: GroupProfileHeaderProps) {
  const members = groupProfile?.members ? getGroupMembers(groupProfile.members, memberProfiles) : [];
  const canEdit = isMember && !isSavedGroup;

  return (
    <div className="bg-pink-500 p-6 relative">
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <div 
            className="w-24 h-24 border-4 border-white rounded-full overflow-hidden cursor-pointer mb-4"
            onClick={() => imageHandlers.setIsImageExpanded(true)}
          >
            <img 
              src={groupProfile.images[0]}
              alt={groupProfile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-white text-center space-y-1">
            <div className="text-sm">Ages: {groupProfile.ageRange}</div>
            <div className="text-sm">Avg: {groupProfile.avgAge}</div>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white mb-1">{groupProfile.name}</h1>
          <p className="text-pink-100 text-sm mb-2">{groupProfile.username}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {members.map((member) => (
              <Button
                key={member.id}
                variant="ghost"
                onClick={() => onMemberClick(member.username)}
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
            <p className="text-sm text-white">{groupProfile.bio}</p>
          </div>
        </div>
      </div>

      <ImageGallery
        images={groupProfile.images}
        groupName={groupProfile.name}
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