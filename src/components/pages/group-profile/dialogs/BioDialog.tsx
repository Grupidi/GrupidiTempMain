import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Textarea } from "../../../ui/textarea";
import { useState } from "react";

interface BioDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bio: string;
  onSave: (bio: string) => void;
}

export function BioDialog({ isOpen, onClose, bio, onSave }: BioDialogProps) {
  const [editedBio, setEditedBio] = useState(bio);

  const handleSave = () => {
    onSave(editedBio);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Edit About Us</DialogTitle>
        </DialogHeader>
        <div className="p-8 space-y-6">
          <Textarea
            value={editedBio}
            onChange={(e) => setEditedBio(e.target.value)}
            className="min-h-[300px] text-base leading-relaxed p-4"
            placeholder="Tell us about your group..."
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