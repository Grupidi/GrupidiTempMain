import { FriendRequest } from '../../types/profiles';

export function sendFriendRequest(
  request: FriendRequest,
  setFriendRequests: React.Dispatch<React.SetStateAction<FriendRequest[]>>
) {
  // Add to pending friend requests
  setFriendRequests(prev => {
    if (!prev.some(req => req.id === request.id)) {
      return [...prev, { ...request, status: 'pending' }];
    }
    return prev;
  });
}