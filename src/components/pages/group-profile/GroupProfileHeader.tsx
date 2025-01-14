import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { User } from "lucide-react";
import { useRef } from 'react';
import { ImageGallery } from './GroupImageGallery';
import { getGroupMembers } from '../../../utils/groups/members';
import { GroupProfile, MemberProfile } from '../../../types/profiles';
import { GroupProfileState } from '../../../types/groupProfile';
import { ImageHandlers } from '../../../types/imageHandlers';

interface GroupProfileHeaderProps {
  groupProfile: GroupProfile;
  memberProfiles: { [key: string]: MemberProfile };
  onMemberClick: (username: string) => void;
  isSavedGroup?: boolean;
  isMember?: boolean;
  state: GroupProfileState;
  updateState: (updates: Partial<GroupProfileState>) => void;
  imageHandlers: ImageHandlers;
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);
  const members = groupProfile?.members ? getGroupMembers(groupProfile.members, memberProfiles) : [];
  const canEdit = isMember && !isSavedGroup;

  const handleImageClick = () => {
    console.log('🔵 Profile image clicked');
    updateState({ isImageExpanded: true });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log('❌ [GroupProfileHeader] No file selected');
      return;
    }

    try {
      console.log('⏳ [GroupProfileHeader] Processing file:', {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      });

      // Verify imageHandlers object
      if (!imageHandlers) {
        console.error('❌ [GroupProfileHeader] imageHandlers is undefined');
        return;
      }

      // Log the entire imageHandlers object
      console.log('🔵 [GroupProfileHeader] Full imageHandlers object:', {
        handlers: imageHandlers,
        keys: Object.keys(imageHandlers),
        addImageType: typeof imageHandlers.handleAddImage,
        handlersType: typeof imageHandlers
      });

      if (typeof imageHandlers.handleAddImage !== 'function') {
        console.error('❌ [GroupProfileHeader] handleAddImage is not a function:', {
          handleAddImage: imageHandlers.handleAddImage,
          type: typeof imageHandlers.handleAddImage
        });
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      console.log('✅ [GroupProfileHeader] Created image URL:', imageUrl);

      await imageHandlers.handleAddImage(imageUrl);
      console.log('✅ [GroupProfileHeader] Image added successfully');

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('❌ [GroupProfileHeader] Failed to add image:', error);
    }
  };

  const handleReplaceFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log('❌ [GroupProfileHeader] No file selected for replacement');
      return;
    }

    try {
      const imageUrl = URL.createObjectURL(file);
      console.log('✅ [GroupProfileHeader] Created image URL for replacement:', imageUrl);

      if (typeof imageHandlers?.handleReplaceImage !== 'function') {
        console.error('❌ [GroupProfileHeader] handleReplaceImage is missing or not a function');
        return;
      }

      await imageHandlers.handleReplaceImage(state.currentImageIndex, imageUrl);
      console.log('✅ [GroupProfileHeader] Image replaced successfully');

      if (replaceFileInputRef.current) {
        replaceFileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('❌ [GroupProfileHeader] Failed to replace image:', error);
    }
  };

  return (
    <div className="bg-pink-500 p-6 relative">
      {/* Header Content */}
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <div 
            className="w-24 h-24 border-4 border-white rounded-full overflow-hidden cursor-pointer mb-4"
            onClick={handleImageClick}
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
        isOpen={state.isImageExpanded}
        onClose={() => updateState({ isImageExpanded: false })}
        currentIndex={state.currentImageIndex}
        onNext={imageHandlers.handleNextImage}
        onPrevious={imageHandlers.handlePreviousImage}
        onAddImage={() => fileInputRef.current?.click()}
        onReplaceImage={(index) => {
          updateState({ currentImageIndex: index });
          replaceFileInputRef.current?.click();
        }}
        onDeleteImage={imageHandlers.handleDeleteImage}
        isMember={isMember}
        canEdit={canEdit}
        fileInputRef={fileInputRef}
        replaceFileInputRef={replaceFileInputRef}
        handleFileSelect={handleFileSelect}
        handleReplaceFileSelect={handleReplaceFileSelect}
      />

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <input
        type="file"
        ref={replaceFileInputRef}
        accept="image/*"
        onChange={handleReplaceFileSelect}
        className="hidden"
      />
    </div>
  );
}