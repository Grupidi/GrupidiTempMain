import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { User } from "lucide-react";
import { ImageGallery } from './ImageGallery';
import { calculateAge } from '../../../utils/profile/age';

interface ProfileHeaderProps {
  profile: {
    name: string;
    username: string;
    birthday: string;
    profilePicture: string;
    profileImages: string[];
  };
  onNavigate: (page: string) => void;
  onImageClick: () => void;
  isImageExpanded: boolean;
  currentImageIndex: number;
  onNextImage: () => void;
  onPreviousImage: () => void;
  setIsImageExpanded: (expanded: boolean) => void;
}

export function ProfileHeader({ 
  profile,
  onNavigate,
  onImageClick,
  isImageExpanded,
  currentImageIndex,
  onNextImage,
  onPreviousImage,
  setIsImageExpanded
}: ProfileHeaderProps) {
  const hasGallery = profile.profileImages?.length > 0;
  const age = calculateAge(profile.birthday);

  return (
    <div className="p-6 relative">
      <div className="flex flex-col items-center gap-4">
        <div 
          className={`w-24 h-24 border-4 border-white rounded-full overflow-hidden ${hasGallery ? 'cursor-pointer' : ''}`}
          onClick={hasGallery ? onImageClick : undefined}
        >
          <img 
            src={profile.profilePicture}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center text-white">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-pink-100">@{profile.username}</p>
          <div className="mt-2 inline-block bg-white/20 rounded-full px-3 py-1 text-sm">
            Age: {age}
          </div>
        </div>

        <ImageGallery
          images={profile.profileImages}
          isOpen={isImageExpanded}
          onClose={() => setIsImageExpanded(false)}
          currentIndex={currentImageIndex}
          onNext={onNextImage}
          onPrevious={onPreviousImage}
        />
      </div>
    </div>
  );
}