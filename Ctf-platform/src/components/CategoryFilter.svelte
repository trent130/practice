<script lang="ts">
  export let categories: string[];
  export let selected: string;
</script>

<div class="flex flex-wrap gap-2">
  {#each categories as category}
    <button
      class="px-4 py-2 rounded-full transition-colors duration-300 {
        selected === category
          ? 'bg-blue-600 text-white'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }"
      on:click={() => selected = category}
    >
      {category}
    </button>
  {/each}
</div>