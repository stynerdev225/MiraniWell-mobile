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

// Check if we should disable Appwrite initialization 
// This environment variable will be set when using Clerk exclusively
const isAppwriteDisabled = import.meta.env.VITE_DISABLE_APPWRITE === 'true';

// Initialize the Appwrite client
export const client = new Client();
export let account: Account;
export let databases: Databases;
export let storage: Storage;
export let avatars: Avatars;

// Only initialize Appwrite if not disabled
if (!isAppwriteDisabled) {
  try {
    client.setEndpoint(appwriteConfig.url);
    client.setProject(appwriteConfig.projectId);
    
    // Dev keys are for server-side usage, not client-side
    // For client-side, we need proper platform configuration in Appwrite
    console.log("Appwrite client configured with:", { 
      url: appwriteConfig.url,
      projectId: appwriteConfig.projectId,
      hasApiKey: !!import.meta.env.VITE_APPWRITE_API_KEY,
      isDevelopment: import.meta.env.DEV,
      hasProjectId: !!import.meta.env.VITE_APPWRITE_PROJECT_ID,
      hasUrl: !!import.meta.env.VITE_APPWRITE_URL,
      currentOrigin: typeof window !== 'undefined' ? window.location.origin : 'server'
    });
    
    // Enhanced debugging for network issues
    if (appwriteConfig.projectId === 'mock_project_id') {
      console.warn('🚨 WARNING: Using mock project ID. Check Vercel environment variables!');
      console.warn('🔧 Expected environment variables:', {
        VITE_APPWRITE_URL: import.meta.env.VITE_APPWRITE_URL,
        VITE_APPWRITE_PROJECT_ID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
        VITE_USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA
      });
    }
    
    // Initialize services
    account = new Account(client);
    databases = new Databases(client);
    storage = new Storage(client);
    avatars = new Avatars(client);
    
  } catch (error) {
    console.error("Failed to configure Appwrite client:", error);
    // Log detailed error information
    console.error("Configuration details:", {
      url: appwriteConfig.url,
      projectId: appwriteConfig.projectId,
      environment: import.meta.env.NODE_ENV,
      allEnvVars: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'))
    });
  }
} else {
  console.log('🚨 Appwrite initialization disabled via VITE_DISABLE_APPWRITE=true');
  // Create a dummy client to avoid TypeScript errors
  // These should never be used when Appwrite is disabled
  const dummyClient = new Client();
  account = new Account(dummyClient);
  databases = new Databases(dummyClient);
  storage = new Storage(dummyClient);
  avatars = new Avatars(dummyClient);
}
