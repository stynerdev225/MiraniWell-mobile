// filepath: /Users/stynerstiner/Downloads/MiraniWell-mobile/src/_root/pages/Journal.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { JournalEntry } from '@/types';
import { Heart, Sun, Battery, Zap, Feather, Save, Sparkles, Clock, Calendar, BarChart3, Award } from 'lucide-react';

const JournalPage: React.FC = () => {
    const [currentMood, setCurrentMood] = useState<number>(5);
    const [currentEnergy, setCurrentEnergy] = useState<number>(5);
    const [currentStress, setCurrentStress] = useState<number>(5);
    const [journalContent, setJournalContent] = useState<string>('');
    const [gratitudeItems, setGratitudeItems] = useState<string[]>(['', '', '']);
    const [intention, setIntention] = useState<string>('');

    const handleMoodSelect = (mood: number) => {
        setCurrentMood(mood);
    };

    const handleGratitudeChange = (index: number, value: string) => {
        const newGratitude = [...gratitudeItems];
        newGratitude[index] = value;
        setGratitudeItems(newGratitude);
    };

    const handleSaveEntry = () => {
        const entry: Partial<JournalEntry> = {
            date: new Date(),
            mood: currentMood,
            content: journalContent,
            gratitude: gratitudeItems.filter(item => item.trim() !== ''),
            intention: intention,
            isPrivate: true,
            tags: []
        };

        console.log('Saving journal entry:', entry);
        // TODO: Save to Appwrite database
    };

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return (
        <div className="flex flex-col min-h-screen bg-dark-1 custom-scrollbar">
            {/* Animated background pattern */}
            <div className="fixed inset-0 z-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(#9D6EF9_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>
            
            {/* Header with background image */}
            <div className="px-4 sm:px-6 py-6 sm:py-8 relative overflow-hidden rounded-b-3xl mb-4 sm:mb-6">
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-30 transition-all duration-700 hover:opacity-40 hover:scale-105" 
                    style={{ 
                        backgroundImage: 'url(https://images.unsplash.com/photo-1483546416237-76fd26bbcdd1?auto=format&fit=crop&q=80&w=1600&ixlib=rb-4.0.3)', 
                        backgroundPosition: 'center 40%' 
                    }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-700/60 via-primary-700/40 to-dark-1"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-3 animate-fade-in">
                        <div className="p-2 sm:p-3 bg-primary-500/30 rounded-xl backdrop-blur-md shadow-lg shadow-primary-500/20 animate-pulse-subtle">
                            <Feather className="text-primary-500 w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold premium-gradient-text animate-float">
                                Daily Check-In
                            </h1>
                            <div className="flex items-center gap-2 text-light-3 text-xs sm:text-sm">
                                <Calendar size={14} className="text-primary-500/70" />
                                <span>{formattedDate}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-light-2 max-w-xl ml-1 text-sm sm:text-base animate-fade-in [animation-delay:200ms]">
                        Take a moment to check in with yourself and record your thoughts, feelings, and gratitude
                    </p>
                </div>
            </div>

            <div className="flex-1 px-4 sm:px-6 pb-20 sm:pb-24 space-y-4 sm:space-y-6 max-w-5xl mx-auto w-full">
                {/* Mood Tracking */}
                <Card className="glass-effect overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-red-500/5"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515259387350-532623e84363?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <div className="p-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 shadow-lg">
                                <Heart className="text-white" size={18} />
                            </div>
                            How's your mood today?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap justify-between items-center mb-5 gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mood) => (
                                <button
                                    key={mood}
                                    onClick={() => handleMoodSelect(mood)}
                                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center text-xs sm:text-sm font-medium transition-all hover:scale-110 active:scale-95 ${
                                        currentMood === mood
                                            ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white border-pink-400 shadow-lg shadow-pink-500/30 animate-pulse-subtle'
                                            : 'border-dark-4 text-light-3 hover:border-primary-500 hover:text-white bg-dark-3 hover:shadow-lg hover:shadow-primary-500/20'
                                    }`}
                                >
                                    {mood}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between items-center p-2 glass-card mb-2">
                            <div className="text-xs text-light-3">Very Low</div>
                            <div className="text-xs text-light-3">Neutral</div>
                            <div className="text-xs text-light-3">Excellent</div>
                        </div>
                        
                        {/* Mood description based on selected value */}
                        <div className="mt-4">
                            <div className="p-3 glass-card hover-scale-subtle bg-dark-1/40">
                                <p className="text-center text-light-1">
                                    {currentMood <= 3 && "I'm feeling down today. Taking time for self-care."}
                                    {currentMood > 3 && currentMood <= 6 && "I'm feeling okay, but could be better."}
                                    {currentMood > 6 && currentMood <= 8 && "I'm feeling pretty good today!"}
                                    {currentMood > 8 && "I'm feeling fantastic and energetic today!"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Energy & Stress */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="glass-effect overflow-hidden relative group hover-scale-subtle">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-green-600/5 to-green-400/5 group-hover:from-green-500/10 group-hover:to-green-400/10 transition-all"></div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520646189695-444d9f117d37?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg text-white">
                                <div className="p-1.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 shadow-md">
                                    <Battery className="text-white" size={16} />
                                </div>
                                Energy
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative pb-8">
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={currentEnergy}
                                    onChange={(e) => setCurrentEnergy(Number(e.target.value))}
                                    className="custom-range"
                                    style={{
                                        background: `linear-gradient(to right, #22c55e ${(currentEnergy - 1) * 11.1}%, #1f2937 ${(currentEnergy - 1) * 11.1}%)`
                                    }}
                                />
                                <div className="flex justify-between mt-2 px-1 text-xs text-light-3">
                                    <span>Low</span>
                                    <span>High</span>
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center text-sm text-light-2 mt-2 p-1.5 rounded-full glass-card backdrop-blur-sm w-16 mx-auto animate-pulse-subtle">
                                    {currentEnergy}/10
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-effect overflow-hidden relative group hover-scale-subtle">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-orange-600/5 to-orange-400/5 group-hover:from-orange-500/10 group-hover:to-orange-400/10 transition-all"></div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg text-white">
                                <div className="p-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 shadow-md">
                                    <Zap className="text-white" size={16} />
                                </div>
                                Stress
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative pb-8">
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={currentStress}
                                    onChange={(e) => setCurrentStress(Number(e.target.value))}
                                    className="custom-range"
                                    style={{
                                        background: `linear-gradient(to right, #f97316 ${(currentStress - 1) * 11.1}%, #1f2937 ${(currentStress - 1) * 11.1}%)`
                                    }}
                                />
                                <div className="flex justify-between mt-2 px-1 text-xs text-light-3">
                                    <span>Calm</span>
                                    <span>Stressed</span>
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center text-sm text-light-2 mt-2 p-1.5 rounded-full glass-card backdrop-blur-sm w-16 mx-auto animate-pulse-subtle">
                                    {currentStress}/10
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Gratitude */}
                <Card className="glass-effect overflow-hidden relative group hover-scale-subtle">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-yellow-600/5 to-yellow-400/5 group-hover:from-yellow-500/10 group-hover:to-yellow-400/10 transition-all"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464082354059-27db6ce50048?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <div className="p-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg">
                                <Sun className="text-white" size={18} />
                            </div>
                            Three things I'm grateful for
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {gratitudeItems.map((item, index) => (
                            <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                                <Input
                                    placeholder={`Gratitude ${index + 1}...`}
                                    value={item}
                                    onChange={(e) => handleGratitudeChange(index, e.target.value)}
                                    className="shad-input pl-10 bg-dark-3/70 backdrop-blur-md transition-all hover:bg-dark-3"
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500">
                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-dark-2 text-xs font-medium group-hover:bg-yellow-600 transition-colors">
                                        {index + 1}
                                    </span>
                                </div>
                                {item.length > 0 && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500/50 animate-pulse-subtle">
                                        <Sun size={14} />
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="pt-2 text-center">
                            <p className="text-xs text-light-3 italic">Studies show gratitude practices boost overall well-being and happiness</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Daily Intention */}
                <Card className="glass-effect overflow-hidden relative group hover-scale-subtle">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-600/5 to-blue-400/5 group-hover:from-blue-500/10 group-hover:to-blue-400/10 transition-all"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
                                <Sparkles className="text-white" size={18} />
                            </div>
                            Today's Intention
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            <Input
                                placeholder="What do you want to focus on today?"
                                value={intention}
                                onChange={(e) => setIntention(e.target.value)}
                                className="shad-input pl-10 bg-dark-3/70 backdrop-blur-md transition-all hover:bg-dark-3"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
                                <Sparkles size={16} className="animate-pulse-subtle" />
                            </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-3 gap-2">
                            {['Focus', 'Gratitude', 'Mindfulness', 'Kindness', 'Growth', 'Reflection'].map((item, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => setIntention(item)}
                                    className={`text-center text-xs py-2 px-1 rounded-lg cursor-pointer transition-all hover:bg-blue-500/20 ${intention === item ? 'bg-blue-500/20 text-blue-300 font-medium' : 'text-light-3 bg-dark-3/50'}`}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Journal Entry */}
                <Card className="glass-effect overflow-hidden relative group hover-scale-subtle">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-purple-600/5 to-purple-400/5 group-hover:from-purple-500/10 group-hover:to-purple-400/10 transition-all"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg">
                                <Feather className="text-white" size={18} />
                            </div>
                            Journal Entry
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            <div className="absolute top-3 left-3 text-light-3 opacity-50">
                                <Feather size={18} className="animate-pulse-subtle" />
                            </div>
                            <Textarea
                                placeholder="How are you feeling? What's on your mind today?"
                                value={journalContent}
                                onChange={(e) => setJournalContent(e.target.value)}
                                className="shad-textarea min-h-48 pl-10 custom-scrollbar"
                            />
                        </div>
                        <div className="flex justify-between items-center mt-3 text-xs text-light-3">
                            <div className="flex items-center gap-1">
                                <Clock size={14} /> 
                                <span>Last updated: {new Date().toLocaleTimeString()}</span>
                            </div>
                            <div>
                                {journalContent.length} characters
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Journal Stats */}
                <Card className="glass-effect overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-700/5"></div>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-white flex items-center gap-2">
                            <Clock size={18} className="text-primary-500" />
                            Your Journal Stats
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="glass-card p-3 text-center hover-scale-subtle">
                                <div className="text-xl font-bold text-primary-300">12</div>
                                <div className="text-xs text-light-3">Entries</div>
                            </div>
                            <div className="glass-card p-3 text-center hover-scale-subtle">
                                <div className="text-xl font-bold text-green-300">7.5</div>
                                <div className="text-xs text-light-3">Avg Mood</div>
                            </div>
                            <div className="glass-card p-3 text-center hover-scale-subtle">
                                <div className="text-xl font-bold text-blue-300">30</div>
                                <div className="text-xs text-light-3">Days Streak</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                {/* Journaling Quote */}
                <Card className="glass-effect overflow-hidden relative group hover-scale-subtle">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527168027773-0cc890c4f42e?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-8 bg-cover bg-center mix-blend-overlay"></div>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-white flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
                                <span className="text-white text-lg font-serif">"</span>
                            </div>
                            Daily Inspiration
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 glass-card hover-scale-subtle bg-dark-1/40">
                            <p className="text-light-1 italic font-medium text-center">"The journal is a vehicle for my sense of selfhood. It represents me as emotional and spiritual person. And it's a place where I can hold myself accountable."</p>
                            <p className="text-right text-light-3 text-sm mt-2">— Susan Sontag</p>
                        </div>
                        <div className="flex justify-end mt-3">
                            <Button variant="ghost" className="text-primary-300 hover:text-primary-500 hover:bg-primary-500/10 text-sm">
                                <Award className="w-4 h-4 mr-1" /> New Quote
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Save Button */}
                <Button
                    onClick={handleSaveEntry}
                    className="w-full group relative overflow-hidden hover-scale shadow-glow py-6"
                    size="lg"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-90 group-hover:opacity-100 transition-opacity rounded-md"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity mix-blend-overlay rounded-md"></div>
                    <span className="relative flex items-center justify-center">
                        <span className="absolute -inset-0.5 animate-pulse rounded-lg bg-gradient-to-r from-primary-500 to-accent-1 opacity-30 blur-sm group-hover:opacity-50 transition-opacity"></span>
                        <span className="relative flex items-center justify-center gap-2 text-white font-medium">
                            <Save className="mr-2 animate-pulse-subtle" size={22} />
                            Save Today's Check-In
                        </span>
                    </span>
                </Button>
                
                {/* Weekly Mood Progress */}
                <Card className="glass-effect overflow-hidden relative mt-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-teal-500/5 to-blue-500/5"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 shadow-lg">
                                <BarChart3 className="text-white" size={18} />
                            </div>
                            Weekly Mood Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-40 sm:h-48 w-full relative">
                            {/* Simple mood chart visualization */}
                            <div className="absolute bottom-0 left-0 right-0 flex h-32 sm:h-40 items-end justify-between gap-1 px-1">
                                {/* Fake data for the mood chart */}
                                {[7, 5, 8, 6, 9, 6, 7].map((value, index) => (
                                    <div key={index} className="relative group">
                                        <div 
                                            className="w-6 sm:w-10 rounded-t-lg transition-all duration-300 hover:opacity-100 opacity-80 cursor-pointer" 
                                            style={{ 
                                                height: `${value * 10}%`,
                                                background: `linear-gradient(to top, ${value > 7 ? '#4ade80' : value > 5 ? '#60a5fa' : '#f87171'}, ${value > 7 ? '#22c55e' : value > 5 ? '#3b82f6' : '#ef4444'})`,
                                            }}
                                        ></div>
                                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-light-3">
                                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                                        </div>
                                        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity -top-8 left-1/2 transform -translate-x-1/2 bg-dark-1 text-light-1 text-xs px-2 py-1 rounded">
                                            {value}/10
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Grid lines */}
                            <div className="absolute left-0 right-0 bottom-0 top-0 flex flex-col justify-between opacity-10">
                                {[0, 1, 2, 3, 4].map((_, i) => (
                                    <div key={i} className="border-t border-light-3 h-0"></div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default JournalPage;
