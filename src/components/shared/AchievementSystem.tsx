import React, { useEffect } from 'react';
import { Award, Star, Flame, Trophy } from 'lucide-react';
import { applyDynamicStyles } from '../../utils/dynamicStyles';

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    progress: number;
    maxProgress: number;
    isUnlocked: boolean;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface WellnessStreak {
    currentStreak: number;
    longestStreak: number;
    streakType: 'journal' | 'meditation' | 'mood_tracking' | 'overall';
}

const AchievementSystem = () => {
    // Apply dynamic styles when component mounts and updates
    useEffect(() => {
        applyDynamicStyles();
    });

    const achievements: Achievement[] = [
        {
            id: '1',
            title: 'Mindful Beginner',
            description: 'Complete your first journal entry',
            icon: <Star className="w-6 h-6" />,
            progress: 1,
            maxProgress: 1,
            isUnlocked: true,
            rarity: 'common'
        },
        {
            id: '2',
            title: 'Week Warrior',
            description: 'Maintain a 7-day wellness streak',
            icon: <Flame className="w-6 h-6" />,
            progress: 5,
            maxProgress: 7,
            isUnlocked: false,
            rarity: 'rare'
        },
        {
            id: '3',
            title: 'Gratitude Master',
            description: 'Write 50 gratitude entries',
            icon: <Award className="w-6 h-6" />,
            progress: 23,
            maxProgress: 50,
            isUnlocked: false,
            rarity: 'epic'
        }
    ];

    const streaks: WellnessStreak[] = [
        { currentStreak: 5, longestStreak: 12, streakType: 'journal' },
        { currentStreak: 3, longestStreak: 8, streakType: 'meditation' },
        { currentStreak: 7, longestStreak: 15, streakType: 'mood_tracking' }
    ];

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'text-gray-400 border-gray-400';
            case 'rare': return 'text-blue-400 border-blue-400';
            case 'epic': return 'text-purple-400 border-purple-400';
            case 'legendary': return 'text-yellow-400 border-yellow-400';
            default: return 'text-gray-400 border-gray-400';
        }
    };

    return (
        <div className="space-y-6">
            {/* Wellness Streaks */}
            <div className="bg-dark-2 rounded-2xl p-6 border border-dark-4">
                <div className="flex items-center gap-3 mb-4">
                    <Flame className="w-6 h-6 text-orange-500" />
                    <h3 className="text-xl font-bold text-light-1">Wellness Streaks</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {streaks.map((streak, index) => (
                        <div key={index} className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-light-2 capitalize">{streak.streakType.replace('_', ' ')}</span>
                                <Flame className="w-4 h-4 text-orange-400" />
                            </div>
                            <div className="text-2xl font-bold text-light-1">{streak.currentStreak}</div>
                            <div className="text-xs text-light-3">Best: {streak.longestStreak} days</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Achievements */}
            <div className="bg-dark-2 rounded-2xl p-6 border border-dark-4">
                <div className="flex items-center gap-3 mb-4">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-xl font-bold text-light-1">Achievements</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement) => (
                        <div
                            key={achievement.id}
                            className={`bg-dark-3 rounded-xl p-4 border-2 ${getRarityColor(achievement.rarity)} ${achievement.isUnlocked ? 'opacity-100' : 'opacity-60'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`p-2 rounded-lg ${achievement.isUnlocked ? 'bg-primary-500/20' : 'bg-dark-4'}`}>
                                    {achievement.icon}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-light-1">{achievement.title}</h4>
                                    <p className="text-xs text-light-3">{achievement.description}</p>
                                </div>
                            </div>
                            <div className="w-full bg-dark-4 rounded-full h-2">
                                <div
                                    className="bg-primary-500 h-2 rounded-full transition-all duration-300 progress-bar"
                                    data-progress-width={`${(achievement.progress / achievement.maxProgress) * 100}%`}
                                ></div>
                            </div>
                            <div className="text-xs text-light-3 mt-1">
                                {achievement.progress}/{achievement.maxProgress}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AchievementSystem;
