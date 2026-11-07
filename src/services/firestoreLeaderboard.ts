import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  getDocs
} from 'firebase/firestore';
import { db } from './firebase';
import { LeaderboardEntry } from '../types/game';
import { StorageService } from './storage';

const COLLECTION_NAME = 'leaderboard';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
    },
    operationType,
    path
  };
  console.warn('Firestore Notice: ', JSON.stringify(errInfo));
}

export const FirestoreLeaderboardService = {
  // Subscribe to real-time leaderboard updates from Google Firebase
  subscribeLeaderboard(
    onUpdate: (entries: LeaderboardEntry[], isLive: boolean) => void
  ): () => void {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('score', 'desc'),
      limit(50)
    );

    // Initial cache sync
    const localCached = StorageService.getLeaderboard();
    onUpdate(localCached, false);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: LeaderboardEntry[] = [];
          snapshot.forEach((d) => {
            const data = d.data() as LeaderboardEntry;
            list.push({
              id: d.id,
              name: data.name || '알 수 없음',
              avatar: data.avatar || '🚀',
              badgeTitle: data.badgeTitle || '초보 탐험가',
              score: typeof data.score === 'number' ? data.score : 0,
              stars: typeof data.stars === 'number' ? data.stars : 0,
              clearedCount: typeof data.clearedCount === 'number' ? data.clearedCount : 0,
              date: data.date || '',
              isCurrentPlayer: data.isCurrentPlayer || false
            });
          });

          // Sync incoming Firebase list into browser local cache
          list.forEach(entry => StorageService.saveLeaderboardEntry(entry));
          onUpdate(list, true);
        } else {
          // If Firestore collection is empty, seed it with default kindergarten friends
          this.seedInitialLeaderboard();
          onUpdate(localCached, true);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, COLLECTION_NAME);
        // Fallback to local storage cache if network or permission fails
        const fallback = StorageService.getLeaderboard();
        onUpdate(fallback, false);
      }
    );

    return unsubscribe;
  },

  // Seed default friends to Firestore
  async seedInitialLeaderboard() {
    try {
      const defaultEntries = StorageService.getLeaderboard();
      for (const entry of defaultEntries) {
        await setDoc(doc(db, COLLECTION_NAME, entry.id), entry, { merge: true });
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, COLLECTION_NAME);
    }
  },

  // Save or update an entry in Firebase and local storage cache
  async saveEntry(entry: LeaderboardEntry): Promise<void> {
    // 1. Immediately save to browser cache (localStorage)
    StorageService.saveLeaderboardEntry(entry);

    // 2. Real-time sync to Google Firebase Firestore
    try {
      await setDoc(
        doc(db, COLLECTION_NAME, entry.id),
        {
          id: entry.id,
          name: entry.name,
          avatar: entry.avatar,
          badgeTitle: entry.badgeTitle,
          score: entry.score,
          stars: entry.stars,
          clearedCount: entry.clearedCount,
          date: entry.date,
          isCurrentPlayer: entry.isCurrentPlayer || false
        },
        { merge: true }
      );
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `${COLLECTION_NAME}/${entry.id}`);
    }
  },

  // Delete an entry from Firebase and local storage
  async deleteEntry(id: string): Promise<void> {
    StorageService.deleteLeaderboardEntry(id);
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
    }
  }
};
