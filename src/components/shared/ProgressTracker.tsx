import { useState } from 'react';
import { Target, Plus } from 'lucide-react';

interface Goal {
    id: string;
    title: string;
    description: string;
    targetValue: number;
    currentValue: number;
    unit: string;
    category: 'mindfulness' | 'physical' | 'emotional' | 'spiritual';
    deadline: Date;
    isCompleted: boolean;
}



const ProgressTracker = () => {
    const [goals] = useState<Goal[]>([
        {
            id: '1',
            title: 'Daily Meditation',
            description: 'Meditate for 10 minutes daily',
            targetValue: 30,
            currentValue: 12,
            unit: 'days',
            category: 'mindfulness',
            deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
            isCompleted: false
        },
        {
            id: '2',
            title: 'Gratitude Journal',
            description: 'Write 3 things you\'re grateful for each day',
            targetValue: 21,
            currentValue: 8,
            unit: 'entries',
            category: 'emotional',
            deadline: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000),
            isCompleted: false
        },
        {
            id: '3',
            title: 'Mindful Walking',
            description: 'Take a 15-minute mindful walk',
            targetValue: 14,
            currentValue: 5,
            unit: 'walks',
            category: 'physical',
            deadline: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
            isCompleted: false
        }
    ]);



    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'mindfulness': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
            case 'physical': return 'text-green-400 bg-green-500/10 border-green-500/20';
            case 'emotional': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
            case 'spiritual': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
            default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
        }
    };

    const getProgressPercentage = (current: number, target: number) => {
        return Math.min((current / target) * 100, 100);
    };



    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-primary-500" />
                    <h3 className="text-xl font-bold text-light-1">Goals & Progress</h3>
                </div>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Goal
                </button>
            </div>

            {/* Active Goals - Compact View */}
            <div className="grid gap-4">
                {goals.slice(0, 2).map((goal) => (
                    <div
                        key={goal.id}
                        className={`p-4 rounded-xl border ${getCategoryColor(goal.category)} backdrop-blur-sm`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex-1">
                                <h4 className="font-semibold text-light-1 text-sm">{goal.title}</h4>
                                <p className="text-xs text-light-3">{goal.currentValue} / {goal.targetValue} {goal.unit}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-lg font-bold text-light-1">
                                    {Math.round(getProgressPercentage(goal.currentValue, goal.targetValue))}%
                                </span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-dark-3 rounded-full h-2">
                            <div className={`bg-primary-500 h-2 rounded-full transition-all duration-300 ${getProgressPercentage(goal.currentValue, goal.targetValue) > 75 ? 'w-3/4' :
                                    getProgressPercentage(goal.currentValue, goal.targetValue) > 50 ? 'w-1/2' :
                                        getProgressPercentage(goal.currentValue, goal.targetValue) > 25 ? 'w-1/4' : 'w-1/6'
                                }`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Action Button */}
            <button className="w-full bg-dark-3 hover:bg-dark-4 border border-dark-4 text-light-1 p-3 rounded-xl font-medium transition-colors">
                View All Goals & Streaks
            </button>
        </div>
    );
};

export default ProgressTracker;
