import { ClerkProvider } from '@clerk/clerk-react';
import { clerkConfig, logClerkConfig } from './config';

// Log Clerk configuration on import
logClerkConfig();

interface ClerkAuthProviderProps {
  children: React.ReactNode;
}

export const ClerkAuthProvider = ({ children }: ClerkAuthProviderProps) => {
  if (!clerkConfig.publishableKey) {
    console.error('🚨 Clerk publishable key is missing! Please add VITE_CLERK_PUBLISHABLE_KEY to your environment variables.');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Configuration Error</h2>
          <p className="text-gray-600">
            Clerk authentication is not properly configured. Please check your environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider 
      publishableKey={clerkConfig.publishableKey}
    >
      {children}
    </ClerkProvider>
  );
};

export default ClerkAuthProvider;
