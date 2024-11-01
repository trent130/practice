<script lang="ts">
    const users = [
      { rank: 1, username: "h4ck3r", points: 2500, solved: 15 },
      { rank: 2, username: "cyberninja", points: 2200, solved: 13 },
      { rank: 3, username: "securitypro", points: 2000, solved: 12 },
      { rank: 4, username: "ctfmaster", points: 1800, solved: 10 },
      { rank: 5, username: "pentester", points: 1600, solved: 9 },
    ];
  </script>
  
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold mb-8">Leaderboard</h1>
    <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left">Rank</th>
            <th class="px-6 py-3 text-left">Username</th>
            <th class="px-6 py-3 text-left">Points</th>
            <th class="px-6 py-3 text-left">Challenges Solved</th>
          </tr>
        </thead>
        <tbody>
          {#each users as user}
            <tr class="border-t border-gray-700">
              <td class="px-6 py-4">{user.rank}</td>
              <td class="px-6 py-4">{user.username}</td>
              <td class="px-6 py-4">{user.points}</td>
              <td class="px-6 py-4">{user.solved}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>