<script lang="ts">
	import type { ArtistType } from '../../../../types/artist_type';
	import { format } from 'date-fns';
	import LineupArtistContainer from './LineupArtistContainer.svelte';

	export let chosenArtist: ArtistType;
	export let artists: Array<ArtistType>;

	export let changeChosenArtist: Function;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="drawer desktop:w-36 w-28">
	<input id="artist-drawer" type="checkbox" class="drawer-toggle" />
	<label for="artist-drawer" class="avatar drawer-button">
		<div
			class="desktop:w-36 w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
		>
			<img src={chosenArtist.artist_photo} alt={chosenArtist.artist_name} />
		</div>
	</label>
	<!-- drawer -->
	<div class="drawer-side">
		<label for="artist-drawer" class="drawer-overlay" />
		<ul
			class="menu p-4 w-36 h-full bg-base-200 flex flex-col items-center justify-start overflow-y-scroll"
		>
			<div class="flex relative h-full w-full items-center justify-start">
				<!-- <div class="transform absolute flex w-full h-full items-center justify-center">
								<div class="bg h-full w-1 bg-fuchsia-600 rounded-lg" />
							</div> -->
				<div class="transform absolute w-full h-full">
					{#each artists as artist}
						<LineupArtistContainer {artist} changeChosenArtist={() => changeChosenArtist(artist)} />
					{/each}
				</div>
			</div>
		</ul>
	</div>
</div>
