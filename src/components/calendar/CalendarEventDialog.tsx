import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select } from "../ui/select";
import { X } from 'lucide-react';

interface CalendarEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: {
    title: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    type: 'Bar Hangout' | 'Restaurant Outing' | 'Outdoor Activity';
  }) => void;
  initialEvent?: {
    title: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    type: 'Bar Hangout' | 'Restaurant Outing' | 'Outdoor Activity';
  };
}

export function CalendarEventDialog({ 
  isOpen, 
  onClose, 
  onSave,
  initialEvent 
}: CalendarEventDialogProps) {
  const [title, setTitle] = useState(initialEvent?.title || '');
  const [startDate, setStartDate] = useState(initialEvent?.startDate || '');
  const [endDate, setEndDate] = useState(initialEvent?.endDate || '');
  const [startTime, setStartTime] = useState(initialEvent?.startTime || '');
  const [endTime, setEndTime] = useState(initialEvent?.endTime || '');
  const [type, setType] = useState<'Bar Hangout' | 'Restaurant Outing' | 'Outdoor Activity'>(
    initialEvent?.type || 'Bar Hangout'
  );

  const handleSubmit = () => {
    onSave({
      title,
      startDate,
      endDate: endDate || startDate,
      startTime,
      endTime,
      type
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initialEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (!endDate) setEndDate(e.target.value);
                }}
              />
            </div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="end-time">End Time</Label>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="type">Event Type</Label>
            <Select
              value={type}
              onChange={(value) => setType(value as typeof type)}
            >
              <option value="Bar Hangout">Bar Hangout</option>
              <option value="Restaurant Outing">Restaurant Outing</option>
              <option value="Outdoor Activity">Outdoor Activity</option>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!title || !startDate || !startTime || !endTime}
              className="bg-pink-500 hover:bg-pink-600"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}