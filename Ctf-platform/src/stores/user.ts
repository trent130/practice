import { writable } from 'svelte/store';

export interface UserSettings {
  darkMode: boolean;
  notifications: {
    challengeReleases: boolean;
    teamUpdates: boolean;
    achievements: boolean;
  };
  displayName: string;
  bio: string;
  avatar: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  points: number;
  rank: number;
  settings: UserSettings;
}

const defaultSettings: UserSettings = {
  darkMode: true,
  notifications: {
    challengeReleases: true,
    teamUpdates: true,
    achievements: true
  },
  displayName: '',
  bio: '',
  avatar: ''
};

function createUserStore() {
  const { subscribe, set, update } = writable<User | null>(null);

  return {
    subscribe,
    login: (userData: User) => set(userData),
    logout: () => set(null),
    updateSettings: (settings: Partial<UserSettings>) => {
      update(user => {
        if (!user) return null;
        return {
          ...user,
          settings: { ...user.settings, ...settings }
        };
      });
    }
  };
}

export const user = createUserStore();