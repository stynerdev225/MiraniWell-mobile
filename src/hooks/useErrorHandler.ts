import { useUserContext } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { handleAppwriteError } from "@/lib/appwrite/errorHandler";

// Hook to handle React Query errors globally
export const useErrorHandler = () => {
  const { handleSessionExpired } = useUserContext();
  const { toast } = useToast();

  const handleQueryError = (error: any) => {
    console.error('Query error:', error);
    
    const errorResult = handleAppwriteError(error, handleSessionExpired);
    
    if (errorResult.isSessionError) {
      // Session expired, the handleSessionExpired function will handle the redirect
      toast({
        title: "Session Expired",
        description: errorResult.message,
        variant: "destructive",
      });
    } else {
      // Other errors
      toast({
        title: "Error",
        description: errorResult.message,
        variant: "destructive",
      });
    }
  };

  return { handleQueryError };
};

// Global error handler for React Query
export const globalErrorHandler = (error: any) => {
  console.error('Global React Query error:', error);
  
  // For now, just log the error. In a production app, you might want to send to error tracking service
  const errorResult = handleAppwriteError(error);
  
  if (errorResult.isSessionError) {
    // Session errors are handled by individual components/hooks
    console.log('Session error detected globally');
  }
};
