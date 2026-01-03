<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData, form: ActionData } = $props();

	let registrationEnabled = $state(data.registrationEnabled ?? false);
</script>

<div class="text-sm/6 font-semibold text-white">
	<form method="post" use:enhance>
		<label>
			Allow Registration
			<input type="checkbox" name="registrationEnabled" bind:checked={registrationEnabled} />
		</label>
		<button class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
			Submit
		</button>
	</form>
	<p style="color: red">{form?.message ?? ''}</p>
</div>
