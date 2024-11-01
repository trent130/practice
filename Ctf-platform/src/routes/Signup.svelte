<script lang="ts">
    let username = "";
    let email = "";
    let password = "";
    let confirmPassword = "";
  
    function handleSignup() {
      // Handle signup logic here
      console.log("Signup attempt", { username, email, password });
    }
  </script>
  
  <div class="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold mb-6">Sign Up</h1>
    <form on:submit|preventDefault={handleSignup}>
      <div class="mb-4">
        <label for="username" class="block mb-2">Username</label>
        <input
          type="text"
          id="username"
          bind:value={username}
          class="w-full p-2 rounded bg-gray-700 text-white"
          required
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block mb-2">Email</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          class="w-full p-2 rounded bg-gray-700 text-white"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-2">Password</label>
        <input
          type="password"
          id="password"
          bind:value={password}
          class="w-full p-2 rounded bg-gray-700 text-white"
          required
        />
      </div>
      <div class="mb-6">
        <label for="confirmPassword" class="block mb-2">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          bind:value={confirmPassword}
          class="w-full p-2 rounded bg-gray-700 text-white"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
      >
        Sign Up
      </button>
    </form>
  </div>