<script lang="ts">
    import CategoryFilter from "../components/CategoryFilter.svelte";
    import ChallengeCard from "../components/ChallengeCard.svelte";
    import SearchBar from "../components/SearchBar.svelte";
  
    const categories = ["All", "Web", "Crypto", "Reverse Engineering", "Forensics", "PWN", "OSINT"];
    let selectedCategory = "All";
    let searchQuery = "";
  
    const challenges = [
      {
        id: 1,
        title: "SQL Injection Basics",
        category: "Web",
        points: 100,
        difficulty: "Easy",
        description: "Learn basic SQL injection techniques and understand how to prevent them.",
        solvedCount: 45,
        tags: ["sql", "web-security", "injection"],
        firstBlood: "h4ck3r",
      },
      {
        id: 2,
        title: "Hidden Message",
        category: "Crypto",
        points: 200,
        difficulty: "Medium",
        description: "Decrypt a message encoded with a combination of classical ciphers.",
        solvedCount: 32,
        tags: ["cryptography", "classical-ciphers"],
        firstBlood: "cryptomaster",
      },
      {
        id: 3,
        title: "Reverse Me",
        category: "Reverse Engineering",
        points: 300,
        difficulty: "Hard",
        description: "Analyze this binary to find the hidden flag. Multiple anti-debugging techniques are used.",
        solvedCount: 12,
        tags: ["binary", "anti-debug", "assembly"],
        firstBlood: "reverser",
      },
      {
        id: 4,
        title: "Memory Dump Analysis",
        category: "Forensics",
        points: 250,
        difficulty: "Medium",
        description: "Analyze a memory dump to find traces of a malware infection.",
        solvedCount: 28,
        tags: ["memory-forensics", "malware"],
        firstBlood: "forensicpro",
      },
      {
        id: 5,
        title: "Buffer Overflow 101",
        category: "PWN",
        points: 150,
        difficulty: "Medium",
        description: "Exploit a basic buffer overflow vulnerability to get the flag.",
        solvedCount: 25,
        tags: ["buffer-overflow", "exploitation"],
        firstBlood: "pwner",
      },
      {
        id: 6,
        title: "Social Engineer",
        category: "OSINT",
        points: 100,
        difficulty: "Easy",
        description: "Use open-source intelligence to find information about a target.",
        solvedCount: 56,
        tags: ["osint", "reconnaissance"],
        firstBlood: "detective",
      }
    ];
  
    $: filteredChallenges = challenges
      .filter(challenge => 
        selectedCategory === "All" || challenge.category === selectedCategory)
      .filter(challenge =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
  </script>
  
  <div class="max-w-6xl mx-auto">
    <div class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-4xl font-bold mb-2">CTF Challenges</h1>
        <p class="text-gray-400">Test your skills across various cybersecurity domains</p>
      </div>
      <SearchBar bind:value={searchQuery} />
    </div>
  
    <CategoryFilter
      {categories}
      bind:selected={selectedCategory}
      class="mb-8"
    />
  
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredChallenges as challenge}
        <ChallengeCard {challenge} />
      {/each}
    </div>
  </div>