<script lang="ts">
    import { hints, type Hint } from '../stores/hints';
    import { scoring } from '../stores/scoring';
    import { notifications } from '../stores/notifications';
    import { user } from '../stores/user';
  
    export let challengeId: number;
    
    let challengeHints: Hint[] = [];
    $: challengeHints = $hints[challengeId] || [];
  
    function unlockHint(hint: Hint) {
      if (!$user) {
        notifications.add({
          type: 'error',
          message: 'Please login to unlock hints'
        });
        return;
      }
  
      if (hint.unlocked) return;
  
      const userPoints = $user.points || 0;
      if (userPoints < hint.cost) {
        notifications.add({
          type: 'error',
          message: `Not enough points! You need ${hint.cost} points to unlock this hint`
        });
        return;
      }
  
      hints.unlockHint(challengeId, hint.id);
    }
  </script>
  
  <div class="space-y-4">
    {#each challengeHints as hint (hint.id)}
      <div class="bg-gray-700 rounded-lg p-4">
        {#if hint.unlocked}
          <p class="text-gray-300">{hint.content}</p>
        {:else}
          <div class="flex justify-between items-center">
            <span class="text-gray-400">Hint {hint.id}</span>
            <button
              class="text-blue-400 hover:text-blue-300"
              on:click={() => unlockHint(hint)}
            >
              Unlock (-{hint.cost} points)
            </button>
          </div>
        {/if}
      </div>
    {/each}
  </div>