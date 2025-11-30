import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DB_USER) throw new Error('DB_USER is not set');
if (!env.DB_PASSWORD) throw new Error('DB_PASSWORD is not set');
if (!env.DB_DATABASE) throw new Error('DB_DATABASE is not set');
if (!env.DB_PORT) throw new Error('DB_PORT is not set');
if (!env.DB_HOST) throw new Error('DB_HOST is not set');

const client = postgres(
	`postgres://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_DATABASE}`
);

export const db = drizzle(client, { schema });
