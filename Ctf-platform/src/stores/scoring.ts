import { writable, derived } from 'svelte/store';
import { user } from './user';

export interface Score {
  challengeId: number;
  points: number;
  timestamp: number;
  hintsUsed: number;
  timeBonus?: number;
}

function createScoringStore() {
  const { subscribe, update } = writable<Record<string, Score[]>>({});

  return {
    subscribe,
    addScore: (userId: string, score: Score) => {
      update(scores => ({
        ...scores,
        [userId]: [...(scores[userId] || []), score]
      }));
    },
    calculateTimeBonus: (basePoints: number, releaseTime: number): number => {
      const hoursSinceRelease = (Date.now() - releaseTime) / (1000 * 60 * 60);
      if (hoursSinceRelease <= 1) return Math.floor(basePoints * 0.5); // 50% bonus in first hour
      if (hoursSinceRelease <= 6) return Math.floor(basePoints * 0.25); // 25% bonus in first 6 hours
      return 0;
    },
    calculateHintPenalty: (hintsUsed: number, basePoints: number): number => {
      return Math.floor(basePoints * (1 - (hintsUsed * 0.25))); // 25% penalty per hint
    }
  };
}

export const scoring = createScoringStore();

export const userTotalScore = derived(
  [scoring, user],
  ([$scoring, $user]) => {
    if (!$user) return 0;
    const userScores = $scoring[$user.id] || [];
    return userScores.reduce((total, score) => total + score.points, 0);
  }
);