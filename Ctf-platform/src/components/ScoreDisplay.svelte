<script lang="ts">
    import { userTotalScore } from '../stores/scoring.js';
    import { user } from '../stores/user.js';
  
    export let showRank = true;
  </script>
  
  <div class="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
    <div>
      <p class="text-sm text-gray-400">Total Score</p>
      <p class="text-2xl font-bold">{$userTotalScore}</p>
    </div>
    {#if showRank && $user}
      <div class="text-right">
        <p class="text-sm text-gray-400">Rank</p>
        <p class="text-2xl font-bold">#{$user.rank}</p>
      </div>
    {/if}
  </div>