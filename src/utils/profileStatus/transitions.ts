import { ProfileStatus } from './types';

const validTransitions: Record<ProfileStatus, ProfileStatus[]> = {
  'none': ['following', 'friend', 'follower'],
  'following': ['none', 'friend'],
  'follower': ['friend', 'none'], // Allow direct transition from follower to friend
  'friend': ['none']
};

export function validateProfileTransition(
  currentStatus: ProfileStatus,
  newStatus: ProfileStatus
): boolean {
  return validTransitions[currentStatus]?.includes(newStatus) ?? false;
}