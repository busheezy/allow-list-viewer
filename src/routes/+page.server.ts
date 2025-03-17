import { db } from '$lib/server/db';
import { allowListTable } from '$lib/server/db/schema';
import SteamAPI from 'steamapi';
import type { PageServerLoad } from './$types';
import { STEAM_API_KEY } from '$env/static/private';
import SteamID from 'steamid';
import { desc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const allowList = await db.select().from(allowListTable).orderBy(desc(allowListTable.added));
	const steam = new SteamAPI(STEAM_API_KEY);

	const steamIds = allowList.map((row) => {
		const steamId = new SteamID(`STEAM_1:${row.steamId}`);

		return steamId.getSteamID64();
	});

	const userSummaries = await steam.getUserSummary(steamIds);

	if (!Array.isArray(userSummaries)) {
		throw new Error('userSummaries is not an array');
	}

	const allowListWithSteamSummary = allowList.map((player) => {
		const steamId = new SteamID(`STEAM_0:${player.steamId}`);
		const steamId64 = steamId.getSteamID64();

		const userSummary = userSummaries.find((user) => user.steamID === steamId64);

		if (!userSummary) {
			throw new Error(`User summary not found for steamId64: ${steamId64}`);
		}

		return {
			...player,
			steam: {
				nickname: userSummary.nickname,
				avatar: userSummary.avatar,
				steamID: userSummary.steamID
			},
			steamLink: `https://steamcommunity.com/profiles/${steamId64}`,
			kzProfieLink: `https://kzprofile.com/players/${steamId64}`,
			steamId64
		};
	});

	return {
		allowListWithSteamSummary
	};
};
