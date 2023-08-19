<script lang="ts">
	import { goto } from '$app/navigation';
	import { format } from 'date-fns';
	import AppleMusicButton from '../../../components/icons/AppleMusicButton.svelte';
	import BackButton from '../../../components/icons/BackButton.svelte';
	import InstagramIcon from '../../../components/icons/InstagramIcon.svelte';
	import SpotifyButton from '../../../components/icons/SpotifyButton.svelte';
	import type { ArtistType } from '../../../types/artist_type';
	import type { PageData } from './$types';
	import LineupHeader from './components/LineupHeader.svelte';

	export let data: PageData;

	let chosenArtist = data.artists[0];

	function changeChosenArtist(artists: ArtistType) {
		chosenArtist = artists;
	}

	function goBack() {
		goto(`/${data.event.event_uid}`);
	}
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
		<div class="w-full mb-4">
			<BackButton on:click={goBack} />
		</div>
		<div class="w-full flex flex-row items-center justify-center">
			<LineupHeader artists={data.artists} {chosenArtist} {changeChosenArtist} />
			<div class="w-full flex flex-col">
				<div
					class="w-full text-center desktop:text-6xl text-4xl text-white font-semibold shadow-md"
				>
					<h1>{chosenArtist.artist_name}</h1>
				</div>
				<div class="w-full flex flex-row items-center justify-center desktop:mt-8 mt-4">
					<InstagramIcon instagramLink={chosenArtist.instagram_link} />
					<SpotifyButton spotifyLink={chosenArtist.spotify_link} />
					<AppleMusicButton appleMusicLink={chosenArtist.apple_link} />
				</div>
			</div>
		</div>
		<div>
			<div class=" h-1 bg-fuchsia-600 rounded-lg mt-8" />
			<h1 class="text-4xl text-white">
				{format(Date.parse(chosenArtist.start_time), 'HH:mm') +
					' - ' +
					format(Date.parse(chosenArtist.end_time), 'HH:mm')}
			</h1>
		</div>
		<div
			class="flex flex-col desktop:w-full w-lg items-center justify-center bg-zinc-900 rounded-md shadow-xl p-2 mt-4"
		>
			<h class="text-center text-sm" style="white-space: pre-line">
				{chosenArtist.artist_description}
			</h>
		</div>
	</div>
</div>
