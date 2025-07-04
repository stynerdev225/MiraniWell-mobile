import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { AIInsight } from '@/types';
import { Brain, Lightbulb, Heart, TrendingUp, Sparkles, MessageCircle, Star, Award, Clock, Play, Pause, Volume2, VolumeX, Youtube } from 'lucide-react';

const AIInsightsPage: React.FC = () => {
    const [insights] = useState<AIInsight[]>([
        {
            id: '1',
            userId: 'current-user',
            type: 'mood_analysis',
            content: 'Your mood has been consistently improving over the past week! You\'ve shown a 20% increase in positive emotions, particularly after your morning ritual practices.',
            generatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            isRead: false,
            imageUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3'
        },
        {
            id: '2',
            userId: 'current-user',
            type: 'ritual_suggestion',
            content: 'Based on your recent stress levels, I recommend trying the "Flowing River" water meditation. Your journal entries suggest you respond well to calming, flow-based practices.',
            generatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
            isRead: false,
            imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3'
        },
        {
            id: '3',
            userId: 'current-user',
            type: 'reflection',
            content: 'Your gratitude practice is creating beautiful patterns in your emotional well-being. You mentioned "nature" and "growth" frequently - consider spending more time in earth-element practices.',
            generatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
            isRead: true,
            imageUrl: 'https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3'
        },
        {
            id: '4',
            userId: 'current-user',
            type: 'growth_insight',
            content: 'You\'ve completed 7 ritual sessions this month! Your consistency with fire-element practices seems to correlate with increased motivation in your journal entries.',
            generatedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
            isRead: false,
            imageUrl: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3'
        }
    ]);

    // YouTube video state
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const videoRef = useRef<HTMLIFrameElement>(null);

    const insightIcons = {
        mood_analysis: TrendingUp,
        ritual_suggestion: Heart,
        reflection: Lightbulb,
        growth_insight: Sparkles
    };

    const insightColors = {
        mood_analysis: 'from-blue-400 to-blue-600',
        ritual_suggestion: 'from-pink-400 to-pink-600',
        reflection: 'from-yellow-400 to-orange-500',
        growth_insight: 'from-purple-400 to-purple-600'
    };

    // Handle video controls
    const handleToggleMute = () => {
        if (isMuted) {
            controlYouTubeVideo('unmute');
        } else {
            controlYouTubeVideo('mute');
        }
    };

    const handleVideoPlay = () => {
        controlYouTubeVideo('play');
    };

    const handleVideoPause = () => {
        controlYouTubeVideo('pause');
    };

    // Control YouTube video
    const controlYouTubeVideo = (action: 'play' | 'pause' | 'mute' | 'unmute') => {
        const iframe = videoRef.current;
        if (!iframe) return;

        try {
            const player = (iframe as any).contentWindow;

            switch (action) {
                case 'play':
                    player.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                    setIsVideoPlaying(true);
                    break;
                case 'pause':
                    player.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                    setIsVideoPlaying(false);
                    break;
                case 'mute':
                    player.postMessage('{"event":"command","func":"mute","args":""}', '*');
                    setIsMuted(true);
                    break;
                case 'unmute':
                    player.postMessage('{"event":"command","func":"unMute","args":""}', '*');
                    setIsMuted(false);
                    break;
            }
        } catch (error) {
            console.error('Error controlling YouTube video:', error);
        }
    };

    // Handle video load events
    const handleVideoLoad = () => {
        setIsVideoLoading(false);
    };

    // Load YouTube API
    useEffect(() => {
        // Create YouTube API script
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';

        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
            document.head.appendChild(tag);
        }

        // Clean up
        return () => {
            const scriptTags = document.getElementsByTagName('script');
            for (let i = 0; i < scriptTags.length; i++) {
                if (scriptTags[i].src.includes('youtube.com/iframe_api')) {
                    scriptTags[i].remove();
                    break;
                }
            }
        };
    }, []);

    const formatTimeAgo = (date: Date) => {
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

        if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`;
        } else if (diffInMinutes < 1440) {
            return `${Math.floor(diffInMinutes / 60)}h ago`;
        } else {
            return `${Math.floor(diffInMinutes / 1440)}d ago`;
        }
    };

    const generateNewInsight = () => {
        // TODO: Call Gemini AI API to generate new insights
        console.log('Generating new AI insight...');
    };

    const markAsRead = (insightId: string) => {
        // TODO: Update insight as read in database
        console.log('Marking insight as read:', insightId);
    };

    return (
        <div className="flex flex-col min-h-screen bg-dark-1">
            {/* Animated background pattern */}
            <div className="fixed inset-0 z-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(#9D6EF9_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>

            {/* Header with background image */}
            <div className="px-6 py-8 relative overflow-hidden rounded-b-3xl mb-6">
                <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 transition-all duration-700 hover:opacity-40 hover:scale-105 bg-ai-header" />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-700/60 via-primary-700/40 to-dark-1"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-3 animate-fade-in">
                        <div className="p-3 bg-primary-500/30 rounded-xl backdrop-blur-md shadow-lg shadow-primary-500/20 animate-pulse-subtle">
                            <Brain className="text-primary-500" size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold premium-gradient-text animate-float">
                                AI Insights
                            </h1>
                            <p className="text-light-3 text-sm">Your personal wellness guide</p>
                        </div>
                    </div>
                    <p className="text-light-2 max-w-xl ml-1 animate-fade-in [animation-delay:200ms]">
                        Personalized reflections and guidance generated by our AI to enhance your wellness journey
                    </p>
                </div>
            </div>

            <div className="flex-1 px-6 pb-24 space-y-6">
                {/* Featured Insight */}
                {insights.length > 0 && (
                    <div className="relative mb-2 transition-all">
                        <h2 className="text-lg font-semibold text-light-2 ml-1 mb-3 flex items-center">
                            <Star className="mr-2 text-gold-1" size={16} />
                            Featured Insight
                        </h2>
                        <Card
                            className="relative overflow-hidden cursor-pointer transition-all hover-scale shadow-glow group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-700/20 via-dark-2/70 to-dark-2/90 group-hover:from-primary-700/30 z-10"></div>

                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 featured-insight-bg"
                                data-bg-url={insights[0].imageUrl}
                            />

                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-dark-2 via-transparent to-transparent opacity-80 z-10"></div>

                            <CardHeader className="relative z-20">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg">
                                            {insightIcons[insights[0].type] && React.createElement(insightIcons[insights[0].type], {
                                                size: 22,
                                                className: "text-white"
                                            })}
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl capitalize premium-gradient-text">
                                                {insights[0].type.replace('_', ' ')}
                                            </CardTitle>
                                            <p className="text-sm text-light-3 flex items-center gap-1">
                                                <Clock size={14} className="text-primary-500" />
                                                {formatTimeAgo(insights[0].generatedAt)}
                                            </p>
                                        </div>
                                    </div>
                                    {!insights[0].isRead && (
                                        <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse-subtle" />
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="relative z-20">
                                <p className="text-light-1 leading-relaxed text-lg">{insights[0].content}</p>

                                <div className="flex justify-between items-center mt-5">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-2 glass-effect-light hover-scale bg-dark-2/50"
                                        onClick={() => markAsRead(insights[0].id)}
                                    >
                                        <span className="text-light-1">View Details</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-2 glass-effect-light hover-scale bg-dark-2/50"
                                    >
                                        <MessageCircle size={16} className="text-primary-500" />
                                        <span className="text-light-1">Discuss with AI</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Generate New Insight Button */}
                <Button
                    onClick={generateNewInsight}
                    className="w-full group relative overflow-hidden hover-scale shadow-glow py-6"
                    size="lg"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-90 group-hover:opacity-100 transition-opacity rounded-md"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity mix-blend-overlay rounded-md"></div>
                    <span className="relative flex items-center justify-center">
                        <span className="absolute -inset-0.5 animate-pulse rounded-lg bg-gradient-to-r from-primary-500 to-accent-1 opacity-30 blur-sm group-hover:opacity-50 transition-opacity"></span>
                        <span className="relative flex items-center justify-center gap-2 text-white font-medium">
                            <Sparkles className="mr-2 animate-pulse-subtle" size={22} />
                            Generate New Insight
                        </span>
                    </span>
                </Button>

                {/* AI Education Video Section */}
                <Card className="glass-effect overflow-hidden relative group hover-scale mt-2">
                    <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-15 group-hover:scale-110 transition-all duration-700 bg-ai-education" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-dark-2 via-dark-2/90 to-dark-2/80"></div>

                    <CardHeader className="relative z-10">
                        <CardTitle className="flex items-center gap-3 premium-gradient-text">
                            <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-md shadow-primary-500/20 shadow-lg">
                                <Youtube className="text-primary-500" size={22} />
                            </div>
                            AI Education Videos
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <p className="text-light-2 mb-5 leading-relaxed">
                            Enhance your understanding of AI and how it can benefit your wellness journey with these educational videos.
                        </p>

                        <div className="aspect-video relative overflow-hidden rounded-lg shadow-lg mb-4">
                            {isVideoLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-dark-2/80 z-10">
                                    <div className="spinner"></div>
                                </div>
                            )}
                            <iframe
                                ref={videoRef}
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/vj0JDwQLof4?enablejsapi=1&origin=${window.location.origin}&autoplay=0&mute=${isMuted ? 1 : 0}`}
                                title="Introduction to AI and Wellness"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                onLoad={handleVideoLoad}
                            ></iframe>
                        </div>

                        <div className="mt-4 flex flex-col space-y-3">
                            <h3 className="text-white font-medium text-lg">Introduction to AI in Wellness</h3>
                            <p className="text-light-3 text-sm">
                                Learn how artificial intelligence is transforming personal wellness and how you can leverage AI-powered insights to improve your mental and physical health.
                            </p>

                            {/* Video Controls */}
                            <div className="flex justify-center gap-4 mt-2">
                                <Button
                                    onClick={handleToggleMute}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-2 glass-effect-light hover-scale"
                                >
                                    {isMuted ?
                                        <VolumeX size={16} className="text-primary-500" /> :
                                        <Volume2 size={16} className="text-primary-500" />
                                    }
                                    <span className="text-light-1">{isMuted ? "Unmute" : "Mute"}</span>
                                </Button>
                                <Button
                                    onClick={isVideoPlaying ? handleVideoPause : handleVideoPlay}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-2 glass-effect-light hover-scale"
                                >
                                    {isVideoPlaying ?
                                        <Pause size={16} className="text-primary-500" /> :
                                        <Play size={16} className="text-primary-500" />
                                    }
                                    <span className="text-light-1">{isVideoPlaying ? "Pause" : "Play"}</span>
                                </Button>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Card className="glass-card hover-scale-subtle relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all"></div>
                                <CardContent className="p-4">
                                    <h4 className="text-light-1 font-medium mb-2">AI for Mental Health</h4>
                                    <p className="text-xs text-light-3 mb-3">How AI is revolutionizing mental health support and therapy</p>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="w-full glass-effect-light"
                                        onClick={() => {
                                            // Function to change the video
                                            const iframe = videoRef.current;
                                            if (iframe) {
                                                iframe.src = `https://www.youtube.com/embed/UbL8U9tWY2s?enablejsapi=1&origin=${window.location.origin}&autoplay=1&mute=${isMuted ? 1 : 0}`;
                                                setIsVideoLoading(true);
                                                setIsVideoPlaying(true);
                                            }
                                        }}
                                    >
                                        <Play size={14} className="mr-2 text-primary-500" />
                                        Watch Video
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="glass-card hover-scale-subtle relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 group-hover:from-purple-500/20 group-hover:to-purple-600/20 transition-all"></div>
                                <CardContent className="p-4">
                                    <h4 className="text-light-1 font-medium mb-2">Personalized AI Wellness</h4>
                                    <p className="text-xs text-light-3 mb-3">Creating customized wellness plans with AI assistance</p>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="w-full glass-effect-light"
                                        onClick={() => {
                                            // Function to change the video
                                            const iframe = videoRef.current;
                                            if (iframe) {
                                                iframe.src = `https://www.youtube.com/embed/bZbUK_fTTXs?enablejsapi=1&origin=${window.location.origin}&autoplay=1&mute=${isMuted ? 1 : 0}`;
                                                setIsVideoLoading(true);
                                                setIsVideoPlaying(true);
                                            }
                                        }}
                                    >
                                        <Play size={14} className="mr-2 text-primary-500" />
                                        Watch Video
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Additional Featured Video */}
                        <div className="mt-6">
                            <Card className="glass-card hover-scale-subtle relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 group-hover:from-green-500/20 group-hover:to-green-600/20 transition-all"></div>
                                <CardContent className="p-4">
                                    <h4 className="text-light-1 font-medium mb-2">Featured Wellness Video</h4>
                                    <p className="text-xs text-light-3 mb-3">Discover insights and techniques for enhanced well-being</p>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="w-full glass-effect-light"
                                        onClick={() => {
                                            // Function to change the video to the new URL
                                            const iframe = videoRef.current;
                                            if (iframe) {
                                                iframe.src = `https://www.youtube.com/embed/vj0JDwQLof4?enablejsapi=1&origin=${window.location.origin}&autoplay=1&mute=${isMuted ? 1 : 0}`;
                                                setIsVideoLoading(true);
                                                setIsVideoPlaying(true);
                                            }
                                        }}
                                    >
                                        <Play size={14} className="mr-2 text-primary-500" />
                                        Watch Video
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>

                {/* Insights List */}
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-light-2 ml-1 mb-3 flex items-center">
                        <Award className="mr-2 text-primary-500" size={16} />
                        Recent Insights
                    </h2>
                    {insights.map((insight, index) => {
                        // Skip the first insight as it's already displayed as featured
                        if (index === 0) return null;

                        const Icon = insightIcons[insight.type];
                        const colorClass = insightColors[insight.type];

                        return (
                            <Card
                                key={insight.id}
                                className={`relative overflow-hidden cursor-pointer transition-all hover-scale shadow-glow glass-effect group ${!insight.isRead ? 'border-l-4 border-l-primary-500' : ''
                                    }`}
                                onClick={() => markAsRead(insight.id)}
                            >
                                {/* Background gradient */}
                                <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${colorClass} opacity-5 group-hover:opacity-10 transition-opacity`} />

                                {/* Image background with zoom effect on hover */}
                                {insight.imageUrl && (
                                    <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden">
                                        <div
                                            className="w-full h-full bg-cover bg-center opacity-15 group-hover:opacity-25 group-hover:scale-110 transition-all duration-700 insight-bg"
                                            data-bg-url={insight.imageUrl}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-dark-2"></div>
                                    </div>
                                )}

                                <CardHeader className="relative z-10">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2.5 rounded-xl bg-gradient-to-r ${colorClass} shadow-lg transform group-hover:rotate-3 transition-transform`}>
                                                <Icon size={22} className="text-white" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg capitalize premium-gradient-text">
                                                    {insight.type.replace('_', ' ')}
                                                </CardTitle>
                                                <p className="text-sm text-light-3 flex items-center gap-1">
                                                    <Clock size={12} className="text-primary-500/70" />
                                                    {formatTimeAgo(insight.generatedAt)}
                                                </p>
                                            </div>
                                        </div>
                                        {!insight.isRead && (
                                            <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse-subtle" />
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="relative z-10">
                                    <p className="text-light-2 leading-relaxed">{insight.content}</p>

                                    <div className="flex justify-end mt-5">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center gap-2 glass-effect-light hover-scale transform group-hover:translate-y-0 translate-y-2 opacity-80 group-hover:opacity-100 transition-all"
                                        >
                                            <MessageCircle size={16} className="text-primary-500" />
                                            <span className="text-light-1">Discuss with AI</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    }).filter(Boolean)}
                </div>

                {/* AI Chat Section */}
                <Card className="glass-effect overflow-hidden relative group hover-scale">
                    <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-15 group-hover:scale-110 transition-all duration-700 bg-ai-chat" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-dark-2 via-dark-2/90 to-dark-2/80"></div>

                    <CardHeader className="relative z-10">
                        <CardTitle className="flex items-center gap-3 premium-gradient-text">
                            <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-md shadow-primary-500/20 shadow-lg">
                                <MessageCircle className="text-primary-500" size={22} />
                            </div>
                            Chat with Gemini AI
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <p className="text-light-2 mb-5 leading-relaxed">
                            Ask questions about your wellness journey, get personalized ritual recommendations, or reflect on your progress with our intelligent AI assistant.
                        </p>
                        <Button
                            className="w-full relative overflow-hidden hover-scale shadow-glow"
                            variant="outline"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-1/10 opacity-30 group-hover:opacity-50 transition-all"></div>
                            <span className="text-gradient flex items-center gap-2 relative z-10">
                                <Sparkles size={16} className="text-primary-500" />
                                Start Conversation
                            </span>
                        </Button>
                    </CardContent>
                </Card>

                {/* Statistics */}
                <Card className="glass-effect overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-700/5 to-accent-1/5"></div>

                    <CardHeader className="relative z-10">
                        <CardTitle className="text-white flex items-center gap-2">
                            <TrendingUp size={18} className="text-primary-500" />
                            Your Wellness Journey
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-4 glass-card hover-scale-subtle relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all"></div>
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713712-03790a178651?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
                                <div className="text-2xl font-bold text-blue-300 animate-float">12</div>
                                <div className="text-sm text-blue-200">Insights Generated</div>
                            </div>
                            <div className="p-4 glass-card hover-scale-subtle relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 group-hover:from-green-500/20 group-hover:to-green-600/20 transition-all"></div>
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478465726282-ddb11650c80b?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
                                <div className="text-2xl font-bold text-green-300 animate-float animate-delay-500">7</div>
                                <div className="text-sm text-green-200">Rituals Completed</div>
                            </div>
                            <div className="p-4 glass-card hover-scale-subtle relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 group-hover:from-purple-500/20 group-hover:to-purple-600/20 transition-all"></div>
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
                                <div className="text-2xl font-bold text-purple-300 animate-float animate-delay-1000">15</div>
                                <div className="text-sm text-purple-200">Journal Entries</div>
                            </div>
                            <div className="p-4 glass-card hover-scale-subtle relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10 group-hover:from-orange-500/20 group-hover:to-orange-600/20 transition-all"></div>
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464865885825-be7cd16fad8d?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
                                <div className="text-2xl font-bold text-orange-300 animate-float animate-delay-1500">8.2</div>
                                <div className="text-sm text-orange-200">Avg Mood Score</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AIInsightsPage;
