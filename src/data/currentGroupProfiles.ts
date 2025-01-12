import { GroupProfile } from '../types/profiles';

export const currentGroupProfiles: { [key: string]: GroupProfile } = {
  "hi": {
    id: 'hi',
    name: 'Hiking Enthusiasts',
    username: '@peak_seekers',
    description: "We're a group of thrill-seekers and explorers, always ready for the next big adventure.",
    ageRange: "28-31",
    avgAge: 29,
    location: "San Francisco, CA",
    members: ["alice_adventurer", "bob_hiker"],
    bio: "We're passionate about exploring the great outdoors and challenging ourselves on new trails. From weekend warriors to seasoned trekkers, we welcome all who share our love for nature and adventure.",
    interests: ["Hiking", "Photography", "Camping", "Rock Climbing", "Nature Conservation"],
    quirks: ["Always overpacks trail mix", "Speaks in hiking metaphors", "Obsessed with gear weight"],
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3"
    ]
  },
  "bo": {
    id: 'bo',
    name: 'Book Club',
    username: '@page_turners',
    description: "A cozy corner for literary minds to meet and discuss great works.",
    ageRange: "28-29",
    avgAge: 28,
    location: "San Francisco, CA",
    members: ["carol_reads", "dave_foodie", "alice_adventurer"],
    bio: "We're a diverse group of book lovers who meet monthly to discuss everything from classic literature to contemporary fiction. Our discussions are always lively and thought-provoking.",
    interests: ["Reading", "Literary Analysis", "Creative Writing", "Poetry", "Author Studies"],
    quirks: ["Collects bookmarks", "Quotes books in daily conversation", "Never leaves home without a book"],
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-4.0.3"
    ]
  },
  "fo": {
    id: 'fo',
    name: 'Foodies Unite',
    username: '@taste_collective',
    description: "For those who live to eat and love to share culinary adventures.",
    ageRange: "28-30",
    avgAge: 29,
    location: "San Francisco, CA",
    members: ["@dave_foodie", "@alice_adventurer"],
    bio: "We're food enthusiasts who explore everything from street food to fine dining. We share recipes, organize cooking classes, and discover new restaurants together.",
    interests: ["Cooking", "Restaurant Exploration", "Wine Tasting", "Food Photography", "Culinary Arts"],
    quirks: ["Instagram before eating", "Carries emergency hot sauce", "Plans vacations around restaurants"],
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3"
    ]
  },
  "te": {
    id: 'te',
    name: 'Tech Innovators',
    username: '@code_crafters',
    description: "Where creativity meets technology to shape the future.",
    ageRange: "28-31",
    avgAge: 29,
    location: "San Francisco, CA",
    members: ["@bob_hiker", "@carol_reads", "@alice_adventurer"],
    bio: "We're a community of tech enthusiasts, developers, and innovators who collaborate on projects and share knowledge. From AI to IoT, we explore cutting-edge technologies.",
    interests: ["Programming", "AI/ML", "Robotics", "IoT", "Blockchain"],
    quirks: ["Debugs in dreams", "Names servers after sci-fi characters", "Types in vim"],
    images: [
      "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3"
    ]
  },
  "fi": {
    id: 'fi',
    name: 'Fitness Fanatics',
    username: '@fit_squad',
    description: "Dedicated to health, wellness, and pushing physical limits.",
    ageRange: "28-31",
    avgAge: 29,
    location: "San Francisco, CA",
    members: ["@alice_adventurer", "@bob_hiker"],
    bio: "We're fitness enthusiasts who support each other in achieving health and wellness goals. From HIIT to yoga, we embrace all forms of physical activity.",
    interests: ["Weight Training", "HIIT", "Yoga", "Running", "Nutrition"],
    quirks: ["Meal preps on Sundays", "Counts steps everywhere", "Gym clothes are life"],
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3"
    ]
  },
  "mo": {
    id: 'mo',
    name: 'Movie Buffs',
    username: '@reel_society',
    description: "For those who live and breathe cinema in all its forms.",
    ageRange: "28-30",
    avgAge: 29,
    location: "San Francisco, CA",
    members: ["@carol_reads", "@dave_foodie", "@alice_adventurer"],
    bio: "We're passionate about all things cinema - from classic films to modern masterpieces. We organize screenings, discuss film theory, and share our love for the art of storytelling through motion pictures.",
    interests: ["Film Analysis", "Screenwriting", "Cinema History", "Film Making", "Movie Marathons"],
    quirks: ["Quotes movies constantly", "Watches end credits", "Collects movie posters"],
    images: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1585647347384-2593bc35786b?ixlib=rb-4.0.3"
    ]
  }
};

export const memberProfiles = {
  "oliver_music": {
    id: "oliver_music",
    name: "Oliver Kim",
    username: "oliver_music",
    birthday: "1995-01-01",
    location: "San Francisco, CA",
    bio: "Full-stack developer and open source contributor",
    profilePicture: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3",
    profileImages: [],
    interests: [],
    quirks: [],
    emeraldScore: 1000,
    friends: []
  },
  "lucas_tech": {
    id: "lucas_tech",
    name: "Lucas Chen",
    username: "lucas_tech",
    birthday: "1995-01-01",
    location: "San Francisco, CA",
    bio: "UX designer and accessibility advocate",
    profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3",
    profileImages: [],
    interests: [],
    quirks: [],
    emeraldScore: 1000,
    friends: []
  },
  "ryan_codes": {
    id: "ryan_codes",
    name: "Ryan Martinez",
    username: "ryan_codes",
    birthday: "1995-01-01",
    location: "San Francisco, CA",
    bio: "Full-stack developer and open source contributor",
    profilePicture: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3",
    profileImages: [],
    interests: [],
    quirks: [],
    emeraldScore: 1000,
    friends: []
  },
  "sophie_creates": {
    id: "sophie_creates",
    name: "Sophie Anderson",
    username: "sophie_creates",
    birthday: "1995-01-01",
    location: "San Francisco, CA",
    bio: "UX designer and accessibility advocate",
    profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3",
    profileImages: [],
    interests: [],
    quirks: [],
    emeraldScore: 1000,
    friends: []
  }
};