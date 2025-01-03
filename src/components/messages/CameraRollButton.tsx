import { Camera } from 'lucide-react';
import { Button } from '../ui/button';

interface CameraRollButtonProps {
  onClick: () => void;
  className?: string;
}

export function CameraRollButton({ onClick, className = '' }: CameraRollButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={`text-blue-500 hover:text-blue-600 hover:bg-blue-50 ${className}`}
      title="Open camera roll"
    >
      <Camera className="h-5 w-5" />
    </Button>
  );
}