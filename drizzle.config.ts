import { defineConfig } from 'drizzle-kit';

if (!process.env.DB_USER) throw new Error('DB_USER is not set');
if (!process.env.DB_PASSWORD) throw new Error('DB_PASSWORD is not set');
if (!process.env.DB_DATABASE) throw new Error('DB_DATABASE is not set');
if (!process.env.DB_PORT) throw new Error('DB_PORT is not set');
if (!process.env.DB_HOST) throw new Error('DB_HOST is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
	},
	verbose: true,
	strict: true
});
