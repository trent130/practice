<script lang="ts">
    import { notifications, type Notification } from '../stores/notifications.js';
    import { fly } from 'svelte/transition';
  
    $: sortedNotifications = $notifications.sort((a, b) => b.timestamp - a.timestamp);
  
    const icons = {
      success: '✓',
      error: '✕',
      info: 'ℹ'
    };
  
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500'
    };
  </script>
  
  <div class="fixed top-4 right-4 z-50 space-y-2">
    {#each sortedNotifications as notification (notification.id)}
      <div
        transition:fly={{ x: 20, duration: 300 }}
        class="flex items-center gap-2 p-4 rounded-lg shadow-lg {colors[notification.type]} text-white"
      >
        <span class="text-lg">{icons[notification.type]}</span>
        <p>{notification.message}</p>
        <button
          class="ml-4 hover:opacity-75"
          on:click={() => notifications.remove(notification.id)}
        >
          ✕
        </button>
      </div>
    {/each}
  </div>