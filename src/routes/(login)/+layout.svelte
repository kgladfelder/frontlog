<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Theme from '$lib/utilities/theme/Theme.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>FrontLog: Sign In</title>
</svelte:head>

<div class="body bg-background px-6 py-24 sm:py-32 lg:px-8 dark:bg-background-dark">
	<main>
		{@render children()}
	</main>
	<footer>
		<Theme />
	</footer>
</div>

<style>
	.body {
		height: 100vh;
	}
</style>
