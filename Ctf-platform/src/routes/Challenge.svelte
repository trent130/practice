<script lang="ts">
    import { onMount } from 'svelte';
    import { hints } from '../stores/hints.js';
    import { scoring } from '../stores/scoring.js';
    import { notifications } from '../stores/notifications.js';
    import { user } from '../stores/user.js';
    import HintSystem from '../components/HintSystem.svelte';
    import ScoreDisplay from '../components/ScoreDisplay.svelte';
    
    // Get route parameter
    export let params: { id?: string } = {};
    
    // Challenge data with proper typing
    interface Challenge {
      id: number;
      title: string;
      category: string;
      points: number;
      difficulty: string;
      description: string;
      longDescription: string;
      solvedCount: number;
      tags: string[];
      firstBlood: string;
      files: Array<{ name: string; url: string; }>;
      author: string;
      releaseDate: string;
      solved: boolean;
      flag?: string; // Only for demo
    }
  
    // Initialize challenge with null
    let challenge: Challenge | null = null;
    let flagInput = "";
    let submitStatus = "";
    
    onMount(async () => {
      if (!params.id) return;
      
      // In a real app, this would fetch from an API
      challenge = {
        id: parseInt(params.id),
        title: "SQL Injection Basics",
        category: "Web",
        points: 100,
        difficulty: "Easy",
        description: "Learn basic SQL injection techniques and understand how to prevent them.",
        longDescription: `In this challenge, you'll explore common SQL injection vulnerabilities and learn how to exploit them safely in a controlled environment. 
  
  Your task is to bypass the login form and extract sensitive information from the database.`,
        solvedCount: 45,
        tags: ["sql", "web-security", "injection"],
        firstBlood: "h4ck3r",
        files: [
          {
            name: "challenge.php",
            url: "/files/sql-injection-basics/challenge.php"
          }
        ],
        author: "securitywizard",
        releaseDate: "2024-03-01",
        solved: false,
        flag: "ctf{sql_injection_master}" // Only for demo
      };
  
      // Initialize hints for this challenge
      hints.addHints(challenge.id, [
        {
          id: 1,
          challengeId: challenge.id,
          content: "Look at how the login form processes user input",
          cost: 10
        },
        {
          id: 2,
          challengeId: challenge.id,
          content: "Try adding special SQL characters to the input",
          cost: 20
        },
        {
          id: 3,
          challengeId: challenge.id,
          content: "UNION SELECT might be useful here",
          cost: 30
        }
      ]);
    });
  
    function submitFlag() {
      if (!challenge || !$user) return;
      
      const unlockedHints = ($hints[challenge.id] || []).filter(h => h.unlocked).length;
      const basePoints = challenge.points;
      const timeBonus = scoring.calculateTimeBonus(basePoints, new Date(challenge.releaseDate).getTime());
      const finalPoints = scoring.calculateHintPenalty(unlockedHints, basePoints + (timeBonus || 0));
      
      if (flagInput.trim() === challenge.flag) {
        scoring.addScore($user.id, {
          challengeId: challenge.id,
          points: finalPoints,
          timestamp: Date.now(),
          hintsUsed: unlockedHints,
          timeBonus
        });
        
        challenge.solved = true;
        submitStatus = "success";
        
        notifications.add({
          type: 'success',
          message: `Challenge solved! +${finalPoints} points${timeBonus ? ` (includes ${timeBonus} time bonus)` : ''}`
        });
      } else {
        submitStatus = "error";
        notifications.add({
          type: 'error',
          message: 'Incorrect flag. Try again!'
        });
      }
    }
  </script>
  
  {#if challenge}
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <ScoreDisplay />
      </div>
  
      <div class="bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h1 class="text-3xl font-bold mb-2">{challenge.title}</h1>
            <div class="flex items-center gap-4 mb-4">
              <span class="bg-blue-500 px-3 py-1 rounded-full text-sm">
                {challenge.category}
              </span>
              <span class="text-yellow-400">
                {challenge.difficulty}
              </span>
              <span class="text-blue-400">
                {challenge.points} points
              </span>
            </div>
          </div>
          {#if challenge.solved}
            <div class="bg-green-500 px-4 py-2 rounded-lg">
              Solved
            </div>
          {/if}
        </div>
  
        <div class="prose prose-invert max-w-none mb-8">
          <p class="text-gray-300 whitespace-pre-line">{challenge.longDescription}</p>
        </div>
  
        <div class="mb-8">
          <h2 class="text-xl font-bold mb-4">Challenge Files</h2>
          <div class="bg-gray-700 rounded-lg p-4">
            {#each challenge.files as file}
              <a
                href={file.url}
                class="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                download
              >
              
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {file.name}
              </a>
            {/each}
          </div>
        </div>
  
        <div class="mb-8">
          <h2 class="text-xl font-bold mb-4">Submit Flag</h2>
          <form on:submit|preventDefault={submitFlag} class="space-y-4">
            <div>
              <input
                type="text"
                bind:value={flagInput}
                placeholder="Enter flag (format: ctf{challenge.flag})"
                class="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg transition-colors duration-300"
            >
              Submit Flag
            </button>
          </form>
        </div>
  
        <div class="mb-8">
          <h2 class="text-xl font-bold mb-4">Hints</h2>
          <HintSystem challengeId={challenge.id} />
        </div>
  
        <div>
          <h2 class="text-xl font-bold mb-4">Challenge Information</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-gray-400">Author</p>
              <p>{challenge.author}</p>
            </div>
            <div>
              <p class="text-gray-400">Release Date</p>
              <p>{new Date(challenge.releaseDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p class="text-gray-400">First Blood</p>
              <p>{challenge.firstBlood}</p>
            </div>
            <div>
              <p class="text-gray-400">Solved By</p>
              <p>{challenge.solvedCount} users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="max-w-4xl mx-auto">
      <div class="bg-gray-800 rounded-lg shadow-lg p-8">
        <p class="text-center text-gray-400">Loading challenge...</p>
      </div>
    </div>
  {/if}