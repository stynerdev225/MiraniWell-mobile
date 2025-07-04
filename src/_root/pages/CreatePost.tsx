import { useState } from "react";
import PostForm from "@/components/forms/PostForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { PlusCircle, Lightbulb, Camera, Hash, Heart, Sparkles, Users, TrendingUp } from "lucide-react";

const CreatePost = () => {
  const [showTips, setShowTips] = useState(false);

  const inspirationalTips = [
    {
      icon: Heart,
      title: "Share Your Journey",
      description: "Your wellness story can inspire others on their path to well-being",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Camera,
      title: "Capture the Moment",
      description: "Beautiful visuals help convey your message and connect with your audience",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Sparkles,
      title: "Be Authentic",
      description: "Genuine sharing creates deeper connections and meaningful conversations",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Build Community",
      description: "Your posts help create a supportive wellness community for everyone",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const quickTags = [
    "#wellness", "#mindfulness", "#gratitude", "#selfcare", "#meditation",
    "#journal", "#growth", "#healing", "#peace", "#balance", "#inspiration"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-dark-1">
      {/* Animated background pattern */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(#9D6EF9_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      {/* Header with background image and glassmorphism */}
      <div className="px-6 py-8 relative overflow-hidden rounded-b-3xl mb-6">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 transition-all duration-700 hover:opacity-40 hover:scale-105 bg-create-post-header" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-700/60 via-primary-700/40 to-dark-1"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-3 animate-fade-in">
            <div className="p-3 bg-primary-500/30 rounded-xl backdrop-blur-md shadow-lg shadow-primary-500/20 animate-pulse-subtle">
              <PlusCircle className="text-primary-500" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold premium-gradient-text animate-float">
                Create Post
              </h1>
              <p className="text-light-3 text-sm">Share your wellness journey with the community</p>
            </div>
          </div>
          <p className="text-light-2 max-w-xl ml-1 animate-fade-in [animation-delay:200ms]">
            Express yourself, inspire others, and build meaningful connections through your wellness story
          </p>
        </div>
      </div>

      <div className="flex-1 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form Section */}
            <div className="lg:col-span-2">
              <Card className="glass-effect overflow-hidden relative group">
                <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-15 transition-all duration-500 bg-create-post-form" />
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-2 via-dark-2/90 to-dark-2/80"></div>

                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-3 premium-gradient-text">
                    <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-md shadow-primary-500/20 shadow-lg">
                      <Sparkles className="text-primary-500" size={22} />
                    </div>
                    Share Your Story
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <PostForm action="Create" />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar with Tips and Inspiration */}
            <div className="space-y-6">
              {/* Quick Tips Toggle */}
              <Card className="glass-effect overflow-hidden relative group">
                <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-15 transition-all duration-500 bg-create-post-tips" />
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-2 via-dark-2/90 to-dark-2/80"></div>

                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-3 premium-gradient-text">
                    <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-md shadow-primary-500/20 shadow-lg">
                      <Lightbulb className="text-primary-500" size={22} />
                    </div>
                    Posting Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <Button
                    onClick={() => setShowTips(!showTips)}
                    variant="outline"
                    className="w-full glass-effect-light hover-scale mb-4"
                  >
                    {showTips ? "Hide Tips" : "Show Tips"}
                  </Button>

                  {showTips && (
                    <div className="space-y-3 animate-fade-in">
                      {inspirationalTips.map((tip, index) => (
                        <div key={index} className="p-3 glass-card hover-scale-subtle relative overflow-hidden group">
                          <div className={`absolute inset-0 bg-gradient-to-r ${tip.color} opacity-10 group-hover:opacity-20 transition-all`}></div>
                          <div className="relative z-10 flex items-start gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${tip.color} bg-opacity-20`}>
                              <tip.icon size={16} className="text-primary-500" />
                            </div>
                            <div>
                              <h4 className="text-light-1 font-medium text-sm mb-1">{tip.title}</h4>
                              <p className="text-light-3 text-xs">{tip.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Tags */}
              <Card className="glass-effect overflow-hidden relative group">
                <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-15 transition-all duration-500 bg-create-post-tags" />
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-2 via-dark-2/90 to-dark-2/80"></div>

                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-3 premium-gradient-text">
                    <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-md shadow-primary-500/20 shadow-lg">
                      <Hash className="text-primary-500" size={22} />
                    </div>
                    Popular Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {quickTags.map((tag, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="glass-effect-light hover-scale text-xs"
                        onClick={() => {
                          // Add tag to form (this would need to be implemented)
                          navigator.clipboard.writeText(tag);
                        }}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                  <p className="text-light-3 text-xs mt-3">
                    Click any tag to copy it to your clipboard
                  </p>
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card className="glass-effect overflow-hidden relative group">
                <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-15 transition-all duration-500 bg-create-post-stats" />
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-2 via-dark-2/90 to-dark-2/80"></div>

                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-3 premium-gradient-text">
                    <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-md shadow-primary-500/20 shadow-lg">
                      <TrendingUp className="text-primary-500" size={22} />
                    </div>
                    Community Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 glass-card hover-scale-subtle">
                      <div className="text-2xl font-bold text-blue-300 animate-float">2.4k</div>
                      <div className="text-xs text-blue-200">Posts Today</div>
                    </div>
                    <div className="text-center p-3 glass-card hover-scale-subtle">
                      <div className="text-2xl font-bold text-green-300 animate-float animate-delay-500">89%</div>
                      <div className="text-xs text-green-200">Engagement</div>
                    </div>
                  </div>
                  <p className="text-light-3 text-xs text-center">
                    Your voice matters - join the conversation!
                  </p>
                </CardContent>
              </Card>

              {/* Inspiration Quote */}
              <Card className="glass-effect overflow-hidden relative group">
                <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-15 transition-all duration-500 bg-create-post-quote" />
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-2 via-dark-2/90 to-dark-2/80"></div>

                <CardContent className="relative z-10 p-6 text-center">
                  <div className="mb-4">
                    <Sparkles className="text-primary-500 mx-auto animate-pulse-subtle" size={24} />
                  </div>
                  <blockquote className="text-light-1 italic text-sm mb-3 leading-relaxed">
                    "Your story is a gift to the world. Share it with courage, authenticity, and love."
                  </blockquote>
                  <div className="text-light-3 text-xs">- MiraniWell Community</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
