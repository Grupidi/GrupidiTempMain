import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { Button } from "../button";
import { Textarea } from "../textarea";
import { LocationInput } from "../location/LocationInput";
import { InterestInput } from "../InterestInput";
import { X } from 'lucide-react';
import { interestSuggestions } from "../../../data/interestSuggestions";
import { quirkSuggestions } from "../../../data/quirkSuggestions";

interface GroupProfileDialogsProps {
  groupProfile: any;
  memberProfiles: any;
  state: any;
  updateState: (updates: any) => void;
  updateGroupProfile: (groupId: string, updates: any) => void;
  isSavedGroup?: boolean;
  isMember?: boolean;
}

export function GroupProfileDialogs({
  groupProfile,
  memberProfiles,
  state,
  updateState,
  updateGroupProfile,
  isSavedGroup = false,
  isMember = false
}: GroupProfileDialogsProps) {
  const canEdit = isMember && !isSavedGroup;

  const handleSaveBio = () => {
    console.log('Saving bio:', state.editedBio);
    updateGroupProfile(groupProfile.id, { bio: state.editedBio });
    updateState({ isEditingBio: false });
  };

  const handleSaveLocation = () => {
    console.log('Saving location:', state.editedLocation);
    updateGroupProfile(groupProfile.id, { location: state.editedLocation });
    updateState({ isEditingLocation: false });
  };

  const handleSaveInterests = () => {
    console.log('Saving interests:', state.editedInterests);
    updateGroupProfile(groupProfile.id, { interests: [...state.editedInterests] });
    updateState({ isEditingInterests: false });
  };

  const handleSaveQuirks = () => {
    console.log('Saving quirks:', state.editedQuirks);
    updateGroupProfile(groupProfile.id, { quirks: [...state.editedQuirks] });
    updateState({ isEditingQuirks: false });
  };

  const handleAddInterest = () => {
    if (state.newInterest.trim()) {
      const updatedInterests = [...state.editedInterests, state.newInterest.trim()];
      console.log('Adding interest:', state.newInterest, 'New interests:', updatedInterests);
      updateState({ 
        editedInterests: updatedInterests,
        newInterest: ''
      });
    }
  };

  const handleRemoveInterest = (index: number) => {
    const updatedInterests = state.editedInterests.filter((_: string, i: number) => i !== index);
    console.log('Removing interest at index:', index, 'New interests:', updatedInterests);
    updateState({ editedInterests: updatedInterests });
  };

  const handleAddQuirk = () => {
    if (state.newQuirk.trim()) {
      const updatedQuirks = [...state.editedQuirks, state.newQuirk.trim()];
      console.log('Adding quirk:', state.newQuirk, 'New quirks:', updatedQuirks);
      updateState({ 
        editedQuirks: updatedQuirks,
        newQuirk: ''
      });
    }
  };

  const handleRemoveQuirk = (index: number) => {
    const updatedQuirks = state.editedQuirks.filter((_: string, i: number) => i !== index);
    console.log('Removing quirk at index:', index, 'New quirks:', updatedQuirks);
    updateState({ editedQuirks: updatedQuirks });
  };

  return (
    <>
      {/* Bio Dialog */}
      <Dialog open={state.isEditingBio} onOpenChange={() => updateState({ isEditingBio: false })}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Edit About Us</DialogTitle>
          </DialogHeader>
          <div className="p-8 space-y-6">
            <Textarea
              value={state.editedBio}
              onChange={(e) => updateState({ editedBio: e.target.value })}
              className="min-h-[300px] text-base leading-relaxed p-4"
              placeholder="Tell us about your group..."
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => updateState({ isEditingBio: false })}>Cancel</Button>
              <Button onClick={handleSaveBio} className="bg-pink-500 hover:bg-pink-600">Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Location Dialog */}
      <Dialog open={state.isEditingLocation} onOpenChange={() => updateState({ isEditingLocation: false })}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Edit Location</DialogTitle>
          </DialogHeader>
          <div className="p-8 space-y-6">
            <LocationInput
              value={state.editedLocation}
              onChange={(value) => updateState({ editedLocation: value })}
              placeholder="Enter your location"
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => updateState({ isEditingLocation: false })}>Cancel</Button>
              <Button onClick={handleSaveLocation} className="bg-pink-500 hover:bg-pink-600">Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Interests Dialog */}
      <Dialog open={state.isEditingInterests} onOpenChange={() => updateState({ isEditingInterests: false })}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Edit Interests & Hobbies</DialogTitle>
          </DialogHeader>
          <div className="p-8 space-y-6">
            <InterestInput
              value={state.newInterest}
              suggestions={interestSuggestions}
              onChange={(value) => updateState({ newInterest: value })}
              onAdd={handleAddInterest}
              placeholder="Add new interest..."
            />
            <div className="space-y-2">
              {state.editedInterests.map((interest: string, index: number) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span>{interest}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveInterest(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => updateState({ isEditingInterests: false })}>Cancel</Button>
              <Button onClick={handleSaveInterests} className="bg-pink-500 hover:bg-pink-600">Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quirks Dialog */}
      <Dialog open={state.isEditingQuirks} onOpenChange={() => updateState({ isEditingQuirks: false })}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Edit Group Quirks</DialogTitle>
          </DialogHeader>
          <div className="p-8 space-y-6">
            <InterestInput
              value={state.newQuirk}
              suggestions={quirkSuggestions}
              onChange={(value) => updateState({ newQuirk: value })}
              onAdd={handleAddQuirk}
              placeholder="Add new quirk..."
            />
            <div className="space-y-2">
              {state.editedQuirks.map((quirk: string, index: number) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span>{quirk}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveQuirk(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => updateState({ isEditingQuirks: false })}>Cancel</Button>
              <Button onClick={handleSaveQuirks} className="bg-pink-500 hover:bg-pink-600">Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}