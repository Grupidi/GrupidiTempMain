import { GroupProfile } from '../../../types/profiles';
import { Button } from '../button';
import { Users } from 'lucide-react';

interface GroupCardProps {
  group: GroupProfile;
  onClick?: () => void;
}

export function GroupCard({ group, onClick }: GroupCardProps) {
  return (
    <div className="p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">{group.name}</h3>
          <p className="text-gray-500">@{group.username}</p>
        </div>
        <Button 
          variant="ghost" 
          onClick={onClick}
          className="flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          View Group
        </Button>
      </div>
    </div>
  );
} 