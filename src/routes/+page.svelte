<script lang="ts">
	import type { PageProps } from './$types';
	import { formatDistanceToNow } from 'date-fns';

	let { data }: PageProps = $props();

	const { allowListWithSteamSummary } = data;
</script>

<div>
	<table class="table w-full text-left">
		<thead class="text-2xl">
			<tr>
				<th>&nbsp;</th>
				<th>DB Name</th>
				<th class="hidden md:table-cell">Notes</th>
				<th class="hidden md:table-cell">Added</th>
				<th>&nbsp;</th>
			</tr>
		</thead>

		<tbody>
			{#each allowListWithSteamSummary as player}
				<tr class="border-b border-gray-200">
					<td class="mx-2">
						<img src={player.steam?.avatar.large} alt={player.steam?.nickname} class="h-12 w-12" />
					</td>
					<td>{player.name}</td>
					<td class="hidden md:table-cell">{player.notes}</td>
					<td class="hidden md:table-cell"
						>{player.added ? formatDistanceToNow(player.added) : 'N/A'} ago</td
					>
					<td>
						<a
							href={player.steamLink}
							target="_blank"
							rel="noopener noreferrer"
							class="border px-1.5 py-1 text-blue-500 hover:underline">Steam</a
						>

						<a
							href={player.kzProfieLink}
							target="_blank"
							rel="noopener noreferrer"
							class="ml-2 border px-1.5 py-1 text-blue-500 hover:underline">KZ Profile</a
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
