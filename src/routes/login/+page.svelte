<script lang="ts">
	import { goto } from '$app/navigation';
	import BackButton from '../../components/icons/BackButton.svelte';

	function goBack() {
		goto('/');
	}

	export let data;

	async function signInWithDiscord() {
		const { error } = await data.supabase.auth.signInWithOAuth({
			provider: 'discord'
		});
	}
	async function signInWithGoogle() {
		const { error } = await data.supabase.auth.signInWithOAuth({
			provider: 'google'
		});
	}
	async function signInWithSpotify() {
		const { error } = await data.supabase.auth.signInWithOAuth({
			provider: 'spotify'
		});
	}
	async function logOut() {
		goto('/logout');
	}
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
	<div class="desktop:w-1/3 w-full h-full flex flex-col items-center justify-center p-6">
		<div class="w-full mb-4">
			<BackButton on:click={goBack} />
		</div>

		<div class="w-full flex flex-col items-center justify-center mt-10">
			{#if data.session !== null}
				<h1 class="text-white mb-6">{data.session.user.email}</h1>
				<button on:click={logOut} class="btn w-18 bg-indigo-500 text-gray-50 font-extrabold"
					>Log Out</button
				>
			{:else}
				<div class="w-full flex flex-col items-center justify-center mt-12">
					<h1 class="text-center text-white text-xl">
						Use any of our providers to register/log in!
					</h1>
				</div>
				<button
					on:click={signInWithDiscord}
					class="btn w-52 bg-[#7289da] text-gray-50 font-extrabold mt-10">Discord</button
				>
				<button
					on:click={signInWithGoogle}
					class="btn w-52 bg-[#4285F4] text-gray-50 font-extrabold mt-10">Google</button
				>
				<button
					on:click={signInWithSpotify}
					class="btn w-52 bg-[#1DB954] text-gray-50 font-extrabold mt-10">Spotify</button
				>
			{/if}
		</div>
	</div>
</div>
