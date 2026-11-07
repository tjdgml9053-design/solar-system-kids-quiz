import { LeaderboardEntry, PlayerProfile, StageProgress } from '../types/game';
import { PLANETS_DATA } from '../data/planets';

const STORAGE_KEYS = {
  CURRENT_PROFILE: 'SOLAR_EXPLORER_PROFILE_V3',
  LEADERBOARD: 'SOLAR_EXPLORER_LEADERBOARD_V3',
  PROFILES_LIST: 'SOLAR_EXPLORER_ALL_PROFILES_V3',
};

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'friend_1',
    name: '김우주 대원',
    avatar: '👨‍🚀',
    badgeTitle: '태양계 대통일 마스터',
    score: 3000,
    stars: 30,
    clearedCount: 10,
    date: '2026.11.06'
  },
  {
    id: 'friend_2',
    name: '이지우 별빛탐험가',
    avatar: '🚀',
    badgeTitle: '황금 별빛 마스터',
    score: 2850,
    stars: 28,
    clearedCount: 10,
    date: '2026.11.05'
  },
  {
    id: 'friend_3',
    name: '박하준 로켓소년',
    avatar: '🪐',
    badgeTitle: '환상의 고리 탐험왕',
    score: 2400,
    stars: 24,
    clearedCount: 8,
    date: '2026.11.04'
  },
  {
    id: 'friend_4',
    name: '최서아 은하수요정',
    avatar: '⭐',
    badgeTitle: '반짝반짝 별 수집가',
    score: 1950,
    stars: 19,
    clearedCount: 7,
    date: '2026.11.03'
  },
  {
    id: 'friend_5',
    name: '로봇 삐뽀 (AI)',
    avatar: '🤖',
    badgeTitle: '가이드 로봇 대장',
    score: 1500,
    stars: 15,
    clearedCount: 5,
    date: '2026.11.01'
  }
];

function generateDefaultProgress(): Record<string, StageProgress> {
  const progress: Record<string, StageProgress> = {};
  PLANETS_DATA.forEach((planet, index) => {
    progress[planet.id] = {
      planetId: planet.id,
      unlocked: index === 0, // First planet (Sun) is unlocked by default
      cleared: false,
      stars: 0,
      bestScore: 0,
      attempts: 0
    };
  });
  return progress;
}

export const StorageService = {
  // Load current player profile from browser cache
  getProfile(): PlayerProfile {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.CURRENT_PROFILE);
      if (cached) {
        const parsed = JSON.parse(cached) as PlayerProfile;
        // Merge in case planets were added or progress missing keys
        const defaultProgress = generateDefaultProgress();
        const mergedProgress = { ...defaultProgress, ...(parsed.progress || {}) };
        return {
          ...parsed,
          progress: mergedProgress,
          badges: parsed.badges || []
        };
      }
    } catch (e) {
      console.warn('Storage read failed, falling back to default profile:', e);
    }

    const newProfile: PlayerProfile = {
      id: 'pilot_' + Date.now().toString(36),
      name: '새싹 우주비행사',
      avatar: '🚀',
      title: '용감한 7세 탐험가',
      starsTotal: 0,
      scoreTotal: 0,
      progress: generateDefaultProgress(),
      badges: [],
      ttsEnabled: true,
      soundEnabled: true,
      createdAt: new Date().toISOString()
    };
    this.saveProfile(newProfile);
    return newProfile;
  },

  // Save profile to browser cache immediately
  saveProfile(profile: PlayerProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_PROFILE, JSON.stringify(profile));
      // Also automatically update or create their entry on the cached leaderboard
      this.syncPlayerToLeaderboard(profile);
    } catch (e) {
      console.error('Failed to save profile to localStorage:', e);
    }
  },

  // Leaderboard data from browser cache
  getLeaderboard(): LeaderboardEntry[] {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
      if (cached) {
        const parsed = JSON.parse(cached) as LeaderboardEntry[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.sort((a, b) => b.score - a.score);
        }
      }
    } catch (e) {
      console.warn('Failed to read leaderboard from cache:', e);
    }

    // Initialize with default friends
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(INITIAL_LEADERBOARD));
    return [...INITIAL_LEADERBOARD].sort((a, b) => b.score - a.score);
  },

  // Add or update a friend entry to browser cache
  saveLeaderboardEntry(entry: LeaderboardEntry): LeaderboardEntry[] {
    try {
      const currentList = this.getLeaderboard();
      const existingIdx = currentList.findIndex(e => e.id === entry.id || e.name === entry.name);
      let updated: LeaderboardEntry[];

      if (existingIdx >= 0) {
        // Keep highest score
        const existing = currentList[existingIdx];
        updated = [...currentList];
        updated[existingIdx] = {
          ...existing,
          ...entry,
          score: Math.max(existing.score, entry.score),
          stars: Math.max(existing.stars, entry.stars),
          clearedCount: Math.max(existing.clearedCount, entry.clearedCount),
          date: entry.date || existing.date
        };
      } else {
        updated = [entry, ...currentList];
      }

      const sorted = updated.sort((a, b) => b.score - a.score);
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(sorted));
      return sorted;
    } catch (e) {
      console.error('Failed to save leaderboard entry to cache:', e);
      return this.getLeaderboard();
    }
  },

  // Delete an entry from leaderboard
  deleteLeaderboardEntry(id: string): LeaderboardEntry[] {
    try {
      const currentList = this.getLeaderboard();
      const filtered = currentList.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(filtered));
      return filtered;
    } catch (e) {
      console.error('Failed to delete entry from cache:', e);
      return this.getLeaderboard();
    }
  },

  // Sync current player to the cached leaderboard
  syncPlayerToLeaderboard(profile: PlayerProfile): void {
    const clearedCount = Object.values(profile.progress).filter(p => p.cleared).length;
    let badgeTitle = '초보 탐험가';
    if (clearedCount >= 10) badgeTitle = '태양계 대통일 마스터';
    else if (clearedCount >= 7) badgeTitle = '은하수 탐험 대장';
    else if (clearedCount >= 4) badgeTitle = '우주 비행 베테랑';
    else if (clearedCount >= 1) badgeTitle = '첫 비행 우주대원';

    const playerEntry: LeaderboardEntry = {
      id: profile.id,
      name: profile.name,
      avatar: profile.avatar,
      badgeTitle: badgeTitle,
      score: profile.scoreTotal,
      stars: profile.starsTotal,
      clearedCount: clearedCount,
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      isCurrentPlayer: true
    };

    this.saveLeaderboardEntry(playerEntry);
  },

  // Reset progress while keeping leaderboard friends
  resetCurrentProfile(): PlayerProfile {
    const profile = this.getProfile();
    const freshProfile: PlayerProfile = {
      ...profile,
      starsTotal: 0,
      scoreTotal: 0,
      progress: generateDefaultProgress(),
      badges: []
    };
    this.saveProfile(freshProfile);
    return freshProfile;
  }
};
