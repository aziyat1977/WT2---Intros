export interface LogicMap {
  viewA: string;
  viewB: string;
  position: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
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

export interface StaticTopic extends SurgicalAnalysis {
  id: number;
  year: string;
  prompt: string;
}