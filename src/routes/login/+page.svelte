<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData, form: ActionData } = $props();

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
<!-- TODO: Move this into a smaller box centered on the screen -->
<div class="full isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
	{#if !data.newSetup && data.registrationEnabled}
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
				Login or Register
			</h2>
			<p class="mt-2 text-lg/8 text-gray-400">
				Login to your existing Frontlog Account or Register a new Frontlog Account.
			</p>
		</div>
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
					class={["text-sm/6 font-semibold text-white border-default rounded-s-base hover:bg-neutral-secondary-medium hover:text-heading inline-block w-full border px-4 py-2.5 text-sm leading-5 font-medium focus:outline-none", selected?.id === '1' ? 'bg-indigo-500' : "bg-neutral-primary-soft"]}
					aria-current="page">
					Login
				</button>
			</li>
			<li class="w-full focus-within:z-10">
				<button
					onclick={() => setOpenTab('2')}
					class={["text-sm/6 font-semibold text-white border-default rounded-s-base hover:bg-neutral-secondary-medium hover:text-heading inline-block w-full border px-4 py-2.5 text-sm leading-5 font-medium focus:outline-none", selected?.id === '2' ? 'bg-indigo-500' : "bg-neutral-primary-soft"]}>
					Register
				</button>
			</li>
		</ul>
		{#if selected === options[0]}
			<form method="post" action="?/login" use:enhance>
				<label class="block text-sm/6 font-semibold text-white">
					Username
					<input
						name="username"
						class="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500" />
				</label>
				<label class="block text-sm/6 font-semibold text-white">
					Password
					<input
						type="password"
						name="password"
						class="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500" />
				</label>
				<div class="mt-10">
					<button class="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
						Login
					</button>
				</div>
			</form>
		{:else if selected === options[1]}
			<form method="post" action="?/register" use:enhance>
				<label class="block text-sm/6 font-semibold text-white">
					Username
					<input
						name="username"
						class="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500" />
				</label>
				<label class="block text-sm/6 font-semibold text-white">
					E-Mail
					<input
						name="email"
						class="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500" />
				</label>
				<label class="block text-sm/6 font-semibold text-white">
					Password
					<input
						type="password"
						name="password"
						class="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500" />
				</label>
				<div class="mt-10">
					<button class="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
						Register
					</button>
				</div>
			</form>
		{/if}
	{:else if data.newSetup}
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
				Register
			</h2>
			<p class="mt-2 text-lg/8 text-gray-400">Register a new Frontlog Account.</p>
		</div>
		<form method="post" action="?/register" use:enhance>
			<label class="block text-sm/6 font-semibold text-white">
				Username
				<input
					name="username"
					class="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500" />
			</label>
			<label class="block text-sm/6 font-semibold text-white">
				E-Mail
				<input
					name="email"
					class="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500" />
			</label>
			<label class="block text-sm/6 font-semibold text-white">
				Password
				<input
					type="password"
					name="password"
					class="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500" />
			</label>
			<div class="mt-10">
				<button
					class="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
					Register
				</button>
			</div>
		</form>
	{:else if !data.registrationEnabled}
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
				Login
			</h2>
			<p class="mt-2 text-lg/8 text-gray-400">Login to your existing Frontlog Account.</p>
		</div>
		<form method="post" action="?/login" use:enhance>
			<label class="block text-sm/6 font-semibold text-white">
				Username
				<input
					name="username"
					class="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500" />
			</label>
			<label class="block text-sm/6 font-semibold text-white">
				Password
				<input
					type="password"
					name="password"
					class="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500" />
			</label>
			<div class="mt-10">
				<button
					class="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
					Login
				</button>
			</div>
		</form>
	{/if}
	<p style="color: red">{form?.message ?? ''}</p>
</div>

<style>
	.full {
		height: 100vh;
	}
</style>
