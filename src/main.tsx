import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { SmartAuthProvider } from "@/context/SmartAuthContext";
import { QueryProvider } from "@/lib/react-query/QueryProvider";
import { ClerkAuthProvider } from "@/lib/clerk/ClerkAuthProvider";

import App from "./App";

// Import mobile debug button for development
if (import.meta.env.DEV) {
  import("@/lib/mobileDebugButton");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkAuthProvider>
        <QueryProvider>
          <SmartAuthProvider>
            <App />
          </SmartAuthProvider>
        </QueryProvider>
      </ClerkAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
