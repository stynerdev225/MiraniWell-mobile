import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { ElementType } from '@/types';
import { Heart, Wind, Droplets, Mountain, Clock, Play, Users, Trophy, BookOpen, Calendar, Star, TrendingUp, Award, Sparkles, Globe, Timer, Target, Zap } from 'lucide-react';
import { ritualRoomsData } from '@/lib/wellness/data';
import AnimatedBanner from '@/components/shared/AnimatedBanner';

const RitualRoomsPage: React.FC = () => {
    const [selectedElement, setSelectedElement] = useState<ElementType | 'all'>('all');

    const elementIcons = {
        earth: Mountain,
        water: Droplets,
        fire: Heart,
        air: Wind
    };

    const filteredRooms = selectedElement === 'all'
        ? ritualRoomsData
        : ritualRoomsData.filter(room => room.element === selectedElement);

    const handleEnterRoom = (roomId: string) => {
        // Navigate to ritual room detail/practice page
        console.log('Entering room:', roomId);
    };

    return (
        <div className="flex flex-col min-h-screen bg-dark-1">
            {/* Banner */}
            <AnimatedBanner imageSrc="/assets/images/ritual-rooms-banner.svg" showElementIcons={true}>
                <h1 className="h1-bold text-white mb-2 drop-shadow-lg">Ritual Rooms</h1>
                <p className="body-medium text-light-1 drop-shadow-md max-w-md">Sacred spaces for healing and growth through the elements</p>
            </AnimatedBanner>

            {/* Element Filter */}
            <div className="px-6 my-6">
                <div className="flex gap-2 overflow-x-auto">
                    <Button
                        variant={selectedElement === 'all' ? 'default' : 'outline'}
                        onClick={() => setSelectedElement('all')}
                        className="whitespace-nowrap shad-button_primary"
                    >
                        All Elements
                    </Button>
                    {(['earth', 'water', 'fire', 'air'] as ElementType[]).map((element) => {
                        const Icon = elementIcons[element];
                        return (
                            <Button
                                key={element}
                                variant={selectedElement === element ? 'default' : 'outline'}
                                onClick={() => setSelectedElement(element)}
                                className="whitespace-nowrap flex items-center gap-2 bg-dark-4 hover:bg-primary-500 text-light-1"
                            >
                                <Icon size={16} />
                                {element.charAt(0).toUpperCase() + element.slice(1)}
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Ritual Rooms Grid */}
            <div className="flex-1 px-6 pb-24">
                <div className="grid gap-4 md:grid-cols-2">
                    {filteredRooms.map((room) => {
                        const Icon = elementIcons[room.element];
                        return (
                            <Card
                                key={room.id}
                                className="bg-dark-2 border-dark-4 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-102 hover:shadow-lg hover:shadow-primary-500/20 hover:border-primary-500 group"
                                onClick={() => handleEnterRoom(room.id)}
                            >
                                <div className={`h-32 bg-gradient-to-r ${room.color} flex items-center justify-center relative overflow-hidden group-hover:animate-pulse-subtle`}>
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    <Icon size={48} className="text-white drop-shadow-lg transform transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg text-white">{room.name}</CardTitle>
                                            <CardDescription className="mt-1 text-light-3">
                                                {room.description}
                                            </CardDescription>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-light-3">
                                            <Clock size={14} />
                                            {room.duration}m
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full flex items-center gap-2 shad-button_primary group-hover:bg-primary-600 group-hover:shadow-md group-hover:shadow-primary-500/30 transition-all duration-300">
                                        <Play size={16} className="animate-pulse-subtle" />
                                        Enter Room
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Community Ritual Sessions */}
                <div className="mt-12 space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-md shadow-lg shadow-primary-500/20">
                            <Users className="text-primary-500" size={24} />
                        </div>
                        Live Community Sessions
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "Morning Earth Grounding",
                                time: "8:00 AM - 8:30 AM",
                                participants: 24,
                                element: "earth",
                                host: "Sarah Chen",
                                status: "live"
                            },
                            {
                                title: "Water Flow Meditation",
                                time: "12:00 PM - 12:45 PM",
                                participants: 18,
                                element: "water",
                                host: "Michael Rivers",
                                status: "starting-soon"
                            },
                            {
                                title: "Fire Energy Activation",
                                time: "6:00 PM - 7:00 PM",
                                participants: 32,
                                element: "fire",
                                host: "Elena Spark",
                                status: "upcoming"
                            }
                        ].map((session, index) => (
                            <Card key={index} className="glass-card hover-scale-subtle relative overflow-hidden group">
                                <div className={`absolute inset-0 bg-gradient-to-r ${session.element === 'earth' ? 'from-green-500/10 to-emerald-500/10' :
                                    session.element === 'water' ? 'from-blue-500/10 to-cyan-500/10' : 'from-red-500/10 to-orange-500/10'} 
                                    group-hover:from-primary-500/20 group-hover:to-primary-600/20 transition-all`}></div>
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
                                <CardHeader className="relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-light-1 flex items-center gap-2">
                                                {session.title}
                                                {session.status === 'live' && (
                                                    <div className="flex items-center gap-1 text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">
                                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                                        LIVE
                                                    </div>
                                                )}
                                            </CardTitle>
                                            <CardDescription className="text-light-3 mt-1">
                                                Hosted by {session.host}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="relative z-10">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-light-3">Time</span>
                                            <span className="text-light-1">{session.time}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-light-3">Participants</span>
                                            <span className="text-light-1 flex items-center gap-1">
                                                <Users size={14} />
                                                {session.participants}
                                            </span>
                                        </div>
                                        <Button
                                            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white"
                                            disabled={session.status === 'upcoming'}
                                        >
                                            {session.status === 'live' ? 'Join Live Session' :
                                                session.status === 'starting-soon' ? 'Join Soon' : 'Set Reminder'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Your Ritual Journey */}
                <div className="mt-12 space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-md shadow-lg shadow-primary-500/20">
                            <TrendingUp className="text-primary-500" size={24} />
                        </div>
                        Your Ritual Journey
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: "Rituals Completed", value: "23", icon: Target, color: "text-blue-300" },
                            { label: "Days Active", value: "15", icon: Calendar, color: "text-green-300" },
                            { label: "Favorite Element", value: "Water", icon: Droplets, color: "text-cyan-300" },
                            { label: "Current Streak", value: "7", icon: Zap, color: "text-yellow-300" }
                        ].map((stat, index) => (
                            <Card key={index} className="glass-card hover-scale-subtle relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 group-hover:from-primary-500/20 group-hover:to-primary-600/20 transition-all"></div>
                                <CardContent className="p-6 text-center">
                                    <div className="mb-4">
                                        <stat.icon className={`mx-auto ${stat.color} animate-float`} size={32} />
                                    </div>
                                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                                    <div className="text-light-3 text-sm">{stat.label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Ritual Guides & Teachers */}
                <div className="mt-12 space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-md shadow-lg shadow-primary-500/20">
                            <Award className="text-primary-500" size={24} />
                        </div>
                        Featured Ritual Guides
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                name: "Sarah Chen",
                                specialty: "Earth Grounding",
                                experience: "5 years",
                                rating: 4.9,
                                sessions: 120,
                                image: "https://images.unsplash.com/photo-1494790108755-2616c6d2b6e0?auto=format&fit=crop&q=80&w=200&ixlib=rb-4.0.3"
                            },
                            {
                                name: "Michael Rivers",
                                specialty: "Water Flow",
                                experience: "3 years",
                                rating: 4.8,
                                sessions: 85,
                                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&ixlib=rb-4.0.3"
                            },
                            {
                                name: "Elena Spark",
                                specialty: "Fire Energy",
                                experience: "4 years",
                                rating: 4.9,
                                sessions: 95,
                                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&ixlib=rb-4.0.3"
                            }
                        ].map((guide, index) => (
                            <Card key={index} className="glass-card hover-scale-subtle relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 group-hover:from-primary-500/20 group-hover:to-primary-600/20 transition-all"></div>
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
                                <CardContent className="p-6 text-center relative z-10">
                                    <div className="mb-4">
                                        <img
                                            src={guide.image}
                                            alt={guide.name}
                                            className="w-20 h-20 rounded-full mx-auto border-4 border-primary-500/30 shadow-lg"
                                        />
                                    </div>
                                    <h3 className="text-light-1 font-semibold mb-1">{guide.name}</h3>
                                    <p className="text-light-3 text-sm mb-3">{guide.specialty}</p>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex items-center justify-between">
                                            <span className="text-light-3">Experience</span>
                                            <span className="text-light-1">{guide.experience}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-light-3">Rating</span>
                                            <span className="text-light-1 flex items-center gap-1">
                                                <Star size={12} className="text-yellow-400" />
                                                {guide.rating}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-light-3">Sessions</span>
                                            <span className="text-light-1">{guide.sessions}</span>
                                        </div>
                                    </div>
                                    <Button className="w-full mt-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                                        View Profile
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Weekly Ritual Challenges */}
                <div className="mt-12 space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-md shadow-lg shadow-primary-500/20">
                            <Trophy className="text-primary-500" size={24} />
                        </div>
                        Weekly Challenges
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {[
                            {
                                title: "7-Day Water Element Journey",
                                description: "Connect with the flow of water through daily rituals",
                                progress: 3,
                                totalDays: 7,
                                reward: "Water Mastery Badge",
                                participants: 156,
                                timeLeft: "4 days left"
                            },
                            {
                                title: "Gratitude Fire Circle",
                                description: "Ignite your inner fire with daily gratitude practices",
                                progress: 5,
                                totalDays: 5,
                                reward: "Fire Heart Badge",
                                participants: 203,
                                timeLeft: "2 days left"
                            }
                        ].map((challenge, index) => (
                            <Card key={index} className="glass-card hover-scale-subtle relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 group-hover:from-primary-500/20 group-hover:to-primary-600/20 transition-all"></div>
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
                                <CardHeader className="relative z-10">
                                    <CardTitle className="text-light-1 flex items-center gap-2">
                                        {challenge.title}
                                        <div className="text-xs bg-primary-500 text-white px-2 py-1 rounded-full">
                                            {challenge.timeLeft}
                                        </div>
                                    </CardTitle>
                                    <CardDescription className="text-light-3">
                                        {challenge.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="relative z-10">
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-light-3">Progress</span>
                                                <span className="text-light-1">{challenge.progress}/{challenge.totalDays} days</span>
                                            </div>
                                            <div className="w-full bg-dark-4 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
                                                    data-progress={`${(challenge.progress / challenge.totalDays) * 100}%`}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-light-3">Participants</span>
                                            <span className="text-light-1 flex items-center gap-1">
                                                <Globe size={14} />
                                                {challenge.participants}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-light-3">Reward</span>
                                            <span className="text-light-1 flex items-center gap-1">
                                                <Trophy size={14} className="text-gold-1" />
                                                {challenge.reward}
                                            </span>
                                        </div>
                                        <Button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                                            Continue Challenge
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Ritual Library */}
                <div className="mt-12 space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-md shadow-lg shadow-primary-500/20">
                            <BookOpen className="text-primary-500" size={24} />
                        </div>
                        Ritual Library
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "Beginner's Guide to Earth Rituals",
                                type: "Guide",
                                readTime: "15 min",
                                category: "Earth",
                                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=300&ixlib=rb-4.0.3"
                            },
                            {
                                title: "Water Meditation Techniques",
                                type: "Tutorial",
                                readTime: "10 min",
                                category: "Water",
                                image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300&ixlib=rb-4.0.3"
                            },
                            {
                                title: "Fire Energy Activation Methods",
                                type: "Advanced",
                                readTime: "20 min",
                                category: "Fire",
                                image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=300&ixlib=rb-4.0.3"
                            },
                            {
                                title: "Air Element Breathwork",
                                type: "Practice",
                                readTime: "12 min",
                                category: "Air",
                                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=300&ixlib=rb-4.0.3"
                            },
                            {
                                title: "Creating Sacred Space",
                                type: "Guide",
                                readTime: "8 min",
                                category: "General",
                                image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=300&ixlib=rb-4.0.3"
                            },
                            {
                                title: "Seasonal Ritual Practices",
                                type: "Seasonal",
                                readTime: "25 min",
                                category: "Advanced",
                                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=300&ixlib=rb-4.0.3"
                            }
                        ].map((resource, index) => (
                            <Card key={index} className="glass-card hover-scale-subtle relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 group-hover:from-primary-500/20 group-hover:to-primary-600/20 transition-all"></div>
                                <div className="h-32 bg-cover bg-center relative overflow-hidden">
                                    <div 
                                        className="absolute inset-0 bg-cover bg-center"
                                        data-bg-image={resource.image}
                                    ></div>
                                    <div className="absolute inset-0 bg-black/40"></div>
                                    <div className="absolute top-2 left-2 bg-primary-500 text-white px-2 py-1 rounded text-xs">
                                        {resource.type}
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                        <Timer size={12} />
                                        {resource.readTime}
                                    </div>
                                </div>
                                <CardHeader className="relative z-10">
                                    <CardTitle className="text-light-1 text-sm">{resource.title}</CardTitle>
                                    <CardDescription className="text-light-3 text-xs">
                                        {resource.category}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="relative z-10">
                                    <Button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                                        Read Now
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Personal Ritual Planner */}
                <div className="mt-12 space-y-6 mb-8">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary-500/20 backdrop-blur-md shadow-lg shadow-primary-500/20">
                            <Calendar className="text-primary-500" size={24} />
                        </div>
                        Personal Ritual Planner
                    </h2>
                    <Card className="glass-card hover-scale-subtle relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 transition-all"></div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center"></div>
                        <CardHeader className="relative z-10">
                            <CardTitle className="text-light-1 flex items-center gap-2">
                                <Sparkles className="text-primary-500" size={20} />
                                Plan Your Sacred Practice
                            </CardTitle>
                            <CardDescription className="text-light-3">
                                Create a personalized ritual schedule that aligns with your wellness goals
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <h4 className="text-light-1 font-medium mb-3">Quick Schedule</h4>
                                    <div className="space-y-2">
                                        {[
                                            { time: "Morning", ritual: "Earth Grounding", duration: "15 min" },
                                            { time: "Afternoon", ritual: "Water Flow", duration: "20 min" },
                                            { time: "Evening", ritual: "Fire Reflection", duration: "10 min" }
                                        ].map((slot, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-dark-4/50 rounded-lg">
                                                <div>
                                                    <div className="text-light-1 text-sm font-medium">{slot.time}</div>
                                                    <div className="text-light-3 text-xs">{slot.ritual}</div>
                                                </div>
                                                <div className="text-light-3 text-xs">{slot.duration}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-light-1 font-medium mb-3">Customize Your Practice</h4>
                                    <div className="space-y-3">
                                        <Button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                                            Create Custom Plan
                                        </Button>
                                        <Button variant="outline" className="w-full glass-effect-light">
                                            View Calendar
                                        </Button>
                                        <Button variant="outline" className="w-full glass-effect-light">
                                            Set Reminders
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default RitualRoomsPage;
