import { useLocation } from "react-router-dom";
import { createContext, useContext } from "react";

import { IUser } from "@/types";
import { AuthProvider as RealAuthProvider, useUserContext as useRealUserContext } from "./AuthContext";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

// Dummy context for Clerk pages
const dummyContextValue = {
  user: INITIAL_USER,
  setUser: () => { },
  isLoading: false,
  isInitialized: true,
  isAuthenticated: false,
  setIsAuthenticated: () => { },
  checkAuthUser: async () => false,
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

const DummyAuthContext = createContext<IContextType>(dummyContextValue);

function DummyAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <DummyAuthContext.Provider value={dummyContextValue}>
      {children}
    </DummyAuthContext.Provider>
  );
}

// Smart wrapper that decides which provider to use
export function SmartAuthProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isClerkPage = location.pathname.startsWith('/clerk-');

  if (isClerkPage) {
    return <DummyAuthProvider>{children}</DummyAuthProvider>;
  }

  return <RealAuthProvider>{children}</RealAuthProvider>;
}

export function useUserContext() {
  const location = useLocation();
  const isClerkPage = location.pathname.startsWith('/clerk-');

  if (isClerkPage) {
    return useContext(DummyAuthContext);
  }

  return useRealUserContext();
}
