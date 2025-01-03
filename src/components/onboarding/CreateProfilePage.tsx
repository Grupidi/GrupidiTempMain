import { useState, useRef } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Camera, ArrowRight } from "lucide-react";
import { LocationInput } from "../ui/location/LocationInput";
import { MultiSelectInput } from "../ui/MultiSelectInput";
import { interestSuggestions } from "../../data/interestSuggestions";
import { quirkSuggestions } from "../../data/quirkSuggestions";

interface CreateProfilePageProps {
  onProfileCreated: (profileData: {
    profilePicture: string;
    profileImages: string[];
    bio: string;
    location: string;
    interests: string[];
    quirks: string[];
  }) => void;
}

export function CreateProfilePage({ onProfileCreated }: CreateProfilePageProps) {
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [profileImages, setProfileImages] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [quirks, setQuirks] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (!profilePicture) {
          setProfilePicture(imageUrl);
        }
        setProfileImages(prev => [...prev, imageUrl]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onProfileCreated({
      profilePicture,
      profileImages,
      bio,
      location,
      interests,
      quirks
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Your Profile</h1>
          <p className="text-gray-600 mt-2">Let's make your profile awesome!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Pictures */}
          <div className="space-y-4">
            <Label>Profile Pictures</Label>
            <div className="flex flex-wrap gap-4">
              <div 
                className="w-32 h-32 border-4 border-pink-200 rounded-full overflow-hidden cursor-pointer relative"
                onClick={() => fileInputRef.current?.click()}
              >
                {profilePicture ? (
                  <img 
                    src={profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-pink-50">
                    <Camera className="h-8 w-8 text-pink-400" />
                  </div>
                )}
              </div>
              {profileImages.slice(1).map((image, index) => (
                <div key={index} className="w-32 h-32 rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`Additional ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* About Me */}
          <div className="space-y-2">
            <Label htmlFor="bio">About Me</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              className="min-h-[120px]"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Location</Label>
            <LocationInput
              value={location}
              onChange={setLocation}
              placeholder="Where are you based?"
            />
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <Label>Interests & Hobbies</Label>
            <MultiSelectInput
              value={interests}
              onChange={setInterests}
              suggestions={interestSuggestions}
              placeholder="Add interests or select from suggestions..."
              chipClassName="bg-pink-100 text-pink-800"
            />
          </div>

          {/* Quirks */}
          <div className="space-y-2">
            <Label>Personal Quirks</Label>
            <MultiSelectInput
              value={quirks}
              onChange={setQuirks}
              suggestions={quirkSuggestions}
              placeholder="Add quirks or select from suggestions..."
              chipClassName="bg-blue-100 text-blue-800"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-pink-500 hover:bg-pink-600 text-white"
            disabled={!profilePicture || !bio || !location || interests.length === 0}
          >
            Complete Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}