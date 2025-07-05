import { account } from "./config";

// Check if there's an active session
export async function checkActiveSession() {
  try {
    const session = await account.getSession('current');
    return session;
  } catch (error) {
    return null;
  }
}

// Delete current session if it exists
export async function deleteCurrentSession() {
  try {
    const session = await account.getSession('current');
    if (session) {
      await account.deleteSession('current');
      return true;
    }
    return false;
  } catch (error) {
    // No session to delete or already deleted
    return false;
  }
}

// Clear all browser session data
export function clearSessionData() {
  localStorage.removeItem("cookieFallback");
}

// Set session data
export function setSessionData() {
  localStorage.setItem("cookieFallback", JSON.stringify(["session"]));
}

// Check if session is valid and not expired
export async function validateSession() {
  try {
    const session = await account.getSession('current');
    if (session) {
      // Check if session is still valid by making a simple authenticated request
      await account.get();
      return true;
    }
    return false;
  } catch (error: any) {
    console.log('Session validation failed:', error);
    // If 401 or session-related error, session is invalid
    if (error?.code === 401 || error?.message?.includes('missing scope') || error?.message?.includes('Unauthorized')) {
      return false;
    }
    return false;
  }
}

// Check if error is a session-related error (401, unauthorized, etc.)
export function isSessionError(error: any): boolean {
  return (
    error?.code === 401 ||
    error?.status === 401 ||
    error?.message?.includes('missing scope') ||
    error?.message?.includes('Unauthorized') ||
    error?.message?.includes('Invalid session') ||
    error?.message?.includes('Session not found')
  );
}
