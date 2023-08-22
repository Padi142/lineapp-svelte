<script lang="ts">
	import { format } from 'date-fns';
	import type { ArtistType } from '../../../../types/artist_type';

	export let artist: ArtistType;

	export let changeChosenArtist: Function;
	console.log(artist)

	const startDate = Date.parse(artist.start_time);
</script>

<div class="my-8 flex flex-col items-center justify-center">
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<label
		on:click={() => changeChosenArtist(artist)}
		for="artist-drawer"
		class="avatar drawer-button"
	>
		<div
			class="desktop:w-20 w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
		>
			<img src={artist.artist_photo} alt={artist.artist_name} />
		</div>
	</label>
	<h1 class="text-center text-white text-base">
		{artist.artist_name}
	</h1>
	<h1 class="text-center text-white text-sm">
		{format(startDate, 'HH:mm')}
	</h1>
</div>
