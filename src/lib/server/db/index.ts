import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import { DATABASE_URL } from '$env/static/private';

if (!DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

const client = await mysql.createConnection({
	uri: DATABASE_URL,
	enableKeepAlive: true,
	keepAliveInitialDelay: 5000
});

export const db = drizzle(client, {
	schema,
	mode: 'default'
});
