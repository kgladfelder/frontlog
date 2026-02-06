import { MediaQuery } from "svelte/reactivity";
import { on } from "svelte/events";
import { BROWSER } from "esm-env";

export const Theme = ['light', 'dark', 'system'] as const;
export type Theme = (typeof Theme)[number];

class ThemeState {
    #mediaQuery = new MediaQuery('(prefers-color-scheme: dark)');
    #system = $derived<Theme>(this.#mediaQuery.current ? 'dark' : 'light');
    #selection = $state<Theme>('system');
    #current = $derived(this.#selection === 'system' ? this.#system : this.#selection);

    #subscribers = 0;
    #unsubscribe: VoidFunction = () => {};

    constructor() {
        if (BROWSER) {
            const saved: Theme = localStorage.theme ?? 'system';
            this.#selection = saved;
        }
    }

    private subscribe() {
        if ($effect.tracking()) {
            $effect(() => {
                if (this.#subscribers === 0) {
                    this.#unsubscribe = on(window, 'storage', (event: StorageEvent) => {
                        if (event.key === 'theme') {
                            this.#selection = event.newValue as Theme;
                        }
                    });

                    $effect(() => {
                        document.documentElement.classList.toggle('dark', this.#current === 'dark');
                    })
                }

                this.#subscribers++;

                return () => {
                    this.#subscribers--;
                    if (this.#subscribers === 0) {
                        this.#unsubscribe();
                        this.#unsubscribe = () => {};
                    }
                }
            });
        }
    }

    get system() {
        this.subscribe();
        return this.#system;
    }

    get override() {
        this.subscribe();
        return this.#selection;
    }

    set override(value: Theme) {
        switch (value) {
            case 'dark':
            case 'light':
                localStorage.setItem('theme', value);
                break;
            default:
                localStorage.removeItem('theme');
                break;
        }
        this.#selection = value;
    }

    get current() {
        this.subscribe();
        return this.#current;
    }
}

export const theme = new ThemeState();