import { useGetCurrentUser } from "@/lib/react-query/queries";
import { Loader } from "@/components/shared";
import WellnessDashboard from "@/components/shared/WellnessDashboard";
import ProgressTracker from "@/components/shared/ProgressTracker";
import MoodTracker from "@/components/shared/MoodTracker";
import { BarChart3, Trophy, Target, Sparkles, Flame, Star, Award } from 'lucide-react';

const Dashboard = () => {
    const { data: currentUser, isLoading } = useGetCurrentUser();

    if (isLoading) {
        return (
            <div className="flex flex-1">
                <div className="common-container">
                    <div className="flex flex-col items-center justify-center py-12">
                        <Loader />
                        <p className="text-light-3 mt-4">Loading your wellness dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1">
            <div className="common-container">
                {/* Welcome Banner */}
                <div className="relative w-full mb-8 p-6 md:p-8 bg-gradient-to-r from-primary-500/30 via-primary-600/20 to-purple-500/30 rounded-3xl border border-primary-500/30 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/5 to-transparent"></div>
                    <div className="relative z-10 text-center">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center">
                                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                                Wellness Dashboard
                            </h1>
                        </div>
                        <p className="text-light-2 text-base md:text-lg mb-4 max-w-2xl mx-auto px-4">
                            Track your journey to well-being, {currentUser?.name || 'Wellness Seeker'}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-light-3">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>Active Goals</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                <span>Daily Tracking</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                <span>Progress Analytics</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="flex flex-col gap-4 mb-8">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-2xl p-4 md:p-6 border border-primary-500/20">
                            <div className="flex items-center gap-3 mb-2">
                                <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                                <h3 className="text-base md:text-lg font-semibold text-light-1">Achievements</h3>
                            </div>
                            <p className="text-xl md:text-2xl font-bold text-light-1">12</p>
                            <p className="text-xs md:text-sm text-light-3">3 new this week</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-2xl p-4 md:p-6 border border-green-500/20">
                            <div className="flex items-center gap-3 mb-2">
                                <Target className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                                <h3 className="text-base md:text-lg font-semibold text-light-1">Goals</h3>
                            </div>
                            <p className="text-xl md:text-2xl font-bold text-light-1">8/10</p>
                            <p className="text-xs md:text-sm text-light-3">Weekly targets</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl p-4 md:p-6 border border-purple-500/20 sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center gap-3 mb-2">
                                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                                <h3 className="text-base md:text-lg font-semibold text-light-1">Wellness Score</h3>
                            </div>
                            <p className="text-xl md:text-2xl font-bold text-light-1">85%</p>
                            <p className="text-xs md:text-sm text-light-3">+5% from last week</p>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard Content */}
                <div className="space-y-6">
                    {/* Top Row - Progress and Streaks */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Progress Tracker */}
                        <div className="bg-dark-2 rounded-3xl p-6 border border-dark-4">
                            <ProgressTracker />
                        </div>

                        {/* Achievement System - Streaks Only */}
                        <div className="bg-dark-2 rounded-3xl p-6 border border-dark-4">
                            <div className="flex items-center gap-3 mb-6">
                                <Flame className="w-6 h-6 text-orange-500" />
                                <h3 className="text-xl font-bold text-light-1">Wellness Streaks</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-light-2">Journal</span>
                                        <Flame className="w-4 h-4 text-orange-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-light-1">5</div>
                                    <div className="text-xs text-light-3">Best: 12 days</div>
                                </div>
                                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-light-2">Meditation</span>
                                        <Flame className="w-4 h-4 text-orange-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-light-1">3</div>
                                    <div className="text-xs text-light-3">Best: 8 days</div>
                                </div>
                                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-light-2">Mood Tracking</span>
                                        <Flame className="w-4 h-4 text-orange-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-light-1">7</div>
                                    <div className="text-xs text-light-3">Best: 15 days</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Row - Wellness Overview */}
                    <div className="bg-dark-2 rounded-3xl p-6 border border-dark-4">
                        <WellnessDashboard />
                    </div>

                    {/* Bottom Row - Achievements and Mood Tracker */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {/* Achievements */}
                        <div className="bg-dark-2 rounded-3xl p-6 border border-dark-4">
                            <div className="flex items-center gap-3 mb-6">
                                <Trophy className="w-6 h-6 text-yellow-500" />
                                <h3 className="text-xl font-bold text-light-1">Achievements</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-dark-3 rounded-xl p-4 border-2 border-gray-400">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 rounded-lg bg-primary-500/20">
                                            <Star className="w-5 h-5 text-primary-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-light-1 text-sm">Mindful Beginner</h4>
                                            <p className="text-xs text-light-3">Complete your first journal entry</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-primary-500 rounded-full h-2 mb-1"></div>
                                    <div className="text-xs text-light-3">1/1</div>
                                </div>
                                <div className="bg-dark-3 rounded-xl p-4 border-2 border-blue-400 opacity-60">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 rounded-lg bg-dark-4">
                                            <Flame className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-light-1 text-sm">Week Warrior</h4>
                                            <p className="text-xs text-light-3">Maintain a 7-day wellness streak</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-dark-4 rounded-full h-2 mb-1">
                                        <div className="bg-primary-500 h-2 rounded-full w-3/4"></div>
                                    </div>
                                    <div className="text-xs text-light-3">5/7</div>
                                </div>
                                <div className="bg-dark-3 rounded-xl p-4 border-2 border-purple-400 opacity-60">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 rounded-lg bg-dark-4">
                                            <Award className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-light-1 text-sm">Gratitude Master</h4>
                                            <p className="text-xs text-light-3">Write 50 gratitude entries</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-dark-4 rounded-full h-2 mb-1">
                                        <div className="bg-primary-500 h-2 rounded-full w-1/2"></div>
                                    </div>
                                    <div className="text-xs text-light-3">23/50</div>
                                </div>
                            </div>
                        </div>

                        {/* Mood Tracker Compact */}
                        <div className="bg-dark-2 rounded-3xl p-6 border border-dark-4">
                            <MoodTracker />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
