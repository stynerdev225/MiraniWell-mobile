import { useState } from 'react';
import { Heart, Brain, Zap, Droplets, Sun, Moon, Activity } from 'lucide-react';

interface MoodEntry {
    id: string;
    date: Date;
    mood: 1 | 2 | 3 | 4 | 5;
    energy: 1 | 2 | 3 | 4 | 5;
    stress: 1 | 2 | 3 | 4 | 5;
    sleep: number; // hours
    water: number; // glasses
    exercise: boolean;
    meditation: boolean;
    notes: string;
}

const MoodTracker = () => {
    const [todayEntry] = useState<Partial<MoodEntry>>({
        mood: 4,
        energy: 3,
        stress: 2,
        sleep: 7,
        water: 5,
        exercise: true,
        meditation: false,
        notes: 'Feeling good today! Morning yoga session was refreshing.'
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6 text-red-400" />
                    <h3 className="text-xl font-bold text-light-1">Today's Mood</h3>
                </div>
                <div className="flex items-center gap-2">
                    <Sun className="w-5 h-5 text-yellow-400" />
                    <span className="text-light-2 font-medium text-sm">Today</span>
                </div>
            </div>

            {/* Today's Quick Summary */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Heart className="w-5 h-5 text-red-400" />
                        <span className="font-medium text-light-1 text-sm">Mood</span>
                    </div>
                    <div className="text-2xl font-bold text-light-1">
                        {todayEntry.mood}
                        <span className="text-sm text-light-3 ml-1">/5</span>
                    </div>
                </div>
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="font-medium text-light-1 text-sm">Energy</span>
                    </div>
                    <div className="text-2xl font-bold text-light-1">
                        {todayEntry.energy}
                        <span className="text-sm text-light-3 ml-1">/5</span>
                    </div>
                </div>
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Droplets className="w-5 h-5 text-cyan-400" />
                        <span className="font-medium text-light-1 text-sm">Water</span>
                    </div>
                    <div className="text-2xl font-bold text-light-1">
                        {todayEntry.water}
                        <span className="text-sm text-light-3 ml-1">glasses</span>
                    </div>
                </div>
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Moon className="w-5 h-5 text-blue-400" />
                        <span className="font-medium text-light-1 text-sm">Sleep</span>
                    </div>
                    <div className="text-2xl font-bold text-light-1">
                        {todayEntry.sleep}
                        <span className="text-sm text-light-3 ml-1">hours</span>
                    </div>
                </div>
            </div>

            {/* Activities Status */}
            <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded-xl border ${todayEntry.exercise
                        ? 'bg-green-500/10 border-green-500/20'
                        : 'bg-gray-500/10 border-gray-500/20'
                    }`}>
                    <div className="flex items-center gap-2">
                        <Activity className={`w-4 h-4 ${todayEntry.exercise ? 'text-green-400' : 'text-gray-400'}`} />
                        <span className="text-sm font-medium text-light-1">Exercise</span>
                        {todayEntry.exercise && (
                            <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
                        )}
                    </div>
                </div>
                <div className={`p-3 rounded-xl border ${todayEntry.meditation
                        ? 'bg-purple-500/10 border-purple-500/20'
                        : 'bg-gray-500/10 border-gray-500/20'
                    }`}>
                    <div className="flex items-center gap-2">
                        <Brain className={`w-4 h-4 ${todayEntry.meditation ? 'text-purple-400' : 'text-gray-400'}`} />
                        <span className="text-sm font-medium text-light-1">Meditation</span>
                        {todayEntry.meditation && (
                            <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full"></div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Action Button */}
            <button className="w-full bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-xl font-medium transition-colors">
                Update Today's Mood
            </button>
        </div>
    );
};

export default MoodTracker;
