// Clerk configuration for MiraniWell authentication
export const clerkConfig = {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '',
  // Optional: Add any additional Clerk configuration here
  appearance: {
    theme: {
      primaryColor: '#4F46E5', // Match your app's primary color
      primaryTextColor: '#1F2937',
      secondaryColor: '#F3F4F6',
    },
    elements: {
      formButtonPrimary: 'bg-primary hover:bg-primary/90 text-white',
      card: 'shadow-lg border-0',
      headerTitle: 'text-2xl font-bold text-primary',
      headerSubtitle: 'text-gray-600',
      formFieldInput: 'border-gray-300 focus:border-primary focus:ring-primary',
      formFieldLabel: 'text-gray-700 font-medium',
      footerActionText: 'text-gray-600',
      footerActionLink: 'text-primary hover:text-primary/80',
    },
    layout: {
      socialButtonsPlacement: 'top',
      socialButtonsVariant: 'iconButton',
      showOptionalFields: true,
    },
  },
  localization: {
    signIn: {
      start: {
        title: 'Welcome back to MiraniWell',
        subtitle: 'Sign in to continue your wellness journey',
      },
    },
    signUp: {
      start: {
        title: 'Join MiraniWell',
        subtitle: 'Create your account to start your wellness journey',
      },
    },
  },
};

// Helper function to check if Clerk is properly configured
export const isClerkConfigured = () => {
  return !!clerkConfig.publishableKey;
};

// Debug function to log Clerk configuration status
export const logClerkConfig = () => {
  console.log('🔐 Clerk Configuration:', {
    hasPublishableKey: !!clerkConfig.publishableKey,
    publishableKeyPrefix: clerkConfig.publishableKey?.substring(0, 10) + '...',
    isConfigured: isClerkConfigured(),
  });
};
