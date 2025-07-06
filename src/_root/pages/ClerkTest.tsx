import { useUser, useAuth } from '@clerk/clerk-react';

const ClerkTestPage = () => {
    const { user, isSignedIn, isLoaded } = useUser();
    const { signOut } = useAuth();

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading Clerk...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-center mb-8">Clerk Integration Test</h1>

                    {isSignedIn ? (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-green-600 mb-4">✅ Authentication Successful!</h2>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-green-800">Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress}!</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-700 mb-2">User Information</h3>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li><strong>ID:</strong> {user.id}</li>
                                        <li><strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}</li>
                                        <li><strong>Name:</strong> {user.firstName} {user.lastName}</li>
                                        <li><strong>Created:</strong> {new Date(user.createdAt || '').toLocaleDateString()}</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-700 mb-2">Session Status</h3>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li><strong>Signed In:</strong> ✅ Yes</li>
                                        <li><strong>Email Verified:</strong> {user.emailAddresses[0]?.verification?.status === 'verified' ? '✅ Yes' : '❌ No'}</li>
                                        <li><strong>Two Factor:</strong> {user.twoFactorEnabled ? '✅ Enabled' : '❌ Disabled'}</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="text-center space-y-4">
                                <button
                                    onClick={() => signOut()}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Sign Out
                                </button>
                                <div className="space-x-4">
                                    <a href="/" className="text-primary hover:underline">Go to Home</a>
                                    <a href="/dashboard" className="text-primary hover:underline">Go to Dashboard</a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-6">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h2 className="text-2xl font-semibold text-yellow-600 mb-2">Authentication Required</h2>
                                <p className="text-yellow-800">Please sign in to test the Clerk integration.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <a
                                        href="/clerk-sign-in"
                                        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors block text-center"
                                    >
                                        Sign In with Clerk
                                    </a>
                                    <a
                                        href="/clerk-sign-up"
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors block text-center"
                                    >
                                        Sign Up with Clerk
                                    </a>
                                </div>

                                <div className="border-t pt-4">
                                    <p className="text-gray-600 mb-2">Or try the original authentication:</p>
                                    <div className="space-x-4">
                                        <a href="/sign-in" className="text-blue-600 hover:underline">Appwrite Sign In</a>
                                        <a href="/sign-up" className="text-blue-600 hover:underline">Appwrite Sign Up</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClerkTestPage;
