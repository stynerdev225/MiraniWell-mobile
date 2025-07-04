# Appwrite Setup Guide for Mirani Well

This guide will walk you through setting up your Appwrite backend for the Mirani Well social media application.

## Step 1: Create an Appwrite Account

1. Go to [https://appwrite.io/](https://appwrite.io/)
2. Click "Get Started" or "Sign Up"
3. Create an account using your email or GitHub/Google accounts

## Step 2: Create a New Project

1. Once logged in, click "Create Project"
2. Name your project "Miriani Well" (or any name you prefer)
3. Click "Create"

## Step 3: Setup Your Project Platform

1. In the "Add a platform" section, select "Web App"
2. Enter your website domain: `localhost` for local development
3. Click "Next" and then "Register"

## Step 4: Create Database and Collections

1. From the sidebar, select "Databases"
2. Click "Create Database"
3. Name it "MirianiWellDB" and click "Create"

### Create Users Collection

1. In your database, click "Create Collection"
2. Name it "users"
3. Set up the following attributes:
   - `name` (string, required)
   - `username` (string, required, unique)
   - `email` (string, required, unique)
   - `imageUrl` (string)
   - `bio` (string)
   - `accountId` (string, required, unique)
4. Set appropriate permissions (allow read for all, write for authenticated users)

### Create Posts Collection

1. Click "Create Collection" again
2. Name it "posts"
3. Set up the following attributes:
   - `caption` (string)
   - `imageUrl` (string, required)
   - `imageId` (string, required)
   - `location` (string)
   - `tags` (string array)
   - `creator` (string, required, relationship to users collection)
4. Set appropriate permissions

### Create Saves Collection

1. Click "Create Collection" once more
2. Name it "saves"
3. Set up the following attributes:
   - `user` (string, required, relationship to users collection)
   - `post` (string, required, relationship to posts collection)
4. Set appropriate permissions

## Step 5: Create Storage Bucket

1. From the sidebar, select "Storage"
2. Click "Create Bucket"
3. Name it "media"
4. Enable file uploads
5. Set appropriate permissions (allow read for all, write for authenticated users)

## Step 6: Get Your Project IDs

After setting up, collect the following IDs from your Appwrite dashboard:

1. Project ID: Found in the project settings
2. Database ID: Found in the database overview
3. Users Collection ID: Found in the users collection details
4. Posts Collection ID: Found in the posts collection details
5. Saves Collection ID: Found in the saves collection details
6. Storage Bucket ID: Found in the storage bucket details

## Step 7: Update Your .env File

Update your .env file with the collected IDs:

```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_STORAGE_ID=your_storage_id
VITE_APPWRITE_USER_COLLECTION_ID=your_user_collection_id
VITE_APPWRITE_POST_COLLECTION_ID=your_post_collection_id
VITE_APPWRITE_SAVES_COLLECTION_ID=your_saves_collection_id
```

## Step 8: Configure Authentication

1. From the sidebar, select "Auth"
2. Enable Email/Password authentication
3. Configure other authentication methods if needed

Now your Appwrite backend is ready to use with your Miriani Well application!
