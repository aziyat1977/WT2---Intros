
export interface LogicMap {
  viewA: string;
  viewB: string;
  position: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

export interface GapFill {
  textParts: string[];
  answers: string[];
}

export interface PracticeChamber {
  logic: QuizQuestion;
  trap: QuizQuestion;
  gap: GapFill;
  vocab: QuizQuestion;
}

export interface SurgicalAnalysis {
  topicTitle: string;
  specificQuestion: string;
  theTrap: string;
  logicMap: LogicMap;
  introduction: string;
  practice?: PracticeChamber;
}

// Translation structure
export interface TranslatedContent {
  topicTitle?: string;
  prompt?: string;
  specificQuestion?: string;
  theTrap?: string;
  logicMap?: LogicMap;
  introduction?: string;
  // We can simplify and just translate specific strings found in lines
  lines?: Record<string, string>; 
}

export interface StaticTopic extends SurgicalAnalysis {
  id: number;
  year: string;
  prompt: string;
  translations?: {
    ru: TranslatedContent;
    uz: TranslatedContent;
  };
}

// New Types for the Journey Engine
export type SlideTheme = 'neutral' | 'trap' | 'logic' | 'success' | 'checkpoint';

export interface Milestone {
  id: string;
  label: string; // e.g., "Briefing", "The Trap", "Logic Core"
  icon?: string;
}

export interface Slide {
  id: string;
  type: 'text' | 'interactive' | 'cover' | 'reward' | 'checkpoint';
  theme: SlideTheme;
  overline?: string;
  title?: string;
  lines: string[]; // Strictly 3 max for main visuals
  data?: any;
  milestoneId: string; // Connects slide to a specific milestone
}

export interface UserProgress {
  unlockedModules: number[]; // IDs of modules unlocked
  completedModules: number[]; // IDs of modules finished
}

export type Language = 'en' | 'ru' | 'uz';
