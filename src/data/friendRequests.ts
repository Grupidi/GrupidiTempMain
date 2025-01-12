import { FriendRequest } from '../types/profiles';

export const initialFriendRequests: FriendRequest[] = [
  {
    id: "ryan_codes",
    name: "Ryan Martinez", 
    username: "ryan_codes",
    bio: "Full-stack developer and open source contributor",
    location: "San Francisco, CA",
    profilePicture: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3",
    status: 'pending'
  },
  {
    id: "sophie_creates",
    name: "Sophie Anderson",
    username: "sophie_creates",
    bio: "UX designer and accessibility advocate", 
    location: "San Francisco, CA",
    profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3",
    status: 'pending'
  }
];