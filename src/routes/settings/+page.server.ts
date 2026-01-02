import { fail, redirect } from '@sveltejs/kit';
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

    return {
        registrationEnabled: settingsResults?.registrationEnabled
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
        const blah = data.get('registrationEnabled');
        const registrationEnabled = /^on$/i.test(blah as string);
        console.log(currentSettings);
        console.log(blah, registrationEnabled);
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

            return {
                settingsResults
            };
        }
    }
}