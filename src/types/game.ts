export interface PlanetClue {
  step: number;
  text: string;
  hintKey: string; // e.g. "가장 뜨거워", "푸른 바다", "고리가 있어"
  robotVoice: string; // Friendly spoken sentence
}

export interface PlanetData {
  id: string;
  name: string;
  englishName: string;
  order: number;
  themeColor: string;
  secondaryColor: string;
  accentColor: string;
  iconEmoji: string;
  summary: string;
  funFact: string;
  sizeComparison: string; // e.g. "지구 11배나 커요!"
  clues: PlanetClue[];
  quizQuestion: string;
  quizWrongOptions: string[];
}

export interface StageProgress {
  planetId: string;
  unlocked: boolean;
  cleared: boolean;
  stars: number; // 0 to 3
  bestScore: number;
  attempts: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'progress' | 'master' | 'social';
  requirement: string;
  unlockedAt?: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string; // emoji or avatar id
  badgeTitle: string;
  score: number;
  stars: number;
  clearedCount: number;
  date: string;
  isCurrentPlayer?: boolean;
}

export interface PlayerProfile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  starsTotal: number;
  scoreTotal: number;
  progress: Record<string, StageProgress>;
  badges: string[]; // Badge IDs
  missionOrder?: string[]; // Randomized planet ID sequence
  ttsEnabled: boolean;
  soundEnabled: boolean;
  createdAt: string;
}
