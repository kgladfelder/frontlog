<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="text-sm/6 font-semibold text-white">
	<h1>Hi, {data.user.username}!</h1>
</div>