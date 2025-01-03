export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  type: 'Bar Hangout' | 'Restaurant Outing' | 'Outdoor Activity';
  groupId: string;
}