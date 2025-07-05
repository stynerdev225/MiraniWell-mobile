import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { globalErrorHandler } from "@/hooks/useErrorHandler";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on session errors (401)
        if (error && (error as any)?.code === 401) {
          return false;
        }
        // Default retry logic for other errors
        return failureCount < 3;
      },
      onError: globalErrorHandler,
    },
    mutations: {
      retry: (failureCount, error) => {
        // Don't retry on session errors (401)
        if (error && (error as any)?.code === 401) {
          return false;
        }
        // Default retry logic for other errors
        return failureCount < 1;
      },
      onError: globalErrorHandler,
    },
  },
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
