import { ID, Query } from "appwrite";
import { 
  appwriteConfig, 
  databases
} from "./config";
import { 
  JournalEntry, 
  MoodEntry, 
  RitualSession, 
  AIInsight
} from "@/types";
import { geminiAI } from "@/lib/ai/gemini";

// ============================================================
// JOURNAL ENTRIES
// ============================================================

export async function createJournalEntry(entry: Omit<JournalEntry, 'id'>) {
  try {
    const newEntry = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.journalCollectionId,
      ID.unique(),
      {
        userId: entry.userId,
        date: entry.date.toISOString(),
        mood: entry.mood,
        content: entry.content,
        tags: entry.tags,
        isPrivate: entry.isPrivate,
        gratitude: entry.gratitude || [],
        intention: entry.intention || '',
      }
    );

    return newEntry;
  } catch (error) {
    console.error("Error creating journal entry:", error);
    throw new Error("Failed to create journal entry");
  }
}

export async function getUserJournalEntries(userId: string, limit = 20) {
  try {
    const entries = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.journalCollectionId,
      [
        Query.equal("userId", userId),
        Query.orderDesc("date"),
        Query.limit(limit)
      ]
    );

    return entries.documents.map(doc => ({
      id: doc.$id,
      userId: doc.userId,
      date: new Date(doc.date),
      mood: doc.mood,
      content: doc.content,
      tags: doc.tags,
      isPrivate: doc.isPrivate,
      gratitude: doc.gratitude,
      intention: doc.intention,
    })) as JournalEntry[];
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return [];
  }
}

// ============================================================
// MOOD ENTRIES
// ============================================================

export async function createMoodEntry(entry: Omit<MoodEntry, 'id'>) {
  try {
    const newEntry = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.moodEntriesCollectionId,
      ID.unique(),
      {
        userId: entry.userId,
        date: entry.date.toISOString(),
        mood: entry.mood,
        energy: entry.energy,
        stress: entry.stress,
        notes: entry.notes || '',
      }
    );

    return newEntry;
  } catch (error) {
    console.error("Error creating mood entry:", error);
    throw new Error("Failed to create mood entry");
  }
}

export async function getUserMoodEntries(userId: string, limit = 30) {
  try {
    const entries = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.moodEntriesCollectionId,
      [
        Query.equal("userId", userId),
        Query.orderDesc("date"),
        Query.limit(limit)
      ]
    );

    return entries.documents.map(doc => ({
      id: doc.$id,
      userId: doc.userId,
      date: new Date(doc.date),
      mood: doc.mood,
      energy: doc.energy,
      stress: doc.stress,
      notes: doc.notes,
    })) as MoodEntry[];
  } catch (error) {
    console.error("Error fetching mood entries:", error);
    return [];
  }
}

// ============================================================
// RITUAL SESSIONS
// ============================================================

export async function createRitualSession(session: Omit<RitualSession, 'id'>) {
  try {
    const newSession = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.ritualSessionsCollectionId,
      ID.unique(),
      {
        userId: session.userId,
        ritualRoomId: session.ritualRoomId,
        practiceId: session.practiceId,
        startTime: session.startTime.toISOString(),
        endTime: session.endTime?.toISOString(),
        completed: session.completed,
        rating: session.rating,
        notes: session.notes || '',
      }
    );

    return newSession;
  } catch (error) {
    console.error("Error creating ritual session:", error);
    throw new Error("Failed to create ritual session");
  }
}

export async function getUserRitualSessions(userId: string, limit = 50) {
  try {
    const sessions = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.ritualSessionsCollectionId,
      [
        Query.equal("userId", userId),
        Query.orderDesc("startTime"),
        Query.limit(limit)
      ]
    );

    return sessions.documents.map(doc => ({
      id: doc.$id,
      userId: doc.userId,
      ritualRoomId: doc.ritualRoomId,
      practiceId: doc.practiceId,
      startTime: new Date(doc.startTime),
      endTime: doc.endTime ? new Date(doc.endTime) : undefined,
      completed: doc.completed,
      rating: doc.rating,
      notes: doc.notes,
    })) as RitualSession[];
  } catch (error) {
    console.error("Error fetching ritual sessions:", error);
    return [];
  }
}

export async function completeRitualSession(
  sessionId: string, 
  rating?: number, 
  notes?: string
) {
  try {
    const updatedSession = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.ritualSessionsCollectionId,
      sessionId,
      {
        endTime: new Date().toISOString(),
        completed: true,
        rating: rating,
        notes: notes || '',
      }
    );

    return updatedSession;
  } catch (error) {
    console.error("Error completing ritual session:", error);
    throw new Error("Failed to complete ritual session");
  }
}

// ============================================================
// AI INSIGHTS
// ============================================================

export async function createAIInsight(insight: Omit<AIInsight, 'id'>) {
  try {
    const newInsight = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.aiInsightsCollectionId,
      ID.unique(),
      {
        userId: insight.userId,
        type: insight.type,
        content: insight.content,
        data: insight.data ? JSON.stringify(insight.data) : null,
        generatedAt: insight.generatedAt.toISOString(),
        isRead: insight.isRead,
      }
    );

    return newInsight;
  } catch (error) {
    console.error("Error creating AI insight:", error);
    throw new Error("Failed to create AI insight");
  }
}

export async function getUserAIInsights(userId: string, limit = 20) {
  try {
    const insights = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.aiInsightsCollectionId,
      [
        Query.equal("userId", userId),
        Query.orderDesc("generatedAt"),
        Query.limit(limit)
      ]
    );

    return insights.documents.map(doc => ({
      id: doc.$id,
      userId: doc.userId,
      type: doc.type,
      content: doc.content,
      data: doc.data ? JSON.parse(doc.data) : undefined,
      generatedAt: new Date(doc.generatedAt),
      isRead: doc.isRead,
    })) as AIInsight[];
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return [];
  }
}

export async function markInsightAsRead(insightId: string) {
  try {
    const updatedInsight = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.aiInsightsCollectionId,
      insightId,
      {
        isRead: true,
      }
    );

    return updatedInsight;
  } catch (error) {
    console.error("Error marking insight as read:", error);
    throw new Error("Failed to mark insight as read");
  }
}

// ============================================================
// AI INSIGHT GENERATION
// ============================================================

export async function generateMoodAnalysisInsight(userId: string) {
  try {
    const [moodEntries, journalEntries] = await Promise.all([
      getUserMoodEntries(userId, 14), // Last 2 weeks
      getUserJournalEntries(userId, 10) // Last 10 entries
    ]);

    if (moodEntries.length === 0) {
      throw new Error("No mood data available for analysis");
    }

    const content = await geminiAI.generateMoodAnalysis(moodEntries, journalEntries);

    const insight: Omit<AIInsight, 'id'> = {
      userId,
      type: 'mood_analysis',
      content,
      data: {
        moodCount: moodEntries.length,
        avgMood: moodEntries.reduce((sum, e) => sum + e.mood, 0) / moodEntries.length,
        journalCount: journalEntries.length
      },
      generatedAt: new Date(),
      isRead: false
    };

    return await createAIInsight(insight);
  } catch (error) {
    console.error("Error generating mood analysis insight:", error);
    throw new Error("Failed to generate mood analysis insight");
  }
}

export async function generateRitualSuggestionInsight(
  userId: string, 
  currentMood: number, 
  stressLevel: number
) {
  try {
    const ritualSessions = await getUserRitualSessions(userId, 20);

    const content = await geminiAI.generateRitualSuggestion(
      ritualSessions, 
      currentMood, 
      stressLevel
    );

    const insight: Omit<AIInsight, 'id'> = {
      userId,
      type: 'ritual_suggestion',
      content,
      data: {
        currentMood,
        stressLevel,
        recentSessionCount: ritualSessions.length
      },
      generatedAt: new Date(),
      isRead: false
    };

    return await createAIInsight(insight);
  } catch (error) {
    console.error("Error generating ritual suggestion insight:", error);
    throw new Error("Failed to generate ritual suggestion insight");
  }
}

export async function generateJournalReflectionInsight(userId: string) {
  try {
    const journalEntries = await getUserJournalEntries(userId, 10);

    if (journalEntries.length === 0) {
      throw new Error("No journal entries available for reflection");
    }

    const content = await geminiAI.generateJournalReflection(journalEntries);

    const insight: Omit<AIInsight, 'id'> = {
      userId,
      type: 'reflection',
      content,
      data: {
        entriesAnalyzed: journalEntries.length
      },
      generatedAt: new Date(),
      isRead: false
    };

    return await createAIInsight(insight);
  } catch (error) {
    console.error("Error generating journal reflection insight:", error);
    throw new Error("Failed to generate journal reflection insight");
  }
}

export async function generateGrowthInsight(userId: string) {
  try {
    const [ritualSessions, journalEntries, moodEntries] = await Promise.all([
      getUserRitualSessions(userId, 30),
      getUserJournalEntries(userId, 15),
      getUserMoodEntries(userId, 21)
    ]);

    const content = await geminiAI.generateGrowthInsight(
      ritualSessions, 
      journalEntries, 
      moodEntries
    );

    const insight: Omit<AIInsight, 'id'> = {
      userId,
      type: 'growth_insight',
      content,
      data: {
        ritualSessionCount: ritualSessions.filter(s => s.completed).length,
        journalEntryCount: journalEntries.length,
        moodEntryCount: moodEntries.length
      },
      generatedAt: new Date(),
      isRead: false
    };

    return await createAIInsight(insight);
  } catch (error) {
    console.error("Error generating growth insight:", error);
    throw new Error("Failed to generate growth insight");
  }
}

// ============================================================
// WELLNESS STATISTICS
// ============================================================

export async function getWellnessStats(userId: string) {
  try {
    const [ritualSessions, journalEntries, moodEntries, aiInsights] = await Promise.all([
      getUserRitualSessions(userId),
      getUserJournalEntries(userId),
      getUserMoodEntries(userId),
      getUserAIInsights(userId)
    ]);

    const completedRituals = ritualSessions.filter(s => s.completed).length;
    const avgMood = moodEntries.length > 0 
      ? moodEntries.reduce((sum, e) => sum + e.mood, 0) / moodEntries.length 
      : 0;

    return {
      completedRituals,
      journalEntries: journalEntries.length,
      insightsGenerated: aiInsights.length,
      avgMoodScore: parseFloat(avgMood.toFixed(1)),
      currentStreak: calculateJournalStreak(journalEntries)
    };
  } catch (error) {
    console.error("Error fetching wellness stats:", error);
    return {
      completedRituals: 0,
      journalEntries: 0,
      insightsGenerated: 0,
      avgMoodScore: 0,
      currentStreak: 0
    };
  }
}

function calculateJournalStreak(entries: JournalEntry[]): number {
  if (entries.length === 0) return 0;
  
  const sortedEntries = entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  for (const entry of sortedEntries) {
    const entryDate = new Date(entry.date);
    entryDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === streak) {
      streak++;
      currentDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
    } else {
      break;
    }
  }
  
  return streak;
}
