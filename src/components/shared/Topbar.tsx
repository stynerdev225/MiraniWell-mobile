import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-3 px-4 relative">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700/5 to-dark-2/80 opacity-80"></div>

        {/* Desktop Logo - Hidden on mobile */}
        <Link to="/" className="hidden md:flex gap-3 items-center relative z-10 hover-scale-subtle transition-all duration-300">
          <img
            src="/assets/images/Mirani-Well-Logo.png"
            alt="Mirani Well logo"
            className="object-contain hover:brightness-110 transition-all duration-300 w-24 h-6 md:w-32 md:h-8"
          />
        </Link>

        {/* Mobile Hamburger Menu - Left side */}
        <div className="md:hidden relative">
          <Button
            variant="ghost"
            className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary-500/20 transition-all duration-300 group relative z-10"
            onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <div className="flex flex-col gap-1">
              <div className={`w-4 h-0.5 bg-light-2 transition-all duration-300 ${showMobileMenu ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-4 h-0.5 bg-light-2 transition-all duration-300 ${showMobileMenu ? 'opacity-0' : ''}`}></div>
              <div className={`w-4 h-0.5 bg-light-2 transition-all duration-300 ${showMobileMenu ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </Button>

          {/* Mobile Dropdown Menu */}
          {showMobileMenu && (
            <div className="absolute top-12 left-0 bg-dark-2 border border-dark-4 rounded-xl shadow-lg p-3 min-w-[180px] z-50 animate-fade-in">
              <div className="space-y-2">
                <Link
                  to="/profile-settings"
                  className="flex items-center gap-3 p-3 hover:bg-primary-500/10 rounded-lg transition-all duration-300 group"
                  onClick={() => setShowMobileMenu(false)}>
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center group-hover:bg-primary-500/30 transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-500">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <span className="text-light-1 text-sm font-medium">Profile Settings</span>
                </Link>

                <Link
                  to={`/update-profile/${user.id}`}
                  className="flex items-center gap-3 p-3 hover:bg-primary-500/10 rounded-lg transition-all duration-300 group"
                  onClick={() => setShowMobileMenu(false)}>
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </div>
                  <span className="text-light-1 text-sm font-medium">Edit Profile</span>
                </Link>

                <div className="h-px bg-dark-4 my-2"></div>

                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    signOut();
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-red-500/10 rounded-lg transition-all duration-300 group w-full text-left">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16,17 21,12 16,7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  </div>
                  <span className="text-light-1 text-sm font-medium group-hover:text-red-400 transition-colors">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 items-center relative z-10">
          {/* Desktop Logout Button - Completely hidden on mobile */}
          <div className="hidden md:block mobile-hide-logout">
            <Button
              variant="ghost"
              className="shad-button_ghost rounded-full w-10 h-10 flex items-center justify-center glass-effect-light hover:bg-dark-3/50 transition-all duration-300 group"
              onClick={() => signOut()}>
              <img
                src="/assets/icons/logout.svg"
                alt="logout"
                className="w-4 h-4 group-hover:scale-110 transition-all duration-300"
              />
            </Button>
          </div>

          {/* Single Profile Icon - Mobile: Goes to Profile Settings, Desktop: Goes to Profile Page */}
          <Link
            to="/profile-settings"
            className="flex-center gap-3 group relative"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full animate-pulse-subtle bg-gradient-to-r from-primary-500 to-accent-1 opacity-60 blur-sm"></div>
              <img
                src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="profile"
                className="h-10 w-10 rounded-full object-cover border-2 border-primary-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(157,110,249,0.6)] relative z-10 group-hover:scale-110"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-2 z-20 shadow-md animate-pulse"></span>
            </div>

            {/* Desktop hint text */}
            <span className="hidden md:block text-xs text-light-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-dark-3 px-2 py-1 rounded-md">
              Profile Settings
            </span>
          </Link>
        </div>
      </div>

      {/* Overlay to close mobile menu when clicking outside */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setShowMobileMenu(false)}
        ></div>
      )}
    </section>
  );
};

export default Topbar;
