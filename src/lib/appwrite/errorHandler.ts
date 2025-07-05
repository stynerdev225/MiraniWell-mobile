import { clearSessionData, isSessionError } from "./sessionUtils";

// Global error handler for Appwrite API errors
export function handleAppwriteError(error: any, redirectToSignIn?: () => void) {
  console.log('Handling Appwrite error:', error);
  
  // Check if it's a session-related error
  if (isSessionError(error)) {
    console.log('Session error detected, clearing session data');
    clearSessionData();
    
    // Redirect to sign-in if redirect function is provided
    if (redirectToSignIn) {
      redirectToSignIn();
    }
    
    return {
      isSessionError: true,
      message: 'Your session has expired. Please sign in again.'
    };
  }
  
  // Handle other common errors
  if (error?.message?.includes('document_not_found') || error?.code === 404) {
    return {
      isSessionError: false,
      message: 'The requested resource was not found.'
    };
  }
  
  if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
    return {
      isSessionError: false,
      message: 'Network error. Please check your internet connection.'
    };
  }
  
  // Generic error
  return {
    isSessionError: false,
    message: error?.message || 'An unexpected error occurred.'
  };
}

// Wrapper for API calls that automatically handles session errors
export async function withSessionErrorHandling<T>(
  apiCall: () => Promise<T>,
  redirectToSignIn?: () => void
): Promise<T | null> {
  try {
    return await apiCall();
  } catch (error: any) {
    const errorResult = handleAppwriteError(error, redirectToSignIn);
    
    if (errorResult.isSessionError) {
      // Return null for session errors to indicate no data available
      return null;
    }
    
    // Re-throw other errors
    throw error;
  }
}
