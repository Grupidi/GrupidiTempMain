import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { LocationInput } from "../../ui/location/LocationInput";
import { MultiSelectInput } from "../../ui/MultiSelectInput";
import { MembersDialog } from './dialogs/MembersDialog';
import { X } from 'lucide-react';
import { interestSuggestions } from "../../../data/interestSuggestions";
import { quirkSuggestions } from "../../../data/quirkSuggestions";
import { GroupProfileProps, GroupProfileState } from '../../../types/groupProfile';

interface GroupProfileDialogsProps {
  groupProfile: GroupProfileProps['groupProfile'];
  memberProfiles: { [key: string]: any };
  state: GroupProfileState;
  updateState: (updates: Partial<GroupProfileState>) => void;
  handlers: {
    handleSaveLocation: () => void;
    handleSaveBio: () => void;
    handleSaveInterests: () => void;
    handleSaveQuirks: () => void;
  };
  isSavedGroup?: boolean;
  isMember?: boolean;
}

export function GroupProfileDialogs({
  groupProfile,
  memberProfiles,
  state,
  updateState,
  handlers,
  isSavedGroup = false,
  isMember = false
}: GroupProfileDialogsProps) {
  const canEdit = isMember && !isSavedGroup;

  const handleUpdateMembers = (members: string[]) => {
    handlers.handleSaveMembers(members);
  };

  return (
    <>
      <MembersDialog
        isOpen={state.showMembersDialog}
        onClose={() => updateState({ showMembersDialog: false })}
        groupProfile={groupProfile}
        memberProfiles={memberProfiles}
        onUpdateMembers={handleUpdateMembers}
        canEdit={canEdit}
      />

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
              <Button onClick={handlers.handleSaveBio} className="bg-pink-500 hover:bg-pink-600">Save Changes</Button>
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
              <Button onClick={handlers.handleSaveLocation} className="bg-pink-500 hover:bg-pink-600">Save Changes</Button>
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
            <MultiSelectInput
              value={state.editedInterests}
              onChange={(interests) => updateState({ editedInterests: interests })}
              suggestions={interestSuggestions}
              placeholder="Add interests or select from suggestions..."
              chipClassName="bg-pink-100 text-pink-800"
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => updateState({ isEditingInterests: false })}>Cancel</Button>
              <Button onClick={handlers.handleSaveInterests} className="bg-pink-500 hover:bg-pink-600">Save Changes</Button>
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
            <MultiSelectInput
              value={state.editedQuirks}
              onChange={(quirks) => updateState({ editedQuirks: quirks })}
              suggestions={quirkSuggestions}
              placeholder="Add quirks or select from suggestions..."
              chipClassName="bg-blue-100 text-blue-800"
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => updateState({ isEditingQuirks: false })}>Cancel</Button>
              <Button onClick={handlers.handleSaveQuirks} className="bg-pink-500 hover:bg-pink-600">Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}