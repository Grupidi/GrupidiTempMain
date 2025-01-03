import { MemberProfile } from '../types/profiles';

export const initialMemberProfiles: { [key: string]: MemberProfile } = {
  "Alice Johnson": {
    id: "Alice Johnson",
    name: "Alice Johnson",
    username: "alice_adventurer",
    birthday: "1995-06-15",
    location: "San Francisco, CA",
    bio: "Thrill-seeker and explorer, always ready for the next big adventure. Whether it's hiking through rugged terrains, solving escape rooms, or trying out the latest board games, I'm in!",
    profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80",
    profileImages: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80"
    ],
    interests: ["Hiking", "Board Games", "Photography", "Cooking", "Travel"],
    quirks: ["Always carries a camera", "Can't resist a good pun", "Obsessed with finding the perfect coffee"],
    emeraldScore: 2285,
    friends: ["Bob Smith", "Carol White", "David Brown"]
  },
  "Bob Smith": {
    id: "Bob Smith",
    name: "Bob Smith",
    username: "bob_hiker",
    birthday: "1992-07-15",
    location: "San Francisco, CA",
    bio: "Avid hiker and outdoor enthusiast. Always seeking new trails and adventures in nature.",
    profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3",
    profileImages: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3"
    ],
    interests: ["Hiking", "Rock Climbing", "Photography", "Nature Conservation", "Camping"],
    quirks: ["Trail mix connoisseur", "Sunrise chaser", "Map collector"],
    emeraldScore: 2800,
    friends: ["Alice Johnson"]
  },
  "Carol White": {
    id: "Carol White",
    name: "Carol White",
    username: "carol_reads",
    birthday: "1994-03-22",
    location: "San Francisco, CA",
    bio: "Book lover and literature enthusiast. Always lost in a good story.",
    profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3",
    profileImages: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-4.0.3"
    ],
    interests: ["Reading", "Writing", "Book Clubs", "Poetry", "Creative Writing"],
    quirks: ["Collects bookmarks", "Reads multiple books at once", "Tea enthusiast"],
    emeraldScore: 2500,
    friends: ["Alice Johnson"]
  },
  "David Brown": {
    id: "David Brown",
    name: "David Brown",
    username: "dave_foodie",
    birthday: "1993-11-08",
    location: "San Francisco, CA",
    bio: "Food enthusiast and amateur chef. Always exploring new cuisines and flavors.",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3",
    profileImages: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3"
    ],
    interests: ["Cooking", "Food Photography", "Wine Tasting", "Restaurant Exploring", "Baking"],
    quirks: ["Food photo enthusiast", "Recipe collector", "Spice hoarder"],
    emeraldScore: 2600,
    friends: ["Alice Johnson"]
  }
};