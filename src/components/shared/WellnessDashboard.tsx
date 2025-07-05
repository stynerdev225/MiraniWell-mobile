import React from 'react';
import {
    BarChart3,
    TrendingUp,
    Heart,
    Brain,
    Activity,
    Calendar,
    Target,
    Zap
} from 'lucide-react';

interface WellnessMetric {
    label: string;
    value: number;
    maxValue: number;
    icon: React.ReactNode;
    color: string;
    trend: 'up' | 'down' | 'stable';
    trendValue: number;
}

const WellnessDashboard = () => {
    // Helper function to create dynamic height for chart bars
    const getBarHeight = (value: number, maxValue: number = 10) => {
        const percentage = (value / maxValue) * 100;
        return `${Math.round((percentage / 100) * 80)}px`;
    };

    // Helper function to get progress bar width
    const getProgressWidth = (value: number, maxValue: number) => {
        return `${(value / maxValue) * 100}%`;
    };

    // Create inline styles using CSS custom properties
    const createProgressStyle = (width: string): React.CSSProperties => ({
        '--progress-width': width,
        width: 'var(--progress-width)'
    } as React.CSSProperties);

    const createBarStyle = (height: string): React.CSSProperties => ({
        '--bar-height': height,
        height: 'var(--bar-height)'
    } as React.CSSProperties);

    const metrics: WellnessMetric[] = [
        {
            label: 'Mood Score',
            value: 7.8,
            maxValue: 10,
            icon: <Heart className="w-5 h-5" />,
            color: 'text-red-400',
            trend: 'up',
            trendValue: 12
        },
        {
            label: 'Energy Level',
            value: 6.5,
            maxValue: 10,
            icon: <Zap className="w-5 h-5" />,
            color: 'text-yellow-400',
            trend: 'up',
            trendValue: 8
        },
        {
            label: 'Stress Level',
            value: 3.2,
            maxValue: 10,
            icon: <Brain className="w-5 h-5" />,
            color: 'text-blue-400',
            trend: 'down',
            trendValue: 15
        },
        {
            label: 'Activity Score',
            value: 8.1,
            maxValue: 10,
            icon: <Activity className="w-5 h-5" />,
            color: 'text-green-400',
            trend: 'up',
            trendValue: 5
        }
    ];

    const weeklyData = [
        { day: 'Mon', mood: 7, energy: 6, stress: 4 },
        { day: 'Tue', mood: 8, energy: 7, stress: 3 },
        { day: 'Wed', mood: 6, energy: 5, stress: 6 },
        { day: 'Thu', mood: 9, energy: 8, stress: 2 },
        { day: 'Fri', mood: 8, energy: 7, stress: 3 },
        { day: 'Sat', mood: 9, energy: 9, stress: 2 },
        { day: 'Sun', mood: 8, energy: 8, stress: 3 }
    ];

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'up':
                return <TrendingUp className="w-3 h-3 text-green-400" />;
            case 'down':
                return <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />;
            default:
                return <Target className="w-3 h-3 text-gray-400" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Wellness Metrics Grid */}
            <div className="bg-dark-2 rounded-2xl p-6 border border-dark-4">
                <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="w-6 h-6 text-primary-500" />
                    <h3 className="text-xl font-bold text-light-1">Wellness Metrics</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {metrics.map((metric, index) => (
                        <div key={index} className="bg-dark-2 rounded-2xl p-4 border border-dark-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`${metric.color} bg-dark-3 rounded-xl p-2`}>
                                    {metric.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-light-1">{metric.label}</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-light-1">{metric.value}</span>
                                        <div className="text-xs text-light-3">of {metric.maxValue}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-2">
                                <div className="w-full bg-dark-4 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 progress-bar ${metric.color.includes('red') ? 'bg-red-400' :
                                            metric.color.includes('yellow') ? 'bg-yellow-400' :
                                                metric.color.includes('blue') ? 'bg-blue-400' :
                                                    'bg-green-400'
                                            }`}
                                        {...{ style: createProgressStyle(getProgressWidth(metric.value, metric.maxValue)) }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-xs font-medium text-light-2">{metric.label}</div>
                                <div className="flex items-center gap-1">
                                    {getTrendIcon(metric.trend)}
                                    <span className={`text-xs font-medium ${metric.trend === 'up' ? 'text-green-400' :
                                        metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                                        {metric.trendValue}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Weekly Trend Chart */}
            <div className="bg-dark-2 rounded-2xl p-6 border border-dark-4">
                <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-6 h-6 text-primary-500" />
                    <h3 className="text-xl font-bold text-light-1">Weekly Trends</h3>
                </div>

                <div className="space-y-4">
                    {/* Chart Legend */}
                    <div className="flex gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <span className="text-light-3">Mood</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <span className="text-light-3">Energy</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                            <span className="text-light-3">Stress</span>
                        </div>
                    </div>

                    {/* Simple Bar Chart */}
                    <div className="flex items-end justify-between gap-2 h-32">
                        {weeklyData.map((data, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 flex-1">
                                <div className="flex flex-col gap-1 items-center w-full h-24 justify-end">
                                    <div
                                        className="w-2 bg-red-400 rounded-t opacity-80 chart-bar"
                                        {...{ style: createBarStyle(getBarHeight(data.mood)) }}
                                    ></div>
                                    <div
                                        className="w-2 bg-yellow-400 rounded-t opacity-80 chart-bar"
                                        {...{ style: createBarStyle(getBarHeight(data.energy)) }}
                                    ></div>
                                    <div
                                        className="w-2 bg-blue-400 rounded-t opacity-80 chart-bar"
                                        {...{ style: createBarStyle(getBarHeight(data.stress)) }}
                                    ></div>
                                </div>
                                <span className="text-xs text-light-3">{data.day}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WellnessDashboard;
