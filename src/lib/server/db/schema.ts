import { mysqlTable, text, timestamp, unique, varchar } from 'drizzle-orm/mysql-core';

export const allowlistTable = mysqlTable(
	'allowlist',
	{
		name: varchar({ length: 50 }).default('NULL'),
		steamId: varchar({ length: 50 }).notNull(),
		notes: text().default('NULL'),
		added: timestamp({ mode: 'string' }).default('current_timestamp()')
	},
	(table) => [unique('steamid').on(table.steamId)]
);
