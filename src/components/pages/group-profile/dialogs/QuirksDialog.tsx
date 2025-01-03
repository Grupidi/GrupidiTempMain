import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { MultiSelectInput } from "../../../ui/MultiSelectInput";
import { quirkSuggestions } from "../../../../data/quirkSuggestions";
import { useState } from "react";

interface QuirksDialogProps {
  isOpen: boolean;
  onClose: () => void;
  quirks: string[];
  onSave: (quirks: string[]) => void;
}

export function QuirksDialog({ isOpen, onClose, quirks, onSave }: QuirksDialogProps) {
  const [editedQuirks, setEditedQuirks] = useState(quirks);

  const handleSave = () => {
    onSave(editedQuirks);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Edit Group Quirks</DialogTitle>
        </DialogHeader>
        <div className="p-8 space-y-6">
          <MultiSelectInput
            value={editedQuirks}
            onChange={setEditedQuirks}
            suggestions={quirkSuggestions}
            placeholder="Add quirks or select from suggestions..."
            chipClassName="bg-blue-100 text-blue-800"
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