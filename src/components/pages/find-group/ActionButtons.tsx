import { Button } from "../../ui/button";
import { X, Heart, Check } from 'lucide-react';

interface ActionButtonsProps {
  onReject: () => void;
  onLike: () => void;
  onAccept: () => void;
}

export function ActionButtons({ onReject, onLike, onAccept }: ActionButtonsProps) {
  return (
    <footer className="border-t border-pink-200">
      <div className="flex justify-around p-2 bg-pink-50">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-pink-600 hover:bg-pink-100"
          onClick={onReject}
        >
          <X className="h-6 w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-pink-600 hover:bg-pink-100"
          onClick={onLike}
        >
          <Heart className="h-6 w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-pink-600 hover:bg-pink-100"
          onClick={onAccept}
        >
          <Check className="h-6 w-6" />
        </Button>
      </div>
    </footer>
  );
}