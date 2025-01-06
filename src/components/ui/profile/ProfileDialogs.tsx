import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { Button } from "../button";
import { Textarea } from "../textarea";
import { LocationInput } from "../location/LocationInput";
import { MultiSelectInput } from "../MultiSelectInput";
import { X } from 'lucide-react';
import { interestSuggestions } from "../../../data/interestSuggestions";
import { quirkSuggestions } from "../../../data/quirkSuggestions";

interface ProfileDialogsProps {
  profile: any;
  state: any;
  handlers: any;
}

export function ProfileDialogs({ profile, state, handlers }: ProfileDialogsProps) {
  return (
    <>
      {/* Edit Bio Dialog */}
      <Dialog open={state.isEditingBio} onOpenChange={state.setIsEditingBio}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader className="p-8 pb-0">
            <DialogTitle className="text-2xl font-semibold">Edit About Me</DialogTitle>
          </DialogHeader>
          <div className="p-8 space-y-6">
            <Textarea
              value={state.editedBio}
              onChange={(e) => state.setEditedBio(e.target.value)}
              className="min-h-[300px] text-base leading-relaxed p-4"
              placeholder="Tell us about yourself..."
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => state.setIsEditingBio(false)}>
                Cancel
              </Button>
              <Button onClick={handlers.handleSaveBio} className="bg-pink-500 hover:bg-pink-600">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Location Dialog */}
      <Dialog open={state.isEditingLocation} onOpenChange={state.setIsEditingLocation}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader className="p-8 pb-0">
            <DialogTitle className="text-2xl font-semibold">Edit Location</DialogTitle>
          </DialogHeader>
          <div className="p-8 space-y-6">
            <LocationInput
              value={state.editedLocation}
              onChange={state.setEditedLocation}
              placeholder="Enter your location"
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => state.setIsEditingLocation(false)}>
                Cancel
              </Button>
              <Button onClick={handlers.handleSaveLocation} className="bg-pink-500 hover:bg-pink-600">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Interests Dialog */}
      <Dialog open={state.isEditingInterests} onOpenChange={state.setIsEditingInterests}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Edit Interests & Hobbies</DialogTitle>
          </DialogHeader>
          <div className="p-8 space-y-6">
            <MultiSelectInput
              value={state.editedInterests}
              onChange={(interests) => state.setEditedInterests(interests)}
              suggestions={interestSuggestions}
              placeholder="Add interests or select from suggestions..."
              chipClassName="bg-pink-100 text-pink-800"
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => state.setIsEditingInterests(false)}>
                Cancel
              </Button>
              <Button onClick={handlers.handleSaveInterests} className="bg-pink-500 hover:bg-pink-600">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Quirks Dialog */}
      <Dialog open={state.isEditingQuirks} onOpenChange={state.setIsEditingQuirks}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Edit Personal Quirks</DialogTitle>
          </DialogHeader>
          <div className="p-8 space-y-6">
            <MultiSelectInput
              value={state.editedQuirks}
              onChange={(quirks) => state.setEditedQuirks(quirks)}
              suggestions={quirkSuggestions}
              placeholder="Add quirks or select from suggestions..."
              chipClassName="bg-blue-100 text-blue-800"
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => state.setIsEditingQuirks(false)}>
                Cancel
              </Button>
              <Button onClick={handlers.handleSaveQuirks} className="bg-pink-500 hover:bg-pink-600">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}