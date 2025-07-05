// Utility functions to fix common authentication issues
import { account, databases, avatars, appwriteConfig } from "./config";
import { ID, Query } from "appwrite";

// Fix user account that exists but has no user document
export async function createMissingUserDocument() {
  try {
    // Get the current account
    const currentAccount = await account.get();
    
    if (!currentAccount) {
      console.log('No authenticated account found');
      return null;
    }

    console.log('Current account:', currentAccount);

    // Check if user document exists
    const existingUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (existingUser.documents.length > 0) {
      console.log('User document already exists:', existingUser.documents[0]);
      return existingUser.documents[0];
    }

    // Create missing user document
    const avatarUrl = avatars.getInitials(currentAccount.name);
    
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: currentAccount.$id,
        name: currentAccount.name,
        email: currentAccount.email,
        username: currentAccount.email.split('@')[0], // Use email prefix as username
        imageUrl: avatarUrl,
        bio: ''
      }
    );

    console.log('Created missing user document:', newUser);
    return newUser;
    
  } catch (error) {
    console.error('Error creating missing user document:', error);
    return null;
  }
}

// Clear all sessions and start fresh
export async function clearAllSessions() {
  try {
    const sessions = await account.listSessions();
    console.log('Active sessions:', sessions.sessions.length);
    
    for (const session of sessions.sessions) {
      await account.deleteSession(session.$id);
    }
    
    console.log('All sessions cleared');
    localStorage.removeItem("cookieFallback");
    
  } catch (error) {
    console.error('Error clearing sessions:', error);
  }
}

// Call this from the browser console to fix user document issue
// window.createMissingUserDocument = createMissingUserDocument;
// window.clearAllSessions = clearAllSessions;
