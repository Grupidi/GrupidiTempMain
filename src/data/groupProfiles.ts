import { GroupProfile } from '../types/profiles';

export const initialGroupProfiles: { [key: string]: GroupProfile } = {
  "hi": {
    id: "hi",
    name: "Hiking Enthusiasts",
    username: "@peak_seekers",
    description: "We're a group of thrill-seekers and explorers, always ready for the next big adventure.",
    members: ["alice_adventurer", "bob_hiker"],
    ageRange: "25-35",
    avgAge: 30,
    location: "San Francisco, CA",
    bio: "A community of hiking enthusiasts exploring trails together",
    interests: ["Hiking", "Nature", "Photography", "Adventure"],
    quirks: ["Trail mix debates", "Summit selfies", "Early bird meetups"],
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1486179814561-91c2d61316b4?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3"
    ]
  },
  "bo": {
    id: "bo",
    name: "Book Club",
    username: "@page_turners",
    description: "A cozy corner for literary minds to meet and discuss great works.",
    members: ["carol_reads", "dave_foodie", "alice_adventurer"],
    ageRange: "25-35",
    avgAge: 30,
    location: "San Francisco, CA",
    bio: "Monthly book discussions and literary adventures",
    interests: ["Reading", "Writing", "Literature", "Poetry"],
    quirks: ["Reading marathons", "Quote collectors", "Genre debates"],
    images: [
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3"
    ]
  }
};

// Export for direct use
export const currentGroupProfiles = initialGroupProfiles;