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
