<script lang="ts">
	import { goto } from '$app/navigation';
	import { format } from 'date-fns';
	import BackButton from '../../../../../components/icons/BackButton.svelte';

	export let data;

	const startTime = format(Date.parse(data.artist.start_time), 'HH:mm');
	const endTime = format(Date.parse(data.artist.end_time), 'HH:mm');

	function goBack() {
		goto('/dashboard/' + data.eventId);
	}

	function goToEdit() {
		goto(data.artist.artist_uid + '/edit');
	}
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
	<div class="desktop:w-1/3 w-full h-full flex flex-col items-center justify-center p-6">
		<div class="w-full mb-4 flex flex-row items-start justify-between">
			<BackButton on:click={goBack} />
			<button on:click={goToEdit} class="btn btn-primary">Edit</button>
		</div>
		<h1 class="text-white text-2xl font-semibold">
			{data.artist.artist_name}
		</h1>
		<div class="flex flex-row desktop:w-full items-center justify-center mt-2">
			<img
				class="h-auto object-cover desktop:max-w-lg w-56 rounded-lg drop-shadow-xl"
				src={data.artist.artist_photo}
				alt={data.artist.artist_name}
			/>
		</div>
		<div class="w-full mt-4">
			<h1 class="block mb-2 text-md font-medium">Artist info</h1>
		</div>

		<div
			class="flex flex-col w-full items-center justify-center bg-zinc-900 rounded-md p-2 mt-4"
		>
			<h class="text-center text-sm w-full" style="white-space: pre-line">
				{data.artist.artist_description}
			</h>
		</div>
		<div class="flex flex-row w-full items-center justify-center mt-2">
			<div class="flex flex-row items-center justify-center">
				<h1 class="text-sm m-2">Start time:</h1>

				<h1 class="text-xl m-1">
					{startTime}
				</h1>
				<h1 class="text-sm m-2">End time:</h1>
				<h1 class="text-xl m-1">
					{endTime}
				</h1>
			</div>
		</div>
		<form method="POST" action="?/delete" class="mt-20">
			<input
				type="text"
				placeholder="artist_uid"
				class="w-0 h-0"
				value={data.artist.artist_uid}
				name="artist_uid"
			/>
			<button class="btn bg-red-600 hover:underline text-white font-semibold"> Delete </button>
		</form>
	</div>
</div>
