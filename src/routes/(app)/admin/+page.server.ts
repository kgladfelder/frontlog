import { fail, redirect } from '@sveltejs/kit';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/login');
    } else if (event.locals.user.role !== 'admin') {
        return redirect(302, '/login');
    }
    const settingsResults = (await db.select().from(table.settings)).at(0);
    const categories = (await db.select().from(table.categories));

    return {
        registrationEnabled: settingsResults?.registrationEnabled,
        animeEnabled: Boolean(categories.find(x => x.category === 'Anime')),
        booksEnabled: Boolean(categories.find(x => x.category === 'Books')),
        comicsEnabled: Boolean(categories.find(x => x.category === 'Comics')),
        gamesEnabled: Boolean(categories.find(x => x.category === 'Games')),
        moviesEnabled: Boolean(categories.find(x => x.category === 'Movies')),
        tvShowsEnabled: Boolean(categories.find(x => x.category === 'TV Shows'))
    };
};

export const actions: Actions = {
    default: async ({ locals, request }) => {
        if (!locals.user) {
            return redirect(302, '/login');
        } else if (locals.user.role !== 'admin') {
            return fail(401, { message: 'Unauthorized' });
        }
        const data = await request.formData();
        const currentSettings = (await db.select().from(table.settings)).at(0);
        const registrationEnabled = /^on$/i.test(data.get('registrationEnabled') as string);
        const currentCategories = (await db.select().from(table.categories));

        const categories: string[] = [];

        if(/^on$/i.test(data.get('animeEnabled') as string)) {
            categories.push('Anime');
        }
        if(/^on$/i.test(data.get('booksEnabled') as string)) {
            categories.push('Books');
        }
        if(/^on$/i.test(data.get('comicsEnabled') as string)) {
            categories.push('Comics');
        }
        if(/^on$/i.test(data.get('gamesEnabled') as string)) {
            categories.push('Games');
        }
        if(/^on$/i.test(data.get('moviesEnabled') as string)) {
            categories.push('Movies');
        }
        if(/^on$/i.test(data.get('tvShowsEnabled') as string)) {
            categories.push('TV Shows');
        }
        
        //Compare current categories with categories
        const categoriesToAdd = categories.filter(x => !currentCategories.find(y => y.category === x));
        const categoriesToDelete = currentCategories.filter(x => !categories.find(y => y === x.category));
        
        //Categories to delete
        categoriesToDelete.forEach(async cd => await db.delete(table.categories).where(eq(table.categories.id, cd.id)));

        //Categories to add
        categoriesToAdd.forEach(async ca => await db.insert(table.categories).values({id: generateId(), category: ca, createdAt: new Date(Date.now()) }));

        if (!currentSettings) {
            await db.insert(table.settings).values({
                registrationEnabled,
                lastModifiedBy: locals.user.id,
                lastModified: new Date(Date.now())
            });
            return redirect(302, '/');
        } else {
            await db.update(table.settings).set({
                registrationEnabled,
                lastModifiedBy: locals.user.id,
                lastModified: new Date(Date.now())
            });
            const settingsResults = (await db.select().from(table.settings)).at(0);
            const categoriesResults = (await db.select().from(table.categories));

            return {
                registrationEnabled: settingsResults?.registrationEnabled,
                animeEnabled: Boolean(categoriesResults.find(x => x.category === 'Anime')),
                booksEnabled: Boolean(categoriesResults.find(x => x.category === 'Books')),
                comicsEnabled: Boolean(categoriesResults.find(x => x.category === 'Comics')),
                gamesEnabled: Boolean(categoriesResults.find(x => x.category === 'Games')),
                moviesEnabled: Boolean(categoriesResults.find(x => x.category === 'Movies')),
                tvShowsEnabled: Boolean(categoriesResults.find(x => x.category === 'TV Shows'))
            };
        }
    }
}

function generateId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}