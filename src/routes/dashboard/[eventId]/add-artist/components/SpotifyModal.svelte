<script lang="ts">
	import { PUBLIC_API_URL, PUBLIC_DEFAULT_EVENT_PHOTO } from '$env/static/public';
	import request from '../../../../../functions/request';
	import type { SpotifyArtistType } from '../../../../../types/spotify_search_artist';

	export let showModal: boolean; // boolean
	export let onPickedArtist: Function; // boolean

	let dialog: any; // HTMLDialogElement

	let query = '';
	let searchArtists: Array<SpotifyArtistType> = [];

	$: if (dialog && showModal) dialog.showModal();

	const searchSpotifyArtists = async (query: string) => {
		if (query === '') {
			searchArtists = [];
			return;
		}

		const result = await request<{ artists: Array<SpotifyArtistType> }>(
			PUBLIC_API_URL + 'spotify/search?query=' + query
		);
		searchArtists = result.artists;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="my-30 bg-slate-800 modal-box w-11/12"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation class="flex flex-col justify-center items-center">
		<h1 class="text-center mb-8">Search for an artist on Spotify!</h1>
		<input
			type="text"
			class="block mb-6 p-2.5 w-full text-sm rounded-lg border text-center bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
			name="artist_name"
			placeholder="Search"
			bind:value={query}
			on:input={() => searchSpotifyArtists(query)}
		/>
		<div class="w-full h-96 overflow-y-scroll p-2">
			{#each searchArtists as artist}
				<div class="w-full flex flex-row items-center justify-between bg-slate-900 m-2">
					<div class="flex flex-row">
						<div class="avatar mb-1">
							<div class="w-16 rounded">
								{#if artist.artist_photos.length !== 0}
									<img src={artist.artist_photos[0].url} alt={artist.artist_name} />
								{:else}
									<img src={PUBLIC_DEFAULT_EVENT_PHOTO} alt={artist.artist_name} />
								{/if}
							</div>
						</div>
						<h1 class="font-semibold ml-2">
							{artist.artist_name}
						</h1>
					</div>
					<button
						class="btn btn-primary text-gray-50 font-semibold mr-2"
						on:click={() => {
							dialog.close();
							onPickedArtist(artist);
						}}
					>
						Add
					</button>
				</div>
			{/each}
		</div>
		<button on:click={() => dialog.close()} class="btn mt-8">Close</button>
	</div>
</dialog>
