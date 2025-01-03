import { createContext, useContext, ReactNode } from 'react';
import { useNotificationSettings } from '../hooks/useNotificationSettings';

interface NotificationSettingsContextType {
  mutedMembers: Set<string>;
  toggleMemberMute: (memberId: string) => void;
  isMemberMuted: (memberId: string) => void;
}

const NotificationSettingsContext = createContext<NotificationSettingsContextType | null>(null);

export function NotificationSettingsProvider({ children }: { children: ReactNode }) {
  const settings = useNotificationSettings();
  
  return (
    <NotificationSettingsContext.Provider value={settings}>
      {children}
    </NotificationSettingsContext.Provider>
  );
}

export function useNotificationSettingsContext() {
  const context = useContext(NotificationSettingsContext);
  if (!context) {
    throw new Error('useNotificationSettingsContext must be used within a NotificationSettingsProvider');
  }
  return context;
}