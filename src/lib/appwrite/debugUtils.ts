// Debug utility to check the state of the database
import { databases, appwriteConfig } from "./config";

export async function debugDatabase() {
  console.log('=== DATABASE DEBUG ===');
  
  try {
    // Check users collection
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
    );
    console.log('Users in database:', users.documents.length);
    users.documents.forEach((user, index) => {
      console.log(`User ${index + 1}:`, {
        id: user.$id,
        accountId: user.accountId,
        email: user.email,
        name: user.name,
        username: user.username
      });
    });
    
    // Check posts collection
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId
    );
    console.log('Posts in database:', posts.documents.length);
    
    // Check saves collection
    const saves = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId
    );
    console.log('Saves in database:', saves.documents.length);
    
  } catch (error) {
    console.error('Database debug error:', error);
  }
}

// Call this function to debug
// debugDatabase();
