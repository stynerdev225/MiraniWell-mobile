import { useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
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

// Dummy context for Clerk pages or when Clerk user is authenticated
function createClerkAwareContext(clerkUser: any) {
    return {
        user: clerkUser ? {
            id: clerkUser.id,
            name: clerkUser.fullName || clerkUser.firstName || '',
            username: clerkUser.username || clerkUser.emailAddresses?.[0]?.emailAddress || '',
            email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
            imageUrl: clerkUser.imageUrl || '',
            bio: '',
        } : INITIAL_USER,
        setUser: () => { },
        isLoading: false,
        isInitialized: true,
        isAuthenticated: !!clerkUser,
        setIsAuthenticated: () => { },
        checkAuthUser: async () => !!clerkUser,
        handleSessionExpired: () => { },
    };
}

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

const ClerkAwareAuthContext = createContext<IContextType | null>(null);

function ClerkAwareAuthProvider({ children }: { children: React.ReactNode }) {
    const { user: clerkUser, isSignedIn } = useUser();
    const contextValue = createClerkAwareContext(isSignedIn ? clerkUser : null);

    return (
        <ClerkAwareAuthContext.Provider value={contextValue}>
            {children}
        </ClerkAwareAuthContext.Provider>
    );
}

// Smart wrapper that decides which provider to use
export function SmartAuthProvider({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const { isSignedIn, isLoaded } = useUser();
    const isClerkPage = location.pathname.startsWith('/clerk-');

    // If on Clerk pages OR user is authenticated with Clerk, use Clerk-aware context
    // Also use Clerk context if Clerk is loaded and user is signed in
    if (isClerkPage || (isLoaded && isSignedIn)) {
        return <ClerkAwareAuthProvider>{children}</ClerkAwareAuthProvider>;
    }

    // If Clerk is loaded but user is not signed in, and we're not on Clerk pages,
    // still use Clerk context to avoid Appwrite initialization
    if (isLoaded && !isSignedIn && !isClerkPage) {
        return <ClerkAwareAuthProvider>{children}</ClerkAwareAuthProvider>;
    }

    // Only use Appwrite context if Clerk is not loaded yet and not on Clerk pages
    if (!isLoaded && !isClerkPage) {
        return <RealAuthProvider>{children}</RealAuthProvider>;
    }

    // Default to Clerk-aware context
    return <ClerkAwareAuthProvider>{children}</ClerkAwareAuthProvider>;
}

export function useUserContext() {
    const location = useLocation();
    const { user: clerkUser, isSignedIn, isLoaded } = useUser();
    const isClerkPage = location.pathname.startsWith('/clerk-');

    // If on Clerk pages OR user is authenticated with Clerk, use Clerk-aware context
    // Also use Clerk context if Clerk is loaded and user is signed in
    if (isClerkPage || (isLoaded && isSignedIn)) {
        const context = useContext(ClerkAwareAuthContext);
        if (!context) {
            // Fallback - create context on the fly
            return createClerkAwareContext(isSignedIn ? clerkUser : null);
        }
        return context;
    }

    // If Clerk is loaded but user is not signed in, and we're not on Clerk pages,
    // still use Clerk context to avoid Appwrite initialization
    if (isLoaded && !isSignedIn && !isClerkPage) {
        const context = useContext(ClerkAwareAuthContext);
        if (!context) {
            // Fallback - create context on the fly
            return createClerkAwareContext(null);
        }
        return context;
    }

    // Only use Appwrite context if Clerk is not loaded yet and not on Clerk pages
    if (!isLoaded && !isClerkPage) {
        return useRealUserContext();
    }

    // Default to Clerk-aware context
    const context = useContext(ClerkAwareAuthContext);
    if (!context) {
        // Fallback - create context on the fly
        return createClerkAwareContext(isSignedIn ? clerkUser : null);
    }
    return context;
}
