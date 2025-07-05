import { ID, Query } from "appwrite";

import { appwriteConfig, account, databases, storage, avatars } from "./config";
import { IUpdatePost, INewPost, INewUser, IUpdateUser } from "@/types";
import { isDevelopment } from "./devUtils";
import { deleteCurrentSession, setSessionData, clearSessionData, isSessionError } from "./sessionUtils";
import { mobileSessionFix } from "./mobileSessionFix";

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
  try {
    if (isDevelopment) {
      // Import dynamically to avoid circular dependencies
      const { createUserAccount: devCreateUserAccount } = await import('./devApi');
      return devCreateUserAccount(user);
    }

    console.log('Starting user account creation for:', user.email);

    // Clear any existing session
    await deleteCurrentSession();

    // Use mobile-specific account creation for mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let newAccount;
    if (isMobile) {
      console.log('Using mobile-specific account creation');
      newAccount = await mobileSessionFix.mobileCreateAccount(user.email, user.password, user.name);
    } else {
      console.log('Using standard account creation');
      newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
      );
    }

    if (!newAccount) throw new Error('Failed to create account');

    console.log('Account created successfully:', newAccount.$id);

    // Immediately sign in the new user to get proper session
    let session;
    if (isMobile) {
      console.log('Using mobile-specific login for new account');
      session = await mobileSessionFix.mobileLogin(user.email, user.password);
    } else {
      console.log('Using standard login for new account');
      session = await account.createEmailSession(user.email, user.password);
    }
    console.log('Session created for new user:', session.$id);

    // Set session data in localStorage
    setSessionData();

    const avatarUrl = avatars.getInitials(user.name);

    const userDocumentData = {
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
      bio: '', // Add required bio field
    };

    console.log('Creating user document with data:', userDocumentData);

    const newUser = await saveUserToDB(userDocumentData);

    console.log('User creation process completed successfully');
    return newUser;
  } catch (error) {
    console.error('Create user account error:', error);
    throw error;
  }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL | string;
  username?: string;
  bio?: string;
}) {
  try {
    console.log('Attempting to save user to DB:', user);
    
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    console.log('Successfully saved user to DB:', newUser);
    return newUser;
  } catch (error) {
    console.error('Save user to DB error:', error);
    console.error('User data that failed:', user);
    console.error('Database ID:', appwriteConfig.databaseId);
    console.error('User Collection ID:', appwriteConfig.userCollectionId);
    throw error;
  }
}

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  try {
    if (isDevelopment) {
      // Import dynamically to avoid circular dependencies
      const { signInAccount: devSignInAccount } = await import('./devApi');
      return devSignInAccount(user);
    }

    console.log('🔐 Starting sign in process for:', user.email);
    console.log('🔐 Using Appwrite endpoint:', appwriteConfig.url);
    console.log('🔐 Project ID:', appwriteConfig.projectId);

    // Clear any existing session
    await deleteCurrentSession();

    // Mobile-specific debugging
    if (typeof window !== 'undefined') {
      console.log('🔐 Network status:', {
        online: navigator.onLine,
        cookieEnabled: navigator.cookieEnabled,
        userAgent: navigator.userAgent.substring(0, 100),
        href: window.location.href
      });
    }

    // Use mobile-specific login for mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let session;
    if (isMobile) {
      console.log('🔐 Using mobile-specific login');
      session = await mobileSessionFix.mobileLogin(user.email, user.password);
    } else {
      console.log('🔐 Using standard login');
      session = await account.createEmailSession(user.email, user.password);
    }
    
    console.log('🔐 Session created successfully:', session.$id);
    
    // Set session data in localStorage
    setSessionData();
    console.log('🔐 Session data set in localStorage');
    
    return session;
  } catch (error: any) {
    console.error('🔐 Sign in error:', error);
    
    // Log detailed error information for mobile debugging
    console.log('🔐 Detailed error info:', {
      name: error?.name,
      message: error?.message,
      code: error?.code,
      type: error?.type,
      response: error?.response,
      stack: error?.stack?.substring(0, 200)
    });

    // Check if it's a network-related error
    if (error?.name === 'NetworkError' || 
        error?.message?.includes('fetch') || 
        error?.message?.includes('network') ||
        error?.message?.includes('Failed to fetch')) {
      console.log('🔐 Network error detected during sign in');
      const networkError = new Error('Network error during sign in');
      networkError.name = 'NetworkError';
      throw networkError;
    }

    // Check if it's a CORS error
    if (error?.message?.includes('cors') || 
        error?.message?.includes('Access-Control-Allow-Origin')) {
      console.log('🔐 CORS error detected during sign in');
      const corsError = new Error('CORS error during sign in');
      corsError.name = 'CORSError';
      throw corsError;
    }

    throw error;
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error: any) {
    console.log('Get account error:', error);
    // If it's a session-related error, clear session data and return null
    if (isSessionError(error)) {
      console.log('Session error detected, clearing session data');
      clearSessionData();
      return null;
    }
    // For other errors, still return null to avoid breaking the app
    return null;
  }
}

// ============================== GET USER
export async function getCurrentUser() {
  try {
    if (isDevelopment) {
      // Import dynamically to avoid circular dependencies
      const { getCurrentUser: devGetCurrentUser } = await import('./devApi');
      return devGetCurrentUser();
    }

    const currentAccount = await getAccount();
    if (!currentAccount) {
      // No authenticated session, return null
      return null;
    }

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser || currentUser.documents.length === 0) {
      // User document doesn't exist, create it
      console.log('No user document found, creating one for account:', currentAccount.$id);
      
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
      
      const newUserDocument = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        userDocumentData
      );
      
      console.log('User document created successfully:', newUserDocument);
      return newUserDocument;
    }

    return currentUser.documents[0];
  } catch (error: any) {
    console.log('Get current user error:', error);
    // If it's a session-related error, clear session data and return null
    if (isSessionError(error)) {
      console.log('Session error detected in getCurrentUser, clearing session data');
      clearSessionData();
      return null;
    }
    // For other errors, still return null to avoid breaking the app
    return null;
  }
}

// ============================== SIGN OUT
export async function signOutAccount() {
  try {
    if (isDevelopment) {
      // Import dynamically to avoid circular dependencies
      const { signOutAccount: devSignOutAccount } = await import('./devApi');
      return devSignOutAccount();
    }

    const session = await account.deleteSession("current");
    
    // Clear session data from localStorage
    clearSessionData();
    
    return session;
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

// ============================================================
// POSTS
// ============================================================

// ============================== CREATE POST
export async function createPost(post: INewPost) {
  try {
    // Upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Create post
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        // imageId: uploadedFile.$id, // Temporarily removed until schema is updated
        location: post.location,
        tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPLOAD FILE
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET FILE URL
export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE FILE
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET POSTS
export async function searchPosts(searchTerm: string) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search("caption", searchTerm)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
  if (isDevelopment) {
    // Import dynamically to avoid circular dependencies
    const { getInfinitePosts: devGetInfinitePosts } = await import('./devApi');
    return devGetInfinitePosts({ pageParam: pageParam.toString() });
  }

  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET POST BY ID
export async function getPostById(postId?: string) {
  if (!postId) throw Error;

  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPDATE POST
export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //  Update post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        // imageId: image.imageId, // Temporarily removed until schema is updated
        location: post.location,
        tags: tags,
      }
    );

    // Failed to update
    if (!updatedPost) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }

      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (hasFileToUpdate) {
      await deleteFile(post.imageId);
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE POST
export async function deletePost(postId?: string, imageId?: string) {
  if (!postId) return;

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );

    if (!statusCode) throw Error;

    // Only delete file if imageId is provided
    if (imageId) {
      await deleteFile(imageId);
    }

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}

// ============================== LIKE / UNLIKE POST
export async function likePost(postId: string, likesArray: string[]) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

// ============================== SAVE POST
export async function savePost(userId: string, postId: string) {
  try {
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}
// ============================== DELETE SAVED POST
export async function deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    );

    if (!statusCode) throw Error;

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER'S POST
export async function getUserPosts(userId?: string) {
  if (!userId) return;

  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET POPULAR POSTS (BY HIGHEST LIKE COUNT)
export async function getRecentPosts() {
  try {
    if (isDevelopment) {
      // Import dynamically to avoid circular dependencies
      const { getRecentPosts: devGetRecentPosts } = await import('./devApi');
      return devGetRecentPosts();
    }

    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

// ============================================================
// USER
// ============================================================

// ============================== GET USERS
export async function getUsers(limit?: number) {
  if (isDevelopment) {
    // Import dynamically to avoid circular dependencies
    const { getUsers: devGetUsers } = await import('./devApi');
    return devGetUsers();
  }

  const queries: any[] = [Query.orderDesc("$createdAt")];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      queries
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER BY ID
export async function getUserById(userId: string) {
  try {
    if (isDevelopment) {
      // Import dynamically to avoid circular dependencies
      const { getUserById: devGetUserById } = await import('./devApi');
      return devGetUserById(userId);
    }

    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPDATE USER
export async function updateUser(user: IUpdateUser) {
  const hasFileToUpdate = user.file.length > 0;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(user.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    //  Update user
    const userData: any = {
      name: user.name,
      bio: user.bio,
      imageUrl: image.imageUrl,
      imageId: image.imageId,
    };

    // Add course-related fields if they exist
    if (user.isCourseUser !== undefined) userData.isCourseUser = user.isCourseUser;
    if (user.trialStartDate !== undefined) userData.trialStartDate = user.trialStartDate;
    if (user.isTrialActive !== undefined) userData.isTrialActive = user.isTrialActive;
    if (user.hasPaid !== undefined) userData.hasPaid = user.hasPaid;
    if (user.paymentDate !== undefined) userData.paymentDate = user.paymentDate;
    if (user.homeworkSubmission !== undefined) userData.homeworkSubmission = user.homeworkSubmission;

    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.userId,
      userData
    );

    // Failed to update
    if (!updatedUser) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (user.imageId && hasFileToUpdate) {
      await deleteFile(user.imageId);
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}

// ============================== NETWORK CONNECTIVITY CHECK
export async function checkNetworkConnectivity() {
  try {
    console.log('🌐 Testing network connectivity...');
    
    // Test basic connectivity
    const response = await fetch(appwriteConfig.url + '/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('🌐 Network test response:', response.status);
    
    if (response.ok) {
      console.log('🌐 Network connectivity: OK');
      return true;
    } else {
      console.log('🌐 Network connectivity: Failed -', response.status);
      return false;
    }
  } catch (error) {
    console.error('🌐 Network connectivity test failed:', error);
    return false;
  }
}
