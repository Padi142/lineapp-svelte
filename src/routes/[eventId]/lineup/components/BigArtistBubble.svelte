<script lang="ts">
	import type { ArtistType } from '../../../../types/artist_type';

	export let artist: ArtistType;

	export let changeChosenArtist: Function;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={() => changeChosenArtist(artist)} class="avatar">
	<div class="desktop:w-20 w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
		<img src={artist.artist_photo} alt={artist.artist_name} />
	</div>
</div>
