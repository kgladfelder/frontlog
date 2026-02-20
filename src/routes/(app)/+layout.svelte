<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { enhance } from '$app/forms';
	import { Footer } from '$lib/components/index.js';

	let { children, data } = $props();

	let showMenu = $state(false);

	const toggleNavbar = () => {
		showMenu = !showMenu;
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="body bg-background dark:bg-background-dark">
	<nav class="mx-auto text-foreground dark:text-foreground-dark px-3 py-3 md:flex md:items-center md:justify-between">
		<div class="flex items-center justify-between">
			<a class="text-xl font-montserrat md:text-2xl hover:text-success dark:hover:text-success-dark " href="/">
				FrontLog
			</a>
			<!-- Mobile menu button -->
			<button
				type="button"
				class="flex font-fira-sans focus:outline-none md:hidden"
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
			<a class="font-fira-sans hover:text-success dark:hover:text-success-dark" href="/">Home</a>
			<a class="font-fira-sans hover:text-success dark:hover:text-success-dark" href="/settings">User Preferences</a>
			{#if data.user.role === 'admin'}
				<a class="font-fira-sans hover:text-success dark:hover:text-success-dark" href="/admin">Admin</a>
			{/if}
			<div class="font-fira-sans space-y-2">
				<h3>Hello {data.user.username}</h3>
			</div>
			<div class="hover:text-success dark:hover:text-success-dark"> <!-- TODO: make this a click on user profile image and dropdown menu -->
				<form class="logout-form" method="POST" action="/?/logout" use:enhance>
					<button class="font-fira-sans logout">Sign Out</button>
				</form>
			</div>
		</div>
	</nav>
	<main class="isolate px-6 lg:px-8">
		{@render children()}
	</main>
	<footer class="fixed bottom-0 left-0 z-20 h-10 w-full p-0 bg-neutral-primary-soft border-t border-default shadow-sm md:flex md:items-center md:justify-between md:p-2">
		<Footer />
	</footer>
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
