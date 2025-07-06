# Clerk Authentication Setup for MiraniWell

## Overview
We've set up Clerk as an alternative authentication solution to resolve the mobile login issues experienced with Appwrite CORS restrictions. Clerk is specifically designed for modern web applications and provides seamless mobile authentication.

## Setup Steps

### 1. ✅ Install Clerk Dependencies
```bash
npm install @clerk/clerk-react
```

### 2. ✅ Create Clerk Configuration
- Created `/src/lib/clerk/config.ts` with Clerk configuration
- Created `/src/lib/clerk/ClerkAuthProvider.tsx` as the main provider

### 3. ✅ Create Clerk Authentication Forms
- Created `/src/_auth/forms/ClerkSignInForm.tsx` - Sign in form using Clerk
- Created `/src/_auth/forms/ClerkSignUpForm.tsx` - Sign up form using Clerk
- Created `/src/_auth/pages/ClerkSignIn.tsx` - Sign in page
- Created `/src/_auth/pages/ClerkSignUp.tsx` - Sign up page

### 4. ✅ Update App Structure
- Added ClerkAuthProvider to `/src/main.tsx`
- Added Clerk routes to `/src/App.tsx`
- Routes available: `/clerk-sign-in` and `/clerk-sign-up`

### 5. 🔧 Configure Clerk Environment Variables
You need to get your Clerk Publishable Key from your Clerk dashboard and add it to your environment variables.

#### From Clerk Dashboard
1. Go to your Clerk dashboard: <https://dashboard.clerk.com/apps/app_2zTqCFdARySwUPn4ibCt3muwhDG>
2. Navigate to "API Keys" section
3. Copy the "Publishable Key" (starts with `pk_test_` or `pk_live_`)
4. Add it to your `.env` file

#### Update .env file
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
```

#### Update Vercel Environment Variables
1. Go to your Vercel dashboard: [https://vercel.com/miriani-wells-projects/miriani-well-mobile/settings/environment-variables](https://vercel.com/miriani-wells-projects/miriani-well-mobile/settings/environment-variables)
2. Add the environment variable:
   - **Name**: `VITE_CLERK_PUBLISHABLE_KEY`
   - **Value**: Your Clerk publishable key
   - **Environment**: Production (and optionally Preview/Development)

### 6. 🔧 Configure Clerk Dashboard
In your Clerk dashboard, you need to configure the allowed domains:

1. Go to "Settings" → "Domains"
2. Add your Vercel domain: `miriani-well-mobile.vercel.app`
3. Configure redirect URLs:
   - Sign-in redirect: `https://miriani-well-mobile.vercel.app/`
   - Sign-up redirect: `https://miriani-well-mobile.vercel.app/`

## Testing Routes

### Development
- Sign In: `http://localhost:5173/clerk-sign-in`
- Sign Up: `http://localhost:5173/clerk-sign-up`

### Production
- Sign In: `https://miriani-well-mobile.vercel.app/clerk-sign-in`
- Sign Up: `https://miriani-well-mobile.vercel.app/clerk-sign-up`

## Benefits of Clerk

1. **No CORS Issues**: Clerk handles authentication through its own infrastructure
2. **Mobile-First**: Designed specifically for modern web applications
3. **Built-in Features**:
   - Email verification
   - Password reset
   - Social logins (Google, Facebook, etc.)
   - Multi-factor authentication
4. **Developer-Friendly**: Easy to integrate and customize
5. **Production-Ready**: Handles edge cases and security automatically

## Next Steps

1. Get your Clerk Publishable Key from the dashboard
2. Update environment variables in both `.env` and Vercel
3. Configure allowed domains in Clerk dashboard
4. Test the authentication flow
5. Optionally integrate with your existing user data structure

## Migration Notes

- The existing Appwrite authentication can remain as a fallback
- Users can choose between Appwrite (`/sign-in`) and Clerk (`/clerk-sign-in`)
- Eventually, you can migrate all users to Clerk for better mobile experience
