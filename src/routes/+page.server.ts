import { db } from '$lib/server/db';
import { allowListTable } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allowList = await db.select().from(allowListTable);

	return {
		allowList
	};
};
