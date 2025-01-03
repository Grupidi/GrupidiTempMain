import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";

interface AgeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentBirthday: string;
  onSave: (birthday: string) => void;
}

export function AgeDialog({ isOpen, onClose, currentBirthday, onSave }: AgeDialogProps) {
  const [birthday, setBirthday] = useState(currentBirthday);

  // Reset birthday state when dialog opens with new currentBirthday
  useEffect(() => {
    setBirthday(currentBirthday);
  }, [currentBirthday, isOpen]);

  const handleSave = () => {
    if (birthday && birthday !== currentBirthday) {
      onSave(birthday);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Birthday</DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div>
            <Label htmlFor="birthday">Birthday</Label>
            <Input
              id="birthday"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-pink-500 hover:bg-pink-600"
              disabled={!birthday || birthday === currentBirthday}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}