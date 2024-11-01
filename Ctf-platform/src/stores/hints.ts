import { get, writable } from 'svelte/store';
import { notifications } from './notifications.js';

export interface Hint {
  id: number;
  challengeId: number;
  content: string;
  cost: number;
  unlocked: boolean;
}

function createHintStore() {
  const { subscribe, update } = writable<Record<number, Hint[]>>({});

  return {
    subscribe,
    addHints: (challengeId: number, hints: Omit<Hint, 'unlocked'>[]) => {
      update(store => ({
        ...store,
        [challengeId]: hints.map(hint => ({ ...hint, unlocked: false }))
      }));
    },
    unlockHint: (challengeId: number, hintId: number) => {
      update(store => {
        const hints = store[challengeId] || [];
        const updatedHints = hints.map(hint =>
          hint.id === hintId ? { ...hint, unlocked: true } : hint
        );
        
        if (updatedHints.find(h => h.id === hintId)?.unlocked) {
          notifications.add({
            type: 'info',
            message: `Hint unlocked! (-${hints.find(h => h.id === hintId)?.cost || 0} points)`
          });
        }
        
        return { ...store, [challengeId]: updatedHints };
      });
    },
    getUnlockedHints: (challengeId: number) => {
      const store = get(hints);
      return (store[challengeId] || []).filter((hint: { unlocked: any; }) => hint.unlocked);
    }
  };
}

export const hints = createHintStore();