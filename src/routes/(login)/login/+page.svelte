<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let options = [
		{ id: '1', value: 'Login' },
		{ id: '2', value: 'Register' }
	];

	let selected_id = $state('1');
	let selected = $derived(options.find((o) => o.id === selected_id));
	const setOpenTab = (tab: string) => {
		selected_id = tab;
	};
</script>

<div class="@container flex justify-center-safe">
	<div class="w-100 rounded-md bg-shadow dark:bg-shadow-dark p-10 md:w-2/5">
		{#if !data.newSetup && data.registrationEnabled}
			<div class="sm:hidden">
				<label for="tabs" class="sr-only">Login or Register</label>
				<select
					bind:value={selected_id}
					id="tabs"
					class="bg-neutral-secondary-medium border-default-medium text-heading rounded-base focus:ring-brand focus:border-brand placeholder:text-body block w-full border px-3 py-2.5 text-sm shadow-xs">
					{#each options as option}
						<option value={option.id}>{option.value}</option>
					{/each}
				</select>
			</div>
			<ul class="text-body hidden -space-x-px text-center text-sm font-medium sm:flex">
				<li class="w-full focus-within:z-10">
					<button
						onclick={() => setOpenTab('1')}
						class={[
							'border-default rounded-s-base hover:bg-neutral-secondary-medium hover:text-heading inline-block w-full border px-4 py-2.5 font-ibm-plex text-sm/6 leading-5 font-medium text-foreground dark:text-foreground-dark focus:outline-none',
							selected?.id === '1' ? 'bg-success dark:bg-success-dark' : 'bg-background dark:bg-background-dark'
						]}
						aria-current="page">
						Login
					</button>
				</li>
				<li class="w-full focus-within:z-10">
					<button
						onclick={() => setOpenTab('2')}
						class={[
							'border-default rounded-s-base hover:bg-neutral-secondary-medium hover:text-heading inline-block w-full border px-4 py-2.5 font-ibm-plex text-sm/6 leading-5 font-medium text-foreground dark:text-foreground-dark focus:outline-none',
							selected?.id === '2' ? 'bg-success dark:bg-success-dark' : 'bg-background dark:bg-background-dark'
						]}>
						Register
					</button>
				</li>
			</ul>
			{#if selected === options[0]}
				<form method="post" action="?/login" use:enhance>
					<label class="block font-ibm-plex text-sm/6 text-foreground dark:text-foreground-dark">
						Username
						<input
							name="username"
							class="block w-full rounded-md px-3.5 py-2 text-base bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark outline-1 -outline-offset-1 outline-foreground/10 dark:outline-foreground-dark/10 focus:outline-2 focus:-outline-offset-2 focus:outline-success dark:focus:outline-success-dark" />
					</label>
					<label class="block font-ibm-plex text-sm/6 text-foreground dark:text-foreground-dark">
						Password
						<input
							type="password"
							name="password"
							class="block w-full rounded-md px-3.5 py-2 text-base bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark outline-1 -outline-offset-1 outline-foreground/10 dark:outline-foreground-dark/10 focus:outline-2 focus:-outline-offset-2 focus:outline-success dark:focus:outline-success-dark" />
					</label>
					<div class="mt-10">
						<button
							class="block w-full rounded-md bg-success dark:bg-success-dark px-3.5 py-2.5 text-center font-ibm-plex text-lg text-foreground dark:text-foreground-dark shadow-xs hover:bg-hover dark:hover:bg-hover-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
							Login
						</button>
					</div>
				</form>
			{:else if selected === options[1]}
				<form method="post" action="?/register" use:enhance>
					<label class="block font-ibm-plex text-sm/6 text-foreground dark:text-foreground-dark">
						Username
						<input
							name="username"
							class="block w-full rounded-md px-3.5 py-2 text-base bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark outline-1 -outline-offset-1 outline-foreground/10 dark:outline-foreground-dark/10 focus:outline-2 focus:-outline-offset-2 focus:outline-success dark:focus:outline-success-dark" />
					</label>
					<label class="block font-ibm-plex text-sm/6 text-foreground dark:text-foreground-dark">
						E-Mail
						<input
							name="email"
							class="block w-full rounded-md px-3.5 py-2 text-base bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark outline-1 -outline-offset-1 outline-foreground/10 dark:outline-foreground-dark/10 focus:outline-2 focus:-outline-offset-2 focus:outline-success dark:focus:outline-success-dark" />
					</label>
					<label class="block font-ibm-plex text-sm/6 text-foreground dark:text-foreground-dark">
						Password
						<input
							type="password"
							name="password"
							class="block w-full rounded-md px-3.5 py-2 text-base bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark outline-1 -outline-offset-1 outline-foreground/10 dark:outline-foreground-dark/10 focus:outline-2 focus:-outline-offset-2 focus:outline-success dark:focus:outline-success-dark" />
					</label>
					<p class="block font-ibm-plex text-sm/6 text-error dark:text-error-dark">{form?.message ?? ''}</p>
					<div class="mt-10">
						<button
							class="block w-full rounded-md bg-success dark:bg-success-dark px-3.5 py-2.5 text-center font-ibm-plex text-lg text-foreground dark:text-foreground-dark shadow-xs hover:bg-hover dark:hover:bg-hover-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
							Register
						</button>
					</div>
				</form>
			{/if}
		{:else if data.newSetup}
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="font-ibm-plex text-4xl tracking-tight text-balance text-foreground dark:text-foreground-dark sm:text-5xl">
					FrontLog
				</h2>
			</div>
			<form method="post" action="?/register" use:enhance>
				<label class="block font-ibm-plex text-sm/6 text-foreground dark:text-foreground-dark">
					Username
					<input
						name="username"
						class="block w-full rounded-md px-3.5 py-2 text-base text-foreground dark:text-foreground-dark outline-1 -outline-offset-1 outline-foreground/10 dark:outline-foreground-dark/10 focus:outline-2 focus:-outline-offset-2 focus:outline-success dark:focus:outline-success-dark" />
				</label>
				<label class="block font-ibm-plex text-sm/6 text-foreground dark:text-foreground-dark">
					E-Mail
					<input
						name="email"
						class="block w-full rounded-md px-3.5 py-2 text-base bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark outline-1 -outline-offset-1 outline-foreground/10 dark:outline-foreground-dark/10 focus:outline-2 focus:-outline-offset-2 focus:outline-success dark:focus:outline-success-dark" />
				</label>
				<label class="block font-ibm-plex text-sm/6 text-foreground dark:text-foreground-dark">
					Password
					<input
						type="password"
						name="password"
						class="block w-full rounded-md px-3.5 py-2 text-base bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark outline-1 -outline-offset-1 outline-foreground/10 dark:outline-foreground-dark/10 focus:outline-2 focus:-outline-offset-2 focus:outline-success dark:focus:outline-success-dark" />
				</label>
				<p class="block font-ibm-plex text-sm/6 text-error dark:text-error-dark">{form?.message ?? ''}</p>
				<div class="mt-10">
					<button
						class="block w-full rounded-md bg-success dark:bg-success-dark px-3.5 py-2.5 text-center font-ibm-plex text-lg text-foreground dark:text-foreground-dark shadow-xs hover:bg-hover dark:hover:bg-hover-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
						Register
					</button>
				</div>
			</form>
		{:else if !data.registrationEnabled}
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="font-montserrat text-4xl tracking-tight text-balance text-foreground dark:text-foreground-dark sm:text-5xl">
					FrontLog
				</h2>
			</div>
			<form method="post" action="?/login" use:enhance>
				<label class="block font-ibm-plex text-sm/6 text-foreground dark:text-foreground-dark">
					Username
					<input
						name="username"
						class="block w-full rounded-md px-3.5 py-2 text-base bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark outline-1 -outline-offset-1 outline-foreground/10 dark:outline-foreground-dark/10 focus:outline-2 focus:-outline-offset-2 focus:outline-success dark:focus:outline-success-dark" />
				</label>
				<label class="block font-ibm-plex text-sm/6 text-foreground dark:text-foreground-dark">
					Password
					<input
						type="password"
						name="password"
						class="block w-full rounded-md px-3.5 py-2 text-base bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark outline-1 -outline-offset-1 outline-foreground/10 dark:outline-foreground-dark/10 focus:outline-2 focus:-outline-offset-2 focus:outline-success dark:focus:outline-success-dark" />
				</label>
				<p class="block font-ibm-plex text-sm/6 text-error dark:text-error-dark">{form?.message ?? ''}</p>
				<div class="mt-10">
					<button
						class="block w-full rounded-md bg-success dark:bg-success-dark px-3.5 py-2.5 text-center font-ibm-plex text-lg dark:text-foreground text-foreground-dark shadow-xs hover:bg-hover dark:hover:bg-hover-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
						Login
					</button>
				</div>
			</form>
		{/if}
	</div>
</div>
