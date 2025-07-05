import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

import { SigninValidation } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import { isDevelopment } from "@/lib/appwrite/devUtils";
import { checkNetworkConnectivity } from "@/lib/appwrite/api";
import mobileDebug from "@/lib/mobileDebug";

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // Query
  const { mutateAsync: signInAccount, isLoading } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    try {
      // Performance monitoring
      const perfMonitor = mobileDebug.monitorPerformance();
      perfMonitor.mark('login-start');

      console.log('📱 Signin attempt:', {
        email: user.email,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        isMobile: mobileDebug.isMobile(),
        isIOS: mobileDebug.isIOS(),
        isAndroid: mobileDebug.isAndroid(),
        networkType: (navigator as any).connection?.effectiveType || 'unknown'
      });

      // Log device information in development
      if (isDevelopment) {
        mobileDebug.logDeviceInfo();
        mobileDebug.checkNetworkStatus();
      }

      // Add mobile-specific timeout and retry logic
      const isMobile = mobileDebug.isMobile();
      const timeout = isMobile ? 15000 : 10000; // Longer timeout for mobile

      // Test network connectivity first with timeout
      const connectivityPromise = checkNetworkConnectivity();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Network timeout')), timeout)
      );

      const isConnected = await Promise.race([connectivityPromise, timeoutPromise]);
      console.log('📱 Network connectivity test:', isConnected);

      if (!isConnected) {
        toast({ title: "Network error. Please check your connection and try again." });
        return;
      }

      const session = await signInAccount(user);
      console.log('📱 Session result:', session ? 'Success' : 'Failed');
      console.log('📱 Session details:', session);

      if (!session) {
        console.log('📱 No session returned');
        toast({ title: "Login failed. Please try again." });
        return;
      }

      const isLoggedIn = await checkAuthUser();
      console.log('📱 Auth check result:', isLoggedIn);

      if (isLoggedIn) {
        form.reset();
        perfMonitor.mark('login-end');
        perfMonitor.measure('login-duration', 'login-start', 'login-end');
        console.log('📱 Navigating to home...');
        navigate("/");
      } else {
        console.log('📱 Auth check failed');
        toast({ title: "Login failed. Please try again." });
        return;
      }
    } catch (error: any) {
      console.error('📱 Signin error:', error);
      console.log('📱 Error details:', {
        code: error?.code,
        message: error?.message,
        type: error?.type,
        response: error?.response,
        stack: error?.stack
      });

      // Network-specific error handling
      if (error?.name === 'NetworkError' || error?.message?.includes('network')) {
        console.log('📱 Network error detected');
        toast({ title: "Network error. Please check your connection and try again." });
      } else if (error?.code === 401) {
        toast({ title: "Invalid email or password. Please try again." });
      } else if (error?.message?.includes('Invalid credentials')) {
        toast({ title: "Invalid email or password. Please try again." });
      } else if (error?.message?.includes('cors')) {
        console.log('📱 CORS error detected');
        toast({ title: "Connection error. Please try again." });
      } else {
        toast({ title: "Login failed. Please try again." });
      }
    }
  };

  return (
    <Form {...form}>
      <div className="w-full max-w-md sm:w-420 flex-center flex-col px-4">
        <img src="/assets/images/Mirani-Well-Logo.png" alt="Mirani Well logo" className="w-full max-w-[280px] h-auto" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4"
          autoComplete="on"
          noValidate>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="shad-input mobile-input"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    inputMode="email"
                    placeholder="Enter your email"
                    onTouchStart={() => { }} // Ensures touch events work
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="shad-input mobile-input"
                    autoComplete="current-password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="Enter your password"
                    onTouchStart={() => { }} // Ensures touch events work
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="shad-button_primary mobile-submit-btn"
            disabled={isLoading || isUserLoading}
            onTouchStart={() => { }} // Ensures touch events work
            aria-label="Sign in to your account">
            {isLoading || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>

          {/* Development mode helper */}
          {isDevelopment && (
            <div className="mt-4 p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
              <p className="text-xs text-yellow-400 font-medium mb-2">🚀 Development Mode</p>
              <p className="text-xs text-light-2 mb-2">Test credentials:</p>
              <div className="text-xs text-light-3 space-y-1">
                <div>• test@test.com / password</div>
                <div>• demo@demo.com / demo</div>
                <div>• john@example.com / password123</div>
              </div>
            </div>
          )}
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
