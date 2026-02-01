<script lang="ts">
	import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>FrontLog: Settings</title>
</svelte:head>

<div class="text-foreground dark:text-foreground-dark">
    User settings for {data.user.username}
</div>