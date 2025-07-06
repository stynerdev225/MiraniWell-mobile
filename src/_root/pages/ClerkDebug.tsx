import { useEffect, useState } from 'react';
import { clerkConfig, logClerkConfig } from '@/lib/clerk/config';
import ClerkConnectionTest from '@/components/shared/ClerkConnectionTest';

const ClerkDebugPage = () => {
    const [envVars, setEnvVars] = useState<Record<string, string>>({});

    useEffect(() => {
        // Log Clerk configuration
        logClerkConfig();

        // Get environment variables
        const env = {
            VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'NOT_SET',
            NODE_ENV: import.meta.env.NODE_ENV || 'NOT_SET',
            PROD: import.meta.env.PROD ? 'true' : 'false',
            DEV: import.meta.env.DEV ? 'true' : 'false',
        };

        setEnvVars(env);

        console.log('🔐 Environment Variables:', env);
        console.log('🔐 Clerk Config:', clerkConfig);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-center mb-8">Clerk Debug Information</h1>
                    
                    <ClerkConnectionTest />

                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
                            <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
                                {JSON.stringify(envVars, null, 2)}
                            </pre>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-4">Clerk Configuration</h2>
                            <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
                                {JSON.stringify({
                                    publishableKey: clerkConfig.publishableKey ? `${clerkConfig.publishableKey.substring(0, 20)}...` : 'NOT_SET',
                                    hasKey: !!clerkConfig.publishableKey,
                                    keyLength: clerkConfig.publishableKey?.length || 0
                                }, null, 2)}
                            </pre>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-4">Current URL</h2>
                            <p className="text-sm bg-gray-100 p-3 rounded">{window.location.origin}</p>
                        </div>

                        <div className="text-center">
                            <a href="/clerk-test" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
                                Go to Clerk Test
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClerkDebugPage;
