<script lang="ts">
	import { goto } from '$app/navigation';
	import ProfileIcon from '../components/ProfileIcon.svelte';

	export let data;

	let { session, supabase, profileType } = data;

	function goToLogin() {
		goto('login');
	}

	function goToDashboard() {
		goto('dashboard');
	}
</script>

<svelte:head>
	<title>Lineapp</title>
	<meta name="description" content="The best way to share your event!" />
</svelte:head>

<div class="w-full h-full p-2">
	<div class="w-full flex flex-row items-center justify-between">
		<h1 class="text-2xl text-white font-semibold">Lineapp</h1>

		<ProfileIcon user={profileType} {goToLogin} {goToDashboard} />
	</div>
	<div class="w-full h-full p-4">
		<div class="text-center px-3 lg:px-0">
			<h1 class="my-4 text-2xl md:text-3xl lg:text-5xl font-black leading-tight">
				One place for all your events
			</h1>
			<p class="leading-normal text-gray-400 text-base md:text-xl lg:text-2xl mb-8">
				All the info about your next event in one, simple link
			</p>
			<div class="flex flex-col items-start justify-center">
				<button
					on:click={goToLogin}
					class="mx-auto bg-gradient-to-r from-indigo-500 to-pink-500 lg:mx-0 hover:underline text-gray-50 font-extrabold rounded my-2 md:my-6 py-4 px-8 shadow-lg w-48"
				>
					Sign Up
				</button>
				{#if data.session === null}
					<button
						on:click={goToLogin}
						class="mx-auto bg-indigo-500 hover:underline text-gray-50 font-extrabold rounded my-4 py-2 px-4 shadow-lg w-18"
					>
						Log In
					</button>
				{/if}
			</div>
		</div>
		<div class="flex flex-wrap justify-center mt-16 mb-36 m-8">
			<img
				class="shadow-2xl desktop:w-96"
				src="https://ynodkuxldoumbyyocxqt.supabase.co/storage/v1/object/public/promo/landing_promo1.png"
				alt="fury"
			/>
		</div>
	</div>
</div>
