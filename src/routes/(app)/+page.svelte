<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<div class="text-sm/6 font-semibold text-white">
	<h1>Hi, {data.user.username}!</h1>
	<p>Your user ID is {data.user.id}.</p>
	{#if data.user.role === 'admin'}
		<p><a href="/admin">Admin Settings</a></p>
	{/if}
	<p>Create User settings.</p>
	<p>Create a layout that isn't used on the login page, but available on all others</p>
	<form method="post" action="?/logout" use:enhance>
		<button>Sign out</button>
	</form>
</div>