# 🔧 Vercel Network Error Troubleshooting Guide

## 🚨 Issue: "Network error. Please check your connection and try again."

You're seeing this error on the Vercel deployment, which suggests a configuration issue rather than a code problem.

## 🔍 Most Likely Causes

### 1. **Missing Environment Variables on Vercel**
The app is likely trying to connect to Appwrite but the environment variables aren't configured on Vercel.

### 2. **Appwrite Configuration Issue**
The Appwrite backend might not be properly configured or accessible.

## 🛠️ Immediate Solutions

### Step 1: Check Vercel Environment Variables
1. Go to your Vercel dashboard
2. Navigate to your project: `miriani-well-mobile`
3. Go to Settings > Environment Variables
4. Ensure these variables are set:
   - `VITE_APPWRITE_URL`
   - `VITE_APPWRITE_PROJECT_ID`
   - `VITE_APPWRITE_DATABASE_ID`
   - `VITE_APPWRITE_STORAGE_ID`
   - `VITE_APPWRITE_USER_COLLECTION_ID`
   - `VITE_APPWRITE_POST_COLLECTION_ID`
   - `VITE_APPWRITE_SAVES_COLLECTION_ID`
   - All wellness-related collection IDs

### Step 2: Quick Test - Enable Mock Mode
If you want to test the UI immediately while fixing the backend:

1. Add this environment variable to Vercel:
   ```
   VITE_USE_MOCK_DATA=true
   ```

2. Redeploy the app

This will enable mock mode with test credentials:
- Email: `test@test.com`
- Password: `password`

### Step 3: Check Browser Console
Open the browser console (F12) and look for:
- 📱 Mobile-specific error messages
- 🔐 Authentication errors
- Network request failures
- Appwrite connection errors

## 🔧 Debug Information

### Current Configuration
- **URL**: <https://cloud.appwrite.io/v1> (default)
- **Project ID**: Uses environment variable or falls back to mock
- **Mode**: Production (not development)

### Mobile-Specific Features Active
- ✅ Mobile session retry (3 attempts)
- ✅ Mobile storage clearing
- ✅ Extended timeouts for mobile
- ✅ Mobile debug button available

## 📱 Mobile Testing Steps

1. **Open browser console** (Safari > Develop > Console)
2. **Look for the red Mobile Debug button** (top-left corner)
3. **Tap the debug button** to run diagnostics
4. **Try logging in** and watch console for 📱 messages

## 🚀 Next Steps

1. **Check Vercel environment variables** (most likely cause)
2. **Verify Appwrite backend is accessible**
3. **Test with mock mode** if needed
4. **Check browser console** for specific errors
5. **Use mobile debug button** for diagnostics

## 🆘 Emergency Contact
If you need immediate help, share:
1. Screenshot of the error
2. Browser console output
3. Mobile device/browser type
4. Vercel environment variables status

---

**Created**: July 5, 2025
**Status**: 🔴 Network Error Troubleshooting Active
