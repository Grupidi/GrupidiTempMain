import { useState, useRef } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Map, Users, Bell, User, Camera, Sparkles, ArrowLeft, ChevronLeft, ChevronRight, X, Upload } from 'lucide-react';
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { LocationAutocomplete } from "../ui/location/LocationAutocomplete";
import { MultiSelectInput } from "../ui/MultiSelectInput";
import { GroupProfile } from '../../types/profiles';
import { calculateGroupAgeStats } from '../../utils/groupAgeCalculations';
import { INTEREST_SUGGESTIONS, QUIRK_SUGGESTIONS } from '../../data/suggestions';

interface CreateFriendGroupPageProps {
  onNavigate: (page: string) => void;
  addNewGroup?: (group: GroupProfile) => void;
}

export default function CreateFriendGroupPage({ onNavigate, addNewGroup }: CreateFriendGroupPageProps) {
  const [groupName, setGroupName] = useState('');
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [groupImages, setGroupImages] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [quirks, setQuirks] = useState<string[]>([]);
  const [aboutUs, setAboutUs] = useState('');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [showAvatarControls, setShowAvatarControls] = useState(false);
  const [avatarImageIndex, setAvatarImageIndex] = useState(0);

  const singleFileInputRef = useRef<HTMLInputElement>(null);
  const multipleFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (files: FileList) => {
    const newImages: string[] = [];
    let processed = 0;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target?.result as string);
        processed++;
        
        if (processed === files.length) {
          setGroupImages(prevImages => [...prevImages, ...newImages]);
          setShowUploadDialog(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCreateGroup = () => {
    if (!groupName || !username || !location || !aboutUs || groupImages.length === 0) {
      alert('Please fill in all required fields and add at least one image.');
      return;
    }

    const { ageRange, avgAge } = calculateGroupAgeStats(
      ['Alice Johnson'],
      { "Alice Johnson": { birthday: "1995-06-15" } as any }
    );

    const newGroup: GroupProfile = {
      id: username.toLowerCase().replace(/[^a-z0-9]/g, ''),
      name: groupName,
      username: username.startsWith('@') ? username : `@${username}`,
      description: aboutUs.slice(0, 100),
      ageRange,
      avgAge,
      location,
      members: ['Alice Johnson'], // Add creator as initial member
      bio: aboutUs,
      interests,
      quirks,
      images: groupImages
    };

    addNewGroup?.(newGroup);
    onNavigate('groups');
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === groupImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? groupImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextAvatarImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAvatarImageIndex((prevIndex) => 
      prevIndex === groupImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousAvatarImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAvatarImageIndex((prevIndex) => 
      prevIndex === 0 ? groupImages.length - 1 : prevIndex - 1
    );
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setGroupImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    if (currentImageIndex >= indexToRemove && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
    if (avatarImageIndex >= indexToRemove && avatarImageIndex > 0) {
      setAvatarImageIndex(avatarImageIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-[#ff80df] flex flex-col">
      <header className="bg-white shadow-md px-4 py-4 border-b border-pink-300 flex items-center fixed top-0 left-0 right-0 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-4" 
          onClick={() => onNavigate('groups')}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-center text-black flex-1 mr-10">Create Your Friend Group</h1>
      </header>

      <div className="flex-1 w-full p-6 flex flex-col items-center overflow-y-auto pt-20 pb-24">
        <Card className="w-full max-w-md bg-white shadow-xl rounded-xl overflow-hidden border border-pink-200">
          <CardHeader className="bg-[#ff80df] text-white p-6">
            <CardTitle className="text-2xl font-bold text-center">Group Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-center mb-6">
              <div 
                className="relative group"
                onMouseEnter={() => setShowAvatarControls(true)}
                onMouseLeave={() => setShowAvatarControls(false)}
              >
                <div 
                  className="h-32 w-32 border-4 border-white shadow-lg cursor-pointer rounded-full overflow-hidden"
                  onClick={() => groupImages.length > 0 && setIsImageExpanded(true)}
                >
                  {groupImages[avatarImageIndex] ? (
                    <img
                      src={groupImages[avatarImageIndex]}
                      alt="Group Icon"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                {groupImages.length > 1 && showAvatarControls && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 -left-2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white"
                      onClick={handlePreviousAvatarImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 -right-2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white"
                      onClick={handleNextAvatarImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-[#ff80df] hover:bg-pink-500 text-white shadow-md"
                  onClick={() => setShowUploadDialog(true)}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {groupImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mb-6">
                {groupImages.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg cursor-pointer"
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setIsImageExpanded(true);
                      }}
                    />
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(index);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  placeholder="Enter a catchy group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="border-pink-300 focus:ring-[#ff80df] focus:border-[#ff80df]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Group Username</Label>
                <Input
                  id="username"
                  placeholder="@your_group_handle"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-pink-300 focus:ring-[#ff80df] focus:border-[#ff80df]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aboutUs">About Us</Label>
                <Textarea
                  id="aboutUs"
                  placeholder="Tell everyone what makes your group special! Share your group's story, mission, and what brings you all together."
                  value={aboutUs}
                  onChange={(e) => setAboutUs(e.target.value)}
                  className="min-h-[120px] border-pink-300 focus:ring-[#ff80df] focus:border-[#ff80df]"
                />
              </div>

              <div className="space-y-2">
                <LocationAutocomplete
                  value={location}
                  onChange={setLocation}
                  placeholder="Where's your group based?"
                />
              </div>

              <div className="space-y-2">
                <Label>Interests/Hobbies</Label>
                <MultiSelectInput
                  value={interests}
                  onChange={setInterests}
                  suggestions={INTEREST_SUGGESTIONS}
                  placeholder="Add interests or select from suggestions..."
                  chipClassName="bg-pink-100 text-pink-800"
                />
              </div>

              <div className="space-y-2">
                <Label>Group Quirks</Label>
                <MultiSelectInput
                  value={quirks}
                  onChange={setQuirks}
                  suggestions={QUIRK_SUGGESTIONS}
                  placeholder="Add quirks or select from suggestions..."
                  chipClassName="bg-blue-100 text-blue-800"
                />
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full bg-[#ff80df] hover:bg-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105" 
                  onClick={handleCreateGroup}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create Your Awesome Group
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Photos</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 p-4">
            <Button
              className="flex flex-col items-center gap-2 p-6 bg-pink-50 hover:bg-pink-100 border-2 border-dashed border-pink-200"
              onClick={() => singleFileInputRef.current?.click()}
            >
              <Camera className="h-8 w-8 text-pink-500" />
              <span className="text-sm font-medium">Single Photo</span>
            </Button>
            <Button
              className="flex flex-col items-center gap-2 p-6 bg-pink-50 hover:bg-pink-100 border-2 border-dashed border-pink-200"
              onClick={() => multipleFileInputRef.current?.click()}
            >
              <Upload className="h-8 w-8 text-pink-500" />
              <span className="text-sm font-medium">Multiple Photos</span>
            </Button>
          </div>
          <input
            ref={singleFileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          />
          <input
            ref={multipleFileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          />
        </DialogContent>
      </Dialog>

      {/* Image Expansion Dialog */}
      <Dialog open={isImageExpanded} onOpenChange={setIsImageExpanded}>
        <DialogContent className="sm:max-w-[800px] p-0">
          <div className="relative">
            <img
              src={groupImages[currentImageIndex]}
              alt={`Group photo ${currentImageIndex + 1}`}
              className="w-full h-auto"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70"
              onClick={() => setIsImageExpanded(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            {groupImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 left-2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
                  onClick={handlePreviousImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <nav className="fixed bottom-0 left-0 right-0 bg-pink-500 text-white z-10">
        <div className="flex justify-around items-center py-2">
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-pink-600"
            onClick={() => onNavigate('activity')}
          >
            <Map className="h-6 w-6" />
            <span className="text-xs">Activity</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-pink-600"
            onClick={() => onNavigate('groups')}
          >
            <Users className="h-6 w-6" />
            <span className="text-xs">Groups</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-pink-600"
            onClick={() => onNavigate('notifications')}
          >
            <Bell className="h-6 w-6" />
            <span className="text-xs">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-pink-600"
            onClick={() => onNavigate('profile')}
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}