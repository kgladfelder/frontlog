<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>FrontLog: Sign In</title>
</svelte:head>

<!-- TODO: dynamically change the background & allow custom set ones -->
<div class="body full isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8 bg-[url($lib/assets/20250624_0825_01.jpg)] bg-cover">
	{@render children()}
</div>
<style>
	.body {
		height: 100vh;
	}
</style>