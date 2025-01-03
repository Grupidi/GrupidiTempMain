import { Button } from "../button";
import { Map, Users, Bell, User } from "lucide-react";

interface NavigationBarProps {
  onNavigate: (page: string) => void;
}

export function NavigationBar({ onNavigate }: NavigationBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-pink-500 text-white">
      <div className="flex justify-around items-center py-2">
        <Button
          variant="ghost"
          className="flex flex-col items-center text-white hover:bg-pink-600"
          onClick={() => onNavigate('activity')}
        >
          <Map className="h-6 w-6" />
          <span className="text-xs">Activity</span>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center text-white hover:bg-pink-600"
          onClick={() => onNavigate('groups')}
        >
          <Users className="h-6 w-6" />
          <span className="text-xs">Groups</span>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center text-white hover:bg-pink-600"
          onClick={() => onNavigate('notifications')}
        >
          <Bell className="h-6 w-6" />
          <span className="text-xs">Notifications</span>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center text-white hover:bg-pink-600"
          onClick={() => onNavigate('profile')}
        >
          <User className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </Button>
      </div>
    </nav>
  );
}