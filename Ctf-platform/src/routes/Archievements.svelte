<script lang="ts">
    let achievements = [
      {
        id: 1,
        name: "First Blood",
        description: "Be the first to solve a challenge",
        icon: "🩸",
        progress: 1,
        total: 1,
        completed: true,
        unlockedAt: "2024-02-15"
      },
      {
        id: 2,
        name: "Web Master",
        description: "Solve 10 web challenges",
        icon: "🌐",
        progress: 7,
        total: 10,
        completed: false
      },
      {
        id: 3,
        name: "Crypto King",
        description: "Solve all cryptography challenges",
        icon: "👑",
        progress: 4,
        total: 8,
        completed: false
      },
      {
        id: 4,
        name: "Speed Demon",
        description: "Solve a challenge within 5 minutes of release",
        icon: "⚡",
        progress: 1,
        total: 1,
        completed: true,
        unlockedAt: "2024-02-20"
      }
    ];
  
    let categories = ["All", "Completed", "In Progress"];
    let selectedCategory = "All";
  
    $: filteredAchievements = achievements.filter(achievement => {
      if (selectedCategory === "All") return true;
      if (selectedCategory === "Completed") return achievement.completed;
      if (selectedCategory === "In Progress") return !achievement.completed;
      return true;
    });
  </script>
  
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold mb-8">Achievements</h1>
  
    <div class="mb-8">
      <div class="flex gap-4">
        {#each categories as category}
          <button
            class="px-4 py-2 rounded-full transition-colors duration-300 {
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }"
            on:click={() => selectedCategory = category}
          >
            {category}
          </button>
        {/each}
      </div>
    </div>
  
    <div class="grid gap-6">
      {#each filteredAchievements as achievement}
        <div class="bg-gray-800 rounded-lg shadow-lg p-6">
          <div class="flex items-start gap-6">
            <div class="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-3xl">
              {achievement.icon}
            </div>
            <div class="flex-1">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h2 class="text-xl font-bold">{achievement.name}</h2>
                  <p class="text-gray-400">{achievement.description}</p>
                </div>
                {#if achievement.completed}
                  <span class="bg-green-500 px-3 py-1 rounded-full text-sm">
                    Completed
                  </span>
                {/if}
              </div>
              <div class="mt-4">
                <div class="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{achievement.progress}/{achievement.total}</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div
                    class="bg-blue-600 rounded-full h-2"
                    style="width: {(achievement.progress / achievement.total) * 100}%"
                  ></div>
                </div>
              </div>
              {#if achievement.completed && achievement.unlockedAt}
                  <p class="text-sm text-gray-400 mt-4">
                    Unlocked on {new Date(achievement.unlockedAt ?? '').toLocaleDateString()}
                  </p>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>