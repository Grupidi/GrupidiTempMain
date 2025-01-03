import { useState, useCallback } from 'react';

export function useNotificationSettings() {
  const [mutedMembers, setMutedMembers] = useState<Set<string>>(new Set());

  const toggleMemberMute = useCallback((memberId: string) => {
    setMutedMembers(prev => {
      const next = new Set(prev);
      if (next.has(memberId)) {
        next.delete(memberId);
      } else {
        next.add(memberId);
      }
      return next;
    });
  }, []);

  const isMemberMuted = useCallback((memberId: string) => {
    return mutedMembers.has(memberId);
  }, [mutedMembers]);

  return {
    mutedMembers,
    toggleMemberMute,
    isMemberMuted
  };
}