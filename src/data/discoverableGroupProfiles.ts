import { GroupProfile } from '../types/profiles';

export const discoverableGroupProfiles: { [key: string]: GroupProfile } = {
  "zen_collective": {
    id: 'zen_collective',
    name: 'Yoga Gurus',
    username: 'zen_collective',
    bio: "A mindful community dedicated to wellness and inner peace.",
    ageRange: "25-35",
    avgAge: 30,
    location: "San Francisco, CA",
    locationCoordinates: { lat: 37.7749, lng: -122.4194 },
    members: ["emma_wellness", "sarah_mindful", "maya_creates"],
    interests: ["Yoga", "Meditation", "Mindfulness", "Wellness", "Healthy Living"],
    quirks: ["Morning meditation addicts", "Tea ceremony enthusiasts", "Silent retreat veterans"],
    images: [
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1599447421416-3414500d18a5?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1599447421275-ef9586a1f307?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3"
    ]
  },
  "canvas_crew": {
    id: 'canvas_crew',
    name: 'Art Collective',
    username: 'canvas_crew',
    bio: "Creative souls exploring various forms of artistic expression.",
    ageRange: "23-40",
    avgAge: 31,
    location: "San Francisco, CA",
    locationCoordinates: { lat: 37.7749, lng: -122.4194 },
    members: ["maya_creates", "lucas_artistry", "oliver_grows"],
    interests: ["Painting", "Sculpture", "Digital Art", "Photography", "Mixed Media"],
    quirks: ["Paint-stained everything", "Gallery hoppers", "Creative procrastinators"],
    images: [
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3"
    ]
  },
  "rhythm_rebels": {
    id: 'rhythm_rebels',
    name: 'Music Makers',
    username: 'rhythm_rebels',
    bio: "Musicians and music lovers creating harmony together.",
    ageRange: "21-38",
    avgAge: 29,
    location: "San Francisco, CA",
    locationCoordinates: { lat: 37.7749, lng: -122.4194 },
    members: ["jack_beats", "nina_sounds", "oliver_music"],
    interests: ["Music Production", "Live Performance", "Songwriting", "Music Theory", "Collaboration"],
    quirks: ["Impromptu jam sessions", "Perfect pitch perfectionists", "Gear collectors"],
    images: [
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3"
    ]
  },
  "plant_people": {
    id: 'plant_people',
    name: 'Green Thumbs Collective',
    username: 'plant_people',
    bio: "Urban gardeners growing community through plants.",
    ageRange: "24-45",
    avgAge: 34,
    location: "San Francisco, CA",
    locationCoordinates: { lat: 37.7749, lng: -122.4194 },
    members: ["oliver_grows", "sofia_gardens", "emma_wellness"],
    interests: ["Urban Gardening", "Sustainability", "Plant Care", "Community Gardens", "Composting"],
    quirks: ["Plant parents", "Composting champions", "Seed swappers"],
    images: [
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3"
    ]
  },
  "byte_builders": {
    id: 'byte_builders',
    name: 'Coding Crew',
    username: 'byte_builders',
    bio: "Tech enthusiasts coding the future together.",
    ageRange: "22-36",
    avgAge: 28,
    location: "San Francisco, CA",
    locationCoordinates: { lat: 37.7749, lng: -122.4194 },
    members: ["alex_codes", "rachel_dev", "lucas_tech"],
    interests: ["Programming", "Web Development", "Machine Learning", "Open Source", "Tech Meetups"],
    quirks: ["Debugger dancers", "Coffee code warriors", "Hackathon heroes"],
    images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3"
    ]
  }
};