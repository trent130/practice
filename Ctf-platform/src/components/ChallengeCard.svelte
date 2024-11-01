<script lang="ts">
    import { Link } from "svelte-routing";
  
    export let challenge: {
      id: number;
      title: string;
      category: string;
      points: number;
      difficulty: string;
      description: string;
      solvedCount: number;
      tags: string[];
      firstBlood: string;
    };
  
    const difficultyColor = {
      Easy: "text-green-400",
      Medium: "text-yellow-400",
      Hard: "text-red-400",
    };
  
    const categoryColor = {
      Web: "bg-blue-500",
      Crypto: "bg-purple-500",
      "Reverse Engineering": "bg-red-500",
      Forensics: "bg-green-500",
      PWN: "bg-orange-500",
      OSINT: "bg-teal-500",
    };
  </script>
  
  <div class="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h2 class="text-xl font-semibold mb-2">{challenge.title}</h2>
        <div class="flex items-center gap-2">
          <span class={`${categoryColor[challenge.category]} px-2 py-1 rounded-full text-xs`}>
            {challenge.category}
          </span>
          <span class={`${difficultyColor[challenge.difficulty]} text-sm`}>
            {challenge.difficulty}
          </span>
        </div>
      </div>
      <span class="px-3 py-1 bg-blue-600 rounded-full text-sm font-semibold">
        {challenge.points} pts
      </span>
    </div>
    
    <p class="text-gray-400 mb-4 line-clamp-2">{challenge.description}</p>
    
    <div class="mb-4">
      <div class="flex flex-wrap gap-2">
        {#each challenge.tags as tag}
          <span class="bg-gray-700 px-2 py-1 rounded-full text-xs text-gray-300">
            #{tag}
          </span>
        {/each}
      </div>
    </div>
  
    <div class="flex items-center justify-between text-sm text-gray-400 mb-4">
      <div>Solved: {challenge.solvedCount}</div>
      <div>First Blood: {challenge.firstBlood}</div>
    </div>
  
    <Link 
      to={`/challenge/${challenge.id}`}
      class="block w-full text-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors duration-300"
    >
      View Challenge
    </Link>
  </div>