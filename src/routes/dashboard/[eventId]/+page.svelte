<script lang="ts">
	import { goto } from '$app/navigation';
	import BackButton from '../../../components/icons/BackButton.svelte';

	export let data;

	function goBack() {
		goto('/dashboard');
	}

	function goToLineup() {
		// goto('/' + data.event.event_uid);
		window.open(window.location.origin + '/' + data.event.event_uid, '_blank');
	}

	function goToAddArtist() {
		goto(data.event.event_uid + '/add-artist');
	}

	function goToAddArtistDetail(artistId: string) {
		goto(data.event.event_uid + '/artist/' + artistId);
	}

	function goToEdit() {
		goto(data.event.event_uid + '/edit');
	}
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
	<div class="desktop:w-1/3 w-full h-full flex flex-col items-center justify-center p-6">
		<div class="w-full mb-4 flex flex-row items-start justify-between">
			<BackButton on:click={goBack} />
			<button on:click={goToEdit} class="btn btn-primary">Edit</button>
		</div>
		<h1 class="text-white text-2xl font-semibold">
			{data.event.event_name}
		</h1>
		<div class="flex flex-row desktop:w-full items-center justify-center mt-2">
			<img
				class="h-auto object-cover desktop:max-w-lg w-56 rounded-lg drop-shadow-xl"
				src={data.event.event_logo}
				alt={data.event.event_name}
			/>
		</div>
		<div class="w-full mt-4">
			<h1 class="block mb-2 text-md font-medium">Event info</h1>
		</div>
		<div class="flex flex-col w-full items-center justify-center bg-zinc-900 rounded-md p-2 mt-4">
			<h class="text-center text-sm w-full" style="white-space: pre-line">
				{data.event.description}
			</h>
		</div>
		<div class="w-full flex -tems-center justify-center mt-5">
			<div class="flex flex-col items-center justify-center">
				<button
					on:click={goToLineup}
					class="btn bg-gradient-to-r from-indigo-500 to-pink-500 hover:underline text-white font-semibold mt-2"
				>
					Go to lineup url
				</button>
			</div>
		</div>
		<div class="flex flex-row items-center justify-between w-full mt-16">
			<h1 class="block mb-2 text-md font-medium">Artists</h1>
			<button on:click={goToAddArtist} class="btn btn-primary">Add</button>
		</div>

		<div class="w-full flex flex-row items-center justify-start overflow-x-scroll p-4 scale-105">
			{#each data.artists as artist}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="flex flex-col shrink-0 h-44 w-32 items-center justify-start bg-zinc-900 hover:bg-zinc-950 rounded-xl hover:scale-105 transition duration-300 ease-in-out mx-1"
					on:click={() => goToAddArtistDetail(artist.artist_uid)}
				>
					<img
						class="object-cover h-32 w-40 rounded-t-xl"
						src={artist.artist_photo}
						alt={artist.artist_name}
					/>
					<h1 class="m-1 text-center">
						{artist.artist_name}
					</h1>
				</div>
			{/each}
		</div>
		<div class="w-full mt-24">
			<h1 class="block mb-2 text-md font-medium text-red-600">Danger zone</h1>
		</div>
		<form method="POST" action="?/delete">
			<input
				type="text"
				placeholder="event_uid"
				class="w-0 h-0"
				value={data.event.id}
				name="event_uid"
			/>
			<button class="btn bg-red-600 hover:underline text-white font-semibold"> Delete </button>
		</form>
	</div>
</div>
