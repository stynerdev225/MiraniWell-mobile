import { Routes, Route, Navigate } from "react-router-dom";

import {
  Home,
  Explore,
  Saved,
  CreatePost,
  Profile,
  EditPost,
  PostDetails,
  UpdateProfile,
  ProfileSettings,
  AllUsers,
  MindBodySpirit,
  MockCheckout,
  Dashboard,
  Community,
  RitualRooms,
  Journal,
  Affirmations,
  AIInsights,
} from "@/_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import ClerkSignIn from "@/_auth/pages/ClerkSignIn";
import ClerkSignUp from "@/_auth/pages/ClerkSignUp";
import ClerkTest from "@/_root/pages/ClerkTest";
import ClerkDebug from "@/_root/pages/ClerkDebug";
import { Toaster } from "@/components/ui/toaster";
import { GlobalLoader } from "@/components/shared";

import "./globals.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <GlobalLoader />
      <Routes>
        {/* public routes - now redirecting to Clerk */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<Navigate to="/clerk-sign-in" replace />} />
          <Route path="/sign-up" element={<Navigate to="/clerk-sign-up" replace />} />
          {/* Clerk authentication routes */}
          <Route path="/clerk-sign-in" element={<ClerkSignIn />} />
          <Route path="/clerk-sign-up" element={<ClerkSignUp />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/mind-body-spirit" element={<MindBodySpirit />} />
          <Route path="/mock-checkout" element={<MockCheckout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
          {/* Mirani Well Routes */}
          <Route path="/ritual-rooms" element={<RitualRooms />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/affirmations" element={<Affirmations />} />
          <Route path="/ai-insights" element={<AIInsights />} />
          {/* Clerk Test Route */}
          <Route path="/clerk-test" element={<ClerkTest />} />
          <Route path="/clerk-debug" element={<ClerkDebug />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
