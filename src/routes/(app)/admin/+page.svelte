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
		<h1 class="text-foreground dark:text-foreground-dark text-4xl mb-5">Admin Settings</h1>
		<form method="post" use:enhance>
			<div class="columns-2 mb-2">
				<div><h3 class="text-foreground dark:text-foreground-dark text-xl">General</h3></div>
				<div><h4 class="text-foreground dark:text-foreground-dark text-xl">Enabled</h4></div>
			</div>
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
			<div class="columns-2 mt-2 mb-2">
				<div><h3 class="text-foreground dark:text-foreground-dark text-xl">Categories</h3></div>
				<div><h4 class="text-foreground dark:text-foreground-dark text-xl">Enabled</h4></div>
			</div>
			<div class="columns-2">
				<div>
					<label for="animeEnabled" class="text-foreground dark:text-foreground-dark">Anime</label>
				</div>
				<div>
					<input
						type="checkbox"
						name="animeEnabled"
						class="bg-background dark:bg-background-dark hover:bg-success dark:hover:bg-success-dark text-success dark:text-success-dark"
						bind:checked={data.animeEnabled} />
				</div>
			</div>
			<div class="columns-2">
				<div>
					<label for="booksEnabled" class="text-foreground dark:text-foreground-dark">Books</label>
				</div>
				<div>
					<input
						type="checkbox"
						name="booksEnabled"
						class="bg-background dark:bg-background-dark hover:bg-success dark:hover:bg-success-dark text-success dark:text-success-dark"
						bind:checked={data.booksEnabled} />
				</div>
			</div>
			<div class="columns-2">
				<div>
					<label for="comicsEnabled" class="text-foreground dark:text-foreground-dark">Comics</label>
				</div>
				<div>
					<input
						type="checkbox"
						name="comicsEnabled"
						class="bg-background dark:bg-background-dark hover:bg-success dark:hover:bg-success-dark text-success dark:text-success-dark"
						bind:checked={data.comicsEnabled} />
				</div>
			</div>
			<div class="columns-2">
				<div>
					<label for="gamesEnabled" class="text-foreground dark:text-foreground-dark">Games</label>
				</div>
				<div>
					<input
						type="checkbox"
						name="gamesEnabled"
						class="bg-background dark:bg-background-dark hover:bg-success dark:hover:bg-success-dark text-success dark:text-success-dark"
						bind:checked={data.gamesEnabled} />
				</div>
			</div>
			<div class="columns-2">
				<div>
					<label for="moviesEnabled" class="text-foreground dark:text-foreground-dark">Movies</label>
				</div>
				<div>
					<input
						type="checkbox"
						name="moviesEnabled"
						class="bg-background dark:bg-background-dark hover:bg-success dark:hover:bg-success-dark text-success dark:text-success-dark"
						bind:checked={data.moviesEnabled} />
				</div>
			</div>
			<div class="columns-2">
				<div>
					<label for="tvShowsEnabled" class="text-foreground dark:text-foreground-dark">TV Shows</label>
				</div>
				<div>
					<input
						type="checkbox"
						name="tvShowsEnabled"
						class="bg-background dark:bg-background-dark hover:bg-success dark:hover:bg-success-dark text-success dark:text-success-dark"
						bind:checked={data.tvShowsEnabled} />
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
