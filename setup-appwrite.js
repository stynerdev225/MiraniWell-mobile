#!/usr/bin/env node

/**
 * Appwrite Setup Script for MiraniWell Mobile
 * This script will help you set up your Appwrite backend
 */

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function setupAppwrite() {
  console.log('🚀 MiraniWell Appwrite Setup');
  console.log('================================');
  
  // Get project details
  const projectId = await askQuestion('Enter your Appwrite Project ID: ');
  const projectUrl = await askQuestion('Enter your Appwrite URL (default: https://cloud.appwrite.io/v1): ') || 'https://cloud.appwrite.io/v1';
  
  // Generate collection IDs (you'll need to create these in Appwrite)
  const collections = {
    database: 'miraniwell_db',
    users: 'users',
    posts: 'posts', 
    saves: 'saves',
    journal: 'journal_entries',
    affirmations: 'affirmations',
    ritual_sessions: 'ritual_sessions',
    ai_insights: 'ai_insights',
    mood_entries: 'mood_entries'
  };
  
  // Create environment variables
  const envVars = {
    'VITE_APPWRITE_URL': projectUrl,
    'VITE_APPWRITE_PROJECT_ID': projectId,
    'VITE_APPWRITE_DATABASE_ID': collections.database,
    'VITE_APPWRITE_STORAGE_ID': 'miraniwell_storage',
    'VITE_APPWRITE_USER_COLLECTION_ID': collections.users,
    'VITE_APPWRITE_POST_COLLECTION_ID': collections.posts,
    'VITE_APPWRITE_SAVES_COLLECTION_ID': collections.saves,
    'VITE_APPWRITE_JOURNAL_COLLECTION_ID': collections.journal,
    'VITE_APPWRITE_AFFIRMATIONS_COLLECTION_ID': collections.affirmations,
    'VITE_APPWRITE_RITUAL_SESSIONS_COLLECTION_ID': collections.ritual_sessions,
    'VITE_APPWRITE_AI_INSIGHTS_COLLECTION_ID': collections.ai_insights,
    'VITE_APPWRITE_MOOD_ENTRIES_COLLECTION_ID': collections.mood_entries
  };
  
  // Create .env file
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  
  fs.writeFileSync('.env', envContent);
  
  console.log('\n✅ Environment variables created in .env file');
  console.log('\n📋 Copy these to your Vercel environment variables:');
  console.log('==========================================');
  
  Object.entries(envVars).forEach(([key, value]) => {
    console.log(`${key}=${value}`);
  });
  
  console.log('\n🔧 Next steps:');
  console.log('1. Copy the above variables to Vercel > Settings > Environment Variables');
  console.log('2. Create the database and collections in your Appwrite console');
  console.log('3. Set up authentication settings in Appwrite');
  console.log('4. Redeploy your Vercel app');
  
  rl.close();
}

setupAppwrite().catch(console.error);
