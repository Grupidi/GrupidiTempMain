import { Button } from "../ui/button";
import { SlidersHorizontal } from 'lucide-react';
import { NotificationType } from '../../types/notifications';

interface AlertFiltersProps {
  currentFilter: NotificationType | 'all';
  onFilterChange: (filter: NotificationType | 'all') => void;
}

export function AlertFilters({ currentFilter, onFilterChange }: AlertFiltersProps) {
  const filters = [
    { id: 'all', label: 'All Notifications' },
    { id: 'group_invitation', label: 'Group Invitations' },
    { id: 'friend_request', label: 'Friend Requests' },
    { id: 'follow', label: 'Follows' },
    { id: 'calendar_event', label: 'Calendar Events' },
    { id: 'message', label: 'Messages' },
    { id: 'group_chat', label: 'Group Chat' },
    { id: 'group_update', label: 'Group Updates' },
    { id: 'friend_activity', label: 'Friend Activity' }
  ];

  return (
    <div className="fixed bottom-20 left-4">
      <div className="relative">
        <Button
          size="icon"
          className="rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
          onClick={(e) => {
            const menu = document.getElementById('filter-menu');
            if (menu) {
              menu.classList.toggle('hidden');
            }
            e.stopPropagation();
          }}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>

        <div
          id="filter-menu"
          className="hidden absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border p-2 min-w-[200px]"
        >
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={currentFilter === filter.id ? 'default' : 'ghost'}
              className={`w-full justify-start text-left ${
                currentFilter === filter.id ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
              }`}
              onClick={() => {
                onFilterChange(filter.id as NotificationType | 'all');
                const menu = document.getElementById('filter-menu');
                if (menu) {
                  menu.classList.add('hidden');
                }
              }}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}