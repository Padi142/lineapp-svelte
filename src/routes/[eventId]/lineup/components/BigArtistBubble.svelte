<script lang="ts">
	import { format } from 'date-fns';
	import type { ArtistType } from '../../../../types/artist_type';

	export let artist: ArtistType;

	export let changeChosenArtist: Function;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:click={() => changeChosenArtist(artist)}
	class="avatar flex flex-col items-center justify-center"
>
	<div class="desktop:w-20 w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
		<img src={artist.artist_photo} alt={artist.artist_name} />
	</div>
	<h1 class="mt-2">
		{artist.artist_name}
	</h1>
    <h1 class="text-center text-white text-sm">
        {format(Date.parse(artist.start_time), 'HH:mm')}
    </h1>
</div>
