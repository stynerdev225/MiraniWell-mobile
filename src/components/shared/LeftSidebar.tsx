import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Loader } from "@/components/shared";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import { Home, Users, Sparkles, ChevronRight, Star, Activity } from "lucide-react";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  // Organize navigation into logical groups
  const primaryNavigation = sidebarLinks.slice(0, 2); // Home, Mind Body Spirit
  const socialNavigation = sidebarLinks.slice(2, 6); // Explore, People, Saved, Create Post
  const wellnessNavigation = sidebarLinks.slice(6); // Ritual Rooms, Journal, Affirmations, AI Insights

  const navigationGroups = [
    {
      title: "Main",
      icon: Home,
      links: primaryNavigation,
      gradient: "from-blue-500/20 to-cyan-500/20",
      count: primaryNavigation.length
    },
    {
      title: "Social",
      icon: Users,
      links: socialNavigation,
      gradient: "from-purple-500/20 to-pink-500/20",
      count: socialNavigation.length
    },
    {
      title: "Wellness Journey",
      icon: Sparkles,
      links: wellnessNavigation,
      gradient: "from-green-500/20 to-emerald-500/20",
      count: wellnessNavigation.length
    }
  ];

  const renderNavLink = (link: INavLink, isInGroup = false) => {
    const isActive = pathname === link.route;

    return (
      <li
        key={link.label}
        className={`group list-none relative ${isInGroup ? '' : ''}`}>

        <NavLink
          to={link.route}
          className={({ isActive: navIsActive }) =>
            `nav-link-enhanced gap-4 items-center transition-all duration-300 hover:bg-primary-500/10 hover:shadow-lg hover:shadow-primary-500/20 relative overflow-hidden group sidebar-link-enhanced cursor-pointer ${navIsActive || isActive
              ? 'bg-gradient-to-r from-primary-500/20 to-primary-600/20 border border-primary-500/30 shadow-lg shadow-primary-500/20 translate-x-1'
              : 'hover:border border-transparent hover:border-primary-500/20'
            }`
          }>

          {/* Active indicator */}
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-primary-500 to-primary-600 rounded-r-full animate-pulse-subtle"></div>
          )}

          {/* Hover effect background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

          <div className="relative z-10 flex items-center gap-4 w-full">
            {link.imgURL.includes('.png') ? (
              <div className={`relative p-2 rounded-lg transition-all duration-300 group-hover:scale-110 ${isActive ? 'bg-primary-500/20 shadow-lg shadow-primary-500/20' : 'bg-dark-4/30'}`}>
                <img
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                  className="object-contain animate-pulse-subtle min-w-6"
                />
              </div>
            ) : (
              <div className={`relative p-2 rounded-lg transition-all duration-300 group-hover:scale-110 ${isActive ? 'bg-primary-500/20 shadow-lg shadow-primary-500/20' : 'bg-dark-4/30'}`}>
                <img
                  src={link.imgURL}
                  alt={link.label}
                  width={20}
                  height={20}
                  className={`transition-all duration-300 group-hover:invert-white min-w-5 ${isActive && "invert-white"}`}
                />
              </div>
            )}
            <span className={`base-medium transition-all duration-300 group-hover:text-primary-500 flex-1 sidebar-text ${isActive ? 'text-primary-500 font-semibold' : 'text-light-1'}`}>
              {link.label}
            </span>

            {/* Active glow effect */}
            {isActive && (
              <div className="absolute right-4 w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
            )}

            {/* Hover arrow */}
            <div className={`ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 ${isActive ? 'opacity-100' : ''}`}>
              <ChevronRight size={18} className="text-primary-500" />
            </div>
          </div>
        </NavLink>
      </li>
    );
  };

  return (
    <nav className="leftsidebar hidden md:flex bg-gradient-to-b from-dark-2 via-dark-2 to-dark-1 border-r border-dark-4/50 backdrop-blur-sm relative overflow-hidden z-50">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#9D6EF9_1px,transparent_1px)] [background-size:20px_20px] animate-pulse-subtle"></div>
      </div>

      {/* Fixed Header Section with Enhanced Styling */}
      <div className="flex flex-col gap-4 flex-shrink-0 relative z-10">
        {/* Logo with glow effect */}
        <Link to="/" className="flex justify-center items-center mb-2 group">
          <div className="relative">
            <img
              src="/assets/images/Mirani-Well-Logo.png"
              alt="Mirani Well logo"
              width={160}
              height={34}
              className="transition-all duration-300 group-hover:scale-105 animate-fade-in"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-lg"></div>
          </div>
        </Link>

        {/* Enhanced User Profile Section */}
        {isLoading || !user.email ? (
          <div className="h-20 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="space-y-3">
            <Link to={`/profile/${user.id}`} className="group">
              <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-dark-3/50 to-dark-4/30 border border-dark-4/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20 hover:border-primary-500/30 relative overflow-hidden">
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10 flex flex-col items-center gap-3 w-full">
                  <div className="relative">
                    <img
                      src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                      alt="profile"
                      className="h-16 w-16 rounded-full border-3 border-primary-500/30 shadow-lg transition-all duration-300 group-hover:border-primary-500/60 group-hover:scale-105"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-dark-2 animate-pulse"></div>
                  </div>
                  <div className="flex flex-col items-center text-center w-full">
                    <p className="font-semibold text-light-1 truncate max-w-full group-hover:text-primary-500 transition-colors duration-300">{user.name}</p>
                    <p className="text-xs text-light-3 truncate max-w-full">@{user.username}</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2 px-2">
              <div className="bg-dark-3/30 rounded-lg p-2 text-center border border-dark-4/50">
                <div className="text-sm font-semibold text-primary-500">12</div>
                <div className="text-xs text-light-3">Posts</div>
              </div>
              <div className="bg-dark-3/30 rounded-lg p-2 text-center border border-dark-4/50">
                <div className="text-sm font-semibold text-green-500">7</div>
                <div className="text-xs text-light-3">Rituals</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Elegant Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary-500/40 to-transparent my-4 flex-shrink-0"></div>

      {/* Enhanced Navigation with Groups */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Wellness Stats */}
        <div className="px-3 mb-4 p-3 rounded-xl bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-primary-500" />
              <span className="text-xs font-medium text-light-1">Today's Progress</span>
            </div>
            <Star size={14} className="text-yellow-500" />
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-dark-4/50 rounded-full h-2">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full w-3/4"></div>
            </div>
            <span className="text-xs text-light-3">75%</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4 enhanced-sidebar-scroll">
          {navigationGroups.map((group, groupIndex) => (
            <div key={group.title} className={`space-y-3 animate-fade-in ${groupIndex === 0 ? 'animate-delay-0' : groupIndex === 1 ? 'animate-delay-500' : 'animate-delay-1000'}`}>
              {/* Enhanced Group Header */}
              <div className={`group-header-enhanced flex items-center justify-between bg-gradient-to-r ${group.gradient} border border-primary-500/20 backdrop-blur-sm group hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 sidebar-link-enhanced`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary-500/20 group-hover:bg-primary-500/30 transition-all duration-300">
                    <group.icon size={18} className="text-primary-500" />
                  </div>
                  <span className="text-sm font-semibold text-light-1 uppercase tracking-wider sidebar-text">{group.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-primary-500/20 rounded-full px-2.5 py-1">
                    <span className="text-xs text-primary-500 font-medium sidebar-text">{group.count}</span>
                  </div>
                  <ChevronRight size={16} className="text-light-3 group-hover:text-primary-500 transition-colors duration-300" />
                </div>
              </div>

              {/* Group Links */}
              <div className="space-y-2">
                {group.links.map((link) => renderNavLink(link, true))}
              </div>

              {/* Group Divider (except for last group) */}
              {groupIndex < navigationGroups.length - 1 && (
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-dark-4/50 to-transparent my-5"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Footer Section */}
      <div className="flex-shrink-0 mt-4 space-y-3">
        {/* App Info */}
        <div className="px-3 py-2 rounded-xl bg-gradient-to-r from-dark-3/30 to-dark-4/30 border border-dark-4/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-light-3">App Version</span>
            </div>
            <span className="text-xs text-primary-500 font-medium">v2.1.0</span>
          </div>
        </div>

        {/* Logout Button - Hidden on mobile */}
        <div className="p-3 border-t border-dark-4/50 mobile-hide-logout">
          <button
            onClick={(e) => handleSignOut(e)}
            className="logout-button-fixed w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 active:scale-95">

            <div className="p-2 rounded-lg bg-red-500/20">
              <img src="/assets/icons/logout.svg" alt="logout" width={18} height={18} />
            </div>
            <span className="logout-text-fixed base-medium font-medium">
              Logout
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LeftSidebar;
