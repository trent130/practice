<script lang="ts">
    export let value = "";
  </script>
  
  <div class="relative">
    <input
      type="text"
      bind:value
      placeholder="Search challenges..."
      class="w-full md:w-64 px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <svg
      class="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>