<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1 class="mb-4 text-3xl">Allow List</h1>

<div>
	<table class="table w-full table-fixed text-left">
		<thead class="text-2xl">
			<tr>
				<th>Name</th>
				<th>Steam ID</th>
				<th>Notes</th>
				<th>Added</th>
			</tr>
		</thead>
		<tbody>
			{#each data.allowList as player}
				<tr>
					<td>{player.name}</td>
					<td>{player.steamId}</td>
					<td>{player.notes}</td>
					<td>{player.added}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
