import { useState } from 'react';
import { Button } from "../ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarEventDialog } from '../calendar/CalendarEventDialog';
import { CalendarDayView } from '../calendar/CalendarDayView';
import { useCalendarEvents } from '../../hooks/useCalendarEvents';
import { CalendarEvent } from '../../types/calendar';

interface CalendarPageProps {
  onClose: () => void;
  groupId: string;
}

export default function CalendarPage({ onClose, groupId }: CalendarPageProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const { events, addEvent, deleteEvent, updateEvent } = useCalendarEvents(groupId);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysArray = [];

    // Add previous month's days
    for (let i = 0; i < firstDay.getDay(); i++) {
      const prevDate = new Date(year, month, -i);
      daysArray.unshift({ date: prevDate, isCurrentMonth: false });
    }

    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    // Add next month's days
    const remainingDays = 42 - daysArray.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return daysArray;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowEventDialog(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setShowEventDialog(true);
    setSelectedDate(null);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
    }
  };

  const handleSaveEvent = (eventData: Omit<CalendarEvent, 'id' | 'groupId'>) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
    setShowEventDialog(false);
    setEditingEvent(null);
  };

  return (
    <div className="fixed inset-0 bg-[#f0f8ff] z-50 flex flex-col">
      <header className="bg-white border-b px-4 py-3 flex items-center">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Group Calendar</h1>
      </header>

      <div className="bg-white rounded-lg shadow-sm p-4 m-4">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            className="text-[#ff80df]"
            onClick={handlePrevMonth}
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous
          </Button>
          <span className="text-lg font-semibold">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <Button
            variant="ghost"
            className="text-[#ff80df]"
            onClick={handleNextMonth}
          >
            Next
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map(day => (
            <div key={day} className="text-center font-medium p-2">{day}</div>
          ))}
          {getDaysInMonth(currentDate).map(({ date, isCurrentMonth }, index) => {
            const dayEvents = events.filter(event => 
              new Date(event.startDate).toDateString() === date.toDateString() ||
              new Date(event.endDate).toDateString() === date.toDateString() ||
              (new Date(event.startDate) <= date && new Date(event.endDate) >= date)
            );

            return (
              <div
                key={index}
                className={`p-1 min-h-[80px] ${
                  isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                } border rounded-lg cursor-pointer hover:bg-gray-50`}
                onClick={() => handleDayClick(date)}
              >
                <div className="text-right text-sm p-1">
                  {date.getDate()}
                </div>
                <div className="space-y-1">
                  {dayEvents.map(event => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded truncate ${
                        event.type === 'Bar Hangout' ? 'bg-purple-200 text-purple-700' :
                        event.type === 'Restaurant Outing' ? 'bg-orange-200 text-orange-700' :
                        'bg-emerald-200 text-emerald-700'
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#f0f8ff]">
        <Button
          className="w-full bg-[#ff80df] text-white hover:bg-[#ff60d0]"
          onClick={handleAddEvent}
        >
          Add Event
        </Button>
      </div>

      {selectedDate && (
        <CalendarDayView
          date={selectedDate}
          events={events.filter(event => 
            new Date(event.startDate).toDateString() === selectedDate.toDateString() ||
            new Date(event.endDate).toDateString() === selectedDate.toDateString() ||
            (new Date(event.startDate) <= selectedDate && new Date(event.endDate) >= selectedDate)
          )}
          onClose={() => setSelectedDate(null)}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      )}

      <CalendarEventDialog
        isOpen={showEventDialog}
        onClose={() => {
          setShowEventDialog(false);
          setEditingEvent(null);
        }}
        onSave={handleSaveEvent}
        initialEvent={editingEvent || undefined}
      />
    </div>
  );
}