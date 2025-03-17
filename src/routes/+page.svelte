<script lang="ts">
	import type { PageProps } from './$types';
	import SteamID from 'steamid';
	import { formatDistanceToNow } from 'date-fns';

	let { data }: PageProps = $props();

	const { allowList, userSummaries } = data;

	const allowListWithSteamSummary = allowList.map((player) => {
		const steamId = new SteamID(`STEAM_0:${player.steamId}`);
		const steamId64 = steamId.getSteamID64();

		const userSummary = userSummaries.find((user) => user.steamID === steamId64);

		return {
			...player,
			steam: userSummary,
			steamLink: `https://steamcommunity.com/profiles/${steamId64}`,
			kzProfieLink: `https://kzprofile.com/players/${steamId64}`,
			steamId64
		};
	});
</script>

<h1 class="mb-4 text-3xl">Allow List</h1>

<div>
	<table class="table w-full text-left">
		<thead class="text-2xl">
			<tr>
				<th>&nbsp;</th>
				<th>DB Name</th>
				<th>Steam Name</th>
				<th>Steam ID</th>
				<th>Notes</th>
				<th>Added</th>
				<th>&nbsp;</th>
			</tr>
		</thead>

		<tbody>
			{#each allowListWithSteamSummary as player}
				<tr class="border-b border-gray-200">
					<td class="mx-2">
						<img src={player.steam?.avatar.large} alt="Avatar" class="h-12 w-12" />
					</td>
					<td>{player.name}</td>
					<td>{player.steam?.nickname}</td>
					<td>{player.steamId64}</td>
					<td>{player.notes}</td>
					<td>{player.added ? formatDistanceToNow(player.added) : 'N/A'} ago</td>
					<td>
						<a
							href={player.steamLink}
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-500 hover:underline">Steam Profile</a
						>

						<a
							href={player.kzProfieLink}
							target="_blank"
							rel="noopener noreferrer"
							class="ml-2 text-blue-500 hover:underline">KZ Profile</a
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
