import { useState } from "react";
import { Models } from "appwrite";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { GridPostList, Loader } from "@/components/shared";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import {
  Bookmark,
  BookmarkCheck,
  Heart,
  Star,
  Filter,
  Search,
  Grid,
  List,
  Clock,
  TrendingUp,
  Tag,
  Archive,
  Sparkles
} from "lucide-react";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const savePosts = currentUser?.save
    .map((savePost: Models.Document, index: number) => {
      // Array of beautiful wellness stock images
      const stockImages = [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1593811167562-9cef47bfc4a7?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3'
      ];

      return {
        ...savePost.post,
        // Add stock image if post doesn't have one
        imageUrl: savePost.post.imageUrl || stockImages[index % stockImages.length],
        creator: {
          imageUrl: currentUser.imageUrl,
        },
      };
    })
    .reverse();

  // Mock data for enhanced saved content categories
  const savedCategories = [
    {
      id: 'wellness',
      name: 'Wellness Tips',
      count: 12,
      color: 'from-green-400 to-green-600',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3'
    },
    {
      id: 'meditation',
      name: 'Meditation',
      count: 8,
      color: 'from-purple-400 to-purple-600',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4a7?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3'
    },
    {
      id: 'nutrition',
      name: 'Nutrition',
      count: 15,
      color: 'from-orange-400 to-orange-600',
      icon: Star,
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3'
    },
    {
      id: 'mindfulness',
      name: 'Mindfulness',
      count: 6,
      color: 'from-blue-400 to-blue-600',
      icon: Archive,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Saved',
      title: 'Morning Meditation Routine',
      time: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4a7?auto=format&fit=crop&q=80&w=400&ixlib=rb-4.0.3'
    },
    {
      id: 2,
      action: 'Saved',
      title: 'Healthy Breakfast Ideas',
      time: '1 day ago',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400&ixlib=rb-4.0.3'
    },
    {
      id: 3,
      action: 'Saved',
      title: 'Stress Relief Techniques',
      time: '3 days ago',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=400&ixlib=rb-4.0.3'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-dark-1">
      {/* Animated background pattern */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(#9D6EF9_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      {/* Enhanced Header with stock image */}
      <div className="px-6 py-8 relative overflow-hidden rounded-b-3xl mb-6">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 transition-all duration-700 hover:opacity-40 hover:scale-105 bg-saved-header" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-700/60 via-primary-700/40 to-dark-1"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-3 animate-fade-in">
            <div className="p-3 bg-primary-500/30 rounded-xl backdrop-blur-md shadow-lg shadow-primary-500/20 animate-pulse-subtle">
              <Bookmark className="text-primary-500" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold premium-gradient-text animate-float">
                Saved Collection
              </h1>
              <p className="text-light-3 text-sm">Your personal wellness library</p>
            </div>
          </div>
          <p className="text-light-2 max-w-xl ml-1 animate-fade-in [animation-delay:200ms]">
            Access your saved posts, articles, and wellness content all in one place
          </p>
        </div>
      </div>

      <div className="flex-1 px-6 pb-24 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass-effect hover-scale-subtle relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
            <CardContent className="p-4 text-center relative z-10">
              <div className="text-2xl font-bold text-blue-300 animate-float">{savePosts?.length || 0}</div>
              <div className="text-sm text-blue-200">Total Saved</div>
            </CardContent>
          </Card>

          <Card className="glass-effect hover-scale-subtle relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 group-hover:from-green-500/20 group-hover:to-green-600/20 transition-all"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593811167562-9cef47bfc4a7?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
            <CardContent className="p-4 text-center relative z-10">
              <div className="text-2xl font-bold text-green-300 animate-float animate-delay-500">4</div>
              <div className="text-sm text-green-200">Categories</div>
            </CardContent>
          </Card>

          <Card className="glass-effect hover-scale-subtle relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 group-hover:from-purple-500/20 group-hover:to-purple-600/20 transition-all"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
            <CardContent className="p-4 text-center relative z-10">
              <div className="text-2xl font-bold text-purple-300 animate-float animate-delay-1000">15</div>
              <div className="text-sm text-purple-200">This Week</div>
            </CardContent>
          </Card>

          <Card className="glass-effect hover-scale-subtle relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10 group-hover:from-orange-500/20 group-hover:to-orange-600/20 transition-all"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
            <CardContent className="p-4 text-center relative z-10">
              <div className="text-2xl font-bold text-orange-300 animate-float animate-delay-1500">7</div>
              <div className="text-sm text-orange-200">Most Viewed</div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Section */}
        <Card className="glass-effect overflow-hidden relative group hover-scale">
          <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-15 group-hover:scale-110 transition-all duration-700 bg-saved-categories" />
          <div className="absolute inset-0 bg-gradient-to-tr from-dark-2 via-dark-2/90 to-dark-2/80"></div>

          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3 premium-gradient-text">
              <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-md shadow-primary-500/20 shadow-lg">
                <Tag className="text-primary-500" size={22} />
              </div>
              Saved Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={category.id}
                    className="glass-card hover-scale-subtle relative overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-all bg-saved-categories" />
                    <CardContent className="p-4 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl bg-gradient-to-r ${category.color} shadow-lg`}>
                            <Icon size={20} className="text-white" />
                          </div>
                          <div>
                            <h3 className="text-light-1 font-medium">{category.name}</h3>
                            <p className="text-light-3 text-sm">{category.count} items</p>
                          </div>
                        </div>
                        <div className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <TrendingUp size={16} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass-effect overflow-hidden relative group hover-scale">
          <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-15 group-hover:scale-110 transition-all duration-700 bg-saved-activity" />
          <div className="absolute inset-0 bg-gradient-to-tr from-dark-2 via-dark-2/90 to-dark-2/80"></div>

          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3 premium-gradient-text">
              <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-md shadow-primary-500/20 shadow-lg">
                <Clock className="text-primary-500" size={22} />
              </div>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <Card key={activity.id} className="glass-card hover-scale-subtle relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-primary-600/5 group-hover:from-primary-500/10 group-hover:to-primary-600/10 transition-all"></div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-cover bg-center rounded-lg shadow-md bg-saved-activity" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <BookmarkCheck size={16} className="text-primary-500" />
                          <span className="text-primary-500 text-sm font-medium">{activity.action}</span>
                        </div>
                        <h4 className="text-light-1 font-medium">{activity.title}</h4>
                        <p className="text-light-3 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* View Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="glass-effect-light hover-scale"
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} className={viewMode === 'grid' ? 'text-primary-500' : 'text-light-3'} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="glass-effect-light hover-scale"
              onClick={() => setViewMode('list')}
            >
              <List size={16} className={viewMode === 'list' ? 'text-primary-500' : 'text-light-3'} />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="glass-effect-light hover-scale">
              <Filter size={16} className="text-primary-500 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="glass-effect-light hover-scale">
              <Search size={16} className="text-primary-500 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Saved Posts Content */}
        <div className="mt-8">
          {!currentUser ? (
            <div className="flex justify-center items-center py-20">
              <Loader />
            </div>
          ) : (
            <>
              {savePosts && savePosts.length > 0 ? (
                <div className="space-y-6">
                  {/* Enhanced Header with Background Image */}
                  <Card className="glass-effect overflow-hidden relative group hover-scale">
                    <div className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 bg-saved-collection" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-dark-2 via-dark-2/90 to-dark-2/80"></div>
                    <CardContent className="relative z-10 p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary-500/30 rounded-xl backdrop-blur-md shadow-lg shadow-primary-500/20">
                          <Star className="text-primary-500" size={28} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold premium-gradient-text">Your Saved Collection</h2>
                          <p className="text-light-3 text-sm mt-1">
                            {savePosts.length} saved items in your wellness library
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-dark-2/30 rounded-lg backdrop-blur-sm">
                        <p className="text-light-2 text-sm">
                          Access your curated collection of wellness content, meditation guides, and inspirational posts anytime, anywhere.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <GridPostList posts={savePosts} showStats={false} />
                </div>
              ) : (
                <Card className="glass-effect text-center py-20 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-15 transition-all bg-saved-empty" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-dark-2 via-dark-2/90 to-dark-2/80"></div>
                  <CardContent className="relative z-10">
                    <div className="max-w-md mx-auto">
                      <div className="p-4 bg-primary-500/20 rounded-full w-fit mx-auto mb-6">
                        <Bookmark size={48} className="text-primary-500" />
                      </div>
                      <h3 className="text-xl font-bold text-light-1 mb-3">No Saved Posts Yet</h3>
                      <p className="text-light-3 mb-6">
                        Start building your personal wellness library by saving posts, articles, and content that inspire you.
                      </p>
                      <Button className="premium-gradient hover-scale shadow-glow">
                        <Search size={16} className="mr-2" />
                        Explore Content
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Saved;
