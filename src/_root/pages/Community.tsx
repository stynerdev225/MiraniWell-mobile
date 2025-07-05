import { useGetCurrentUser } from "@/lib/react-query/queries";
import { Loader } from "@/components/shared";
import CommunityHub from "@/components/shared/CommunityHub";
import { Users, Sparkles, Trophy, Heart } from 'lucide-react';

const Community = () => {
    const { data: currentUser, isLoading } = useGetCurrentUser();

    if (isLoading) {
        return (
            <div className="flex flex-1">
                <div className="common-container">
                    <div className="flex flex-col items-center justify-center py-12">
                        <Loader />
                        <p className="text-light-3 mt-4">Loading community...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1">
            <div className="common-container">
                {/* Community Welcome Banner */}
                <div className="relative w-full mb-8 p-6 md:p-8 bg-gradient-to-r from-blue-500/30 via-primary-600/20 to-green-500/30 rounded-3xl border border-blue-500/30 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"></div>
                    <div className="relative z-10 text-center">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
                                <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                Wellness Community
                            </h1>
                        </div>
                        <p className="text-light-2 text-base md:text-lg mb-6 max-w-2xl mx-auto px-4">
                            Connect with fellow wellness seekers, {currentUser?.name || 'Friend'}. Together we grow stronger! 🌱
                        </p>

                        {/* Community Stats - Integrated into Banner */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                    <Users className="w-5 h-5 text-blue-400" />
                                </div>
                                <p className="text-2xl font-bold text-white">1,247</p>
                                <p className="text-sm text-blue-200">Members</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                    <Trophy className="w-5 h-5 text-yellow-400" />
                                </div>
                                <p className="text-2xl font-bold text-white">23</p>
                                <p className="text-sm text-yellow-200">Active Challenges</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <Sparkles className="w-5 h-5 text-green-400" />
                                </div>
                                <p className="text-2xl font-bold text-white">89%</p>
                                <p className="text-sm text-green-200">Engagement</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                                    <Heart className="w-5 h-5 text-red-400" />
                                </div>
                                <p className="text-2xl font-bold text-white">5.2K</p>
                                <p className="text-sm text-red-200">Wellness Goals</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Community Hub */}
                <CommunityHub />
            </div>
        </div>
    );
};

export default Community;
