<script lang="ts">
	import { goto } from '$app/navigation';
	import BackButton from '../../../components/icons/BackButton.svelte';

	export let data;

	function goBack() {
		goto('/dashboard');
	}

	function goToLineup() {
		goto('/' + data.event.event_uid);
	}
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
	<div class="desktop:w-1/3 w-full h-full flex flex-col items-center justify-center p-6">
		<div class="w-full mb-4">
			<BackButton on:click={goBack} />
		</div>
		<h1 class="text-white text-2xl font-semibold">
			{data.event.event_name}
		</h1>
		<div class="w-full mt-4">
			<h1 class="block mb-2 text-md font-medium">Event info</h1>
		</div>
		<div class="w-full flex -tems-center justify-center mt-5">
			<button
				on:click={goToLineup}
				class="btn bg-gradient-to-r from-indigo-500 to-pink-500 hover:underline text-white font-semibold"
			>
				Go to lineup url
			</button>
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
			<button on:click={goToLineup} class="btn bg-red-600 hover:underline text-white font-semibold">
				Delete
			</button>
		</form>
	</div>
</div>
