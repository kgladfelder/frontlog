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

<div class="flex items-center justify-center">
	<div class="inline-flex">
		<label for="light" class="p-1 m-0 w-7 items-center justify-center cursor-pointer">
			<input
				type="radio"
				name="themeMode"
				id="light"
				value="light"
				class="peer sr-only"
				checked={theme.override === 'light'}
				onclick={changeTheme} />
			<span
				class="relative inline-flex rounded-l-lg w-7 h-full items-center space-x-2 text-xl text-foreground dark:text-foreground-dark peer-checked:bg-shadow hover:bg-shaow dark:hover:bg-shadow-dark">
                <Icon icon="jam:sun-f"  class="ml-1"/>
			</span>
		</label>
		<label for="system" class="p-1 m-0 w-7 items-center justify-center cursor-pointer">
			<input
				type="radio"
				name="themeMode"
				id="system"
				value="system"
				class="peer sr-only"
				checked={theme.override === 'system'}
				onclick={changeTheme} />
			<span
				class="relative inline-flex w-7 h-full items-center space-x-2 text-xl text-foreground dark:text-foreground-dark peer-checked:bg-shadow dark:peer-checked:bg-shadow-dark hover:bg-shaow dark:hover:bg-shadow-dark">
                <Icon icon="jam:computer-f" class="ml-1"/>
			</span>
		</label>
		<label for="dark" class="p-1 m-0 w-7 items-center justify-center cursor-pointer">
			<input
				type="radio"
				name="themeMode"
				id="dark"
				value="dark"
				class="peer sr-only"
				checked={theme.override === 'dark'}
				onclick={changeTheme} />
			<span
				class="relative inline-flex rounded-r-lg w-7 h-full items-center space-x-2 text-xl text-foreground dark:text-foreground-dark peer-checked:bg-shadow-dark hover:bg-shaow dark:hover:bg-shadow-dark">
                <Icon icon="jam:moon-f"  class="ml-1"/>
			</span>
		</label>
	</div>
</div>
