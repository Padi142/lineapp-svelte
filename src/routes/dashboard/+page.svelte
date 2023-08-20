<script lang="ts">
	import { goto } from '$app/navigation';
	import ProfileIcon from '../../components/ProfileIcon.svelte';

	export let data;

	let { session, supabase, profile } = data;

	function goToLogin() {
		goto('login');
	}

	function goToDashboard() {
		goto('dashboard');
	}

	function goToEventDetail(eventId: string) {
		goto('/dashboard/' + eventId);
	}
</script>

<div class="w-full h-full flex flex-col items-center justify-center p-2">
	<div class="w-full flex flex-row items-center justify-between">
		<h1 class="text-2xl text-white font-semibold">Lineapp</h1>

		<ProfileIcon user={profile} {goToLogin} {goToDashboard} />
	</div>
	<div class="desktop:w-1/3 w-full h-full flex flex-col items-center justify-center p-6">
		<h1 class="text-2xl text-center text-shite font-semibold">Dashboard</h1>
		<div class="grid grid-cols-2 gap-2 h-full w-full">
			{#each data.events as event}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click={() => goToEventDetail(event.event_uid)}
					class="flex flex-col items-center justifycenter bg-zinc-900 hover:bg-zinc-950 rounded-xl hover:scale-105 transition duration-300 ease-in-out"
				>
					<img
						class="object-cover h-32 w-full rounded-t-xl"
						src={event.event_logo}
						alt={event.event_name}
					/>
					<h1 class="m-1">
						{event.event_name}
					</h1>
				</div>
			{/each}
		</div>
	</div>
</div>
