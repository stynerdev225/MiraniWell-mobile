import { ID, Query } from "appwrite";

import { appwriteConfig, account, databases, avatars } from "./config";
import { INewUser, IUpdateUser } from "@/types";
import { isDevelopment, logDevInfo } from "./devUtils";
import {
  mockUsers,
  mockPosts,
  mockUserCredentials,
  validateCredentials,
  createMockId,
  addMockUser
} from "./mockData";
import { getFilePreview, uploadFile, deleteFile } from "./api";

// ============================================================
// AUTH - DEVELOPMENT VERSION
// ============================================================

// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
  if (isDevelopment) {
    logDevInfo("Creating user account in development mode", user);

    // Check if email already exists
    if (mockUserCredentials[user.email]) {
      throw new Error("Email already exists");
    }

    const newUserId = createMockId();

    // Create mock user
    const mockUser = {
      $id: newUserId,
      name: user.name,
      username: user.username,
      email: user.email,
      imageUrl: `https://i.pravatar.cc/150?u=${user.email}`,
      imageId: `img-${newUserId}`,
      bio: "",
      accountId: `acc-${newUserId}`,
      posts: [], // Add empty posts array
      save: [] // Default empty array for the 'save' property
    };

    // Add to mock data with persistence
    addMockUser(mockUser, user.password);

    return mockUser;
  }

  // Real implementation for production
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user account:", error);
    throw error;
  }
}

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  if (isDevelopment) {
    logDevInfo("Signing in user in development mode", user);
    
    // Debug: Log current mock credentials
    console.log("Available mock credentials:", Object.keys(mockUserCredentials));

    // For development, validate credentials first
    const validUser = validateCredentials(user.email, user.password);
    if (!validUser) {
      // If no matching credentials, check if it's a test account
      console.log(`No matching credentials found for ${user.email}. Available emails:`, Object.keys(mockUserCredentials));
      
      // For flexibility, create a session with the first user if using test credentials
      if (user.email.includes('test') || user.email.includes('demo') || user.email.includes('admin')) {
        console.log("Using default user for test credentials");
        const defaultUser = mockUsers[0];
        return {
          $id: `session-${createMockId()}`,
          userId: defaultUser.$id
        };
      }
      
      // Otherwise, throw an error for clarity
      throw new Error(`Invalid credentials for ${user.email}. Please check your email and password or sign up first.`);
    }

    console.log("Valid user found:", validUser.email);
    return {
      $id: `session-${createMockId()}`,
      userId: validUser.$id
    };
  }

  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

// ============================== GET USER
export async function getCurrentUser() {
  if (isDevelopment) {
    // For development, we'll just return the first mock user
    logDevInfo("Getting current user in development mode");
    return mockUsers[0];
  }

  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

// ============================== SIGN OUT
export async function signOutAccount() {
  if (isDevelopment) {
    logDevInfo("Signing out in development mode");
    return true;
  }

  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

// ============================================================
// POSTS
// ============================================================

// ============================== GET POSTS
export async function getRecentPosts() {
  if (isDevelopment) {
    logDevInfo("Getting recent posts in development mode");

    // Sort by created date descending and limit to 20
    return {
      total: mockPosts.length,
      documents: mockPosts
        .sort((a, b) => new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime())
        .slice(0, 20)
    };
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.error("Error getting recent posts:", error);
    throw error;
  }
}

// ============================== GET INFINITE POSTS
export async function getInfinitePosts({ pageParam }: { pageParam: string }) {
  if (isDevelopment) {
    logDevInfo("Getting infinite posts in development mode", { pageParam });

    // Sort by updated date descending
    const sortedPosts = [...mockPosts].sort((a, b) => {
      const dateA = a.$updatedAt ? new Date(a.$updatedAt).getTime() : new Date(a.$createdAt).getTime();
      const dateB = b.$updatedAt ? new Date(b.$updatedAt).getTime() : new Date(b.$createdAt).getTime();
      return dateB - dateA;
    });

    // Implement pagination logic
    const postsPerPage = 9;
    let startIndex = 0;

    // If pageParam is provided, find its index in the sorted array
    if (pageParam) {
      const paramIndex = sortedPosts.findIndex(post => post.$id === pageParam);
      if (paramIndex !== -1) {
        startIndex = paramIndex + 1; // Start after the cursor post
      }
    }

    // Get the next page of posts
    const paginatedPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

    return {
      total: mockPosts.length,
      documents: paginatedPosts
    };
  }

  try {
    const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];

    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam.toString()));
    }

    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.error("Error getting infinite posts:", error);
    throw error;
  }
}

// ============================== GET USERS
export async function getUsers() {
  if (isDevelopment) {
    logDevInfo("Getting users in development mode");

    return {
      total: mockUsers.length,
      documents: mockUsers.slice(0, 10)
    };
  }

  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
}

// ============================== LIKE / UNLIKE POST
export async function likePost(postId: string, likesArray: string[]) {
  if (isDevelopment) {
    logDevInfo(`Liking/unliking post ${postId} in development mode`, likesArray);

    // Find the post in mock data
    const postIndex = mockPosts.findIndex(post => post.$id === postId);
    if (postIndex === -1) {
      console.error(`Post with ID ${postId} not found in mock data`);
      return null;
    }

    // Update the likes
    mockPosts[postIndex].likes = likesArray;

    return {
      ...mockPosts[postIndex],
      $updatedAt: new Date().toISOString()
    };
  }

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
    console.error("Error updating likes:", error);
    throw error;
  }
}

// ============================== SAVE POST
export async function savePost(userId: string, postId: string) {
  if (isDevelopment) {
    logDevInfo(`Saving post ${postId} for user ${userId} in development mode`);

    const saveId = `save-${createMockId()}`;

    // Create a new save record
    const newSave = {
      $id: saveId,
      user: userId,
      post: { $id: postId },
      $createdAt: new Date().toISOString()
    };

    // Find the user to add the saved post
    const userIndex = mockUsers.findIndex(user => user.$id === userId);
    if (userIndex !== -1) {
      // Add the save to the user's saves
      if (!Array.isArray(mockUsers[userIndex].save)) {
        mockUsers[userIndex].save = [];
      }
      mockUsers[userIndex].save.push(newSave);
    }

    return newSave;
  }

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
    console.error("Error saving post:", error);
    throw error;
  }
}

// ============================== DELETE SAVED POST
export async function deleteSavedPost(savedRecordId: string) {
  if (isDevelopment) {
    logDevInfo(`Deleting saved post record ${savedRecordId} in development mode`);

    // Find which user has this saved post
    for (const user of mockUsers) {
      if (Array.isArray(user.save)) {
        const saveIndex = user.save.findIndex(save => save.$id === savedRecordId);
        if (saveIndex !== -1) {
          // Remove the save from the user's saves
          user.save.splice(saveIndex, 1);
          return { status: "Ok" };
        }
      }
    }

    return { status: "Not found" };
  }

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    );

    if (!statusCode) throw Error;

    return { status: "Ok" };
  } catch (error) {
    console.error("Error deleting saved post:", error);
    throw error;
  }
}

// ============================== UPDATE USER
export async function updateUser(user: IUpdateUser) {
  if (isDevelopment) {
    logDevInfo(`Updating user ${user.userId} in development mode`, user);

    // Find the user to update
    const userIndex = mockUsers.findIndex(u => u.$id === user.userId);
    if (userIndex === -1) {
      console.error(`User with ID ${user.userId} not found in mock data`);
      return null;
    }

    // Update basic user info
    mockUsers[userIndex].name = user.name;
    mockUsers[userIndex].bio = user.bio;

    // Only update image if there's a new file
    if (user.file?.length > 0) {
      mockUsers[userIndex].imageUrl = URL.createObjectURL(user.file[0]);
    }

    // Update course-related fields
    if (user.isCourseUser !== undefined) mockUsers[userIndex].isCourseUser = user.isCourseUser;
    if (user.trialStartDate !== undefined) mockUsers[userIndex].trialStartDate = user.trialStartDate;
    if (user.isTrialActive !== undefined) mockUsers[userIndex].isTrialActive = user.isTrialActive;
    if (user.hasPaid !== undefined) mockUsers[userIndex].hasPaid = user.hasPaid;
    if (user.paymentDate !== undefined) mockUsers[userIndex].paymentDate = user.paymentDate;
    if (user.homeworkSubmission !== undefined) mockUsers[userIndex].homeworkSubmission = user.homeworkSubmission;

    // Return the updated user
    return mockUsers[userIndex];
  }

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

    // Create userData object
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

    //  Update user
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
    throw error;
  }
}

// ============================== SAVE USER TO DB - Helper function
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL | string;
  username?: string;
}) {
  if (isDevelopment) {
    logDevInfo("Saving user to DB in development mode", user);

    const newUser = {
      $id: `user-${createMockId()}`,
      accountId: user.accountId,
      email: user.email,
      name: user.name,
      imageUrl: user.imageUrl.toString(), // Convert URL to string if needed
      imageId: `img-${createMockId()}`,
      username: user.username || user.name.toLowerCase().replace(/\s+/g, ''),
      bio: "",
      posts: [], // Add empty posts array
      save: [] // Default empty array for the 'save' property
    };

    mockUsers.push(newUser);
    return newUser;
  }

  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.error("Error saving user to database:", error);
    throw error;
  }
}

// ============================== GET USER BY ID
export async function getUserById(userId: string) {
  if (isDevelopment) {
    logDevInfo("Getting user by ID in development mode", userId);
    
    // Find user by ID in mock data
    const user = mockUsers.find(u => u.$id === userId);
    if (!user) {
      // If user not found, return the first mock user as fallback
      console.log("User not found, returning default user for development");
      return mockUsers[0];
    }
    
    return user;
  }

  // This shouldn't be called in production from this file
  throw new Error("getUserById should not be called from devApi in production");
}
