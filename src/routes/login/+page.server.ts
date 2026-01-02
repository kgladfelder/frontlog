import { hash, verify } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}
	let registrationEnabled = false;
	let newSetup = false;
	const userResults = await db.select().from(table.users);
	const settingsResults = await db.select().from(table.settings);

	if (userResults.length === 0) {
		newSetup = true;
		registrationEnabled = true;
	} else if (settingsResults.length === 1) {
		registrationEnabled = settingsResults[0].registrationEnabled;
	}
	return {
		registrationEnabled,
		newSetup
	};
};

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		
		if (!validateUsername(username)) {
			return fail(400, {
				message: 'Invalid username (min 3, max 31 characters, alphanumeric and lowercase only)'
			});
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password (min 6, max 255 characters)' });
		}
		const results = await db.select().from(table.users).where(eq(table.users.username, username));

		const existingUser = results.at(0);
		if (!existingUser) {
			return fail(400, { message: 'Incorrect username or password' });
		}
		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return fail(400, { message: 'Incorrect username or password' });
		}
		await db.update(table.users).set({ lastLogin: new Date(Date.now()) }).where(eq(table.users.username, username));

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		return redirect(302, '/');
	},
	register: async (event) => {
		let registrationEnabled = false;
		let initialSetup = false;
		const userResults = await db.select().from(table.users);
		const settingsResults = await db.select().from(table.settings);
		if (userResults.length === 0) {
			initialSetup = true;
			registrationEnabled = true;
		} else if (settingsResults.length === 1 && settingsResults[0].registrationEnabled === true) {
			registrationEnabled = true;
		}
		if (!registrationEnabled) {
			return redirect(302, '/');
		}
		const formData = await event.request.formData();
		const username = formData.get('username') as string;
		const email = formData.get('email') as string | null;
		const password = formData.get('password') as string;

		if (!username || !validateUsername(username)) {
			return fail(400, { message: 'Invalid username (min 3, max 31 characters, alphanumeric and lowercase only)' });
		}
		if ((await db.select().from(table.users).where(eq(table.users.username, username))).length > 0) {
			return fail(400, {message: 'Username already exists'})
		}
		if (!email || !validateEmail(email)) {
			return fail(400, { message: 'Invalid email' })
		}
		if (!password || !validatePassword(password)) {
			return fail(400, { message: 'Invalid password (min 6, max 255 characters)' });
		}
		

		const userId = generateUserId();
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await db.insert(table.users).values({
				id: userId,
				username,
				email,
				passwordHash,
				role: initialSetup ? 'admin' : 'user',
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
				lastLogin: new Date(Date.now())
			});

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch {
			return fail(500, { message: 'An error has occurred' });
		}
		if(initialSetup) {
			redirect(302, '/settings');
		}
		return redirect(302, '/');
	}
};

function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}

function validateUsername(username: unknown): username is string {
	return (
		typeof username === 'string' &&
		username.length >= 3 &&
		username.length <= 31 &&
		/^[a-z0-9_-]+$/.test(username)
	);
}

function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}

function validateEmail(email: unknown): email is string {
	return typeof email === 'string' && /^\S+@\S+\.\S+$/.test(email);
}