<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>FrontLog: Welcome</title>
</svelte:head>

<div class="text-sm/6 font-ibm-plextext-foreground dark:text-foreground-dark">
	<h1>Hi, {data.user.username}!</h1>
	<p>You probably want to read up on doing this and getting it saved in user preferences <a class="text-blue-500 dark:text-sky-500" target="_blank" href="https://tailwindcss.com/docs/dark-mode#with-system-theme-support">Dark Mode With System Theme Support</a></p>
</div>