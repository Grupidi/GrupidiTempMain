import { useState, useEffect, useMemo } from 'react';
import { GroupProfile, MemberProfile } from '../../../types/profiles';
import { useGroupProfileState } from '../../../hooks/useGroupProfileState';
import { isMemberOfGroup } from '../../../utils/groups/members';
import { GroupProfileHeader } from './GroupProfileHeader';
import { ImageHandlers } from '../../../types/imageHandlers';

interface GroupProfileProps {
  groupProfile: GroupProfile;
  memberProfiles: { [key: string]: MemberProfile };
  updateGroupProfile: (updates: Partial<GroupProfile>) => Promise<void>;
  onNavigate: (page: string, param?: string) => void;
  isSavedGroup?: boolean;
}

export function GroupProfilePage({
  groupProfile,
  memberProfiles,
  updateGroupProfile,
  onNavigate,
  isSavedGroup
}: GroupProfileProps) {
  console.log('🔍 [GroupProfilePage] groupProfile:', groupProfile);
  console.log('🔍 [GroupProfilePage] updateGroupProfile:', updateGroupProfile);

  const { state, updateState } = useGroupProfileState(groupProfile);
  const currentUser = memberProfiles["alice_adventurer"];
  const [isMember, setIsMember] = useState(false);

  const imageHandlers = useMemo<ImageHandlers>(() => {
    console.log('🔵 [GroupProfilePage] Creating image handlers with:', {
      hasGroupProfile: !!groupProfile,
      hasImages: !!(groupProfile?.images),
      hasUpdateFn: !!updateGroupProfile
    });

    // Create a plain object with the handlers
    return {
      handleNextImage() {
        const nextIndex = (state.currentImageIndex + 1) % groupProfile.images.length;
        updateState({ currentImageIndex: nextIndex });
      },
      handlePreviousImage() {
        const prevIndex =
          state.currentImageIndex === 0
            ? groupProfile.images.length - 1
            : state.currentImageIndex - 1;
        updateState({ currentImageIndex: prevIndex });
      },
      async handleAddImage(imageUrl: string) {
        console.log('🔵 [GroupProfilePage] Adding image:', imageUrl);
        
        if (!imageUrl) {
          console.error('❌ [GroupProfilePage] No image URL provided');
          return;
        }

        try {
          const newImages = [...(groupProfile.images || []), imageUrl];
          await updateGroupProfile({
            ...groupProfile,
            images: newImages,
          });

          updateState({
            currentImageIndex: newImages.length - 1,
            isImageExpanded: true,
          });

          console.log('✅ [GroupProfilePage] Image added successfully');
        } catch (error) {
          console.error('❌ [GroupProfilePage] Failed to add image:', error);
          throw error;
        }
      },
      async handleReplaceImage(index: number, imageUrl: string) {
        console.log('🔵 [GroupProfilePage] Replacing image at index:', index);
        const newImages = [...groupProfile.images];
        newImages[index] = imageUrl;
        await updateGroupProfile({
          ...groupProfile,
          images: newImages,
        });
      },
      async handleDeleteImage(index: number) {
        console.log('🔵 [GroupProfilePage] Deleting image at index:', index);
        const newImages = groupProfile.images.filter((_, i) => i !== index);
        await updateGroupProfile({
          ...groupProfile,
          images: newImages,
        });
      }
    } as const;
  }, [groupProfile, state.currentImageIndex, updateState, updateGroupProfile]);

  // Add an effect to monitor imageHandlers changes
  useEffect(() => {
    console.log('🔵 [GroupProfilePage] ImageHandlers updated:', {
      handlersExist: !!imageHandlers,
      addImageType: typeof imageHandlers?.handleAddImage,
      handlers: imageHandlers
    });
  }, [imageHandlers]);

  useEffect(() => {
    if (currentUser && groupProfile) {
      setIsMember(isMemberOfGroup(currentUser, groupProfile));
    }
  }, [currentUser, groupProfile]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <GroupProfileHeader
          groupProfile={groupProfile}
          memberProfiles={memberProfiles}
          onMemberClick={(username: string) => onNavigate('memberProfile', username)}
          isSavedGroup={isSavedGroup}
          isMember={isMember}
          state={state}
          updateState={updateState}
          imageHandlers={imageHandlers}
        />
      </div>
    </div>
  );
} 