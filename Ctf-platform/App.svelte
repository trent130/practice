<script lang="ts">
    import { Router, Link, Route } from "svelte-routing";
    import Home from "./routes/Home.svelte";
    import Login from "./routes/Login.svelte";
    import Signup from "./routes/Signup.svelte";
    import Leaderboard from "./routes/Leaderboard.svelte";
    import Profile from "./routes/Profile.svelte";
    import Challenge from "./routes/Challenge.svelte";
    import Teams from "./routes/Teams.svelte";
    import Achievements from "./routes/Achievements.svelte";
    import Settings from "./routes/Settings.svelte";
    import Navbar from "./components/Navbar.svelte";
    import NotificationToast from "./components/NotificationToast.svelte";
  
    export let url = "";
  </script>
  
  <Router {url}>
    <main class="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <NotificationToast />
      <div class="container mx-auto px-4 py-8">
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/challenge/:id" component={Challenge} />
        <Route path="/teams" component={Teams} />
        <Route path="/achievements" component={Achievements} />
        <Route path="/settings" component={Settings} />
      </div>
    </main>
  </Router>