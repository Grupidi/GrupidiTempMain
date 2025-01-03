import { useState } from 'react';
import { Button } from "../button";
import { Input } from "../input";
import { Pencil, Check, X } from 'lucide-react';

interface EditableDisplayNameProps {
  name: string;
  onSave: (newName: string) => void;
  className?: string;
}

export function EditableDisplayName({ name, onSave, className = '' }: EditableDisplayNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleSave = () => {
    if (editedName.trim() && editedName !== name) {
      onSave(editedName);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(name);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          className="text-2xl font-bold bg-white/20 text-white border-white/30 focus:border-white"
          autoFocus
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSave();
            }
          }}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSave}
          className="text-white hover:bg-white/20"
        >
          <Check className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCancel}
          className="text-white hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <h1 className="text-2xl font-bold text-white">{name}</h1>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsEditing(true)}
        className="text-white hover:bg-white/20"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
}