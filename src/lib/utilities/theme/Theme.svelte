<script lang="ts" module>
    import Icon from "@iconify/svelte";
	import { theme, Theme } from './ThemeState.svelte';

	const changeTheme = (e: Event) => {
		const el = e.target as HTMLInputElement;
		const value = el.value as Theme;
		theme.override = value;
	};
</script>

<svelte:head>
	<script>
		document.documentElement.classList.toggle(
			'dark',
			localStorage.theme === 'dark' ||
				(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		);
	</script>
</svelte:head>

<div class="flex items-center justify-center p-24">
	<div class="inline-flex overflow-hidden rounded-lg border border-shadow dark:border-shadow-dark">
		<label for="light" class="cursor-pointer">
			<input
				type="radio"
				name="themeMode"
				id="light"
				value="light"
				class="peer sr-only"
				checked={theme.override === 'light'}
				onclick={changeTheme} />
			<span
				class="relative inline-flex h-full items-center space-x-2 pr-1 text-xl text-foreground dark:text-foreground-dark peer-checked:bg-shadow">
                <Icon icon="jam:sun-f" />
			</span>
		</label>
		<label for="system" class="cursor-pointer">
			<input
				type="radio"
				name="themeMode"
				id="system"
				value="system"
				class="peer sr-only"
				checked={theme.override === 'system'}
				onclick={changeTheme} />
			<span
				class="relative inline-flex h-full items-center space-x-2 pr-1 text-xl text-foreground dark:text-foreground-dark peer-checked:bg-shadow dark:peer-checked:bg-shadow-dark">
                <Icon icon="jam:computer-f" />
			</span>
		</label>
		<label for="dark" class="cursor-pointer">
			<input
				type="radio"
				name="themeMode"
				id="dark"
				value="dark"
				class="peer sr-only"
				checked={theme.override === 'dark'}
				onclick={changeTheme} />
			<span
				class="relative inline-flex h-full items-center space-x-2 pr-1 text-xl text-foreground dark:text-foreground-dark peer-checked:bg-shadow-dark">
                <Icon icon="jam:moon-f" />
			</span>
		</label>
	</div>
</div>
