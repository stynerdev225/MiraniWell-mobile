import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Affirmation, ElementType } from '@/types';
import { Heart, Shuffle, Copy, Share, Sparkles, Star, Bookmark } from 'lucide-react';
import { affirmationsData, getRandomAffirmation } from '@/lib/wellness/data';

const AffirmationsPage: React.FC = () => {
    const [selectedElement, setSelectedElement] = useState<ElementType | 'all'>('all');
    const [currentAffirmation, setCurrentAffirmation] = useState<Affirmation | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const videoRef = useRef<HTMLIFrameElement>(null);

    const elementColors = {
        earth: 'from-amber-400 to-orange-600',
        water: 'from-blue-400 to-cyan-600',
        fire: 'from-red-400 to-orange-500',
        air: 'from-gray-300 to-blue-400'
    };

    // Debounced scroll handler to improve performance
    const handleScroll = useCallback(() => {
        if (!isScrolling) {
            setIsScrolling(true);
        }

        // Clear the timeout if it exists
        const timeoutId = setTimeout(() => {
            setIsScrolling(false);
        }, 150);

        return () => clearTimeout(timeoutId);
    }, [isScrolling]);

    // Passive scroll event listener setup
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

            return () => {
                scrollContainer.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    // Touch event handlers for smoother scrolling
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleTouchStart = (e: TouchEvent) => {
            // Prevent default only for multiple touches (pinch to zoom)
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            // Let single touch events (scrolling) proceed normally
            if (e.touches.length <= 1) return;

            // Prevent zooming
            e.preventDefault();
        };

        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    const filteredAffirmations = selectedElement === 'all'
        ? affirmationsData
        : affirmationsData.filter(affirmation => affirmation.element === selectedElement);

    const getNewRandomAffirmation = () => {
        const randomAffirmation = selectedElement === 'all'
            ? getRandomAffirmation()
            : getRandomAffirmation(selectedElement as ElementType);
        setCurrentAffirmation(randomAffirmation);
    };

    const copyAffirmation = () => {
        if (currentAffirmation) {
            navigator.clipboard.writeText(currentAffirmation.text);
            // TODO: Show toast notification
        }
    };

    const shareAffirmation = () => {
        if (currentAffirmation && navigator.share) {
            navigator.share({
                title: 'Daily Affirmation',
                text: currentAffirmation.text
            });
        }
    };

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

    // When element changes, reset video state
    useEffect(() => {
        setIsVideoPlaying(false);
        setIsMuted(false);
        setIsVideoLoading(true);
        
        // Reload iframe to reset video when element changes
        const iframe = videoRef.current;
        if (iframe) {
            const src = iframe.src;
            iframe.src = '';
            setTimeout(() => {
                iframe.src = src;
            }, 100);
        }
    }, [selectedElement]);

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

    React.useEffect(() => {
        // Show a random affirmation when the page loads
        getNewRandomAffirmation();

        // No longer need to set isLoaded state
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-dark-1 w-full mx-auto overscroll-behavior-contain">
            {/* Animated background pattern */}
            <div className="fixed inset-0 z-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(#9D6EF9_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>

            {/* Header with background image */}
            <div className="px-6 py-8 w-full max-w-3xl mx-auto relative overflow-hidden rounded-b-3xl mb-6">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-30 transition-all duration-700 hover:opacity-40 hover:scale-105"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=1600&ixlib=rb-4.0.3)',
                        backgroundPosition: 'center 40%'
                    }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-700/60 via-primary-700/40 to-dark-1"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-3 animate-fade-in">
                        <div className="p-3 bg-primary-500/30 rounded-xl backdrop-blur-md shadow-lg shadow-primary-500/20 animate-pulse-subtle">
                            <Star className="text-primary-500" size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold premium-gradient-text animate-float">
                                Affirmations
                            </h1>
                            <p className="text-light-3 text-sm">Nature-based affirmations for daily support</p>
                        </div>
                    </div>
                    <p className="text-light-2 max-w-xl ml-1 animate-fade-in [animation-delay:200ms]">
                        Powerful, elemental affirmations to uplift your spirit and enhance your wellness journey
                    </p>
                </div>
            </div>

            <div
                className={`flex-1 px-6 pb-24 space-y-6 w-full max-w-3xl mx-auto overflow-y-auto will-change-scroll overscroll-behavior-contain affirmations-page affirmations-scrollbar ${isScrolling ? 'is-scrolling' : ''}`}
                ref={scrollContainerRef}
                style={{
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                    paddingBottom: '120px',
                    backfaceVisibility: 'hidden',
                    perspective: '1000px',
                    transform: 'translate3d(0,0,0)'
                }}>
                {/* Current Affirmation Card */}
                {currentAffirmation && (
                    <Card className="relative overflow-hidden glass-effect hover-scale-subtle group scroll-snap-child">
                        <div className={`absolute inset-0 bg-gradient-to-r ${elementColors[currentAffirmation.element]} opacity-20 group-hover:opacity-30 transition-opacity`} />
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-15 group-hover:scale-110 transition-all duration-700"
                            style={{
                                backgroundImage: `url(https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3)`
                            }}
                        />
                        <CardContent className="relative z-10 p-8">
                            <div className="text-center space-y-4">
                                <div className="p-3 mx-auto bg-primary-500/20 rounded-full backdrop-blur-md shadow-lg shadow-primary-500/20 w-16 h-16 flex items-center justify-center">
                                    <Heart className="text-primary-500 animate-pulse-subtle" size={32} />
                                </div>
                                <blockquote className="text-2xl font-medium text-white leading-relaxed premium-gradient-text">
                                    "{currentAffirmation.text}"
                                </blockquote>
                                <div className="flex justify-center items-center gap-4 text-sm text-light-3">
                                    <span className="glass-effect-light px-4 py-1.5 rounded-full text-light-2 flex items-center gap-1.5">
                                        <span className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${elementColors[currentAffirmation.element]}`}></span>
                                        {currentAffirmation.element.charAt(0).toUpperCase() + currentAffirmation.element.slice(1)}
                                    </span>
                                    <span className="glass-effect-light px-4 py-1.5 rounded-full text-light-2">
                                        {currentAffirmation.category}
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-center gap-3 pt-6">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={copyAffirmation}
                                        className="flex items-center gap-2 glass-effect-light hover-scale"
                                    >
                                        <Copy size={16} className="text-primary-500" />
                                        <span className="text-light-1">Copy</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={shareAffirmation}
                                        className="flex items-center gap-2 glass-effect-light hover-scale"
                                    >
                                        <Share size={16} className="text-primary-500" />
                                        <span className="text-light-1">Share</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-2 glass-effect-light hover-scale"
                                    >
                                        <Bookmark size={16} className="text-primary-500" />
                                        <span className="text-light-1">Save</span>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Random Affirmation Button */}
                <Button
                    onClick={getNewRandomAffirmation}
                    className="w-full group relative overflow-hidden hover-scale shadow-glow py-6 scroll-snap-child"
                    size="lg"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-90 group-hover:opacity-100 transition-opacity rounded-md"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547149175-a20d24d1c8b4?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity mix-blend-overlay rounded-md"></div>
                    <span className="relative flex items-center justify-center">
                        <span className="absolute -inset-0.5 animate-pulse rounded-lg bg-gradient-to-r from-primary-500 to-accent-1 opacity-30 blur-sm group-hover:opacity-50 transition-opacity"></span>
                        <span className="relative flex items-center justify-center gap-2 text-white font-medium">
                            <Shuffle className="mr-2 animate-pulse-subtle" size={22} />
                            New Affirmation
                        </span>
                    </span>
                </Button>

                {/* Element Filter */}
                <Card className="glass-effect overflow-hidden relative scroll-snap-child">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-700/5"></div>
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Sparkles size={18} className="text-primary-500" />
                            Filter by Element
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant={selectedElement === 'all' ? 'default' : 'outline'}
                                onClick={() => setSelectedElement('all')}
                                size="sm"
                                className={selectedElement === 'all'
                                    ? "glass-effect bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:bg-primary-600 shadow-md shadow-primary-500/20"
                                    : "glass-effect-light hover-scale"
                                }
                            >
                                All Elements
                            </Button>
                            {(['earth', 'water', 'fire', 'air'] as ElementType[]).map((element) => (
                                <Button
                                    key={element}
                                    variant={selectedElement === element ? 'default' : 'outline'}
                                    onClick={() => setSelectedElement(element)}
                                    size="sm"
                                    className={selectedElement === element
                                        ? `glass-effect bg-gradient-to-r ${elementColors[element]} text-white shadow-md`
                                        : "glass-effect-light hover-scale"
                                    }
                                >
                                    <span className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${elementColors[element]} mr-1.5`}></span>
                                    {element.charAt(0).toUpperCase() + element.slice(1)}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Element Video */}
                <Card className="glass-effect overflow-hidden relative scroll-snap-child">
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                        selectedElement === 'earth' ? 'from-amber-500/10 to-orange-600/10' :
                        selectedElement === 'water' ? 'from-blue-500/10 to-cyan-600/10' :
                        selectedElement === 'fire' ? 'from-red-500/10 to-orange-500/10' :
                        selectedElement === 'air' ? 'from-gray-300/10 to-blue-400/10' :
                        'from-primary-500/10 to-purple-600/10'
                    }`}></div>
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <div className={`p-2 rounded-xl bg-gradient-to-r ${
                                selectedElement === 'earth' ? 'from-amber-500 to-orange-600' :
                                selectedElement === 'water' ? 'from-blue-500 to-cyan-600' :
                                selectedElement === 'fire' ? 'from-red-500 to-orange-500' :
                                selectedElement === 'air' ? 'from-gray-300 to-blue-400' :
                                'from-primary-500 to-purple-600'
                            } shadow-lg`}>
                                {selectedElement === 'earth' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>}
                                {selectedElement === 'water' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 22a8 8 0 0 0 8-8c0-5-8-13-8-13S4 9 4 14a8 8 0 0 0 8 8Z"/></svg>}
                                {selectedElement === 'fire' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>}
                                {selectedElement === 'air' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>}
                                {selectedElement === 'all' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 3c.132.323.212.653.212.986 0 1.347-.932 2.436-2.093 2.777V20.5c0 .828.672 1.5 1.5 1.5s1.5-.672 1.5-1.5V7.214c.932-.35 1.693-1.176 1.693-2.228 0-.333-.08-.663-.212-.986"/><path d="M12 3c-.132.323-.212.653-.212.986 0 1.347.932 2.436 2.093 2.777V20.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V7.214c-.932-.35-1.693-1.176-1.693-2.228 0-.333.08-.663.212-.986"/><path d="M20.975 7H3.025a1 1 0 0 0-.707 1.707l8.968 8.968a1 1 0 0 0 1.414 0l8.968-8.968A1 1 0 0 0 20.975 7z"/></svg>}
                            </div>
                            {selectedElement === 'earth' && 'Earth Element Video'}
                            {selectedElement === 'water' && 'Water Element Video'}
                            {selectedElement === 'fire' && 'Fire Element Video'}
                            {selectedElement === 'air' && 'Air Element Video'}
                            {selectedElement === 'all' && 'Elemental Meditation Video'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-video relative overflow-hidden rounded-lg shadow-lg">
                            {isVideoLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-dark-2/80 z-10">
                                    <div className="spinner"></div>
                                </div>
                            )}
                            <iframe
                                ref={videoRef}
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${
                                    selectedElement === 'earth' ? 'WrHmr_m9Qsc' :
                                    selectedElement === 'water' ? 'V-_O7nl0Ii0' :
                                    selectedElement === 'fire' ? 'L_LUpnjgPso' :
                                    selectedElement === 'air' ? 'CyUwzBK-W2c' :
                                    'n4GqIJ0U-Zk'
                                }?enablejsapi=1&origin=${window.location.origin}&autoplay=0&mute=${isMuted ? 1 : 0}`}
                                title={`${selectedElement} element meditation`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                onLoad={handleVideoLoad}
                            ></iframe>
                        </div>
                        <div className="mt-4 flex flex-col space-y-2">
                            <p className="text-white font-medium">
                                {selectedElement === 'earth' && 'Connect with the grounding energy of the earth element'}
                                {selectedElement === 'water' && 'Immerse yourself in the flowing energy of water'}
                                {selectedElement === 'fire' && 'Harness the transformative power of the fire element'}
                                {selectedElement === 'air' && 'Breathe with the freedom and clarity of the air element'}
                                {selectedElement === 'all' && 'A balanced meditation connecting with all four elemental energies'}
                            </p>
                            <p className="text-light-3 text-sm">
                                Watch this video meditation to connect more deeply with the {selectedElement} element and enhance your affirmation practice.
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg> : 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> : 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                    }
                                    <span className="text-light-1">{isVideoPlaying ? "Pause" : "Play"}</span>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Affirmations Library */}
                <Card className="glass-effect overflow-hidden relative scroll-snap-child">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-700/5"></div>
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Star size={18} className="text-gold-1" />
                            Affirmations Library
                        </CardTitle>
                    </CardHeader>
                    <CardContent
                        className="space-y-3 max-h-[500px] overflow-y-auto will-change-scroll overscroll-behavior-contain pr-4 affirmations-page affirmations-scrollbar"
                        style={{
                            WebkitOverflowScrolling: 'touch',
                            scrollBehavior: 'smooth',
                            backfaceVisibility: 'hidden',
                            perspective: '1000px',
                            transform: 'translate3d(0,0,0)'
                        }}>
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-light-2 text-sm">{filteredAffirmations.length} affirmations found</p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="glass-effect-light hover-scale"
                                onClick={() => getNewRandomAffirmation()}
                            >
                                <Shuffle size={14} className="mr-2 text-primary-500" />
                                Shuffle
                            </Button>
                        </div>

                        {filteredAffirmations.map((affirmation) => (
                            <div
                                key={affirmation.id}
                                onClick={() => {
                                    setCurrentAffirmation(affirmation);
                                    // Smooth scroll to top after selection
                                    if (scrollContainerRef.current) {
                                        scrollContainerRef.current.scrollTo({
                                            top: 0,
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                                className="p-4 glass-card cursor-pointer hover-scale-subtle transition-all relative overflow-hidden group mb-3 touch-manipulation"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r ${elementColors[affirmation.element]} opacity-5 group-hover:opacity-15 transition-opacity`} />
                                <p className="text-white mb-3 group-hover:text-primary-300 transition-colors">"{affirmation.text}"</p>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="glass-effect-light px-2 py-1 rounded-full text-light-2 text-xs flex items-center gap-1">
                                        <span className={`inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r ${elementColors[affirmation.element]}`}></span>
                                        <span className="capitalize">{affirmation.element}</span>
                                    </span>
                                    <span className="text-light-3">{affirmation.category}</span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Benefits Card */}
                <Card className="glass-effect overflow-hidden relative group hover-scale-subtle scroll-snap-child">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-1/5 to-accent-2/5 group-hover:from-accent-1/10 group-hover:to-accent-2/10 transition-all"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center group-hover:opacity-10 transition-opacity"></div>
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Sparkles size={18} className="text-accent-1" />
                            Benefits of Affirmations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-1 mt-2"></div>
                                <span className="text-light-2 text-sm">Boost positive thinking and overcome negative thoughts</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-1 mt-2"></div>
                                <span className="text-light-2 text-sm">Improve self-confidence and self-esteem</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-1 mt-2"></div>
                                <span className="text-light-2 text-sm">Reduce stress and anxiety by focusing on positive outcomes</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-1 mt-2"></div>
                                <span className="text-light-2 text-sm">Create new neural pathways for more positive thoughts</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* How to Use Affirmations */}
                <Card className="glass-effect overflow-hidden relative group hover-scale-subtle scroll-snap-child">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-indigo-500/5 to-blue-500/5 group-hover:from-primary-500/10 group-hover:to-blue-500/10 transition-all"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3')] opacity-5 bg-cover bg-center group-hover:opacity-10 transition-opacity"></div>
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Sparkles size={18} className="text-primary-500" />
                            How to Use Affirmations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex gap-3 items-start">
                                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-500/20 text-primary-500 font-medium flex-shrink-0">1</div>
                                <div>
                                    <h3 className="text-white text-base font-medium mb-1">Practice Daily</h3>
                                    <p className="text-light-2 text-sm">Consistency is key. Try to read your affirmations at the same time each day.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-500/20 text-primary-500 font-medium flex-shrink-0">2</div>
                                <div>
                                    <h3 className="text-white text-base font-medium mb-1">Speak with Feeling</h3>
                                    <p className="text-light-2 text-sm">Say your affirmations with emotion and belief. Feel the words as you speak them.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-500/20 text-primary-500 font-medium flex-shrink-0">3</div>
                                <div>
                                    <h3 className="text-white text-base font-medium mb-1">Present Tense</h3>
                                    <p className="text-light-2 text-sm">Use affirmations that are in the present tense, as if they are already true.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Create Your Own Affirmation */}
                <Card className="glass-effect overflow-hidden relative group hover-scale-subtle mt-6 scroll-snap-child">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 group-hover:from-indigo-500/10 group-hover:to-pink-500/10 transition-all"></div>
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Star size={18} className="text-indigo-400" />
                            Daily Affirmation Practice
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="p-5 glass-effect-light rounded-xl">
                            <p className="text-light-1 text-center italic mb-4">
                                "I am worthy of joy, peace, and all good things that come my way today."
                            </p>
                            <div className="flex justify-center gap-4 text-xs">
                                <span className="bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full">Morning</span>
                                <span className="bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full">Self-love</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Elemental Affirmations Categories */}
                <Card className="glass-effect overflow-hidden relative group hover-scale-subtle scroll-snap-child">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 group-hover:from-green-500/10 group-hover:to-blue-500/10 transition-all"></div>
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Star size={18} className="text-green-400" />
                            Elemental Affirmation Categories
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 glass-card hover-scale-subtle transition-all relative overflow-hidden">
                                <h3 className="text-base font-medium text-white mb-2">Earth</h3>
                                <p className="text-light-2 text-sm">Grounding, stability, abundance, and physical well-being</p>
                            </div>
                            <div className="p-4 glass-card hover-scale-subtle transition-all relative overflow-hidden">
                                <h3 className="text-base font-medium text-white mb-2">Water</h3>
                                <p className="text-light-2 text-sm">Emotions, intuition, healing, and deep connections</p>
                            </div>
                            <div className="p-4 glass-card hover-scale-subtle transition-all relative overflow-hidden">
                                <h3 className="text-base font-medium text-white mb-2">Fire</h3>
                                <p className="text-light-2 text-sm">Passion, transformation, energy, and motivation</p>
                            </div>
                            <div className="p-4 glass-card hover-scale-subtle transition-all relative overflow-hidden">
                                <h3 className="text-base font-medium text-white mb-2">Air</h3>
                                <p className="text-light-2 text-sm">Mental clarity, communication, freedom, and new ideas</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Popular Affirmation Topics */}
                <Card className="glass-effect overflow-hidden relative group hover-scale-subtle scroll-snap-child mb-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all"></div>
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Star size={18} className="text-purple-400" />
                            Popular Affirmation Topics
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "Self-Love", "Abundance", "Health", "Confidence",
                                "Creativity", "Success", "Healing", "Peace",
                                "Joy", "Gratitude", "Resilience", "Courage"
                            ].map((topic, index) => (
                                <div key={index} className="px-4 py-2 rounded-full glass-card hover-scale-subtle transition-all">
                                    <span className="text-light-1">{topic}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AffirmationsPage;
