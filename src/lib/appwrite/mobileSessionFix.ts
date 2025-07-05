// Mobile-specific login fixes
import { account } from "./config";

// Check if we're on mobile
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Mobile-specific session handling
export const mobileSessionFix = {
  // Clear all storage on mobile before login
  clearMobileSession: async () => {
    if (isMobile()) {
      try {
        console.log('📱 Clearing mobile session storage...');
        
        // Clear all storage types
        localStorage.clear();
        sessionStorage.clear();
        
        // Clear any cached service worker data
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (const registration of registrations) {
            await registration.unregister();
          }
        }
        
        // Clear any cached data
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map(name => caches.delete(name)));
        }
        
        console.log('📱 Mobile session storage cleared successfully');
      } catch (error) {
        console.error('📱 Error clearing mobile session:', error);
      }
    }
  },

  // Mobile-specific login with retries
  mobileLogin: async (email: string, password: string, retries = 3) => {
    if (!isMobile()) {
      // Use regular login for non-mobile
      return account.createEmailSession(email, password);
    }

    console.log('📱 Starting mobile login process...');
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`📱 Login attempt ${attempt}/${retries}`);
        
        // Wait a bit between attempts
        if (attempt > 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }

        // Clear session before each attempt
        await mobileSessionFix.clearMobileSession();
        
        // Try to delete any existing session
        try {
          await account.deleteSession('current');
        } catch (e) {
          // Ignore if no session exists
        }

        // Create new session with mobile-specific settings
        const session = await account.createEmailSession(email, password);
        
        if (session) {
          console.log('📱 Mobile login successful:', session.$id);
          
          // Verify the session immediately
          const currentAccount = await account.get();
          console.log('📱 Account verification:', currentAccount.$id);
          
          return session;
        }
      } catch (error: any) {
        console.error(`📱 Login attempt ${attempt} failed:`, error);
        
        // Check for specific mobile-related errors
        if (error?.code === 401) {
          console.log('📱 Invalid credentials - no retry needed');
          throw error;
        }
        
        if (error?.message?.includes('network') || 
            error?.message?.includes('fetch') ||
            error?.name === 'NetworkError') {
          console.log('📱 Network error - will retry');
          if (attempt === retries) {
            throw new Error('Network error: Unable to connect after multiple attempts');
          }
          continue;
        }
        
        // For other errors, retry once more
        if (attempt === retries) {
          throw error;
        }
      }
    }
    
    throw new Error('Mobile login failed after all retries');
  },

  // Mobile-specific user creation
  mobileCreateAccount: async (email: string, password: string, name: string, retries = 3) => {
    if (!isMobile()) {
      // Use regular creation for non-mobile
      return account.create(crypto.randomUUID(), email, password, name);
    }

    console.log('📱 Starting mobile account creation process...');
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`📱 Account creation attempt ${attempt}/${retries}`);
        
        // Wait a bit between attempts
        if (attempt > 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }

        // Clear session before each attempt
        await mobileSessionFix.clearMobileSession();
        
        // Create account with mobile-specific settings
        const newAccount = await account.create(
          crypto.randomUUID(),
          email,
          password,
          name
        );
        
        if (newAccount) {
          console.log('📱 Mobile account creation successful:', newAccount.$id);
          return newAccount;
        }
      } catch (error: any) {
        console.error(`📱 Account creation attempt ${attempt} failed:`, error);
        
        // Check for specific errors
        if (error?.code === 409) {
          console.log('📱 User already exists - no retry needed');
          throw error;
        }
        
        if (error?.message?.includes('network') || 
            error?.message?.includes('fetch') ||
            error?.name === 'NetworkError') {
          console.log('📱 Network error - will retry');
          if (attempt === retries) {
            throw new Error('Network error: Unable to create account after multiple attempts');
          }
          continue;
        }
        
        // For other errors, retry once more
        if (attempt === retries) {
          throw error;
        }
      }
    }
    
    throw new Error('Mobile account creation failed after all retries');
  },

  // Check if mobile login is working properly
  testMobileLogin: async () => {
    if (!isMobile()) {
      console.log('📱 Not on mobile device');
      return true;
    }

    try {
      console.log('📱 Testing mobile login capabilities...');
      
      // Test 1: Check if we can reach the account service
      const promise1 = account.get();
      const timeout1 = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      );
      
      try {
        await Promise.race([promise1, timeout1]);
        console.log('📱 Account service reachable');
      } catch (error: any) {
        if (error?.message !== 'Timeout') {
          console.log('📱 Account service reachable (got expected auth error)');
        } else {
          console.error('📱 Account service timeout');
          return false;
        }
      }
      
      // Test 2: Check network connectivity
      const networkTest = await fetch(window.location.origin + '/favicon.ico', {
        method: 'HEAD',
        cache: 'no-cache'
      });
      
      if (!networkTest.ok) {
        console.error('📱 Network connectivity test failed');
        return false;
      }
      
      console.log('📱 Mobile login capabilities test passed');
      return true;
    } catch (error) {
      console.error('📱 Mobile login capabilities test failed:', error);
      return false;
    }
  }
};

export default mobileSessionFix;
