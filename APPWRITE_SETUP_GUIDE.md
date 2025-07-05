# 🚀 Complete Appwrite Setup Guide for Vercel

## Step 1: Create Appwrite Project

1. **Go to** [https://cloud.appwrite.io/console](https://cloud.appwrite.io/console)
2. **Sign in** or create an account
3. **Click "Create Project"**
4. **Name**: MiraniWell Mobile
5. **Copy your Project ID** (you'll need this)

## Step 2: Set Up Database

1. **Go to "Databases"** in your Appwrite console
2. **Click "Create Database"**
3. **Database ID**: `miraniwell_db`
4. **Name**: MiraniWell Database

## Step 3: Create Collections

Create these collections in your database:

### Users Collection
- **Collection ID**: `users`
- **Name**: Users
- **Permissions**:
  - Read: Users
  - Write: Users
  - Create: Any
  - Update: Users
  - Delete: Users

### Posts Collection
- **Collection ID**: `posts`
- **Name**: Posts
- **Permissions**:
  - Read: Any
  - Write: Users
  - Create: Users
  - Update: Users
  - Delete: Users

### Saves Collection
- **Collection ID**: `saves`
- **Name**: Saves
- **Permissions**:
  - Read: Users
  - Write: Users
  - Create: Users
  - Update: Users
  - Delete: Users

### Journal Entries Collection
- **Collection ID**: `journal_entries`
- **Name**: Journal Entries
- **Permissions**:
  - Read: Users
  - Write: Users
  - Create: Users
  - Update: Users
  - Delete: Users

### Affirmations Collection
- **Collection ID**: `affirmations`
- **Name**: Affirmations
- **Permissions**:
  - Read: Any
  - Write: Users
  - Create: Users
  - Update: Users
  - Delete: Users

### Ritual Sessions Collection
- **Collection ID**: `ritual_sessions`
- **Name**: Ritual Sessions
- **Permissions**:
  - Read: Users
  - Write: Users
  - Create: Users
  - Update: Users
  - Delete: Users

### AI Insights Collection
- **Collection ID**: `ai_insights`
- **Name**: AI Insights
- **Permissions**:
  - Read: Users
  - Write: Users
  - Create: Users
  - Update: Users
  - Delete: Users

### Mood Entries Collection
- **Collection ID**: `mood_entries`
- **Name**: Mood Entries
- **Permissions**:
  - Read: Users
  - Write: Users
  - Create: Users
  - Update: Users
  - Delete: Users

## Step 4: Set Up Storage

1. **Go to "Storage"** in your Appwrite console
2. **Click "Create Bucket"**
3. **Bucket ID**: `miraniwell_storage`
4. **Name**: MiraniWell Storage
5. **Permissions**:
   - Read: Any
   - Write: Users
   - Create: Users
   - Update: Users
   - Delete: Users

## Step 5: Configure Authentication

1. **Go to "Auth"** in your Appwrite console
2. **Click "Settings"**
3. **Enable Email/Password** authentication
4. **Set up your domain** (add your Vercel domain)
5. **Configure success/failure URLs**:
   - Success: `https://your-app.vercel.app/`
   - Failure: `https://your-app.vercel.app/sign-in`

## Step 6: Add Environment Variables to Vercel

Copy these values to your Vercel environment variables:

```
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_DATABASE_ID=miraniwell_db
VITE_APPWRITE_STORAGE_ID=miraniwell_storage
VITE_APPWRITE_USER_COLLECTION_ID=users
VITE_APPWRITE_POST_COLLECTION_ID=posts
VITE_APPWRITE_SAVES_COLLECTION_ID=saves
VITE_APPWRITE_JOURNAL_COLLECTION_ID=journal_entries
VITE_APPWRITE_AFFIRMATIONS_COLLECTION_ID=affirmations
VITE_APPWRITE_RITUAL_SESSIONS_COLLECTION_ID=ritual_sessions
VITE_APPWRITE_AI_INSIGHTS_COLLECTION_ID=ai_insights
VITE_APPWRITE_MOOD_ENTRIES_COLLECTION_ID=mood_entries
```

## Step 7: Quick Setup Script

Run this in your project directory:

```bash
node setup-appwrite.js
```

## Step 8: Test the Setup

1. **Add variables to Vercel**
2. **Redeploy your app**
3. **Test registration** with a new email
4. **Test login** with the same credentials
5. **Check mobile functionality**

## 🔧 Troubleshooting

If you get errors:
1. **Check Project ID** is correct
2. **Verify all collection IDs** match exactly
3. **Ensure permissions** are set correctly
4. **Check domain configuration** in Appwrite Auth settings

## 📱 Mobile Testing

Once configured:
1. **Test on mobile device**
2. **Use the red debug button** for diagnostics
3. **Check console** for any remaining errors
4. **Verify all features work**

---

**Need help?** Share your Appwrite project details and any error messages you see.
