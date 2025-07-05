import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import { IUser } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";
import { displayDevModeBanner, isDevelopment } from "@/lib/appwrite/devUtils";
// import { debugDatabase } from "@/lib/appwrite/debugUtils";
// import { createMissingUserDocument, clearAllSessions } from "@/lib/appwrite/fixUtils";
import { fixExistingUser } from "@/lib/appwrite/fixExistingUser";

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
};

type IContextType = {
  user: IUser;
  isLoading: boolean;
  isInitialized: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start with true to prevent flash
  const [isInitialized, setIsInitialized] = useState(false);

  const checkAuthUser = async () => {
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
    } catch (error) {
      console.error('Auth check error:', error);
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

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");

    // Only redirect if we're not already on a sign-in/sign-up page
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      // Check if we're already on auth pages
      if (!window.location.pathname.includes('/sign-in') && !window.location.pathname.includes('/sign-up')) {
        navigate("/sign-in");
      }
    }

    checkAuthUser();

    // Debug database state (temporarily disabled)
    // debugDatabase();

    // Make debug functions available globally for testing
    (window as any).fixExistingUser = fixExistingUser;

    // (window as any).createMissingUserDocument = createMissingUserDocument;
    // (window as any).clearAllSessions = clearAllSessions;

    // Display the development mode banner if in development mode
    if (isDevelopment) {
      displayDevModeBanner();
    }
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isInitialized,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
