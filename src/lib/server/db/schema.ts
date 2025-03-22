import { mysqlTable, text, timestamp, unique, varchar } from 'drizzle-orm/mysql-core';

export const allowlistTable = mysqlTable(
	'allowlist',
	{
		name: varchar({ length: 50 }),
		steamId: varchar({ length: 50 }).notNull(),
		notes: text(),
		added: timestamp({ mode: 'string' }).default('current_timestamp()')
	},
	(table) => [unique('steamid').on(table.steamId)]
);
