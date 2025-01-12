import { MemberProfile } from '../types/profiles';

export const initialMemberProfiles: { [key: string]: MemberProfile } = {
  // Original profiles
  "alice_adventurer": {
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
    friends: ["bob_hiker", "carol_reads", "dave_foodie"],
    groups: ["peak_seekers", "page_turners", "taste_collective", "code_crafters", "fit_squad", "reel_society"]
  },
  "bob_hiker": {
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
    friends: ["alice_adventurer"],
    groups: ["peak_seekers", "code_crafters", "fit_squad"]
  },
  "carol_reads": {
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
    friends: ["alice_adventurer"],
    groups: ["page_turners", "code_crafters", "reel_society"]
  },
  "dave_foodie": {
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
    friends: ["alice_adventurer"],
    groups: ["page_turners", "taste_collective"]
  },

  // Updated discoverable group members
  "emma_wellness": {
    id: "emma_wellness",
    name: "Emma Chen",
    username: "emma_wellness",
    birthday: "1995-03-15",
    location: "San Francisco, CA",
    bio: "Wellness coach and mindfulness practitioner",
    profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3",
    profileImages: [],
    interests: ["Yoga", "Meditation", "Wellness"],
    quirks: ["Morning person", "Tea enthusiast"],
    emeraldScore: 1000,
    friends: [],
    groups: ["zen_collective", "plant_people"]
  },
  "sarah_mindful": {
    id: "sarah_mindful",
    name: "Sarah Chen",
    username: "sarah_mindful",
    birthday: "1994-07-22",
    location: "San Francisco, CA",
    bio: "Mindfulness practitioner and wellness advocate. Helping others find their path to inner peace.",
    profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3",
    profileImages: [],
    interests: ["Meditation", "Yoga", "Sound Healing", "Mindful Living", "Wellness"],
    quirks: ["Silent retreat enthusiast", "Crystal collector", "Dawn meditator"],
    emeraldScore: 1000,
    friends: [],
    groups: ["zen_collective"]
  },
  "maya_creates": {
    id: "maya_creates",
    name: "Maya Patel",
    username: "maya_creates",
    birthday: "1996-11-30",
    location: "San Francisco, CA",
    bio: "Artist and creative explorer",
    profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3",
    profileImages: [],
    interests: ["Art", "Creativity", "Yoga"],
    quirks: ["Paint-stained clothes", "Creative spirit"],
    emeraldScore: 1000,
    friends: [],
    groups: ["zen_collective", "canvas_crew"]
  },
  "lucas_artistry": {
    id: "lucas_artistry",
    name: "Lucas Wright",
    username: "lucas_artistry",
    birthday: "1993-09-18",
    location: "San Francisco, CA",
    bio: "Visual artist and gallery curator",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3",
    profileImages: [],
    interests: ["Art", "Curation", "Design"],
    quirks: ["Gallery hopper", "Art collector"],
    emeraldScore: 1000,
    friends: [],
    groups: ["canvas_crew"]
  },
  "jack_beats": {
    id: "jack_beats",
    name: "Jack Thompson",
    username: "jack_beats",
    birthday: "1995-05-12",
    location: "San Francisco, CA",
    bio: "Music producer and multi-instrumentalist exploring the boundaries of sound.",
    profilePicture: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3",
    profileImages: [],
    interests: ["Music Production", "Sound Design", "Live Performance"],
    quirks: ["Studio perfectionist", "Vintage gear collector", "Night owl creator"],
    emeraldScore: 1000,
    friends: [],
    groups: ["rhythm_rebels"]
  },
  "nina_sounds": {
    id: "nina_sounds",
    name: "Nina Rodriguez",
    username: "nina_sounds",
    birthday: "1994-12-03",
    location: "San Francisco, CA",
    bio: "Sound designer and electronic musician",
    profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3",
    profileImages: [],
    interests: ["Sound Design", "Electronic Music", "Performance"],
    quirks: ["Synth collector", "Audio perfectionist"],
    emeraldScore: 1000,
    friends: [],
    groups: ["rhythm_rebels"]
  },
  "oliver_grows": {
    id: "oliver_grows",
    name: "Oliver Green",
    username: "oliver_grows",
    birthday: "1992-08-25",
    location: "San Francisco, CA",
    bio: "Urban gardener and sustainability advocate",
    profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3",
    profileImages: [],
    interests: ["Gardening", "Sustainability", "Art"],
    quirks: ["Plant whisperer", "Compost enthusiast"],
    emeraldScore: 1000,
    friends: [],
    groups: ["plant_people", "canvas_crew"]
  },
  "sofia_gardens": {
    id: "sofia_gardens",
    name: "Sofia Martinez",
    username: "sofia_gardens",
    birthday: "1993-04-14",
    location: "San Francisco, CA",
    bio: "Community garden organizer and plant enthusiast",
    profilePicture: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3",
    profileImages: [],
    interests: ["Gardening", "Community Building", "Sustainability"],
    quirks: ["Seed collector", "Garden planner"],
    emeraldScore: 1000,
    friends: [],
    groups: ["plant_people"]
  },
  "alex_codes": {
    id: "alex_codes",
    name: "Alex Kim",
    username: "alex_codes",
    birthday: "1996-02-28",
    location: "San Francisco, CA",
    bio: "Full-stack developer and open source contributor",
    profilePicture: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3",
    profileImages: [],
    interests: ["Programming", "Open Source", "Tech"],
    quirks: ["Code optimizer", "Coffee addict"],
    emeraldScore: 1000,
    friends: [],
    groups: ["byte_builders"]
  },
  "rachel_dev": {
    id: "rachel_dev",
    name: "Rachel Chen",
    username: "rachel_dev",
    birthday: "1995-10-17",
    location: "San Francisco, CA",
    bio: "Software engineer and tech community organizer",
    profilePicture: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3",
    profileImages: [],
    interests: ["Coding", "Community Building", "Tech"],
    quirks: ["Hackathon enthusiast", "Debug master"],
    emeraldScore: 1000,
    friends: [],
    groups: ["byte_builders"]
  }
};

// Export for direct use
export const memberProfiles = initialMemberProfiles;