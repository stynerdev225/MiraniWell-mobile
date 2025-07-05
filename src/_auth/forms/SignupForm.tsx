import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

import { useCreateUserAccount } from "@/lib/react-query/queries";
import { SignupValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Queries
  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } = useCreateUserAccount();  // Handler
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      console.log('📱 Signup attempt:', {
        username: user.username,
        email: user.email,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      });

      // Add mobile-specific timeout
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const timeout = isMobile ? 15000 : 10000;

      const signupPromise = createUserAccount(user);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Signup timeout')), timeout)
      );

      const newUser = await Promise.race([signupPromise, timeoutPromise]);

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again.", });
        return;
      }

      // No need to sign in again since createUserAccount now handles it
      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();
        navigate("/");
      } else {
        toast({ title: "Account created but login failed. Please sign in manually.", });
        navigate("/sign-in");
      }
    } catch (error: any) {
      console.error('📱 Signup error:', error);

      // Handle specific error cases
      if (error?.message?.includes('timeout')) {
        toast({ title: "Connection timeout. Please check your network and try again.", });
      } else if (error?.code === 409) {
        toast({ title: "User already exists. Please try signing in instead.", });
        navigate("/sign-in");
      } else if (error?.message?.includes('user') && error?.message?.includes('exists')) {
        toast({ title: "User already exists. Please try signing in instead.", });
        navigate("/sign-in");
      } else if (error?.message?.includes('not authorized')) {
        toast({ title: "Permission error. Please contact support.", });
      } else {
        toast({ title: "Sign up failed. Please try again.", });
      }
    }
  };

  return (
    <Form {...form}>
      <div className="w-full max-w-md sm:w-420 flex-center flex-col px-4">
        <img src="/assets/images/Mirani-Well-Logo.png" alt="Mirani Well logo" className="w-full max-w-[280px] h-auto" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Mirani Well, please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-5 w-full mt-4"
          autoComplete="on"
          noValidate>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input mobile-input"
                    autoComplete="name"
                    autoCapitalize="words"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="Enter your full name"
                    onTouchStart={() => { }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input mobile-input"
                    autoComplete="username"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="Enter your username"
                    onTouchStart={() => { }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    onTouchStart={() => { }}
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
                    autoComplete="new-password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="Enter your password"
                    onTouchStart={() => { }}
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
            disabled={isCreatingAccount || isUserLoading}
            onTouchStart={() => { }}
            aria-label="Create new account">
            {isCreatingAccount || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
