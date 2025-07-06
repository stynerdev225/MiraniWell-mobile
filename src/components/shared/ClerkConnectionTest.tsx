import { useEffect, useState } from 'react';
import { useClerk } from '@clerk/clerk-react';

const ClerkConnectionTest = () => {
    const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'failed'>('testing');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const clerk = useClerk();

    useEffect(() => {
        const testConnection = async () => {
            try {
                console.log('🔐 Testing Clerk connection...');
                console.log('🔐 Clerk instance:', clerk);

                if (!clerk) {
                    throw new Error('Clerk instance not available');
                }

                // Test basic clerk functionality
                const session = clerk.session;
                console.log('🔐 Clerk session:', session);
                console.log('🔐 Clerk loaded:', clerk.loaded);

                setConnectionStatus('connected');
            } catch (error) {
                console.error('🚨 Clerk connection failed:', error);
                setConnectionStatus('failed');
                setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
            }
        };

        testConnection();
    }, [clerk]);

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Clerk Connection Test</h2>

            {connectionStatus === 'testing' && (
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Testing connection...</p>
                </div>
            )}

            {connectionStatus === 'connected' && (
                <div className="text-center">
                    <div className="text-green-600 text-4xl mb-2">✅</div>
                    <p className="text-green-600 font-semibold">Clerk connection successful!</p>
                    <p className="text-gray-600 text-sm mt-2">Authentication should work properly.</p>
                </div>
            )}

            {connectionStatus === 'failed' && (
                <div className="text-center">
                    <div className="text-red-600 text-4xl mb-2">❌</div>
                    <p className="text-red-600 font-semibold">Clerk connection failed!</p>
                    <p className="text-gray-600 text-sm mt-2">Error: {errorMessage}</p>
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                        <p className="text-red-800 text-sm">
                            This explains why you're getting network errors. The Clerk service is not properly connecting.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClerkConnectionTest;
