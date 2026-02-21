import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/login');
    }
    const userPreferences = (await db.select().from(table.userPreferences)).at(0);

    return {
        userPreferences
    };
};

export const actions: Actions = {
    default: async ({ locals, request }) => {
        if (!locals.user) {
            return redirect(302, '/login');
        }
        const data = await request.formData();
        
        // TODO: Save user preferences
    }
}