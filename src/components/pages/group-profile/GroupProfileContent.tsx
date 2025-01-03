import { Card, CardContent } from "../../ui/card";
import { MapPin, Users, Heart, Sparkles } from 'lucide-react';
import { GroupProfileProps, GroupProfileState } from '../../../types/groupProfile';

interface GroupProfileContentProps {
  groupProfile: GroupProfileProps['groupProfile'];
  state: GroupProfileState;
  updateState: (updates: Partial<GroupProfileState>) => void;
  isSavedGroup?: boolean;
  isMember?: boolean;
}

export function GroupProfileContent({ 
  groupProfile,
  state,
  updateState,
  isSavedGroup = false,
  isMember = false
}: GroupProfileContentProps) {
  const canEdit = isMember && !isSavedGroup;

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="grid grid-cols-2 gap-4">
        <Card 
          className={`bg-white shadow-sm ${canEdit ? 'cursor-pointer hover:bg-gray-50' : ''} transition-colors`}
          onClick={() => canEdit && updateState({ isEditingLocation: true })}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-pink-500" />
              <h2 className="font-semibold">Location</h2>
            </div>
            <p className="text-black">{groupProfile.location}</p>
          </CardContent>
        </Card>

        <Card 
          className="bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => updateState({ showMembersDialog: true })}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-pink-500" />
              <h2 className="font-semibold">Members</h2>
            </div>
            <p className="text-black">{groupProfile.members.length} members</p>
          </CardContent>
        </Card>
      </div>

      <Card 
        className={`bg-white shadow-sm ${canEdit ? 'cursor-pointer hover:bg-gray-50' : ''} transition-colors`}
        onClick={() => canEdit && updateState({ isEditingInterests: true })}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-pink-500" />
            <h2 className="font-semibold">Interests & Hobbies</h2>
          </div>
          <ul className="list-disc list-inside text-black">
            {groupProfile.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card 
        className={`bg-white shadow-sm ${canEdit ? 'cursor-pointer hover:bg-gray-50' : ''} transition-colors`}
        onClick={() => canEdit && updateState({ isEditingQuirks: true })}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-pink-500" />
            <h2 className="font-semibold">Group Quirks</h2>
          </div>
          <ul className="list-disc list-inside text-black">
            {groupProfile.quirks.map((quirk, index) => (
              <li key={index}>{quirk}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}