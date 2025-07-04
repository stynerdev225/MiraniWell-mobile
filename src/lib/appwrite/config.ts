import { Client, Account, Databases, Storage, Avatars } from "appwrite";

// Default values as fallbacks
const defaultAppwriteUrl = "https://cloud.appwrite.io/v1";

// Appwrite configuration
export const appwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_URL || defaultAppwriteUrl,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || 'mock_project_id',
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || 'mock_database_id',
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID || 'mock_storage_id',
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID || 'mock_user_collection',
  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID || 'mock_post_collection',
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID || 'mock_saves_collection',
  // Mirani Well Wellness Collections
  journalCollectionId: import.meta.env.VITE_APPWRITE_JOURNAL_COLLECTION_ID || 'mock_journal_collection',
  affirmationsCollectionId: import.meta.env.VITE_APPWRITE_AFFIRMATIONS_COLLECTION_ID || 'mock_affirmations_collection',
  ritualSessionsCollectionId: import.meta.env.VITE_APPWRITE_RITUAL_SESSIONS_COLLECTION_ID || 'mock_ritual_sessions_collection',
  aiInsightsCollectionId: import.meta.env.VITE_APPWRITE_AI_INSIGHTS_COLLECTION_ID || 'mock_ai_insights_collection',
  moodEntriesCollectionId: import.meta.env.VITE_APPWRITE_MOOD_ENTRIES_COLLECTION_ID || 'mock_mood_entries_collection',
};

// Initialize the Appwrite client
export const client = new Client();

// Configure the client
try {
  client.setEndpoint(appwriteConfig.url);
  client.setProject(appwriteConfig.projectId);
  console.log("Appwrite client configured with:", { 
    url: appwriteConfig.url,
    projectId: appwriteConfig.projectId
  });
} catch (error) {
  console.error("Failed to configure Appwrite client:", error);
}

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
