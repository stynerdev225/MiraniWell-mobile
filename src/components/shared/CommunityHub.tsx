import { useState } from 'react';
import { Users, Trophy, Calendar, Heart, MessageCircle, Share2, Crown, Star } from 'lucide-react';

interface Challenge {
    id: string;
    title: string;
    description: string;
    category: 'mindfulness' | 'physical' | 'emotional' | 'community';
    duration: number; // in days
    participants: number;
    prize: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    isJoined: boolean;
    progress: number;
    maxProgress: number;
}

interface CommunityPost {
    id: string;
    author: {
        name: string;
        avatar: string;
        badge?: string;
    };
    content: string;
    timestamp: Date;
    likes: number;
    comments: number;
    isLiked: boolean;
    challengeId?: string;
}

const CommunityHub = () => {
    const [challenges] = useState<Challenge[]>([
        {
            id: '1',
            title: '21-Day Gratitude Challenge',
            description: 'Practice gratitude daily for 21 days and share your insights with the community',
            category: 'emotional',
            duration: 21,
            participants: 247,
            prize: 'Digital Wellness Badge + Feature Story',
            startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            isActive: true,
            isJoined: true,
            progress: 7,
            maxProgress: 21
        },
        {
            id: '2',
            title: 'Mindful March',
            description: 'Dedicate 10 minutes daily to mindfulness meditation',
            category: 'mindfulness',
            duration: 31,
            participants: 189,
            prize: 'Premium Meditation Guide + Badge',
            startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000),
            isActive: true,
            isJoined: false,
            progress: 0,
            maxProgress: 31
        },
        {
            id: '3',
            title: 'Community Kindness Week',
            description: 'Perform one act of kindness daily and share your story',
            category: 'community',
            duration: 7,
            participants: 156,
            prize: 'Kindness Champion Badge',
            startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            isActive: false,
            isJoined: false,
            progress: 0,
            maxProgress: 7
        }
    ]);

    const [communityPosts] = useState<CommunityPost[]>([
        {
            id: '1',
            author: {
                name: 'Sarah Chen',
                avatar: '/assets/images/profile.png',
                badge: 'Mindfulness Master'
            },
            content: 'Day 7 of the gratitude challenge! Today I\'m grateful for unexpected moments of joy - like watching my cat discover a sunbeam. What small moment brought you joy today? 🌟',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            likes: 23,
            comments: 8,
            isLiked: false,
            challengeId: '1'
        },
        {
            id: '2',
            author: {
                name: 'Marcus Johnson',
                avatar: '/assets/images/profile.png',
                badge: 'Wellness Warrior'
            },
            content: 'Just finished my morning meditation session. The peace I feel afterwards is incredible. For anyone just starting - even 5 minutes makes a difference! 🧘‍♂️',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
            likes: 31,
            comments: 12,
            isLiked: true,
            challengeId: '2'
        },
        {
            id: '3',
            author: {
                name: 'Emma Davis',
                avatar: '/assets/images/profile.png',
                badge: 'Community Builder'
            },
            content: 'Excited to announce our upcoming Community Kindness Week! Let\'s spread positivity together. Who\'s ready to make a difference? 💝',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
            likes: 45,
            comments: 18,
            isLiked: true,
            challengeId: '3'
        }
    ]);

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'mindfulness': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
            case 'physical': return 'text-green-400 bg-green-500/10 border-green-500/20';
            case 'emotional': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
            case 'community': return 'text-pink-400 bg-pink-500/10 border-pink-500/20';
            default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
        }
    };

    const getTimeAgo = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) return `${diffDays}d ago`;
        if (diffHours > 0) return `${diffHours}h ago`;
        return 'Just now';
    };

    const getDaysRemaining = (endDate: Date) => {
        const now = new Date();
        const diffMs = endDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-primary-500 rounded-2xl p-3">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-light-1">Community Hub</h2>
                        <p className="text-light-3">Connect, challenge, and grow together</p>
                    </div>
                </div>
            </div>

            {/* Active Challenges */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-light-1 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    Active Challenges
                </h3>

                <div className="grid gap-4">
                    {challenges.filter(c => c.isActive).map((challenge) => (
                        <div
                            key={challenge.id}
                            className={`p-6 rounded-2xl border ${getCategoryColor(challenge.category)} backdrop-blur-sm`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="font-semibold text-light-1">{challenge.title}</h4>
                                        {challenge.isJoined && (
                                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs font-medium">
                                                Joined
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-light-3 mb-3">{challenge.description}</p>
                                    <div className="flex items-center gap-4 text-sm text-light-2">
                                        <span className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            {challenge.participants} participants
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {getDaysRemaining(challenge.endDate)} days left
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Crown className="w-5 h-5 text-yellow-400" />
                                        <span className="text-sm font-medium text-light-1">Prize</span>
                                    </div>
                                    <p className="text-xs text-light-3">{challenge.prize}</p>
                                </div>
                            </div>

                            {challenge.isJoined && (
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-light-2">Your Progress</span>
                                        <span className="text-sm font-medium text-light-1">
                                            {challenge.progress} / {challenge.maxProgress}
                                        </span>
                                    </div>
                                    <div className="w-full bg-dark-3 rounded-full h-2">
                                        <div
                                            className="bg-primary-500 h-2 rounded-full transition-all duration-300 progress-bar"
                                            data-progress-width={`${(challenge.progress / challenge.maxProgress) * 100}%`}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(challenge.category)}`}>
                                    {challenge.category}
                                </span>
                                <button
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${challenge.isJoined
                                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                        : 'bg-primary-500 text-white hover:bg-primary-600'
                                        }`}
                                >
                                    {challenge.isJoined ? 'Joined' : 'Join Challenge'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Community Feed */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-light-1 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                    Community Feed
                </h3>

                <div className="space-y-4">
                    {communityPosts.map((post) => (
                        <div
                            key={post.id}
                            className="p-6 bg-dark-2 rounded-2xl border border-dark-4"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-semibold">
                                        {post.author.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-semibold text-light-1">{post.author.name}</h4>
                                        {post.author.badge && (
                                            <span className="bg-primary-500/20 text-primary-400 px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                                                <Star className="w-3 h-3" />
                                                {post.author.badge}
                                            </span>
                                        )}
                                        <span className="text-light-3 text-sm">{getTimeAgo(post.timestamp)}</span>
                                    </div>

                                    <p className="text-light-2 mb-4">{post.content}</p>

                                    <div className="flex items-center gap-6">
                                        <button className={`flex items-center gap-2 transition-colors ${post.isLiked ? 'text-red-400' : 'text-light-3 hover:text-red-400'
                                            }`}>
                                            <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                                            <span className="text-sm">{post.likes}</span>
                                        </button>

                                        <button className="flex items-center gap-2 text-light-3 hover:text-blue-400 transition-colors">
                                            <MessageCircle className="w-4 h-4" />
                                            <span className="text-sm">{post.comments}</span>
                                        </button>

                                        <button className="flex items-center gap-2 text-light-3 hover:text-green-400 transition-colors">
                                            <Share2 className="w-4 h-4" />
                                            <span className="text-sm">Share</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upcoming Challenges */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-light-1 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    Upcoming Challenges
                </h3>

                <div className="grid gap-4">
                    {challenges.filter(c => !c.isActive).map((challenge) => (
                        <div
                            key={challenge.id}
                            className={`p-6 rounded-2xl border ${getCategoryColor(challenge.category)} backdrop-blur-sm opacity-80`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-light-1 mb-1">{challenge.title}</h4>
                                    <p className="text-sm text-light-3 mb-2">{challenge.description}</p>
                                    <div className="flex items-center gap-4 text-sm text-light-2">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            Starts in {Math.ceil((challenge.startDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Trophy className="w-4 h-4" />
                                            {challenge.prize}
                                        </span>
                                    </div>
                                </div>
                                <button className="bg-primary-500/20 text-primary-400 px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-500/30 transition-colors">
                                    Notify Me
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommunityHub;
