import { date, mysqlTable, text } from 'drizzle-orm/mysql-core';

export const allowListTable = mysqlTable('allowlist', {
	name: text(),
	steamId: text().notNull().unique(),
	notes: text(),
	added: date()
});
