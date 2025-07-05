// Fix for the existing user account that has no user document
import { account, databases, avatars, appwriteConfig } from "./config";
import { ID, Query } from "appwrite";

export async function fixExistingUser() {
  try {
    console.log('Starting to fix existing user...');
    
    // First, try to sign in with the existing account
    // You'll need to provide the email and password
    const email = "adm.mirianiwell@gmail.com"; // The email from your Appwrite console
    const password = "your_password_here"; // You'll need to provide this
    
    console.log('Attempting to sign in with existing account...');
    
    // Create a session for the existing account
    const session = await account.createEmailSession(email, password);
    console.log('Session created:', session);
    
    // Get the current account details
    const currentAccount = await account.get();
    console.log('Current account:', currentAccount);
    
    // Check if user document already exists
    const existingUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    
    if (existingUser.documents.length > 0) {
      console.log('User document already exists:', existingUser.documents[0]);
      return existingUser.documents[0];
    }
    
    // Create the missing user document
    const avatarUrl = avatars.getInitials(currentAccount.name);
    
    const userDocumentData = {
      accountId: currentAccount.$id,
      name: currentAccount.name,
      email: currentAccount.email,
      username: currentAccount.email.split('@')[0], // Use email prefix as username
      imageUrl: avatarUrl,
      bio: '',
    };
    
    console.log('Creating user document with data:', userDocumentData);
    
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      userDocumentData
    );
    
    console.log('User document created successfully:', newUser);
    return newUser;
    
  } catch (error) {
    console.error('Error fixing existing user:', error);
    throw error;
  }
}

// Make this available globally for testing
(window as any).fixExistingUser = fixExistingUser;
