import { Button } from "../button";
import { ImageGallery } from './ImageGallery';
import { AgeDialog } from './AgeDialog';
import { MemberProfile } from '../../../types/profiles';
import { SocialCreditButton } from '../social-credit/SocialCreditButton';
import { EditableDisplayName } from './EditableDisplayName';
import { calculateAge } from '../../../utils/profile/age';

interface ProfileHeaderProps {
  profile: MemberProfile;
  imageHandlers: any;
  state: any;
  handlers: any;
  onNavigate: (page: string) => void;
  onUpdateProfile: (updates: Partial<MemberProfile>) => void;
}

export function ProfileHeader({ 
  profile,
  imageHandlers,
  state,
  handlers,
  onNavigate,
  onUpdateProfile
}: ProfileHeaderProps) {
  const handleNameChange = (newName: string) => {
    onUpdateProfile({ name: newName });
  };

  return (
    <div className="bg-gradient-to-r from-pink-400 to-pink-500 p-6 relative">
      <div className="flex flex-col items-center gap-4">
        <div 
          className={`w-24 h-24 border-4 border-white rounded-full overflow-hidden ${profile.profileImages?.length > 0 ? 'cursor-pointer' : ''}`}
          onClick={() => imageHandlers.setIsImageExpanded(true)}
        >
          <img 
            src={profile.profilePicture}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>

        <SocialCreditButton
          score={profile.emeraldScore}
          onClick={() => onNavigate('socialCreditScore')}
        />

        <div className="text-center">
          <EditableDisplayName 
            name={profile.name}
            onSave={handleNameChange}
          />
          <p className="text-pink-100">@{profile.username}</p>
          <Button
            variant="ghost"
            className="mt-2 bg-white/20 rounded-full px-3 py-1 text-sm hover:bg-white/30 text-white"
            onClick={() => state.setIsEditingAge(true)}
          >
            Age: {calculateAge(profile.birthday)}
          </Button>
        </div>

        <ImageGallery
          images={profile.profileImages || []}
          isOpen={imageHandlers.isImageExpanded}
          onClose={() => imageHandlers.setIsImageExpanded(false)}
          currentIndex={imageHandlers.currentImageIndex}
          onNext={imageHandlers.handleNextImage}
          onPrevious={imageHandlers.handlePreviousImage}
          onAddImage={imageHandlers.handleCameraClick}
          onReplaceImage={imageHandlers.handleReplaceImage}
          onDeleteImage={imageHandlers.handleDeleteImage}
          fileInputRef={imageHandlers.fileInputRef}
          replaceFileInputRef={imageHandlers.replaceFileInputRef}
          handleFileSelect={imageHandlers.handleFileSelect}
        />

        <AgeDialog
          isOpen={state.isEditingAge}
          onClose={() => state.setIsEditingAge(false)}
          currentBirthday={profile.birthday}
          onSave={handlers.handleSaveAge}
        />
      </div>
    </div>
  );
}