import { Button } from "../ui/button";
import { X, Pencil, Trash2 } from 'lucide-react';
import { CalendarEvent } from '../../types/calendar';

interface DayViewProps {
  date: Date;
  events: CalendarEvent[];
  onClose: () => void;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (id: string) => void;
}

export function CalendarDayView({ 
  date, 
  events, 
  onClose, 
  onEdit, 
  onDelete 
}: DayViewProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {events.length > 0 ? (
          <div className="space-y-3">
            {events.map(event => (
              <div key={event.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {event.startDate === event.endDate ? (
                        `${event.startTime} - ${event.endTime}`
                      ) : (
                        `${event.startDate} ${event.startTime} - ${event.endDate} ${event.endTime}`
                      )}
                    </p>
                    <p className="text-sm text-gray-500">{event.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onEdit(event)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onDelete(event.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No events scheduled for this day.</p>
        )}
      </div>
    </div>
  );
}