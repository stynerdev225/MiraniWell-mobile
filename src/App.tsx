import { Routes, Route } from "react-router-dom";

import {
  Home,
  Explore,
  Saved,
  CreatePost,
  Profile,
  EditPost,
  PostDetails,
  UpdateProfile,
  AllUsers,
  MindBodySpirit,
  MockCheckout,
  RitualRooms,
  Journal,
  Affirmations,
  AIInsights,
} from "@/_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignupForm from "@/_auth/forms/SignupForm";
import SigninForm from "@/_auth/forms/SigninForm";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
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
          <Route path="/mind-body-spirit" element={<MindBodySpirit />} />
          <Route path="/mock-checkout" element={<MockCheckout />} />
          {/* Mirani Well Routes */}
          <Route path="/ritual-rooms" element={<RitualRooms />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/affirmations" element={<Affirmations />} />
          <Route path="/ai-insights" element={<AIInsights />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
