import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { LocationInput } from "../../../ui/location/LocationInput";
import { useState } from "react";

interface LocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  location: string;
  onSave: (location: string) => void;
}

export function LocationDialog({ isOpen, onClose, location, onSave }: LocationDialogProps) {
  const [editedLocation, setEditedLocation] = useState(location);

  const handleSave = () => {
    onSave(editedLocation);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Edit Location</DialogTitle>
        </DialogHeader>
        <div className="p-8 space-y-6">
          <LocationInput
            value={editedLocation}
            onChange={setEditedLocation}
            placeholder="Enter your location"
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