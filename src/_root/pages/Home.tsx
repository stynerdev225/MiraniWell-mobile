import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Loader, PostCard, UserCard } from "@/components/shared";
import { useGetRecentPosts, useGetUsers, useGetCurrentUser } from "@/lib/react-query/queries";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import {
  Heart,
  Sparkles,
  Users,
  Calendar,
  Zap,
  Star,
  TrendingUp,
  ChevronRight,
  Sunrise,
  Moon,
  Activity
} from "lucide-react";

type PostType = Models.Document & {
  caption: string;
  imageUrl: string;
  imageId: string;
  location: string;
  tags: string[];
  creator: string;
  likes: string[];
};

const Home = () => {
  const { handleQueryError } = useErrorHandler();
  const { data: currentUser } = useGetCurrentUser();
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
    error: postsError,
  } = useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
    error: creatorsError,
  } = useGetUsers(6);

  // Handle errors
  if (isErrorPosts && postsError) {
    handleQueryError(postsError);
  }
  if (isErrorCreators && creatorsError) {
    handleQueryError(creatorsError);
  }

  // Get current time for dynamic greeting
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return { text: "Good Morning", icon: Sunrise };
    if (currentHour < 17) return { text: "Good Afternoon", icon: Activity };
    return { text: "Good Evening", icon: Moon };
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something went wrong. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        {/* Welcome Hero Section */}
        <div className="relative w-full mb-8 p-6 md:p-8 bg-gradient-to-br from-primary-500/20 via-primary-600/10 to-transparent rounded-3xl border border-primary-500/20 overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <GreetingIcon className="w-6 h-6 md:w-8 md:h-8 text-primary-500" />
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-light-1">
                {greeting.text}, {currentUser?.name || 'Wellness Seeker'}!
              </h1>
            </div>
            <p className="text-light-2 mb-6 max-w-2xl leading-relaxed text-sm md:text-base">
              Welcome to your wellness sanctuary. Today is a new opportunity to nurture your mind, body, and spirit.
              Let's explore what your community has shared and discover new paths to inner peace.
            </p>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Link to="/dashboard" className="group">
                <div className="bg-dark-2/50 backdrop-blur-sm rounded-xl p-4 border border-dark-4 hover:border-primary-500/50 transition-all duration-200 hover:bg-dark-2/80">
                  <TrendingUp className="w-6 h-6 text-primary-500 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-light-1">Dashboard</p>
                </div>
              </Link>
              <Link to="/mind-body-spirit" className="group">
                <div className="bg-dark-2/50 backdrop-blur-sm rounded-xl p-4 border border-dark-4 hover:border-primary-500/50 transition-all duration-200 hover:bg-dark-2/80">
                  <Heart className="w-6 h-6 text-red-400 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-light-1">Mind Body Spirit</p>
                </div>
              </Link>
              <Link to="/journal" className="group">
                <div className="bg-dark-2/50 backdrop-blur-sm rounded-xl p-4 border border-dark-4 hover:border-primary-500/50 transition-all duration-200 hover:bg-dark-2/80">
                  <Calendar className="w-6 h-6 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-light-1">Journal</p>
                </div>
              </Link>
              <Link to="/affirmations" className="group">
                <div className="bg-dark-2/50 backdrop-blur-sm rounded-xl p-4 border border-dark-4 hover:border-primary-500/50 transition-all duration-200 hover:bg-dark-2/80">
                  <Sparkles className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-light-1">Affirmations</p>
                </div>
              </Link>
            </div>

            {/* Daily Inspiration */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl p-6 border border-primary-500/20">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-light-1">Daily Inspiration</h3>
              </div>
              <p className="text-light-2 italic">
                "The journey of a thousand miles begins with a single step. Today, take that step toward your wellness goals."
              </p>
              <p className="text-primary-500 text-sm mt-2">— Mirani Well Community</p>
            </div>
          </div>
        </div>

        {/* Community Feed */}
        <div className="home-posts">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-6 h-6 text-primary-500" />
              <h2 className="h3-bold md:h2-bold text-light-1">Community Feed</h2>
            </div>
            <Link to="/explore" className="flex items-center gap-2 text-primary-500 hover:text-primary-400 transition-colors ml-8">
              <span className="text-sm font-medium">Explore All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {isPostLoading && !posts ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader />
              <p className="text-light-3 mt-4">Loading wellness posts...</p>
            </div>
          ) : posts?.documents.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-dark-2 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-light-1 mb-2">No posts yet</h3>
              <p className="text-light-3 mb-4">Be the first to share your wellness journey!</p>
              <Link to="/create-post" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors">
                Create Your First Post
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post) => (
                <li
                  key={post.$id}
                  className="flex justify-center w-full min-h-[500px]"
                >
                  <PostCard post={post as PostType} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Wellness Community Sidebar */}
      <div className="home-creators">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-primary-500" />
          <h3 className="h3-bold text-light-1">Wellness Community</h3>
        </div>

        {isUserLoading && !creators ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader />
            <p className="text-light-3 mt-4">Loading community...</p>
          </div>
        ) : creators?.documents.length === 0 ? (
          <div className="text-center py-8">
            <div className="bg-dark-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-primary-500" />
            </div>
            <p className="text-light-3">No community members yet</p>
          </div>
        ) : (
          <ul className="grid gap-6">
            {creators?.documents.map((creator: any) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}

        {/* Wellness Tips */}
        <div className="mt-8 p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl border border-green-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-light-1">Quick Wellness Tips</h4>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <p className="text-sm text-light-2">Take 5 deep breaths to center yourself</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <p className="text-sm text-light-2">Drink a glass of water mindfully</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
              <p className="text-sm text-light-2">Practice gratitude for three things</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <p className="text-sm text-light-2">Stretch your body for 60 seconds</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;