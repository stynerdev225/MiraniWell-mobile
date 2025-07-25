import { SignUp } from '@clerk/clerk-react';
import { useEffect } from 'react';

const ClerkSignUpForm = () => {
    useEffect(() => {
        console.log('🔐 Clerk Sign Up form loaded');
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img
                        src="/assets/images/logo.svg"
                        alt="MiraniWell Logo"
                        className="w-24 h-24 mx-auto mb-4"
                    />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Join MiraniWell</h1>
                    <p className="text-gray-600">Create your account to start your wellness journey</p>
                </div>

                <SignUp
                    appearance={{
                        elements: {
                            formButtonPrimary: 'bg-primary hover:bg-primary/90 text-white',
                            card: 'shadow-lg border-0 rounded-lg',
                            headerTitle: 'text-2xl font-bold text-primary',
                            headerSubtitle: 'text-gray-600',
                            formFieldInput: 'border-gray-300 focus:border-primary focus:ring-primary',
                            formFieldLabel: 'text-gray-700 font-medium',
                            footerActionText: 'text-gray-600',
                            footerActionLink: 'text-primary hover:text-primary/80',
                        },
                    }}
                    redirectUrl="/"
                    signInUrl="/clerk-sign-in"
                />
            </div>
        </div>
    );
};

export default ClerkSignUpForm;
