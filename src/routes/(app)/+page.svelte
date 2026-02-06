<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>FrontLog: Welcome</title>
</svelte:head>

<div class="text-sm/6 font-ibm-plextext-foreground dark:text-foreground-dark">
	<h1>Hi, {data.user.username}!</h1>
	<p>Time to start doing data structure stuff.</p>
	<p>Metadata structure defined in user settings and then stored per entity in the same format.</p>
	<p>Figure out how to do metadata changes after a tracking section is defined.</p>
</div>