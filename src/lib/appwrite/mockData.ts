// Mock data for development mode
import { ID } from "appwrite";

// Sample user data
export const mockUsers = [
  {
    $id: "user1",
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    imageUrl: "https://i.pravatar.cc/150?img=1",
    imageId: "img1",
    bio: "Software developer and photography enthusiast",
    accountId: "acc1",
    isCourseUser: true,
    trialStartDate: new Date(Date.now() - 86400000 * 2).toISOString(), // Started 2 days ago
    isTrialActive: true,
    hasPaid: false,
    paymentDate: "", // Add empty payment date
    homeworkSubmission: "",
    posts: [], // Add empty posts array
    // Add saved posts reference to match app's expected structure
    save: [
      {
        $id: "save1",
        user: "user1",
        post: {
          $id: "post2"
        }
      }
    ],
  },
  {
    $id: "user2",
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
    imageUrl: "https://i.pravatar.cc/150?img=5",
    imageId: "img2",
    bio: "Graphic designer and traveler",
    accountId: "acc2",
    posts: [], // Add empty posts array
    // Add saved posts reference to match app's expected structure
    save: [
      {
        $id: "save2",
        user: "user2",
        post: {
          $id: "post3"
        }
      }
    ],
  },
  {
    $id: "user3",
    name: "Alex Johnson",
    username: "alex",
    email: "alex@example.com",
    imageUrl: "https://i.pravatar.cc/150?img=3",
    imageId: "img3",
    bio: "Digital nomad and coffee lover",
    accountId: "acc3",
    posts: [], // Add empty posts array
    // Add empty save array to prevent undefined errors
    save: [],
  },
];

// Sample post data
export const mockPosts = [
  {
    $id: "post1",
    caption: "Beautiful sunset at the beach",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop",
    imageId: "img1",
    location: "Malibu Beach",
    tags: ["sunset", "beach", "photography"],
    creator: "user1",
    $createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    $updatedAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago (updated)
    likes: [], // Add empty likes array to prevent undefined errors
  },
  {
    $id: "post2",
    caption: "Morning coffee and coding session",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop",
    imageId: "img2",
    location: "Home Office",
    tags: ["coffee", "coding", "productivity"],
    creator: "user2",
    $createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    $updatedAt: new Date(Date.now() - 172800000).toISOString(), // Same as created (not updated)
    likes: ["user1"], // Sample like from user1
  },
  {
    $id: "post3",
    caption: "Exploring the city today",
    imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000&auto=format&fit=crop",
    imageId: "img3",
    location: "Downtown",
    tags: ["city", "exploration", "urban"],
    creator: "user3",
    $createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    $updatedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago (updated)
    likes: ["user1", "user2"], // Sample likes
  },
  // Add more mock posts to test pagination
  {
    $id: "post4",
    caption: "Delicious homemade pasta",
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1000&auto=format&fit=crop",
    imageId: "img4",
    location: "My Kitchen",
    tags: ["food", "cooking", "pasta"],
    creator: "user1",
    $createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    $updatedAt: new Date(Date.now() - 345600000).toISOString(),
    likes: ["user2", "user3"],
  },
  {
    $id: "post5",
    caption: "Weekend hiking adventure",
    imageUrl: "https://images.unsplash.com/photo-1512036666432-2181c1f26420?q=80&w=1000&auto=format&fit=crop",
    imageId: "img5",
    location: "Mountain Trail",
    tags: ["hiking", "nature", "adventure"],
    creator: "user2",
    $createdAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    $updatedAt: new Date(Date.now() - 432000000).toISOString(),
    likes: ["user1"],
  },
  {
    $id: "post6",
    caption: "My new plant collection",
    imageUrl: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=1000&auto=format&fit=crop",
    imageId: "img6",
    location: "Home Garden",
    tags: ["plants", "gardening", "hobbies"],
    creator: "user3",
    $createdAt: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
    $updatedAt: new Date(Date.now() - 518400000).toISOString(),
    likes: [],
  },
  {
    $id: "post7",
    caption: "Beautiful architecture downtown",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1000&auto=format&fit=crop",
    imageId: "img7",
    location: "City Center",
    tags: ["architecture", "city", "design"],
    creator: "user1",
    $createdAt: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
    $updatedAt: new Date(Date.now() - 604800000).toISOString(),
    likes: ["user2"],
  },
  {
    $id: "post8",
    caption: "Morning yoga session",
    imageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1000&auto=format&fit=crop",
    imageId: "img8",
    location: "Yoga Studio",
    tags: ["yoga", "wellness", "morning"],
    creator: "user2",
    $createdAt: new Date(Date.now() - 691200000).toISOString(), // 8 days ago
    $updatedAt: new Date(Date.now() - 691200000).toISOString(),
    likes: ["user1", "user3"],
  },
  {
    $id: "post9",
    caption: "My workspace setup",
    imageUrl: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=1000&auto=format&fit=crop",
    imageId: "img9",
    location: "Home Office",
    tags: ["workspace", "productivity", "setup"],
    creator: "user1",
    $createdAt: new Date(Date.now() - 691200000).toISOString(), // 8 days ago
    $updatedAt: new Date(Date.now() - 691200000).toISOString(),
    likes: ["user1"],
  },
  {
    $id: "post10",
    caption: "Beach day with friends",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    imageId: "img10",
    location: "Sandy Beach",
    tags: ["beach", "friends", "summer"],
    creator: "user2",
    $createdAt: new Date(Date.now() - 777600000).toISOString(), // 9 days ago
    $updatedAt: new Date(Date.now() - 777600000).toISOString(),
    likes: [],
  },
  {
    $id: "post11",
    caption: "Morning yoga session",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop",
    imageId: "img11",
    location: "Yoga Studio",
    tags: ["yoga", "wellness", "morning"],
    creator: "user1",
    $createdAt: new Date(Date.now() - 82800000).toISOString(), // 23 hours ago
    $updatedAt: new Date(Date.now() - 82800000).toISOString(),
    likes: [],
  },
  {
    $id: "post12",
    caption: "Morning meditation and wellness routine",
    imageUrl: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=1000&auto=format&fit=crop",
    imageId: "img12",
    location: "Wellness Center",
    tags: ["wellness", "meditation", "mindfulness"],
    creator: "user2",
    $createdAt: new Date(Date.now() - 86400000).toISOString(), // 24 hours ago
    $updatedAt: new Date(Date.now() - 86400000).toISOString(),
    likes: ["user1"],
  },
  {
    $id: "post13",
    caption: "Beautiful sunset at the beach",
    imageUrl: "https://images.unsplash.com/photo-1455156218388-5e61b526818b?q=80&w=1000&auto=format&fit=crop",
    imageId: "img13",
    location: "Malibu Beach",
    tags: ["sunset", "beach", "photography"],
    creator: "user3",
    $createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    $updatedAt: new Date(Date.now() - 86400000).toISOString(),
    likes: [],
  },
];

// Sample saves data
export const mockSaves = [
  {
    $id: "save1",
    user: "user1",
    post: {
      $id: "post2"
    },
    $createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
  },
  {
    $id: "save2",
    user: "user2",
    post: {
      $id: "post3"
    },
    $createdAt: new Date(Date.now() - 129600000).toISOString(), // 1.5 days ago
  },
];

// Mock user credentials store
export const mockUserCredentials: Record<string, {password: string, userId: string}> = {
  "john@example.com": { password: "password123", userId: "user1" },
  "jane@example.com": { password: "password123", userId: "user2" },
  "alex@example.com": { password: "password123", userId: "user3" },
  // Add some easy-to-remember credentials for testing
  "test@test.com": { password: "password", userId: "user1" },
  "demo@demo.com": { password: "demo", userId: "user1" },
  "admin@admin.com": { password: "admin", userId: "user1" },
};

// Helper function to find a user by email
export function findUserByEmail(email: string) {
  const credential = mockUserCredentials[email];
  if (!credential) return null;

  return mockUsers.find(user => user.$id === credential.userId);
}

// Helper function to validate credentials
export function validateCredentials(email: string, password: string) {
  const credential = mockUserCredentials[email];
  if (!credential) return null;

  return credential.password === password ?
    mockUsers.find(user => user.$id === credential.userId) :
    null;
}

// Helper to create a mock ID
export function createMockId() {
  return ID.unique();
}

// Create mock session
export function createMockSession(userId: string) {
  return {
    $id: `session-${ID.unique()}`,
    userId,
    expire: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
    provider: "email",
  };
}
