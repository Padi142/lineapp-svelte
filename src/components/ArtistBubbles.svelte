<script lang="ts">
	import { onMount } from 'svelte';
	import type { ArtistType } from '../types/artist_type';
	import ArtistBubble from './ArtistBubble.svelte';

	export let artists: Array<ArtistType>;
	let artistStyles = [
		'desktop:w-[60px] w-[40px] rounded-full ring ring-primary ring-offset-base-100 m-1 mt-1',
		'desktop:w-[54px] w-[34px] rounded-full ring ring-primary ring-offset-base-100 m-1 mt-8',
		'desktop:w-[62px] w-[42px] rounded-full ring ring-primary ring-offset-base-100 m-1 mt-2',
		'desktop:w-[58px] w-[38px] rounded-full ring ring-primary ring-offset-base-100 m-1 mt-6'
	];
</script>

<div class="w-1/2 flex flex-row items-center justify-center h-24 rounded-md drop-shadow-lg ml-1">
	<div class="stack w-full h-full items-center justify-center mt-2">
		<button class="btn btn-primary desktop:w-20 w-16">Lineup</button>
		<div class="flex flex-row items-start justify-center w-full h-full">
			<ArtistBubble artist={artists[0]} artistClass={artistStyles[0]} />
			<ArtistBubble artist={artists[1]} artistClass={artistStyles[1]} />
			<div class="desktop:mx-2" />
			<ArtistBubble artist={artists[2]} artistClass={artistStyles[2]} />
			<ArtistBubble artist={artists[3]} artistClass={artistStyles[3]} />
		</div>
	</div>
</div>
