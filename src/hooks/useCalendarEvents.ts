import { useState } from 'react';
import { CalendarEvent } from '../types/calendar';

// Store events in memory while the app is running
const eventStore = new Map<string, CalendarEvent[]>();

export function useCalendarEvents(groupId: string) {
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    return eventStore.get(groupId) || [];
  });

  const addEvent = (event: Omit<CalendarEvent, 'id' | 'groupId'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Date.now().toString(),
      groupId
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    eventStore.set(groupId, updatedEvents);
  };

  const deleteEvent = (eventId: string) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    eventStore.set(groupId, updatedEvents);
  };

  const updateEvent = (eventId: string, updates: Partial<CalendarEvent>) => {
    const updatedEvents = events.map(event => 
      event.id === eventId ? { ...event, ...updates } : event
    );
    setEvents(updatedEvents);
    eventStore.set(groupId, updatedEvents);
  };

  return {
    events,
    addEvent,
    deleteEvent,
    updateEvent
  };
}