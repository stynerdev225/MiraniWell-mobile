import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

import { IUser } from "@/types";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  isInitialized: false,
  setUser: () => { },
  setIsAuthenticated: () => { },
  checkAuthUser: async () => false as boolean,
  handleSessionExpired: () => { },
};

type IContextType = {
  user: IUser;
  isLoading: boolean;
  isInitialized: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
  handleSessionExpired: () => void;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  
  // Check if we're on a Clerk page and completely disable Appwrite AuthContext
  const isClerkPage = window.location.pathname.startsWith('/clerk-');

  // Always initialize all hooks to avoid React hooks error
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(isClerkPage ? false : true); // Start with false on Clerk pages
  const [isInitialized, setIsInitialized] = useState(isClerkPage ? true : false);

  const checkAuthUser = async () => {
    // Skip Appwrite logic on Clerk pages
    if (isClerkPage) {
      return false;
    }

    // Dynamic import to avoid loading Appwrite on Clerk pages
    const { getCurrentUser } = await import("@/lib/appwrite/api");
    const { isSessionError } = await import("@/lib/appwrite/sessionUtils");
    
    // Only show loading state during initial check
    if (!isInitialized) {
      setIsLoading(true);
    }

    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }

      // No user found, make sure we're not authenticated
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      return false;
    } catch (error: any) {
      console.error('Auth check error:', error);

      // Check if it's a session error
      if (isSessionError(error)) {
        console.log('Session expired, clearing auth state');
        handleSessionExpired();
      }

      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      return false;
    } finally {
      // Only turn off loading after initial check
      if (!isInitialized) {
        setIsLoading(false);
        setIsInitialized(true);
      }
    }
  };

  const handleSessionExpired = useCallback(async () => {
    // Skip Appwrite logic on Clerk pages
    if (isClerkPage) {
      return;
    }

    console.log('Handling session expiration');

    // Dynamic import to avoid loading Appwrite on Clerk pages
    const { clearSessionData } = await import("@/lib/appwrite/sessionUtils");
    
    // Clear session data
    clearSessionData();

    // Reset auth state
    setIsAuthenticated(false);
    setUser(INITIAL_USER);

    // Redirect to Clerk sign-in if not already there
    if (!window.location.pathname.includes('/clerk-') && !window.location.pathname.includes('/sign-in') && !window.location.pathname.includes('/sign-up')) {
      navigate('/clerk-sign-in');
    }
  }, [navigate, isClerkPage]);

  useEffect(() => {
    // Skip Appwrite logic on Clerk pages
    if (isClerkPage) {
      return;
    }

    const cookieFallback = localStorage.getItem("cookieFallback");

    // Only redirect if we're not already on a sign-in/sign-up page
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      // Check if we're already on auth pages
      if (!window.location.pathname.includes('/clerk-') && !window.location.pathname.includes('/sign-in') && !window.location.pathname.includes('/sign-up')) {
        navigate("/clerk-sign-in");
      }
    }

    checkAuthUser();

    // Debug database state (temporarily disabled)
    // debugDatabase();

    // Make debug functions available globally for testing (with dynamic import)
    import("@/lib/appwrite/fixExistingUser").then(({ fixExistingUser }) => {
      (window as any).fixExistingUser = fixExistingUser;
    });

    // (window as any).createMissingUserDocument = createMissingUserDocument;
    // (window as any).clearAllSessions = clearAllSessions;

    // Display the development mode banner if in development mode (with dynamic import)
    import("@/lib/appwrite/devUtils").then(({ displayDevModeBanner, isDevelopment }) => {
      if (isDevelopment) {
        displayDevModeBanner();
      }
    });
  }, [isClerkPage]);

  const value = {
    user,
    setUser,
    isLoading,
    isInitialized,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
    handleSessionExpired,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
