<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>FrontLog: Sign In</title>
</svelte:head>

<div class="body bg-gray-800 px-6 py-24 sm:py-32 lg:px-8">
	{@render children()}
</div>
<style>
	.body {
		height: 100vh;
	}
</style>