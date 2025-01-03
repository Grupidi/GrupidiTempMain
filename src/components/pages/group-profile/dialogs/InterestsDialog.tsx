import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { MultiSelectInput } from "../../../ui/MultiSelectInput";
import { interestSuggestions } from "../../../../data/interestSuggestions";
import { useState } from "react";

interface InterestsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  interests: string[];
  onSave: (interests: string[]) => void;
}

export function InterestsDialog({ isOpen, onClose, interests, onSave }: InterestsDialogProps) {
  const [editedInterests, setEditedInterests] = useState(interests);

  const handleSave = () => {
    onSave(editedInterests);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Edit Interests & Hobbies</DialogTitle>
        </DialogHeader>
        <div className="p-8 space-y-6">
          <MultiSelectInput
            value={editedInterests}
            onChange={setEditedInterests}
            suggestions={interestSuggestions}
            placeholder="Add interests or select from suggestions..."
            chipClassName="bg-pink-100 text-pink-800"
          />
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} className="bg-pink-500 hover:bg-pink-600">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}