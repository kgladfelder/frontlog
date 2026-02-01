<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>FrontLog: Admin</title>
</svelte:head>

<div class="@container flex justify-center-safe">
	<div class="w-100 rounded-md bg-shadow p-10 md:w-2/5 dark:bg-shadow-dark">
		<form method="post" use:enhance>
			<div class="columns-2">
				<div>
					<label for="registrationEnabled" class="text-foreground dark:text-foreground-dark"> Allow Registration </label>
				</div>
				<div>
					<!-- This is pretty bad, probably want to flip it out with something that looks better. -->
					<input
						type="checkbox"
						name="registrationEnabled"
						class="bg-background dark:bg-background-dark hover:bg-success dark:hover:bg-success-dark text-success dark:text-success-dark"
						bind:checked={data.registrationEnabled} />
				</div>
			</div>
			<div class="mt-10 justify-end-safe">
				<button
					class="rounded-md bg-success px-4 py-2 dark:text-foreground transition hover:bg-hover dark:bg-success-dark text-foreground-dark dark:hover:bg-hover-dark">
					Submit
				</button>
			</div>
		</form>
		<p class="text-error dark:text-error-dark">{form?.message ?? ''}</p>
	</div>
</div>
