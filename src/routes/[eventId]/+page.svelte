<script lang="ts">
	import { format } from 'date-fns';
	import type { PageData } from './$types';
	import ArtistBubbles from '../../components/ArtistBubbles.svelte';
	import EventInfoButtonSmall from '../../components/EventInfoButtonSmall.svelte';

	export let data: PageData;

	let lineupBig = true;

	const startDate = Date.parse(data.event.start_time);
</script>

<svelte:head>
	<title>{data.event.event_name}</title>

	<meta property="og:title" content={data.event.event_name} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://lineup.krejzac.dev" />
	<meta property="og:image" content={data.event.event_logo} />
	<meta property="og:description" content={data.event.description.slice(0, 300)} />

	<meta name="twitter:title" content={data.event.event_name} />
	<meta name="twitter:description" content={data.event.description.slice(0, 300)} />
	<meta name="twitter:image" content={data.event.event_logo} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="w-full h-full flex flex-col items-center justify-center">
	<div class="desktop:w-1/3 w-full h-full flex flex-col items-center justify-center p-6">
		<div class="flex flex-row desktop:w-full items-center justify-center">
			<img
				class="h-auto object-cover desktop:max-w-lg w-full rounded-lg drop-shadow-xl"
				src={data.event.event_logo}
				alt={data.event.event_name}
			/>
		</div>

		<h1 class="text-6xl mt-2 mb-4 text-center shadow-sm">{data.event.event_name}</h1>
		<div class="flex flex-col w-full items-center justify-center mt-6">
			<progress
				class="progress progress-secondary desktop:w-96 w-48 shadow-md"
				value="100"
				max="100"
			/>
			<h class="text-center text-white font-medium text-2xl py-2"
				>{format(startDate, 'dd. MM. yyyy - HH:mm')}</h
			>
		</div>
		<div class="w-full flex flex-col justify-center items-center mt-4">
			<div
				class="flex flex-col desktop:w-full w-lg items-center justify-center bg-zinc-900 rounded-md shadow-xl p-2"
			>
				<h class="text-center text-sm" style="white-space: pre-line">
					{data.event.description}
				</h>
			</div>
			<!-- <div class="w-full flex flex-col items-end mt-2">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- <ReloadIcon on:click={changeLineupSize} />
			</div>  -->
			{#if lineupBig}
				<div class="flex flex-col w-full items-center justify-center my-2 mt-6">
					<ArtistBubbles artists={data.artists} isBig={lineupBig} eventId={data.event.event_uid} />
					<div class="flex flex-row w-full items-center justify-center desktop:m-2 m-6 mt-8">
						<EventInfoButtonSmall
							icon="https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-white-glyph-900x900.png"
							link={data.event.event_instagram}
						/>
						<EventInfoButtonSmall
							icon="https://icon-library.com/images/ticket-icon-png/ticket-icon-png-12.jpg"
							link={data.event.tickets_url}
						/>
					</div>
				</div>
			{:else}
				<div class="flex flex-row w-full items-center justify-center my-2 mt-2">
					<EventInfoButtonSmall
						icon="https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-white-glyph-900x900.png"
						link={data.event.event_instagram}
					/>
					<EventInfoButtonSmall
						icon="https://icon-library.com/images/ticket-icon-png/ticket-icon-png-12.jpg"
						link={data.event.tickets_url}
					/>
					<ArtistBubbles artists={data.artists} isBig={lineupBig} eventId={data.event.event_uid} />
				</div>
			{/if}
			<div class="mb-10" />
		</div>
	</div>
</div>
