<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { enhance } from '$app/forms';

	let { children, data } = $props();

	let showMenu = $state(false);

	const toggleNavbar = () => {
		showMenu = !showMenu;
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="body bg-gray-900">
	<nav class="mx-auto bg-gray-950 px-3 py-3 md:flex md:items-center md:justify-between">
		<div class="flex items-center justify-between">
			<a class="text-xl font-bold text-gray-100 hover:text-blue-400 md:text-2xl" href="/">
				FrontLog
			</a>
			<!-- Mobile menu button -->
			<button
				type="button"
				class="flex text-gray-100 hover:text-gray-400 focus:text-gray-400 focus:outline-none md:hidden"
				onclick={toggleNavbar}
				aria-label="expand menu">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
				</svg>
			</button>
		</div>

		<!-- Mobile Menu open: "block", Menu closed: "hidden" -->
		<div
			class="mt-8 flex-col space-y-4 md:mt-0 md:flex md:flex-row md:items-center md:space-y-0 md:space-x-10 {showMenu
				? 'flex'
				: 'hidden'}">
			<a class="text-gray-100 hover:text-blue-400" href="/">Home</a>
			<a class="text-gray-100 hover:text-blue-400" href="/settings">User Preferences</a>
			{#if data.user.role === 'admin'}
				<a class="text-gray-100 hover:text-blue-400" href="/admin">Admin</a>
			{/if}
			<div class="space-y-2 text-gray-100">
				<h3>Hello {data.user.username}</h3>
			</div>
			<div class="text-gray-100"> <!-- TODO: make this a click on user profile image and dropdown menu -->
				<form class="logout-form" method="POST" action="/?/logout" use:enhance>
					<button class="logout">Sign Out</button>
				</form>
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
	.logout-form {
		margin: 0;
		padding: 0;
	}
	.logout {
		font-size: xx-small;
	}
</style>
