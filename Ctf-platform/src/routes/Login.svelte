<script lang="ts">
    let email = "";
    let password = "";
  
    function handleLogin() {
      // Handle login logic here
      console.log("Login attempt", { email, password });
    }
  </script>
  
  <div class="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold mb-6">Login</h1>
    <form on:submit|preventDefault={handleLogin}>
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
      <div class="mb-6">
        <label for="password" class="block mb-2">Password</label>
        <input
          type="password"
          id="password"
          bind:value={password}
          class="w-full p-2 rounded bg-gray-700 text-white"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
      >
        Login
      </button>
    </form>
  </div>