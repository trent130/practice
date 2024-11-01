<script lang="ts">
    let teams = [
      {
        id: 1,
        name: "Elite Hackers",
        members: ["h4ck3r", "cyberninja", "securitypro"],
        points: 5000,
        rank: 1,
        solvedChallenges: 25,
        captain: "h4ck3r",
        created: "2024-01-15"
      },
      {
        id: 2,
        name: "Binary Bandits",
        members: ["ctfmaster", "pentester"],
        points: 3500,
        rank: 2,
        solvedChallenges: 18,
        captain: "ctfmaster",
        created: "2024-01-20"
      }
    ];
  
    let showCreateTeam = false;
    let newTeamName = "";
    
    function createTeam() {
      // Handle team creation
      showCreateTeam = false;
      newTeamName = "";
    }
  </script>
  
  <div class="max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">Teams</h1>
      <button
        on:click={() => showCreateTeam = true}
        class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors duration-300"
      >
        Create Team
      </button>
    </div>
  
    {#if showCreateTeam}
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-gray-800 p-8 rounded-lg w-full max-w-md">
          <h2 class="text-2xl font-bold mb-4">Create New Team</h2>
          <form on:submit|preventDefault={createTeam} class="space-y-4">
            <div>
              <label for="teamName" class="block mb-2">Team Name</label>
              <input
                type="text"
                id="teamName"
                bind:value={newTeamName}
                class="w-full p-2 bg-gray-700 rounded-lg"
                required
              />
            </div>
            <div class="flex justify-end gap-4">
              <button
                type="button"
                on:click={() => showCreateTeam = false}
                class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    {/if}
  
    <div class="grid gap-6">
      {#each teams as team}
        <div class="bg-gray-800 rounded-lg shadow-lg p-6">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 class="text-2xl font-bold mb-2">{team.name}</h2>
              <p class="text-gray-400">Created {new Date(team.created).toLocaleDateString()}</p>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-blue-400">{team.points}</p>
              <p class="text-gray-400">Rank #{team.rank}</p>
            </div>
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-gray-700 p-4 rounded-lg">
              <p class="text-gray-400 mb-1">Captain</p>
              <p class="font-semibold">{team.captain}</p>
            </div>
            <div class="bg-gray-700 p-4 rounded-lg">
              <p class="text-gray-400 mb-1">Members</p>
              <p class="font-semibold">{team.members.length}</p>
            </div>
            <div class="bg-gray-700 p-4 rounded-lg">
              <p class="text-gray-400 mb-1">Challenges Solved</p>
              <p class="font-semibold">{team.solvedChallenges}</p>
            </div>
          </div>
  
          <div>
            <h3 class="font-semibold mb-2">Team Members</h3>
            <div class="bg-gray-700 rounded-lg">
              {#each team.members as member}
                <div class="p-3 border-b border-gray-600 last:border-0 flex justify-between items-center">
                  <span>{member}</span>
                  {#if member === team.captain}
                    <span class="text-yellow-400 text-sm">Captain</span>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>