<script lang="ts">
	import { format } from 'date-fns';
	import type { PageData } from './$types';
	import ArtistBubbles from '../../components/ArtistBubbles.svelte';
	import EventInfoButtonSmall from '../../components/EventInfoButtonSmall.svelte';
	import ReloadIcon from '../../components/icons/ReloadIcon.svelte';

	export let data: PageData;

	let lineupBig = false;

	const startDate = Date.parse(data.event.start_time);

	function changeLineupSize() {
		lineupBig = !lineupBig;
		console.log(lineupBig);
	}
</script>

<div class="w-full h-full items-center justify-center p-6">
	<div class="flex flex-row desktop:w-full items-center justify-center">
		<img
			class="h-auto object-cover desktop:max-w-lg w-full rounded-lg drop-shadow-xl"
			src={data.event.event_logo}
			alt={data.event.event_name}
		/>
	</div>

	<h1 class="text-6xl mb-4 text-center shadow-sm">{data.event.event_name}</h1>
	<div class="flex flex-col w-full items-center justify-center">
		<progress
			class="progress progress-secondary desktop:w-96 w-48 shadow-md"
			value="100"
			max="100"
		/>
		<h class="text-center text-white font-medium text-2xl py-2"
			>{format(startDate, 'dd-MM-yyyy HH:mm')}</h
		>
	</div>
	<div class="w-full flex flex-col justify-center items-center">
		<div
			class="flex flex-col desktop:w-full w-lg items-center justify-center bg-zinc-900 rounded-md shadow-xl p-2"
		>
			<h class="text-center text-sm" style="white-space: pre-line">
				{data.event.description}
			</h>
		</div>
		<div class="w-full flex flex-col items-end mt-2">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<ReloadIcon on:click={changeLineupSize} />
		</div>
		{#if lineupBig}
			<div class="flex flex-col w-full items-center justify-center my-2">
				<ArtistBubbles artists={data.artists} isBig={lineupBig} />
				<div class="flex flex-row w-full items-center justify-center desktop:m-2 m-6">
					<EventInfoButtonSmall
						text={'Ig'}
						icon="https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-white-glyph-900x900.png"
						link={data.event.event_instagram}
					/>
					<EventInfoButtonSmall
						text={'Buy tix!! :3'}
						icon="https://icon-library.com/images/ticket-icon-png/ticket-icon-png-12.jpg"
						link={data.event.tickets_url}
					/>
				</div>
			</div>
		{:else}
			<div class="flex flex-row w-full items-center justify-center my-2">
				<EventInfoButtonSmall
					text={'Ig'}
					icon="https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-white-glyph-900x900.png"
					link={data.event.event_instagram}
				/>
				<EventInfoButtonSmall
					text={'Buy tix!! :3'}
					icon="https://icon-library.com/images/ticket-icon-png/ticket-icon-png-12.jpg"
					link={data.event.tickets_url}
				/>
				<ArtistBubbles artists={data.artists} isBig={lineupBig} />
			</div>
		{/if}
	</div>
</div>
