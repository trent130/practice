<script lang="ts">
    import { user, type UserSettings } from '../stores/user.js';
    import { notifications } from '../stores/notifications.js';
  
    let settings: UserSettings;
    $: settings = $user?.settings || {
      darkMode: true,
      notifications: {
        challengeReleases: true,
        teamUpdates: true,
        achievements: true
      },
      displayName: '',
      bio: '',
      avatar: ''
    };
  
    async function saveSettings() {
      try {
        user.updateSettings(settings);
        notifications.add({
          type: 'success',
          message: 'Settings saved successfully'
        });
      } catch (error) {
        notifications.add({
          type: 'error',
          message: 'Failed to save settings'
        });
      }
    }
  </script>
  
  <div class="bg-gray-800 rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-6">User Settings</h2>
  
    <form on:submit|preventDefault={saveSettings} class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold mb-4">Profile</h3>
        <div class="space-y-4">
          <div>
            <label for="displayName" class="block mb-2">Display Name</label>
            <input
              type="text"
              id="displayName"
              bind:value={settings.displayName}
              class="w-full p-2 bg-gray-700 rounded-lg"
            />
          </div>
          <div>
            <label for="bio" class="block mb-2">Bio</label>
            <textarea
              id="bio"
              bind:value={settings.bio}
              class="w-full p-2 bg-gray-700 rounded-lg h-24"
            ></textarea>
          </div>
        </div>
      </div>
  
      <div>
        <h3 class="text-lg font-semibold mb-4">Preferences</h3>
        <div class="space-y-4">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              bind:checked={settings.darkMode}
              class="form-checkbox bg-gray-700"
            />
            Dark Mode
          </label>
        </div>
      </div>
  
      <div>
        <h3 class="text-lg font-semibold mb-4">Notifications</h3>
        <div class="space-y-4">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              bind:checked={settings.notifications.challengeReleases}
              class="form-checkbox bg-gray-700"
            />
            New Challenge Releases
          </label>
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              bind:checked={settings.notifications.teamUpdates}
              class="form-checkbox bg-gray-700"
            />
            Team Updates
          </label>
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              bind:checked={settings.notifications.achievements}
              class="form-checkbox bg-gray-700"
            />
            Achievement Unlocks
          </label>
        </div>
      </div>
  
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors duration-300"
        >
          Save Settings
        </button>
      </div>
    </form>
  </div>