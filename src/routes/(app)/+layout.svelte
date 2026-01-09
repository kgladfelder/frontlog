<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { enhance } from '$app/forms';

	let { children, data } = $props();

	let showMenu = $state(false);

	const toggleNavbar = () => {
		showMenu = !showMenu;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="body bg-gray-900">
	<nav class="bg-gray-950 px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
      <div class="flex items-center justify-between">
        <a
          class="text-xl font-bold text-gray-100 md:text-2xl hover:text-blue-400"
          href="/">
		  FrontLog
        </a>
        <!-- Mobile menu button -->
          <button
            type="button"
            class="text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400 flex md:hidden"
			onclick={toggleNavbar}
			aria-label="expand menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <div
        class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0 {showMenu ? 'flex' : 'hidden'}"
      >
        <a class="text-gray-100 hover:text-blue-400" href="/">Home</a>
		<a class="text-gray-100 hover:text-blue-400" href="/settings">User Preferences</a>
		{#if data.user.role === 'admin'}
        	<a class="text-gray-100 hover:text-blue-400" href="/admin">Admin</a>
		{/if}
        <div class="text-gray-100 space-y-2">
			<h3>Hello {data.user.username}</h3>
			<form method="POST" action="/?/logout" use:enhance>
				<button>Sign Out</button>
			</form>
          <!-- Sign out-->
        </div>
      </div>
    </nav>
	<main class="isolate px-6 lg:px-8">
		{@render children()}
	</main>
</div>
<style>
	.body {
		height: 100vh;
	}
</style>