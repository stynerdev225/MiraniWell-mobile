import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { Button, Switch } from "@/components/ui";
import {
    User,
    Settings,
    Bell,
    Shield,
    Moon,
    Globe,
    HelpCircle,
    LogOut,
    ChevronRight,
    Edit3,
    Eye,
    Mail,
    Lock,
    Smartphone,
    Heart,
    Star,
    Trophy,
    Activity
} from "lucide-react";

const ProfileSettings = () => {
    const { user, isLoading } = useUserContext();
    const navigate = useNavigate();
    const { mutate: signOut } = useSignOutAccount();

    // Show loading if user data is not yet available
    if (isLoading) {
        return (
            <div className="flex-center w-full h-full">
                <div className="flex-center flex-col gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                    <p className="text-light-3 text-sm">Loading settings...</p>
                </div>
            </div>
        );
    }

    // Redirect to sign-in if no user
    if (!user || !user.id) {
        navigate("/sign-in");
        return null;
    }

    // Settings state
    const [settings, setSettings] = useState({
        notifications: {
            pushNotifications: true,
            emailNotifications: true,
            wellnessReminders: true,
            socialUpdates: false,
            marketingEmails: false,
        },
        privacy: {
            profileVisibility: true,
            showActivity: true,
            showProgress: false,
        },
        preferences: {
            darkMode: true,
            language: "English",
            autoSave: true,
        }
    });

    const handleSettingChange = (category: string, setting: string, value: boolean) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category as keyof typeof prev],
                [setting]: value
            }
        }));
    };

    const handleSignOut = () => {
        // Add mobile-specific logging
        console.log('📱 Sign out attempt:', {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        });

        signOut();
        navigate("/sign-in");
    };

    const settingsGroups = [
        {
            title: "Account",
            icon: User,
            items: [
                {
                    icon: Edit3,
                    label: "Edit Profile",
                    description: "Update your profile information",
                    action: () => navigate(`/update-profile/${user.id}`),
                    type: "navigation"
                },
                {
                    icon: Eye,
                    label: "Profile Visibility",
                    description: "Control who can see your profile",
                    value: settings.privacy.profileVisibility,
                    onChange: (value: boolean) => handleSettingChange("privacy", "profileVisibility", value),
                    type: "toggle" as const
                },
                {
                    icon: Mail,
                    label: "Change Email",
                    description: "Update your email address",
                    action: () => {/* TODO: Implement email change */ },
                    type: "navigation"
                },
                {
                    icon: Lock,
                    label: "Change Password",
                    description: "Update your password",
                    action: () => {/* TODO: Implement password change */ },
                    type: "navigation"
                }
            ]
        },
        {
            title: "Notifications",
            icon: Bell,
            items: [
                {
                    icon: Smartphone,
                    label: "Push Notifications",
                    description: "Receive notifications on your device",
                    value: settings.notifications.pushNotifications,
                    onChange: (value: boolean) => handleSettingChange("notifications", "pushNotifications", value),
                    type: "toggle"
                },
                {
                    icon: Mail,
                    label: "Email Notifications",
                    description: "Receive updates via email",
                    value: settings.notifications.emailNotifications,
                    onChange: (value: boolean) => handleSettingChange("notifications", "emailNotifications", value),
                    type: "toggle"
                },
                {
                    icon: Heart,
                    label: "Wellness Reminders",
                    description: "Get reminded about your wellness goals",
                    value: settings.notifications.wellnessReminders,
                    onChange: (value: boolean) => handleSettingChange("notifications", "wellnessReminders", value),
                    type: "toggle"
                },
                {
                    icon: User,
                    label: "Social Updates",
                    description: "Notifications about friends and community",
                    value: settings.notifications.socialUpdates,
                    onChange: (value: boolean) => handleSettingChange("notifications", "socialUpdates", value),
                    type: "toggle"
                }
            ]
        },
        {
            title: "Privacy & Security",
            icon: Shield,
            items: [
                {
                    icon: Activity,
                    label: "Show Activity",
                    description: "Let others see your wellness activity",
                    value: settings.privacy.showActivity,
                    onChange: (value: boolean) => handleSettingChange("privacy", "showActivity", value),
                    type: "toggle"
                },
                {
                    icon: Trophy,
                    label: "Show Progress",
                    description: "Display your achievements publicly",
                    value: settings.privacy.showProgress,
                    onChange: (value: boolean) => handleSettingChange("privacy", "showProgress", value),
                    type: "toggle"
                },
                {
                    icon: Shield,
                    label: "Privacy Policy",
                    description: "Review our privacy policy",
                    action: () => {/* TODO: Show privacy policy */ },
                    type: "navigation"
                },
                {
                    icon: Lock,
                    label: "Data & Security",
                    description: "Manage your data and security settings",
                    action: () => {/* TODO: Show data settings */ },
                    type: "navigation"
                }
            ]
        },
        {
            title: "Preferences",
            icon: Settings,
            items: [
                {
                    icon: Moon,
                    label: "Dark Mode",
                    description: "Use dark theme",
                    value: settings.preferences.darkMode,
                    onChange: (value: boolean) => handleSettingChange("preferences", "darkMode", value),
                    type: "toggle"
                },
                {
                    icon: Globe,
                    label: "Language",
                    description: "Choose your preferred language",
                    value: settings.preferences.language,
                    action: () => {/* TODO: Show language picker */ },
                    type: "navigation"
                },
                {
                    icon: Star,
                    label: "Auto Save",
                    description: "Automatically save your progress",
                    value: settings.preferences.autoSave,
                    onChange: (value: boolean) => handleSettingChange("preferences", "autoSave", value),
                    type: "toggle"
                }
            ]
        },
        {
            title: "Support",
            icon: HelpCircle,
            items: [
                {
                    icon: HelpCircle,
                    label: "Help Center",
                    description: "Get help and support",
                    action: () => {/* TODO: Show help center */ },
                    type: "navigation"
                },
                {
                    icon: Mail,
                    label: "Contact Us",
                    description: "Send us feedback or questions",
                    action: () => {/* TODO: Show contact form */ },
                    type: "navigation"
                },
                {
                    icon: Star,
                    label: "Rate App",
                    description: "Rate us on the app store",
                    action: () => {/* TODO: Show rating */ },
                    type: "navigation"
                }
            ]
        }
    ];

    return (
        <div className="profile-settings-container">
            <div className="flex-between w-full max-w-5xl mx-auto mb-8">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary-500/20 transition-all duration-300"
                        onClick={() => navigate(-1)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5" />
                            <path d="M12 19l-7-7 7-7" />
                        </svg>
                    </Button>
                    <div>
                        <h1 className="h3-bold text-light-1">Profile Settings</h1>
                        <p className="text-light-3 text-sm">Manage your account and preferences</p>
                    </div>
                </div>
            </div>

            {/* User Profile Card */}
            <div className="w-full max-w-5xl mx-auto mb-8">
                <div className="bg-gradient-to-r from-dark-3/50 to-dark-4/30 border border-dark-4/50 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img
                                src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                                alt="profile"
                                className="h-16 w-16 rounded-full border-3 border-primary-500/30 shadow-lg"
                            />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-dark-2"></div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-light-1">{user.name}</h2>
                            <p className="text-light-3">@{user.username}</p>
                            <p className="text-light-3 text-sm">{user.email}</p>
                        </div>
                        <Link
                            to={`/update-profile/${user.id}`}
                            className="flex items-center gap-2 px-4 py-2 bg-primary-500/20 hover:bg-primary-500/30 rounded-lg transition-all duration-300 group">
                            <Edit3 size={16} className="text-primary-500" />
                            <span className="text-primary-500 text-sm font-medium group-hover:text-primary-400">Edit Profile</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Settings Groups */}
            <div className="w-full max-w-5xl mx-auto space-y-6">
                {settingsGroups.map((group) => (
                    <div key={group.title} className="space-y-4">
                        {/* Group Header */}
                        <div className="flex items-center gap-3 px-2">
                            <div className="p-2 rounded-lg bg-primary-500/20">
                                <group.icon size={20} className="text-primary-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-light-1">{group.title}</h3>
                        </div>

                        {/* Group Items */}
                        <div className="space-y-3">
                            {group.items.map((item) => (
                                <div
                                    key={item.label}
                                    className="bg-dark-3/30 border border-dark-4/50 rounded-xl p-4 hover:border-primary-500/30 transition-all duration-300 group">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className="p-2 rounded-lg bg-dark-4/30 group-hover:bg-primary-500/20 transition-all duration-300">
                                                <item.icon size={18} className="text-light-3 group-hover:text-primary-500 transition-colors duration-300" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-light-1 font-medium group-hover:text-primary-500 transition-colors duration-300">
                                                    {item.label}
                                                </h4>
                                                <p className="text-light-3 text-sm">{item.description}</p>
                                            </div>
                                        </div>

                                        {item.type === "toggle" && item.onChange && (
                                            <Switch
                                                checked={item.value as boolean}
                                                onCheckedChange={item.onChange}
                                                className="data-[state=checked]:bg-primary-500"
                                            />
                                        )}                        {item.type === "navigation" && (
                                            <button
                                                onClick={item.action}
                                                onTouchStart={() => { }} // Ensures touch events work
                                                className="p-2 hover:bg-primary-500/20 rounded-lg transition-all duration-300 mobile-touch-button"
                                                aria-label={`Navigate to ${item.label}`}>
                                                <ChevronRight size={18} className="text-light-3 group-hover:text-primary-500 transition-colors duration-300" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Logout Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="p-2 rounded-lg bg-red-500/20">
                            <LogOut size={20} className="text-red-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-light-1">Account Actions</h3>
                    </div>

                    <div className="bg-dark-3/30 border border-red-500/30 rounded-xl p-4 hover:border-red-500/50 transition-all duration-300">
                        <button
                            onClick={handleSignOut}
                            onTouchStart={() => { }} // Ensures touch events work
                            className="flex items-center gap-3 w-full hover:bg-red-500/10 active:bg-red-500/20 transition-all duration-300 rounded-lg p-2 -m-2 mobile-touch-button"
                            aria-label="Sign out of your account">
                            <div className="p-2 rounded-lg bg-red-500/20">
                                <LogOut size={18} className="text-red-500" />
                            </div>
                            <div className="flex-1 text-left">
                                <h4 className="text-light-1 font-medium hover:text-red-400 active:text-red-300 transition-colors duration-300">Sign Out</h4>
                                <p className="text-light-3 text-sm hover:text-light-2 active:text-light-2 transition-colors duration-300">Sign out of your account</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
