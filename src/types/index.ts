export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
  isCourseUser?: boolean;
  trialStartDate?: string;
  isTrialActive?: boolean;
  hasPaid?: boolean;
  paymentDate?: string;
  homeworkSubmission?: string;
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
  isCourseUser?: boolean;
  trialStartDate?: string;
  isTrialActive?: boolean;
  hasPaid?: boolean;
  paymentDate?: string;
  homeworkSubmission?: string;
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

// Mirani Well Types
export type ElementType = 'earth' | 'water' | 'fire' | 'air';

export type RitualRoom = {
  id: string;
  element: ElementType;
  name: string;
  description: string;
  duration: number;
  practices: Practice[];
  imageUrl?: string;
  color: string;
};

export type Practice = {
  id: string;
  type: 'meditation' | 'breathing' | 'visualization' | 'movement';
  title: string;
  instructions: string[];
  audioUrl?: string;
  duration: number;
};

export type JournalEntry = {
  id: string;
  userId: string;
  date: Date;
  mood: number; // 1-10 scale
  content: string;
  tags: string[];
  isPrivate: boolean;
  gratitude?: string[];
  intention?: string;
};

export type Affirmation = {
  id: string;
  text: string;
  element: ElementType;
  category: string;
  isFavorite?: boolean;
};

export type AIInsight = {
  id: string;
  userId: string;
  type: 'reflection' | 'ritual_suggestion' | 'mood_analysis' | 'growth_insight';
  content: string;
  data?: any;
  generatedAt: Date;
  isRead: boolean;
  imageUrl?: string;
};

export type MoodEntry = {
  id: string;
  userId: string;
  date: Date;
  mood: number;
  energy: number;
  stress: number;
  notes?: string;
};

export type RitualSession = {
  id: string;
  userId: string;
  ritualRoomId: string;
  practiceId: string;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  rating?: number;
  notes?: string;
};
