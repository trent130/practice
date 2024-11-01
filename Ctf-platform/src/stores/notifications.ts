import { writable } from 'svelte/store';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  timestamp: number;
}

function createNotificationStore() {
  const { subscribe, update } = writable<Notification[]>([]);

  return {
    subscribe,
    add: (notification: Omit<Notification, 'id' | 'timestamp'>) => {
      const id = Math.random().toString(36).slice(2);
      update(notifications => [
        { ...notification, id, timestamp: Date.now() },
        ...notifications
      ]);
      setTimeout(() => {
        update(notifications => notifications.filter(n => n.id !== id));
      }, 5000);
    },
    remove: (id: string) => {
      update(notifications => notifications.filter(n => n.id !== id));
    }
  };
}

export const notifications = createNotificationStore();