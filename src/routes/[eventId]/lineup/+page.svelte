<script lang="ts">
	import { goto } from '$app/navigation';
	import AppleMusicButton from '../../../components/icons/AppleMusicButton.svelte';
	import BackButton from '../../../components/icons/BackButton.svelte';
	import InstagramIcon from '../../../components/icons/InstagramIcon.svelte';
	import SpotifyButton from '../../../components/icons/SpotifyButton.svelte';
	import { shuffleArtists } from '../../../functions/shuffle';
	import type { PageData } from './$types';

	export let data: PageData;

	let chosenArtist = shuffleArtists(data.artists)[0];

	function changeChosenArtist() {
		chosenArtist = shuffleArtists(data.artists)[0];
	}

	function goBack() {
		window.location.href = window.location.href.split('lineup')[0];
	}
</script>

<svelte:head>
	<title>{data.event.event_name}</title>

	<meta property="og:title" content={data.event.event_name} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://lineup.krejzac.dev" />
	<meta property="og:image" content={data.event.event_logo} />
	<meta property="og:description" content={data.event.description.slice(0, 200)} />

	<meta name="twitter:title" content={data.event.event_name} />
	<meta name="twitter:description" content={data.event.description.slice(0, 200)} />
	<meta name="twitter:image" content={data.event.event_logo} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="w-full h-full flex flex-col items-center justify-center">
	<div class="desktop:w-1/3 w-full h-full flex flex-col items-center justify-center p-6">
		<div class="w-full mb-4">
			<BackButton on:click={goBack} />
		</div>
		<div class="w-full flex flex-row items-center justify-center">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div on:click={changeChosenArtist} class="avatar">
				<div class="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
					<img src={chosenArtist.artist_photo} alt={chosenArtist.artist_name} />
				</div>
			</div>
			<div class="w-full flex flex-col">
				<div class="w-full text-center text-4xl text-white font-semibold shadow-md">
					<h1>{chosenArtist.artist_name}</h1>
				</div>
				<div class="w-full flex flex-row items-center justify-center mt-4">
					<InstagramIcon instagramLink={chosenArtist.instagram_link} />
					<SpotifyButton spotifyLink={chosenArtist.spotify_link} />
					<AppleMusicButton appleMusicLink={chosenArtist.apple_link} />
				</div>
			</div>
		</div>
		<div
			class="flex flex-col desktop:w-full w-lg items-center justify-center bg-zinc-900 rounded-md shadow-xl p-2 mt-8"
		>
			<h class="text-center text-sm" style="white-space: pre-line">
				{chosenArtist.artist_description}
			</h>
		</div>
	</div>
</div>
