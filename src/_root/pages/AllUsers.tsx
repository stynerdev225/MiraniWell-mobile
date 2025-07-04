import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "@/components/shared";
import { useGetUsers } from "@/lib/react-query/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search, Filter, Star, Heart, MessageCircle, TrendingUp, Award, Globe, UserPlus } from "lucide-react";

const AllUsers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    return;
  }

  // Filter users based on search term
  const filteredUsers = creators?.documents.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Stock wellness images for user backgrounds
  const stockImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
  ];

  return (
    <div className="flex flex-col min-h-screen bg-dark-1">
      {/* Animated background pattern */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(#9D6EF9_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      {/* Header with background image and glassmorphism */}
      <div className="px-6 py-8 relative overflow-hidden rounded-b-3xl mb-6">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 transition-all duration-700 hover:opacity-40 hover:scale-105 bg-header-wellness" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-700/60 via-primary-700/40 to-dark-1"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-3 animate-fade-in">
            <div className="p-3 bg-primary-500/30 rounded-xl backdrop-blur-md shadow-lg shadow-primary-500/20 animate-pulse-subtle">
              <Users className="text-primary-500" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold premium-gradient-text animate-float">
                Community
              </h1>
              <p className="text-light-3 text-sm">Connect with fellow wellness enthusiasts</p>
            </div>
          </div>
          <p className="text-light-2 max-w-xl ml-1 animate-fade-in [animation-delay:200ms]">
            Discover and connect with amazing people on their wellness journey
          </p>
        </div>
      </div>

      <div className="flex-1 px-6 pb-24 space-y-6">
        {/* Community Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="glass-card hover-scale-subtle relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-300 animate-float">{creators?.total || 0}</div>
              <div className="text-xs text-blue-200">Total Members</div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-scale-subtle relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 group-hover:from-green-500/20 group-hover:to-green-600/20 transition-all"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-300 animate-float animate-delay-500">247</div>
              <div className="text-xs text-green-200">Active Today</div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-scale-subtle relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 group-hover:from-purple-500/20 group-hover:to-purple-600/20 transition-all"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-300 animate-float animate-delay-1000">1.2k</div>
              <div className="text-xs text-purple-200">Connections</div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-scale-subtle relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10 group-hover:from-orange-500/20 group-hover:to-orange-600/20 transition-all"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-300 animate-float animate-delay-1500">89%</div>
              <div className="text-xs text-orange-200">Engagement</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <Card className="glass-effect overflow-hidden relative group">
          <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-15 transition-all duration-500 bg-search-wellness" />
          <div className="absolute inset-0 bg-gradient-to-tr from-dark-2 via-dark-2/90 to-dark-2/80"></div>

          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3 premium-gradient-text">
              <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-md shadow-primary-500/20 shadow-lg">
                <Search className="text-primary-500" size={22} />
              </div>
              Find Community Members
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-3" size={16} />
                <Input
                  type="text"
                  placeholder="Search by name or username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass-effect-light border-dark-4 text-light-1 placeholder-light-3"
                />
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2 glass-effect-light hover-scale"
              >
                <Filter size={16} className="text-primary-500" />
                Filter
              </Button>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 flex-wrap">
              {['all', 'active', 'new', 'following'].map((filter) => (
                <Button
                  key={filter}
                  variant={filterType === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(filter)}
                  className={`capitalize ${filterType === filter ? 'bg-primary-500 text-white' : 'glass-effect-light'}`}
                >
                  {filter === 'all' ? 'All Members' : filter}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Members */}
        <Card className="glass-effect overflow-hidden relative group">
          <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-15 transition-all duration-500 bg-featured-wellness" />
          <div className="absolute inset-0 bg-gradient-to-tr from-dark-2 via-dark-2/90 to-dark-2/80"></div>

          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3 premium-gradient-text">
              <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-md shadow-primary-500/20 shadow-lg">
                <Star className="text-primary-500" size={22} />
              </div>
              Featured Members
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-2 gap-4">
              <Card className="glass-card hover-scale-subtle relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 group-hover:from-purple-500/20 group-hover:to-purple-600/20 transition-all"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-10 bg-cover bg-center"></div>
                <CardContent className="p-4 text-center relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Award className="text-white" size={24} />
                  </div>
                  <h4 className="text-light-1 font-medium mb-1">Top Contributor</h4>
                  <p className="text-xs text-light-3">Most helpful member this month</p>
                </CardContent>
              </Card>

              <Card className="glass-card hover-scale-subtle relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 group-hover:from-green-500/20 group-hover:to-green-600/20 transition-all"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-10 bg-cover bg-center"></div>
                <CardContent className="p-4 text-center relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <TrendingUp className="text-white" size={24} />
                  </div>
                  <h4 className="text-light-1 font-medium mb-1">Rising Star</h4>
                  <p className="text-xs text-light-3">Fastest growing member</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* All Users Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-light-2 flex items-center gap-2">
              <Globe className="text-primary-500" size={20} />
              All Community Members
              <span className="text-light-3 text-sm ml-2">({filteredUsers.length})</span>
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 glass-effect-light hover-scale"
            >
              <UserPlus size={16} className="text-primary-500" />
              Invite Friends
            </Button>
          </div>

          {isLoading && !creators ? (
            <div className="flex justify-center items-center py-12">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredUsers.map((creator, index) => (
                <div key={creator?.$id} className="group">
                  <Card className="glass-card hover-scale-subtle relative overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                    {/* Background image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 user-card-bg"
                      data-bg-image={stockImages[index % stockImages.length]}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-2 via-dark-2/80 to-dark-2/60"></div>

                    <CardContent className="p-6 text-center relative z-10">
                      <div className="relative mb-4">
                        <img
                          src={creator.imageUrl || "/assets/icons/profile-placeholder.svg"}
                          alt={creator.name}
                          className="w-20 h-20 rounded-full mx-auto border-4 border-primary-500/30 shadow-lg"
                        />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-dark-2"></div>
                      </div>

                      <h3 className="text-light-1 font-medium mb-1 line-clamp-1">
                        {creator.name}
                      </h3>
                      <p className="text-light-3 text-sm mb-4 line-clamp-1">
                        @{creator.username}
                      </p>

                      {/* User stats */}
                      <div className="flex justify-center gap-4 mb-4 text-xs">
                        <div className="flex items-center gap-1 text-light-3">
                          <Heart size={12} className="text-red-400" />
                          <span>{Math.floor(Math.random() * 500) + 50}</span>
                        </div>
                        <div className="flex items-center gap-1 text-light-3">
                          <MessageCircle size={12} className="text-blue-400" />
                          <span>{Math.floor(Math.random() * 100) + 10}</span>
                        </div>
                        <div className="flex items-center gap-1 text-light-3">
                          <Star size={12} className="text-yellow-400" />
                          <span>{Math.floor(Math.random() * 50) + 5}</span>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium shadow-lg hover-scale"
                      >
                        <UserPlus size={14} className="mr-2" />
                        Connect
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredUsers.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 glass-effect-light hover-scale px-8"
            >
              <TrendingUp size={16} className="text-primary-500" />
              Load More Members
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
