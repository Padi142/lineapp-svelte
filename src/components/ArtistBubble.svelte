<script lang="ts">
	import type { ArtistType } from '../types/artist_type';

	export let artistClass: string;
	export let artist: ArtistType;
</script>

<div class="avatar tooltip tooltip-bottom" data-tip={artist.artist_name}>
	<div class={artistClass}>
		<img src={artist.artist_photo} alt={artist.artist_name} />
	</div>
</div>
