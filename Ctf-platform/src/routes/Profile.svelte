<script lang="ts">
    const user = {
      username: "cyberninja",
      joinDate: "2024-01-15",
      totalPoints: 2200,
      rank: 2,
      solvedChallenges: [
        {
          id: 1,
          title: "Web Exploitation 101",
          category: "Web",
          points: 100,
          solvedAt: "2024-02-01",
        },
        {
          id: 2,
          title: "Cryptography Challenge",
          category: "Crypto",
          points: 200,
          solvedAt: "2024-02-15",
        },
      ],
      badges: [
        {
          name: "Web Master",
          description: "Solved 10 web challenges",
          icon: "🌐",
        },
        {
          name: "Quick Solver",
          description: "Solved a challenge within 5 minutes of release",
          icon: "⚡",
        },
      ],
    };
  </script>
  
  <div class="max-w-4xl mx-auto">
    <div class="bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
      <div class="flex items-center gap-6 mb-6">
        <div class="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-3xl">
          {user.username[0].toUpperCase()}
        </div>
        <div>
          <h1 class="text-3xl font-bold mb-2">{user.username}</h1>
          <p class="text-gray-400">Joined {new Date(user.joinDate).toLocaleDateString()}</p>
        </div>
      </div>
  
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-gray-700 p-4 rounded-lg text-center">
          <p class="text-gray-400 mb-1">Rank</p>
          <p class="text-2xl font-bold">#{user.rank}</p>
        </div>
        <div class="bg-gray-700 p-4 rounded-lg text-center">
          <p class="text-gray-400 mb-1">Total Points</p>
          <p class="text-2xl font-bold">{user.totalPoints}</p>
        </div>
        <div class="bg-gray-700 p-4 rounded-lg text-center">
          <p class="text-gray-400 mb-1">Solved Challenges</p>
          <p class="text-2xl font-bold">{user.solvedChallenges.length}</p>
        </div>
      </div>
  
      <div class="mb-8">
        <h2 class="text-xl font-bold mb-4">Badges</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          {#each user.badges as badge}
            <div class="bg-gray-700 p-4 rounded-lg text-center">
              <div class="text-3xl mb-2">{badge.icon}</div>
              <p class="font-semibold mb-1">{badge.name}</p>
              <p class="text-sm text-gray-400">{badge.description}</p>
            </div>
          {/each}
        </div>
      </div>
  
      <div>
        <h2 class="text-xl font-bold mb-4">Solved Challenges</h2>
        <div class="bg-gray-700 rounded-lg overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-600">
              <tr>
                <th class="px-4 py-2 text-left">Challenge</th>
                <th class="px-4 py-2 text-left">Category</th>
                <th class="px-4 py-2 text-left">Points</th>
                <th class="px-4 py-2 text-left">Solved At</th>
              </tr>
            </thead>
            <tbody>
              {#each user.solvedChallenges as challenge}
                <tr class="border-t border-gray-600">
                  <td class="px-4 py-2">{challenge.title}</td>
                  <td class="px-4 py-2">{challenge.category}</td>
                  <td class="px-4 py-2">{challenge.points}</td>
                  <td class="px-4 py-2">{new Date(challenge.solvedAt).toLocaleDateString()}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>