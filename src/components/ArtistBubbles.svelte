<script lang="ts">
	import { onMount } from 'svelte';
	import type { ArtistType } from '../types/artist_type';
	import ArtistBubble from './ArtistBubble.svelte';
	import { goto } from '$app/navigation';

	export let artists: Array<ArtistType>;
	export let isBig: boolean;
	export let eventId: string;
	let artistBigStyles = [
		'desktop:w-[90px] w-[60px] rounded-full ring ring-primary ring-offset-base-100 mt-1',
		'desktop:w-[84px] w-[54px] rounded-full ring ring-primary ring-offset-base-100 mt-12',
		'desktop:w-[92px] w-[62px] rounded-full ring ring-primary ring-offset-base-100 mt-1',
		'desktop:w-[88px] w-[58px] rounded-full ring ring-primary ring-offset-base-100 mt-8'
	];
	let artistSmallStyles = [
		'desktop:w-[60px] w-[40px] rounded-full ring ring-primary ring-offset-base-100 m-1 mt-1',
		'desktop:w-[54px] w-[34px] rounded-full ring ring-primary ring-offset-base-100 m-1 mt-8',
		'desktop:w-[62px] w-[42px] rounded-full ring ring-primary ring-offset-base-100 m-1 mt-2',
		'desktop:w-[58px] w-[38px] rounded-full ring ring-primary ring-offset-base-100 m-1 mt-6'
	];

	function goToLineup() {
		goto(`${eventId}/lineup`);
	}
</script>

{#if isBig}
	<div
		class="w-full flex flex-row items-center justify-center desktop:h-40 h-28 rounded-md drop-shadow-lg"
	>
		<div class="flex relative w-full h-full items-center justify-center mt-2">
			<div
				class="flex flex-row items-start justify-center w-full h-full transform transition-all absolute"
			>
				<ArtistBubble artist={artists[0]} artistClass={artistBigStyles[0]} />
				<ArtistBubble artist={artists[1]} artistClass={artistBigStyles[1]} />
				<div class="desktop:mx-14 mx-6" />
				<ArtistBubble artist={artists[2]} artistClass={artistBigStyles[2]} />
				<ArtistBubble artist={artists[3]} artistClass={artistBigStyles[3]} />
			</div>
			<button
				on:click={goToLineup}
				class="btn btn-primary desktop:w-40 w-28 transform transition-all absolute">Lineup</button
			>
		</div>
	</div>
{:else}
	<div class="w-1/2 flex flex-row items-center justify-center h-24 rounded-md drop-shadow-lg">
		<div class="stack w-full h-full items-center justify-center mt-2">
			<button on:click={goToLineup} class="btn btn-primary desktop:w-20 w-16">Lineup</button>
			<div class="flex flex-row items-start justify-center w-full h-full">
				<ArtistBubble artist={artists[0]} artistClass={artistSmallStyles[0]} />
				<ArtistBubble artist={artists[1]} artistClass={artistSmallStyles[1]} />
				<div class="desktop:mx-2" />
				<ArtistBubble artist={artists[2]} artistClass={artistSmallStyles[2]} />
				<ArtistBubble artist={artists[3]} artistClass={artistSmallStyles[3]} />
			</div>
		</div>
	</div>
{/if}
