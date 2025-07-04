import { JournalEntry, MoodEntry, RitualSession } from '@/types';

// Types for Gemini AI requests
interface GeminiAIRequest {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

interface GeminiAIResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export class GeminiAIService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_AI_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Gemini AI API key not configured. AI features will use mock data.');
    }
  }

  private async makeRequest(prompt: string): Promise<string> {
    if (!this.apiKey) {
      // Return mock response when API key is not available
      return this.getMockResponse(prompt);
    }

    try {
      const request: GeminiAIRequest = {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      };

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`Gemini AI API error: ${response.status}`);
      }

      const data: GeminiAIResponse = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'No response generated.';
    } catch (error) {
      console.error('Gemini AI request failed:', error);
      return this.getMockResponse(prompt);
    }
  }

  private getMockResponse(prompt: string): string {
    // Mock responses based on prompt type
    if (prompt.includes('mood analysis')) {
      return 'Your mood patterns show positive growth over the past week. Consider maintaining your current wellness practices.';
    } else if (prompt.includes('ritual suggestion')) {
      return 'Based on your recent activities, I recommend trying water-element practices for emotional balance.';
    } else if (prompt.includes('journal reflection')) {
      return 'Your journal entries reveal themes of growth and self-discovery. Keep exploring these insights.';
    } else {
      return 'Continue your wellness journey with mindful practices and self-reflection.';
    }
  }

  async generateMoodAnalysis(
    moodEntries: MoodEntry[], 
    journalEntries: JournalEntry[]
  ): Promise<string> {
    const recentMoods = moodEntries.slice(-7); // Last 7 entries
    const avgMood = recentMoods.reduce((sum, entry) => sum + entry.mood, 0) / recentMoods.length;
    
    const prompt = `
      As a wellness AI assistant, analyze these mood patterns and provide supportive insights:
      
      Recent mood scores (1-10 scale): ${recentMoods.map(m => m.mood).join(', ')}
      Average mood: ${avgMood.toFixed(1)}
      
      Recent journal themes: ${journalEntries.slice(-3).map(j => j.content.slice(0, 100)).join('; ')}
      
      Provide a compassionate, encouraging mood analysis focusing on:
      1. Positive trends or patterns
      2. Gentle observations about emotional well-being
      3. Supportive suggestions for continued growth
      
      Keep response under 150 words and maintain a warm, supportive tone.
    `;

    return await this.makeRequest(prompt);
  }

  async generateRitualSuggestion(
    recentSessions: RitualSession[],
    currentMood: number,
    stressLevel: number
  ): Promise<string> {
    const preferredElements = this.getPreferredElements(recentSessions);
    
    const prompt = `
      As a wellness coach, suggest a ritual practice based on:
      
      Current mood: ${currentMood}/10
      Current stress level: ${stressLevel}/10
      Preferred elements from past sessions: ${preferredElements.join(', ')}
      
      Recommend one of these ritual room types (Earth, Water, Fire, Air) and explain why it would be beneficial right now. Consider:
      - Current emotional state
      - What element might bring balance
      - How this practice could support their well-being
      
      Keep response under 100 words and be specific about the recommended element and its benefits.
    `;

    return await this.makeRequest(prompt);
  }

  async generateJournalReflection(journalEntries: JournalEntry[]): Promise<string> {
    const recentEntries = journalEntries.slice(-5);
    const themes = this.extractThemes(recentEntries);
    
    const prompt = `
      As a mindful reflection guide, provide insights on these journal patterns:
      
      Common themes: ${themes.join(', ')}
      Recent gratitude items: ${recentEntries.flatMap(e => e.gratitude || []).slice(-5).join(', ')}
      
      Offer a gentle reflection that:
      1. Acknowledges their emotional journey
      2. Highlights positive growth patterns
      3. Encourages continued self-reflection
      
      Keep response under 120 words with a compassionate, encouraging tone.
    `;

    return await this.makeRequest(prompt);
  }

  async generateGrowthInsight(
    ritualSessions: RitualSession[],
    journalEntries: JournalEntry[],
    moodEntries: MoodEntry[]
  ): Promise<string> {
    const completedSessions = ritualSessions.filter(s => s.completed).length;
    const journalStreak = this.calculateJournalStreak(journalEntries);
    
    const prompt = `
      As a growth coach, celebrate this wellness journey:
      
      Completed ritual sessions: ${completedSessions}
      Journal writing streak: ${journalStreak} days
      Recent mood trend: ${this.getMoodTrend(moodEntries)}
      
      Create an encouraging growth insight that:
      1. Celebrates their consistency and commitment
      2. Highlights positive changes or patterns
      3. Motivates continued wellness practice
      
      Keep response under 100 words with an uplifting, celebratory tone.
    `;

    return await this.makeRequest(prompt);
  }

  private getPreferredElements(_recentSessions: RitualSession[]): string[] {
    // Extract preferred elements from session history
    // This would require joining with ritual room data
    return ['water', 'earth']; // Mock implementation
  }

  private extractThemes(entries: JournalEntry[]): string[] {
    // Simple theme extraction - in production, this could be more sophisticated
    const allText = entries.map(e => e.content.toLowerCase()).join(' ');
    const themes: string[] = [];
    
    if (allText.includes('grateful') || allText.includes('thankful')) themes.push('gratitude');
    if (allText.includes('stress') || allText.includes('anxious')) themes.push('stress management');
    if (allText.includes('grow') || allText.includes('learn')) themes.push('personal growth');
    if (allText.includes('peace') || allText.includes('calm')) themes.push('seeking peace');
    if (allText.includes('energy') || allText.includes('motivated')) themes.push('energy and motivation');
    
    return themes.slice(0, 3); // Return top 3 themes
  }

  private calculateJournalStreak(entries: JournalEntry[]): number {
    // Calculate consecutive days of journaling
    const sortedEntries = entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    let streak = 0;
    let currentDate = new Date();
    
    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date);
      const daysDiff = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
        currentDate = entryDate;
      } else {
        break;
      }
    }
    
    return streak;
  }

  private getMoodTrend(entries: MoodEntry[]): string {
    if (entries.length < 2) return 'stable';
    
    const recent = entries.slice(-5);
    const older = entries.slice(-10, -5);
    
    const recentAvg = recent.reduce((sum, e) => sum + e.mood, 0) / recent.length;
    const olderAvg = older.reduce((sum, e) => sum + e.mood, 0) / older.length;
    
    if (recentAvg > olderAvg + 0.5) return 'improving';
    if (recentAvg < olderAvg - 0.5) return 'declining';
    return 'stable';
  }
}

// Singleton instance
export const geminiAI = new GeminiAIService();
