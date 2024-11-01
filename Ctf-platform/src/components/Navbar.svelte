<script lang="ts">
    import { Link } from "svelte-routing";
    import { user } from '../stores/user.js';
  
    let showMobileMenu = false;
    let showUserMenu = false;
  
    $: isLoggedIn = !!$user;
  </script>
  
  <nav class="bg-gray-800 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <Link to="/" class="text-xl font-bold">CTF Platform</Link>
        </div>
  
        <!-- Mobile menu button -->
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button
          class="md:hidden p-2"
          on:click={() => showMobileMenu = !showMobileMenu}
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={2}
              d={showMobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
  
        <!-- Desktop menu -->
        <div class="hidden md:flex items-center space-x-4">
          <Link to="/" class="hover:text-blue-400">Challenges</Link>
          <Link to="/leaderboard" class="hover:text-blue-400">Leaderboard</Link>
          <Link to="/teams" class="hover:text-blue-400">Teams</Link>
          {#if isLoggedIn}
            <Link to="/achievements" class="hover:text-blue-400">Achievements</Link>
            <div class="relative">
              <button
                class="flex items-center gap-2 hover:text-blue-400"
                on:click={() => showUserMenu = !showUserMenu}
              >
                <span>{$user?.username}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {#if showUserMenu}
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div
                  class="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg py-2"
                  on:mouseleave={() => showUserMenu = false}
                >
                  <Link
                    to="/profile"
                    class="block px-4 py-2 hover:bg-gray-600"
                    on:click={() => showUserMenu = false}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    class="block px-4 py-2 hover:bg-gray-600"
                    on:click={() => showUserMenu = false}
                  >
                    Settings
                  </Link>
                  <button
                    class="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-600"
                    on:click={() => {
                      user.logout();
                      showUserMenu = false;
                    }}
                  >
                    Logout
                  </button>
                </div>
              {/if}
            </div>
          {:else}
            <Link to="/login" class="hover:text-blue-400">Login</Link>
            <Link
              to="/signup"
              class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors duration-300"
            >
              Sign Up
            </Link>
          {/if}
        </div>
      </div>
  
      <!-- Mobile menu -->
      {#if showMobileMenu}
        <div class="md:hidden py-4 space-y-2">
          <Link
            to="/"
            class="block px-4 py-2 hover:bg-gray-700 rounded"
            on:click={() => showMobileMenu = false}
          >
            Challenges
          </Link>
          <Link
            to="/leaderboard"
            class="block px-4 py-2 hover:bg-gray-700 rounded"
            on:click={() => showMobileMenu = false}
          >
            Leaderboard
          </Link>
          <Link
            to="/teams"
            class="block px-4 py-2 hover:bg-gray-700 rounded"
            on:click={() => showMobileMenu = false}
          >
            Teams
          </Link>
          {#if isLoggedIn}
            <Link
              to="/achievements"
              class="block px-4 py-2 hover:bg-gray-700 rounded"
              on:click={() => showMobileMenu = false}
            >
              Achievements
            </Link>
            <Link
              to="/profile"
              class="block px-4 py-2 hover:bg-gray-700 rounded"
              on:click={() => showMobileMenu = false}
            >
              Profile
            </Link>
            <Link
              to="/settings"
              class="block px-4 py-2 hover:bg-gray-700 rounded"
              on:click={() => showMobileMenu = false}
            >
              Settings
            </Link>
            <button
              class="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded"
              on:click={() => {
                user.logout();
                showMobileMenu = false;
              }}
            >
              Logout
            </button>
          {:else}
            <Link
              to="/login"
              class="block px-4 py-2 hover:bg-gray-700 rounded"
              on:click={() => showMobileMenu = false}
            >
              Login
            </Link>
            <Link
              to="/signup"
              class="block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              on:click={() => showMobileMenu = false}
            >
              Sign Up
            </Link>
          {/if}
        </div>
      {/if}
    </div>
  </nav>