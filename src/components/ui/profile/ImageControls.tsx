import { Button } from "../button";
import { Trash2, Replace, Plus } from 'lucide-react';

interface ImageControlsProps {
  onAdd: () => void;
  onReplace: () => void;
  onDelete: () => void;
}

export function ImageControls({ onAdd, onReplace, onDelete }: ImageControlsProps) {
  return (
    <div className="absolute top-2 left-2 flex gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onAdd}
        className="bg-black/50 hover:bg-black/70 text-white"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Image
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onReplace}
        className="bg-black/50 hover:bg-black/70 text-white"
      >
        <Replace className="h-4 w-4 mr-1" />
        Replace Image
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        className="bg-black/50 hover:bg-black/70 text-white text-red-300 hover:text-red-200"
      >
        <Trash2 className="h-4 w-4 mr-1" />
        Delete Image
      </Button>
    </div>
  );
}