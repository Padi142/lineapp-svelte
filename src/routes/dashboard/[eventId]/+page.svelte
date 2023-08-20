<script lang="ts">
	import { goto } from '$app/navigation';
	import BackButton from '../../../components/icons/BackButton.svelte';

	export let data;

	function goBack() {
		goto('/dashboard');
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
	</div>
</div>
