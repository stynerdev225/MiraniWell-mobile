import { useState, useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useUpdateUser } from "@/lib/react-query/queries";
import { toast } from "@/components/ui/use-toast";
import { Loader } from "@/components/shared";
import { createStripeCheckoutSession } from "@/lib/stripe";
import { useNavigate } from "react-router-dom";

// Mock course content for each day
const courseContent = [
    {
        day: 1,
        title: "Introduction to Mind, Body, Spirit",
        content: "Welcome to the first day of your journey. Today we'll explore the connection between mind, body, and spirit.",
        videoUrl: "https://www.youtube.com/embed/LWGSwfchz_A?autoplay=0&rel=0&modestbranding=1", // Updated working yoga/meditation video
    },
    {
        day: 2,
        title: "The Power of Meditation",
        content: "Learn how daily meditation can transform your mental state and improve overall wellbeing.",
        videoUrl: "https://www.youtube.com/embed/lDZGl9Wdc7Y", // Meditation Practices
    },
    {
        day: 3,
        title: "Physical Wellness Practices",
        content: "Discover simple physical practices that enhance your body's natural energy flow.",
        videoUrl: "https://www.youtube.com/embed/9kJQBeD5-9U", // Physical Wellness
    },
    {
        day: 4,
        title: "Spiritual Connection",
        content: "Explore techniques to develop a deeper spiritual awareness in your daily life.",
        videoUrl: "https://www.youtube.com/embed/8GtTyC53kjU", // Spiritual Growth
    },
    {
        day: 5,
        title: "Integration: Mind and Body",
        content: "Learn how your thoughts directly influence your physical wellbeing and how to harness this connection.",
        videoUrl: "https://www.youtube.com/embed/XiVVYl2kZ68", // Integration Practices
    },
    {
        day: 6,
        title: "Integration: Body and Spirit",
        content: "Discover practices that connect physical movement with spiritual growth.",
        videoUrl: "https://www.youtube.com/embed/inpok4MKVLM", // Body-Spirit Connection
    },
    {
        day: 7,
        title: "Complete Integration",
        content: "On this final day of the free trial, learn how to bring all aspects together for holistic wellbeing.",
        videoUrl: "https://www.youtube.com/embed/a0JlQNryh-o", // Complete Integration
        homework: "Reflection: Write about your experience with the 7-day trial and how you plan to integrate these practices into your daily life."
    }
];

const MindBodySpirit = () => {
    const navigate = useNavigate();
    const { user, setUser } = useUserContext();
    const [currentDay, setCurrentDay] = useState(1);
    const [homeworkText, setHomeworkText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Modal video player state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalVideoUrl, setModalVideoUrl] = useState("");

    // Video progress tracking (simulated for demo)
    const [videoProgress, setVideoProgress] = useState(45); // 0 to 100 percent

    const { mutate: updateUser } = useUpdateUser();

    useEffect(() => {
        // If user hasn't started the trial, start it now
        if (!user.isCourseUser) {
            startTrial();
        } else if (user.trialStartDate) {
            calculateCurrentDay();
        }
    }, [user.id, user.isCourseUser, user.trialStartDate]); // Only depend on these properties to avoid unnecessary recalculations

    // Update dynamic styles
    useEffect(() => {
        // Update progress bar width
        const progressBar = document.querySelector('[data-progress]');
        if (progressBar) {
            const progressElement = progressBar as HTMLElement;
            progressElement.style.width = `${(currentDay / 7) * 100}%`;
        }

        // Update video progress bar
        const videoProgressBar = document.querySelector('[data-width]');
        if (videoProgressBar) {
            const videoProgressElement = videoProgressBar as HTMLElement;
            videoProgressElement.style.width = `${videoProgress}%`;
        }

        // Update video seek handle position
        const seekHandle = document.querySelector('[data-left]');
        if (seekHandle) {
            const seekHandleElement = seekHandle as HTMLElement;
            seekHandleElement.style.left = `${videoProgress}%`;
        }
    }, [currentDay, videoProgress]);

    const startTrial = () => {
        setIsLoading(true);

        const today = new Date().toISOString();

        updateUser(
            {
                userId: user.id,
                name: user.name,
                bio: user.bio,
                imageId: "",
                imageUrl: user.imageUrl,
                file: [],
                isCourseUser: true,
                trialStartDate: today,
                isTrialActive: true,
                hasPaid: false
            },
            {
                onSuccess: () => {
                    setUser({
                        ...user,
                        isCourseUser: true,
                        trialStartDate: today,
                        isTrialActive: true,
                        hasPaid: false
                    });
                    toast({
                        title: "Trial started!",
                        description: "Your 7-day free trial has begun. Enjoy the journey!"
                    });
                    setIsLoading(false);
                },
                onError: (error) => {
                    toast({
                        title: "Error starting trial",
                        description: "Please try again later.",
                        variant: "destructive"
                    });
                    setIsLoading(false);
                    console.log("Error updating user: ", error);
                }
            }
        );
    };

    const calculateCurrentDay = () => {
        if (!user.trialStartDate) return 1;

        const startDate = new Date(user.trialStartDate);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Cap at day 7 for the trial
        const calculatedDay = Math.min(diffDays, 7);
        setCurrentDay(calculatedDay);

        // Only auto-update trial status if it's expired (7 days) and still marked as active
        // Otherwise, respect the user's choice to pause/resume the trial
        const isExpired = diffDays > 7 && !user.hasPaid;
        if (isExpired && user.isTrialActive) {
            updateUser(
                {
                    userId: user.id,
                    name: user.name,
                    bio: user.bio,
                    imageId: "",
                    imageUrl: user.imageUrl,
                    file: [],
                    isTrialActive: false
                },
                {
                    onSuccess: () => {
                        setUser(prevUser => ({ ...prevUser, isTrialActive: false }));
                        toast({
                            title: "Trial Ended",
                            description: "Your 7-day free trial has ended. Subscribe to continue accessing premium content.",
                            variant: "default",
                            className: "bg-amber-800 border border-amber-600",
                        });
                    }
                }
            );
        }
    };

    const toggleTrialStatus = () => {
        // Prevent multiple clicks while processing
        if (isLoading) return;

        setIsLoading(true);

        // Immediately update UI to prevent flickering
        const newTrialStatus = !user.isTrialActive;
        console.log("Toggling trial status from", user.isTrialActive, "to", newTrialStatus);

        // Update local state immediately to prevent UI flickering
        setUser(prevUser => ({ ...prevUser, isTrialActive: newTrialStatus }));

        updateUser(
            {
                userId: user.id,
                name: user.name,
                bio: user.bio,
                imageId: "",
                imageUrl: user.imageUrl,
                file: [],
                isTrialActive: newTrialStatus
            },
            {
                onSuccess: () => {
                    // Toast notification after server update is successful
                    if (newTrialStatus) {
                        toast({
                            title: "Trial Resumed!",
                            description: "Your 7-day trial is now active. Days remaining will continue to count down.",
                            variant: "default",
                            className: "bg-green-800 border border-green-600",
                        });
                    } else {
                        toast({
                            title: "Trial Paused!",
                            description: "Your trial has been paused. The 7-day countdown is now on hold until you resume.",
                            variant: "default",
                            className: "bg-amber-800 border border-amber-600",
                        });
                    }
                    setIsLoading(false);
                },
                onError: (error) => {
                    // Revert the UI state if server update fails
                    setUser(prevUser => ({ ...prevUser, isTrialActive: !newTrialStatus }));

                    toast({
                        title: "Error updating trial status",
                        description: "Please try again later.",
                        variant: "destructive"
                    });
                    setIsLoading(false);
                    console.log("Error updating trial status: ", error);
                }
            }
        );
    };

    const submitHomework = () => {
        setIsLoading(true);
        updateUser(
            {
                userId: user.id,
                name: user.name,
                bio: user.bio,
                imageId: "",
                imageUrl: user.imageUrl,
                file: [],
                homeworkSubmission: homeworkText
            },
            {
                onSuccess: () => {
                    setUser({ ...user, homeworkSubmission: homeworkText });
                    toast({
                        title: "Homework submitted!",
                        description: "Thank you for your reflection."
                    });
                    setIsLoading(false);
                },
                onError: () => {
                    toast({
                        title: "Error submitting homework",
                        description: "Please try again later.",
                        variant: "destructive"
                    });
                    setIsLoading(false);
                }
            }
        );
    };

    const initiatePayment = async () => {
        setIsLoading(true);

        try {
            // Create a checkout session with Stripe
            const session = await createStripeCheckoutSession(user.id);

            if (session?.url) {
                // In a real app with Stripe, this would redirect to Stripe's checkout page
                // For our mock implementation, we'll navigate to our mock checkout page
                navigate(session.url);
            } else {
                toast({
                    title: "Error",
                    description: "Could not initiate payment process. Please try again.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Payment initiation error:", error);
            toast({
                title: "Payment Error",
                description: "An error occurred while initiating payment.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Format time for video player (e.g., 125 seconds -> 2:05)
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    // Simulate a video seek function
    const handleVideoSeek = (percent: number): void => {
        setVideoProgress(percent);
        // In a real implementation, this would seek the video to the position
        console.log(`Seeking video to ${percent}%`);
    };

    // Get today's course content
    const todayContent = courseContent[currentDay - 1] || courseContent[0];

    // Only show loader on initial page load, not during trial toggles
    if (isLoading && !user.id) return <Loader />;

    return (
        <div className="flex flex-1">
            <div className="common-container">
                <div className="max-w-5xl flex-1 items-center justify-start gap-3 flex-col md:justify-center w-full">
                    {/* Hero Welcome Section */}
                    <section className="relative w-full rounded-lg overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-purple-900 to-indigo-800 w-full h-64 md:h-80 relative">
                            <div className="absolute inset-0 bg-[url('/assets/icons/yoga_7607959%20Background%20Removed.png')] bg-no-repeat bg-right-bottom bg-contain opacity-20"></div>
                            <div className="absolute inset-0 flex flex-col justify-center p-8">
                                <h1 className="h1-bold text-white mb-4">Welcome to Mind Body Spirit</h1>
                                <p className="text-xl text-light-1 max-w-lg mb-6">
                                    Begin your journey toward balance, wellness, and inner peace with our comprehensive course.
                                </p>
                                <div className="flex items-center gap-3 flex-wrap">
                                    {user.hasPaid ? (
                                        <span className="bg-primary-500 text-light-1 px-4 py-2 rounded-full text-base font-medium flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 6 9 17l-5-5" />
                                            </svg>
                                            Premium Member
                                        </span>
                                    ) : user.isTrialActive ? (
                                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                            <span className="bg-green-700 text-light-1 px-4 py-2 rounded-full text-base font-medium flex items-center gap-2 border-2 border-green-500 shadow-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300">
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                </svg>
                                                <span className="relative">
                                                    Trial Active
                                                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                    </span>
                                                </span>
                                            </span>
                                            <p className="text-light-2 text-sm md:text-base font-medium">
                                                Day {currentDay} of 7 {!user.hasPaid && currentDay >= 7 ? "(Trial Complete)" : ""}
                                            </p>
                                        </div>
                                    ) : (
                                        <span className="bg-gray-700 border-2 border-gray-500 text-gray-300 px-4 py-2 rounded-full text-base font-medium flex items-center gap-2 shadow-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="8" y1="15" x2="16" y2="9"></line>
                                            </svg>
                                            Trial Paused
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col gap-8 w-full">
                        {/* Trial Progress */}
                        <div className="bg-dark-3 p-5 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="h4-medium flex items-center gap-2">
                                    Your Progress
                                    {!user.isTrialActive && !user.hasPaid && (
                                        <span className="bg-amber-600 text-white text-xs px-2 py-1 rounded-md animate-pulse">
                                            PAUSED
                                        </span>
                                    )}
                                </h3>
                                <div className="flex items-center gap-2">
                                    {user.hasPaid ? (
                                        <span className="bg-primary-500 text-light-1 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 6 9 17l-5-5" />
                                            </svg>
                                            Premium Member
                                        </span>
                                    ) : user.isTrialActive ? (
                                        <>
                                            <span className="bg-green-700 text-light-1 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-green-500">
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                Trial Active
                                            </span>
                                            <button
                                                onClick={() => toggleTrialStatus()}
                                                className="bg-amber-600 hover:bg-amber-700 text-light-1 px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1"
                                                disabled={isLoading}
                                                title="Pause your trial - your 7-day access is only counted when the trial is active"
                                                aria-label="Pause Trial"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="6" y="4" width="4" height="16" />
                                                    <rect x="14" y="4" width="4" height="16" />
                                                </svg>
                                                {isLoading ? "Processing..." : "Pause Trial"}
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="8" y1="15" x2="16" y2="9"></line>
                                                </svg>
                                                Trial Paused
                                            </span>
                                            <button
                                                onClick={() => toggleTrialStatus()}
                                                className="bg-green-600 hover:bg-green-700 text-light-1 px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1 border border-green-500"
                                                disabled={isLoading}
                                                title="Resume your trial to continue your learning journey"
                                                aria-label="Resume Trial"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                </svg>
                                                {isLoading ? "Processing..." : "Resume Trial"}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-dark-4 rounded-full h-4 mb-2 relative">
                                <div
                                    className={`${user.isTrialActive ? 'bg-primary-500' : 'bg-gray-600'} h-4 rounded-full transition-all duration-500 ease-in-out ${user.isTrialActive ? '' : 'opacity-50'}`}
                                    data-progress={`${(currentDay / 7) * 100}%`}
                                >
                                    {user.isTrialActive && (
                                        <div className="absolute right-0 top-0 h-full w-1 bg-white opacity-60"></div>
                                    )}
                                </div>
                                {!user.isTrialActive && !user.hasPaid && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xs text-white px-2 py-0.5 bg-amber-600 rounded-sm font-medium">TRIAL PAUSED</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between">
                                <p className="text-light-2 text-sm font-medium flex items-center gap-2">
                                    Day {currentDay} of 7
                                    {!user.hasPaid && currentDay >= 7 ? (
                                        <span className="bg-amber-600 text-white text-xs px-2 py-0.5 rounded">Trial Complete</span>
                                    ) : user.isTrialActive ? (
                                        <span className="text-green-400 text-xs">Active</span>
                                    ) : (
                                        <span className="text-amber-400 text-xs flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="6" y="4" width="4" height="16" />
                                                <rect x="14" y="4" width="4" height="16" />
                                            </svg>
                                            Paused
                                        </span>
                                    )}
                                </p>
                                {!user.hasPaid && !user.isTrialActive && (
                                    <span className="text-xs text-amber-400">Time remaining will not decrease while paused</span>
                                )}
                            </div>

                            {/* Trial status explanation */}
                            {!user.hasPaid && (
                                <div className={`mt-4 p-4 rounded-lg border ${user.isTrialActive ? 'bg-green-900/20 border-green-700' : 'bg-gray-800/30 border-gray-600'}`}>
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-full ${user.isTrialActive ? 'bg-green-800' : 'bg-gray-700'} mt-1`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-base font-medium text-white mb-2">
                                                {user.isTrialActive ? 'Your 7-Day Trial is Currently Active' : 'Your Trial is Currently Paused'}
                                            </h4>
                                            <p className="text-light-2 text-sm mb-2">
                                                {user.isTrialActive
                                                    ? 'You have full access to all course content while your trial is active. The trial timer counts down each day until the end of your 7-day period.'
                                                    : 'While your trial is paused, the 7-day countdown stops. You can resume your trial at any time to continue your learning journey.'}
                                            </p>
                                            <div className="bg-dark-3 p-3 rounded-lg">
                                                <div className="flex items-start gap-3 mb-2">
                                                    <div className={`mt-0.5 ${user.isTrialActive ? 'text-green-400' : 'text-amber-400'}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="m9 18 6-6-6-6" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-xs text-light-2">
                                                        {user.isTrialActive
                                                            ? 'You can pause your trial at any time and resume later.'
                                                            : 'Resume your trial to continue accessing course videos and materials.'}
                                                    </p>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className={`mt-0.5 ${user.isTrialActive ? 'text-green-400' : 'text-amber-400'}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="m9 18 6-6-6-6" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-xs text-light-2">
                                                        {user.isTrialActive
                                                            ? 'Trial days count down only when your trial is active.'
                                                            : 'Your trial progress is saved while paused - you won\'t lose any progress.'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Course Content */}
                        </div>

                        {/* Course Content */}
                        <div className="bg-dark-3 p-5 rounded-lg">
                            <h2 className="h3-bold mb-3">{todayContent.title}</h2>
                            <p className="text-light-2 mb-5">{todayContent.content}</p>

                            {/* Video content with custom progress */}
                            <div className="mb-5">
                                <h3 className="h4-medium mb-2">Today's Lesson: {todayContent.title}</h3>
                                <div className="relative">
                                    <div className="aspect-w-16 aspect-h-9">
                                        <iframe
                                            className="w-full h-64 md:h-96 rounded-lg"
                                            src={todayContent.videoUrl}
                                            title={todayContent.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            id="courseVideo"
                                            onLoad={() => {
                                                // This is where we would initialize video tracking functionality
                                                // For a real implementation this would use postMessage API to communicate with the iframe
                                                console.log("Video loaded");
                                            }}
                                        ></iframe>
                                    </div>

                                    {/* Custom video progress bar */}
                                    <div className="mt-3">
                                        <div className="flex justify-between text-light-3 text-xs mb-1">
                                            <span>{formatTime(videoProgress * 6)}</span>
                                            <span>10:00</span>
                                        </div>
                                        <div
                                            className="w-full bg-dark-4 rounded-full h-3 relative cursor-pointer"
                                            onClick={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const x = e.clientX - rect.left;
                                                const percentage = Math.min(Math.max(x / rect.width * 100, 0), 100);
                                                handleVideoSeek(percentage);
                                            }}
                                        >
                                            {/* Video progress animation */}
                                            <div
                                                className="bg-primary-500 h-3 rounded-full relative overflow-hidden"
                                                data-width={`${videoProgress}%`}
                                            >
                                                <div className="absolute top-0 right-0 bg-white w-2 h-full opacity-50"></div>
                                            </div>
                                            {/* Interactive seek handle */}
                                            <div
                                                className="absolute top-1/2 transform -translate-y-1/2"
                                                data-left={`${videoProgress}%`}
                                            >
                                                <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex gap-3">
                                                <button
                                                    className="text-light-1 hover:text-primary-500 transition"
                                                    onClick={() => console.log("Play/Pause clicked")}
                                                    title="Play/Pause video"
                                                    aria-label="Play/Pause video"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                    </svg>
                                                </button>
                                                <button
                                                    className="text-light-1 hover:text-primary-500 transition"
                                                    onClick={() => console.log("Volume clicked")}
                                                    title="Volume control"
                                                    aria-label="Volume control"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="text-light-1 text-sm">
                                                {formatTime(videoProgress * 6)} / 10:00
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Resources section - styled like the image shown */}
                            <div className="mt-8 mb-8">
                                <h3 className="h4-medium mb-4">Course Resources</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Resources links styled like in the image */}
                                    <a href="#" className="flex items-center gap-4 p-4 bg-dark-2 rounded-lg transition-all hover:bg-dark-4">
                                        <div className="bg-blue-600 p-2 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                <polyline points="14 2 14 8 20 8"></polyline>
                                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                                <line x1="10" y1="9" x2="8" y2="9"></line>
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-base font-medium text-white">Meditation Guide</h4>
                                            <p className="text-sm text-light-3">Printable PDF meditation techniques</p>
                                        </div>
                                        <div className="text-blue-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </div>
                                    </a>
                                    <a href="#" className="flex items-center gap-4 p-4 bg-dark-2 rounded-lg transition-all hover:bg-dark-4">
                                        <div className="bg-purple-600 p-2 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-base font-medium text-white">Community Forum</h4>
                                            <p className="text-sm text-light-3">Connect with fellow students</p>
                                        </div>
                                        <div className="text-blue-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </div>
                                    </a>
                                    <a href="#" className="flex items-center gap-4 p-4 bg-dark-2 rounded-lg transition-all hover:bg-dark-4">
                                        <div className="bg-green-600 p-2 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                                <line x1="12" y1="17" x2="12" y2="21"></line>
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-base font-medium text-white">Live Webinar</h4>
                                            <p className="text-sm text-light-3">Weekly live sessions with experts</p>
                                        </div>
                                        <div className="text-blue-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </div>
                                    </a>
                                    <a href="#" className="flex items-center gap-4 p-4 bg-dark-2 rounded-lg transition-all hover:bg-dark-4">
                                        <div className="bg-amber-600 p-2 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                <polyline points="22,6 12,13 2,6"></polyline>
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-base font-medium text-white">Email Support</h4>
                                            <p className="text-sm text-light-3">Get help from our coaches</p>
                                        </div>
                                        <div className="text-blue-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Subscription CTA */}
                            <div className="rounded-xl overflow-hidden mb-8">
                                <div className="relative bg-gradient-to-r from-indigo-900 to-purple-900 p-8">
                                    <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="#FFFFFF" d="M47.1,-51.9C60.3,-40.9,69.9,-24.1,71.5,-6.5C73.1,11,66.8,29.2,54.8,41.2C42.9,53.2,25.3,58.8,8.9,58.4C-7.5,58,-23.9,51.5,-36,41.3C-48.2,31,-56.2,17,-59.3,1.1C-62.5,-14.8,-60.8,-32.7,-50.9,-44C-41.1,-55.3,-23.3,-60.1,-5.7,-54.8C11.8,-49.5,33.9,-34.1,47.1,-51.9Z" transform="translate(100 100)" />
                                        </svg>
                                    </div>
                                    <div className="relative z-10">
                                        <h2 className="text-2xl font-bold text-white mb-4">Unlock Your Personalized Learning Journey</h2>
                                        <p className="text-light-1 mb-6 max-w-lg">Join our premium community to access personalized learning paths, one-on-one coaching sessions, and exclusive workshops designed to accelerate your growth.</p>
                                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                                            <Button
                                                className="bg-white text-purple-900 hover:bg-gray-100 h-12 px-6 font-medium rounded-full"
                                                onClick={initiatePayment}
                                                disabled={isLoading || user.hasPaid}
                                            >
                                                {user.hasPaid ? 'Already Subscribed' : isLoading ? 'Processing...' : 'Subscribe Now'}
                                            </Button>
                                            <a href="#" className="text-white hover:underline font-medium flex items-center gap-2">
                                                Learn More
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Vertical Course Outline */}
                            <div className="mb-8">
                                <h3 className="h4-medium mb-5">Complete Course Outline</h3>
                                <div className="relative">
                                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary-500"></div>
                                    <div className="space-y-8">
                                        {/* Module 1 */}
                                        <div className="relative flex items-start gap-5">
                                            <div className="absolute top-0 left-6 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full"></div>
                                            <div className="w-12 text-center pt-2 text-light-3 text-xs">
                                                <div className="font-medium">01</div>
                                            </div>
                                            <div className="flex-1 bg-dark-2 p-5 rounded-xl">
                                                <div className="flex flex-row">
                                                    {/* Left content area (2/3 width) */}
                                                    <div className="flex-1 pr-4">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="bg-indigo-600 p-2 rounded-full">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                                    <path d="M5.8 11.3a4 4 0 0 0 1.5 7.7H8"></path>
                                                                    <path d="M19 7.3a4 4 0 0 0-1.5-3 4 4 0 0 0-4.9 0 4 4 0 0 0-1.5 3 7 7 0 0 0 .9 3.9 10 10 0 0 1 .9 5.8"></path>
                                                                    <path d="M9.1 21a7 7 0 0 0 13.8 0 4 4 0 0 0-3.9-4 4 4 0 0 0-1.1 7.9"></path>
                                                                </svg>
                                                            </div>
                                                            <h4 className="text-lg font-medium text-white">Foundations of Mind, Body & Spirit</h4>
                                                        </div>
                                                        <p className="text-light-2 mb-3 text-sm">Understanding the interconnected nature of our existence and the principles of holistic wellness.</p>
                                                        <p className="text-light-2 mb-4 text-sm">Learn how your mind, body, and spirit work together as a unified system. This module explores the fundamental concepts that will guide your entire journey toward holistic wellbeing.</p>
                                                        <div className="flex items-center gap-2 mt-3">
                                                            <svg className="text-primary-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="12 6 12 12 16 14" />
                                                            </svg>
                                                            <span className="text-sm text-light-3">3.5 hours</span>
                                                        </div>
                                                    </div>

                                                    {/* Right preview video area (1/3 width) */}
                                                    <div className="w-1/3">
                                                        <div
                                                            className="w-full relative overflow-hidden rounded-lg cursor-pointer group border border-dark-4"
                                                            onClick={() => {
                                                                setIsModalOpen(true);
                                                                setModalVideoUrl("https://www.youtube.com/embed/inpok4MKVLM?autoplay=1&rel=0&modestbranding=1");
                                                            }}
                                                        >
                                                            <div className="relative aspect-video bg-dark-4 rounded-md overflow-hidden">
                                                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 to-dark-4 opacity-70"></div>
                                                                <img
                                                                    src="https://img.youtube.com/vi/inpok4MKVLM/mqdefault.jpg"
                                                                    alt="Video thumbnail"
                                                                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <div className="bg-primary-500 rounded-full p-2 shadow-lg flex items-center justify-center">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="absolute inset-0 flex flex-col justify-end p-3">
                                                                    <div className="flex flex-col items-start max-w-[70%] z-10">
                                                                        <div className="text-xs text-light-2 mb-1">Preview (3:10)</div>
                                                                        <div className="text-xs text-primary-500 font-medium">Watch introduction to meditation and mindfulness</div>
                                                                    </div>
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-1 to-transparent pointer-events-none"></div>
                                                                </div>
                                                            </div>
                                                            <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Module 2 */}
                                        <div className="relative flex items-start gap-5">
                                            <div className="absolute top-0 left-6 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full"></div>
                                            <div className="w-12 text-center pt-2 text-light-3 text-xs">
                                                <div className="font-medium">02</div>
                                            </div>
                                            <div className="flex-1 bg-dark-2 p-5 rounded-xl">
                                                <div className="flex flex-row">
                                                    {/* Left content area (2/3 width) */}
                                                    <div className="flex-1 pr-4">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="bg-purple-600 p-2 rounded-full">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                                                </svg>
                                                            </div>
                                                            <h4 className="text-lg font-medium text-white">Meditation Practices</h4>
                                                        </div>
                                                        <p className="text-light-2 mb-3 text-sm">Learn various meditation techniques to calm your mind and enhance focus and awareness.</p>
                                                        <p className="text-light-2 mb-4 text-sm">Discover how different meditation styles can transform your mental state. This module guides you through practical techniques that calm anxiety, improve focus, and cultivate mindfulness for daily living.</p>
                                                        <div className="flex items-center gap-2 mt-3">
                                                            <svg className="text-primary-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="12 6 12 12 16 14" />
                                                            </svg>
                                                            <span className="text-sm text-light-3">4 hours</span>
                                                        </div>
                                                    </div>

                                                    {/* Right preview video area (1/3 width) */}
                                                    <div className="w-1/3">
                                                        <div
                                                            className="w-full relative overflow-hidden rounded-lg cursor-pointer group border border-dark-4"
                                                            onClick={() => {
                                                                setIsModalOpen(true);
                                                                setModalVideoUrl("https://www.youtube.com/embed/ZToicYcHIOU");
                                                            }}
                                                        >
                                                            <div className="relative aspect-video bg-dark-4 rounded-md overflow-hidden">
                                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-dark-4 opacity-70"></div>
                                                                <img
                                                                    src="https://img.youtube.com/vi/ZToicYcHIOU/mqdefault.jpg"
                                                                    alt="Video thumbnail"
                                                                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <div className="bg-primary-500 rounded-full p-2 shadow-lg flex items-center justify-center">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="absolute inset-0 flex flex-col justify-end p-3">
                                                                    <div className="flex flex-col items-start max-w-[70%] z-10">
                                                                        <div className="text-xs text-light-2 mb-1">Preview (2:45)</div>
                                                                        <div className="text-xs text-primary-500 font-medium">Learn meditation techniques for daily practice</div>
                                                                    </div>
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-1 to-transparent pointer-events-none"></div>
                                                                </div>
                                                            </div>
                                                            <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Module 3 */}
                                        <div className="relative flex items-start gap-5">
                                            <div className="absolute top-0 left-6 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full"></div>
                                            <div className="w-12 text-center pt-2 text-light-3 text-xs">
                                                <div className="font-medium">03</div>
                                            </div>
                                            <div className="flex-1 bg-dark-2 p-5 rounded-xl">
                                                <div className="flex flex-row">
                                                    {/* Left content area (2/3 width) */}
                                                    <div className="flex-1 pr-4">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="bg-teal-600 p-2 rounded-full">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                                    <path d="M16 8l-8 8"></path>
                                                                    <path d="M8 8l8 8"></path>
                                                                    <circle cx="12" cy="12" r="10"></circle>
                                                                </svg>
                                                            </div>
                                                            <h4 className="text-lg font-medium text-white">Physical Wellness</h4>
                                                        </div>
                                                        <p className="text-light-2 mb-3 text-sm">Explore yoga, breathwork, and other physical practices that enhance vitality and body awareness.</p>
                                                        <p className="text-light-2 mb-4 text-sm">Engage your body through movement practices that promote strength, flexibility, and energy flow. This module introduces accessible yoga sequences, breathwork techniques, and somatic awareness exercises for all levels.</p>
                                                        <div className="flex items-center gap-2 mt-3">
                                                            <svg className="text-primary-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="12 6 12 12 16 14" />
                                                            </svg>
                                                            <span className="text-sm text-light-3">5 hours</span>
                                                        </div>
                                                    </div>

                                                    {/* Right preview video area (1/3 width) */}
                                                    <div className="w-1/3">
                                                        <div
                                                            className="w-full relative overflow-hidden rounded-lg cursor-pointer group border border-dark-4"
                                                            onClick={() => {
                                                                setIsModalOpen(true);
                                                                setModalVideoUrl("https://www.youtube.com/embed/9kJQBeD5-9U");
                                                            }}
                                                        >
                                                            <div className="relative aspect-video bg-dark-4 rounded-md overflow-hidden">
                                                                <div className="absolute inset-0 bg-gradient-to-r from-teal-900/30 to-dark-4 opacity-70"></div>
                                                                <img
                                                                    src="https://img.youtube.com/vi/9kJQBeD5-9U/mqdefault.jpg"
                                                                    alt="Video thumbnail"
                                                                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <div className="bg-primary-500 rounded-full p-2 shadow-lg flex items-center justify-center">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="absolute inset-0 flex flex-col justify-end p-3">
                                                                    <div className="flex flex-col items-start max-w-[70%] z-10">
                                                                        <div className="text-xs text-light-2 mb-1">Preview (4:15)</div>
                                                                        <div className="text-xs text-primary-500 font-medium">Discover physical practices for energy flow</div>
                                                                    </div>
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-1 to-transparent pointer-events-none"></div>
                                                                </div>
                                                            </div>
                                                            <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Module 4 */}
                                        <div className="relative flex items-start gap-5">
                                            <div className="absolute top-0 left-6 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full"></div>
                                            <div className="w-12 text-center pt-2 text-light-3 text-xs">
                                                <div className="font-medium">04</div>
                                            </div>
                                            <div className="flex-1 bg-dark-2 p-5 rounded-xl">
                                                <div className="flex flex-row">
                                                    {/* Left content area (2/3 width) */}
                                                    <div className="flex-1 pr-4">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="bg-amber-600 p-2 rounded-full">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                                                    <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                                                                    <path d="M12 2v4"></path>
                                                                    <path d="M12 18v4"></path>
                                                                    <path d="m4.93 4.93 2.83 2.83"></path>
                                                                    <path d="m16.24 16.24 2.83 2.83"></path>
                                                                    <path d="M2 12h4"></path>
                                                                    <path d="M18 12h4"></path>
                                                                    <path d="m4.93 19.07 2.83-2.83"></path>
                                                                    <path d="m16.24 7.76 2.83-2.83"></path>
                                                                </svg>
                                                            </div>
                                                            <h4 className="text-lg font-medium text-white">Spiritual Growth</h4>
                                                        </div>
                                                        <p className="text-light-2 mb-3 text-sm">Develop a deeper connection with your inner self and the world around you through spiritual practices.</p>
                                                        <p className="text-light-2 mb-4 text-sm">Nurture your spiritual dimension regardless of your religious background. This module explores universal practices to develop a personal sense of purpose, connection to something greater, and inner wisdom that guides your life decisions.</p>
                                                        <div className="flex items-center gap-2 mt-3">
                                                            <svg className="text-primary-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="12 6 12 12 16 14" />
                                                            </svg>
                                                            <span className="text-sm text-light-3">4.5 hours</span>
                                                        </div>
                                                    </div>

                                                    {/* Right preview video area (1/3 width) */}
                                                    <div className="w-1/3">
                                                        <div
                                                            className="w-full relative overflow-hidden rounded-lg cursor-pointer group border border-dark-4"
                                                            onClick={() => {
                                                                setIsModalOpen(true);
                                                                setModalVideoUrl("https://www.youtube.com/embed/8GtTyC53kjU");
                                                            }}
                                                        >
                                                            <div className="relative aspect-video bg-dark-4 rounded-md overflow-hidden">
                                                                <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 to-dark-4 opacity-70"></div>
                                                                <img
                                                                    src="https://img.youtube.com/vi/8GtTyC53kjU/mqdefault.jpg"
                                                                    alt="Video thumbnail"
                                                                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <div className="bg-primary-500 rounded-full p-2 shadow-lg flex items-center justify-center">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="absolute inset-0 flex flex-col justify-end p-3">
                                                                    <div className="flex flex-col items-start max-w-[70%] z-10">
                                                                        <div className="text-xs text-light-2 mb-1">Preview (2:50)</div>
                                                                        <div className="text-xs text-primary-500 font-medium">Explore techniques for spiritual awareness</div>
                                                                    </div>
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-1 to-transparent pointer-events-none"></div>
                                                                </div>
                                                            </div>
                                                            <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Module 5 */}
                                        <div className="relative flex items-start gap-5">
                                            <div className="absolute top-0 left-6 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full"></div>
                                            <div className="w-12 text-center pt-2 text-light-3 text-xs">
                                                <div className="font-medium">05</div>
                                            </div>
                                            <div className="flex-1 bg-dark-2 p-5 rounded-xl">
                                                <div className="flex flex-row">
                                                    {/* Left content area (2/3 width) */}
                                                    <div className="flex-1 pr-4">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="bg-green-600 p-2 rounded-full">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                                    <path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
                                                                    <line x1="8" y1="10" x2="16" y2="10"></line>
                                                                    <line x1="8" y1="14" x2="14" y2="14"></line>
                                                                    <line x1="8" y1="18" x2="12" y2="18"></line>
                                                                </svg>
                                                            </div>
                                                            <h4 className="text-lg font-medium text-white">Integration Practices</h4>
                                                        </div>
                                                        <p className="text-light-2 mb-3 text-sm">Learn to integrate these practices into your everyday life for sustained growth and wellbeing.</p>
                                                        <p className="text-light-2 mb-4 text-sm">Transform occasional practices into consistent habits that reshape your daily life. This module provides practical strategies for incorporating mindfulness, movement, and spiritual awareness into your routine, even during busy or challenging periods.</p>
                                                        <div className="flex items-center gap-2 mt-3">
                                                            <svg className="text-primary-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="12 6 12 12 16 14" />
                                                            </svg>
                                                            <span className="text-sm text-light-3">5 hours</span>
                                                        </div>
                                                    </div>

                                                    {/* Right preview video area (1/3 width) */}
                                                    <div className="w-1/3">
                                                        <div
                                                            className="w-full relative overflow-hidden rounded-lg cursor-pointer group border border-dark-4"
                                                            onClick={() => {
                                                                setIsModalOpen(true);
                                                                setModalVideoUrl("https://www.youtube.com/embed/XiVVYl2kZ68");
                                                            }}
                                                        >
                                                            <div className="relative aspect-video bg-dark-4 rounded-md overflow-hidden">
                                                                <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-dark-4 opacity-70"></div>
                                                                <img
                                                                    src="https://img.youtube.com/vi/XiVVYl2kZ68/mqdefault.jpg"
                                                                    alt="Video thumbnail"
                                                                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <div className="bg-primary-500 rounded-full p-2 shadow-lg flex items-center justify-center">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="absolute inset-0 flex flex-col justify-end p-3">
                                                                    <div className="flex flex-col items-start max-w-[70%] z-10">
                                                                        <div className="text-xs text-light-2 mb-1">Preview (3:10)</div>
                                                                        <div className="text-xs text-primary-500 font-medium">Learn how thoughts influence physical wellbeing</div>
                                                                    </div>
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-1 to-transparent pointer-events-none"></div>
                                                                </div>
                                                            </div>
                                                            <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Module 6 */}
                                        <div className="relative flex items-start gap-5">
                                            <div className="absolute top-0 left-6 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full"></div>
                                            <div className="w-12 text-center pt-2 text-light-3 text-xs">
                                                <div className="font-medium">06</div>
                                            </div>
                                            <div className="flex-1 bg-dark-2 p-5 rounded-xl">
                                                <div className="flex flex-row">
                                                    {/* Left content area (2/3 width) */}
                                                    <div className="flex-1 pr-4">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="bg-blue-600 p-2 rounded-full">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                                    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0-3-3 3 3 0 0 0 3-3H6a3 3 0 0 0-3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                                                                </svg>
                                                            </div>
                                                            <h4 className="text-lg font-medium text-white">Mind-Body-Spirit Connection</h4>
                                                        </div>
                                                        <p className="text-light-2 mb-3 text-sm">Master advanced integration techniques and create your personalized holistic wellness plan.</p>
                                                        <p className="text-light-2 mb-4 text-sm">Experience the synergy when mental clarity, physical vitality, and spiritual awareness work in harmony. This module explores the science behind mind-body-spirit connections and guides you through advanced practices that deepen your holistic development.</p>
                                                        <div className="flex items-center gap-2 mt-3">
                                                            <svg className="text-primary-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="12 6 12 12 16 14" />
                                                            </svg>
                                                            <span className="text-sm text-light-3">4 hours</span>
                                                        </div>
                                                    </div>

                                                    {/* Right preview video area (1/3 width) */}
                                                    <div className="w-1/3">
                                                        <div
                                                            className="w-full relative overflow-hidden rounded-lg cursor-pointer group border border-dark-4"
                                                            onClick={() => {
                                                                setIsModalOpen(true);
                                                                setModalVideoUrl("https://www.youtube.com/embed/inpok4MKVLM");
                                                            }}
                                                        >
                                                            <div className="relative aspect-video bg-dark-4 rounded-md overflow-hidden">
                                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-dark-4 opacity-70"></div>
                                                                <img
                                                                    src="https://img.youtube.com/vi/inpok4MKVLM/mqdefault.jpg"
                                                                    alt="Video thumbnail"
                                                                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <div className="bg-primary-500 rounded-full p-2 shadow-lg flex items-center justify-center">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="absolute inset-0 flex flex-col justify-end p-3">
                                                                    <div className="flex flex-col items-start max-w-[70%] z-10">
                                                                        <div className="text-xs text-light-2 mb-1">Preview (2:45)</div>
                                                                        <div className="text-xs text-primary-500 font-medium">Discover practices connecting movement with spirit</div>
                                                                    </div>
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-1 to-transparent pointer-events-none"></div>
                                                                </div>
                                                            </div>
                                                            <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Module 7 */}
                                        <div className="relative flex items-start gap-5">
                                            <div className="absolute top-0 left-6 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full"></div>
                                            <div className="w-12 text-center pt-2 text-light-3 text-xs">
                                                <div className="font-medium">07</div>
                                            </div>
                                            <div className="flex-1 bg-dark-2 p-5 rounded-xl">
                                                <div className="flex flex-row">
                                                    {/* Left content area (2/3 width) */}
                                                    <div className="flex-1 pr-4">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="bg-purple-600 p-2 rounded-full">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                                </svg>
                                                            </div>
                                                            <h4 className="text-lg font-medium text-white">Complete Integration</h4>
                                                        </div>
                                                        <p className="text-light-2 mb-3 text-sm">Bring all aspects of mind, body, and spirit together in this final comprehensive module.</p>
                                                        <p className="text-light-2 mb-4 text-sm">Consolidate your learning and create a sustainable lifelong practice. This capstone module helps you design a personalized wellness blueprint that honors your unique needs, challenges, and aspirations for ongoing growth and balance.</p>
                                                        <div className="flex items-center gap-2 mt-3">
                                                            <svg className="text-primary-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <polyline points="12 6 12 12 16 14" />
                                                            </svg>
                                                            <span className="text-sm text-light-3">6 hours</span>
                                                        </div>
                                                    </div>

                                                    {/* Right preview video area (1/3 width) */}
                                                    <div className="w-1/3">
                                                        <div
                                                            className="w-full relative overflow-hidden rounded-lg cursor-pointer group border border-dark-4"
                                                            onClick={() => {
                                                                setIsModalOpen(true);
                                                                setModalVideoUrl("https://www.youtube.com/embed/a0JlQNryh-o");
                                                            }}
                                                        >
                                                            <div className="relative aspect-video bg-dark-4 rounded-md overflow-hidden">
                                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-dark-4 opacity-70"></div>
                                                                <img
                                                                    src="https://img.youtube.com/vi/a0JlQNryh-o/mqdefault.jpg"
                                                                    alt="Video thumbnail"
                                                                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <div className="bg-primary-500 rounded-full p-2 shadow-lg flex items-center justify-center">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="absolute inset-0 flex flex-col justify-end p-3">
                                                                    <div className="flex flex-col items-start max-w-[70%] z-10">
                                                                        <div className="text-xs text-light-2 mb-1">Preview (3:25)</div>
                                                                        <div className="text-xs text-primary-500 font-medium">Complete integration of mind, body & spirit journey</div>
                                                                    </div>
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-1 to-transparent pointer-events-none"></div>
                                                                </div>
                                                            </div>
                                                            <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Total hours indicator */}
                                        <div className="mt-8 pl-16">
                                            <div className="flex justify-between items-center py-3 px-4 bg-dark-2 rounded-lg border border-primary-500">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-primary-500 p-2 rounded-full">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                            <circle cx="12" cy="12" r="10"></circle>
                                                            <polyline points="12 6 12 12 16 14"></polyline>
                                                        </svg>
                                                    </div>
                                                    <span className="font-bold text-lg text-primary-500">32+ Hours</span>
                                                </div>
                                                <span className="text-light-3">of comprehensive content</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Homework section (Day 7) */}
                            {currentDay === 7 && !user.homeworkSubmission && (
                                <div className="mt-6 border border-dark-4 p-4 rounded-lg">
                                    <h3 className="h4-medium mb-3">Homework Assignment</h3>
                                    <p className="text-light-2 mb-4">{todayContent.homework}</p>
                                    <textarea
                                        className="w-full bg-dark-4 text-light-1 rounded-lg p-3 min-h-32"
                                        placeholder="Write your reflection here..."
                                        value={homeworkText}
                                        onChange={(e) => setHomeworkText(e.target.value)}
                                    />
                                    <Button
                                        className="mt-3"
                                        onClick={submitHomework}
                                        disabled={!homeworkText.trim()}
                                    >
                                        Submit Reflection
                                    </Button>
                                </div>
                            )}

                            {/* Homework already submitted message */}
                            {user.homeworkSubmission && (
                                <div className="mt-6 border border-green-700 p-4 rounded-lg">
                                    <h3 className="h4-medium mb-3 text-green-500">Homework Submitted</h3>
                                    <p className="text-light-2">{user.homeworkSubmission}</p>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="flex flex-col gap-8 w-full">
                        {/* Payment CTA (always show if user hasn't paid) */}
                        {!user.hasPaid && (
                            <div className="bg-gradient-to-br from-dark-3 to-dark-4 p-8 rounded-xl border border-primary-500 shadow-lg">
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="md:w-2/3">
                                        <span className="inline-block bg-purple-900 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">Premium Offer</span>
                                        <h3 className="h2-bold mb-3 text-white">Ready to continue your journey?</h3>
                                        <p className="text-light-2 mb-6 text-lg">
                                            Unlock lifetime access to all content plus monthly 1-on-1 Zoom sessions for personalized guidance.
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div className="flex items-start gap-3">
                                                <div className="text-primary-500 mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                                <p className="text-light-1">Complete library of Mind Body Spirit lessons</p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="text-primary-500 mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                                <p className="text-light-1">Monthly personalized coaching sessions</p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="text-primary-500 mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                                <p className="text-light-1">Access to exclusive member community</p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="text-primary-500 mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                                <p className="text-light-1">New content added regularly</p>
                                            </div>
                                        </div>

                                        <Button
                                            size="lg"
                                            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-6 h-auto font-medium rounded-xl text-lg"
                                            onClick={initiatePayment}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Processing...' : 'Unlock Lifetime Access for $111'}
                                        </Button>
                                    </div>

                                    <div className="md:w-1/3 flex items-center justify-center">
                                        <div className="relative w-48 h-48">
                                            <div className="absolute inset-0 bg-purple-600 rounded-full opacity-20 animate-pulse"></div>
                                            <div className="absolute inset-4 bg-purple-500 rounded-full opacity-40 animate-pulse [animation-delay:300ms]"></div>
                                            <div className="absolute inset-8 bg-purple-400 rounded-full opacity-60 animate-pulse [animation-delay:600ms]"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <img
                                                    src="/assets/icons/yoga_7607959%20Background%20Removed.png"
                                                    alt="Yoga pose"
                                                    className="w-32 h-32 object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>

            {/* Video Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-dark-1 bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-hidden">
                    <div className="relative w-full max-w-4xl mx-auto">
                        {/* Close button */}
                        <div className="absolute -top-12 right-0 md:-right-12 md:top-0">
                            <button
                                className="bg-dark-3 hover:bg-dark-4 text-light-1 rounded-full p-2 transition-colors"
                                onClick={() => setIsModalOpen(false)}
                                title="Close video modal"
                                aria-label="Close video modal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Video container with 16:9 aspect ratio */}
                        <div className="relative pt-[56.25%] bg-dark-4 rounded-lg overflow-hidden shadow-2xl">
                            <iframe
                                src={modalVideoUrl}
                                title="Course Video"
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MindBodySpirit;
