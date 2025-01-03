import { Button } from "../button";
import { getCurrentTier } from "./tiers";

interface SocialCreditButtonProps {
  score: number;
  onClick: () => void;
  className?: string;
}

export function SocialCreditButton({ score, onClick, className = '' }: SocialCreditButtonProps) {
  const currentTier = getCurrentTier(score);
  
  return (
    <Button
      onClick={onClick}
      className={`font-medium px-4 py-2 rounded-full shadow-md ${currentTier.bgColor} ${currentTier.hoverColor} ${currentTier.textColor} ${className}`}
    >
      {score.toLocaleString()} {currentTier.name}
    </Button>
  );
}