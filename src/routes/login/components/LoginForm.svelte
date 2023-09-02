<script lang="ts">
	import type { Session } from '@supabase/supabase-js';
	import type SupabaseClient from '@supabase/supabase-js/dist/module/SupabaseClient';
	import GoogleLogo from '../../../assets/google-logo.svelte';
	import SpotifyLogo from '../../../assets/spotify-logo.svelte';
	import DiscordIcon from '../../../assets/discord-icon.svelte';

	export let data: {
		supabase: SupabaseClient;
		session: Session | null;
	};

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
</script>

<div class="max-w-screen-xl m-0 sm:m-10 bg-zinc-900 shadow rounded-lg flex justify-center flex-1">
	<div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
		<div class="mt-6 flex flex-col items-center">
			<h1 class="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
			<div class="w-full flex-1 mt-8">
				<div class="flex flex-col items-center">
					<button
						class="w-72 font-bold shadow-sm rounded-lg py-3 bg-zinc-800 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
						on:click={signInWithDiscord}
					>
						<div class="bg-zinc-900 p-1 rounded-full w-8">
							<DiscordIcon />
						</div>
						<span class="ml-4 text-white"> Sign Up with Discord </span>
					</button>

					<button
						class="w-72 font-bold shadow-sm rounded-lg py-3 mt-2 bg-zinc-800 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
						on:click={signInWithSpotify}
					>
						<div class="bg-zinc-900 p-1 rounded-full w-8">
							<SpotifyLogo />
						</div>
						<span class="ml-4 text-white"> Sign Up with Spotify </span>
					</button>

					<button
						class="w-72 font-bold shadow-sm rounded-lg py-3 mt-2 bg-zinc-800 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
						on:click={signInWithGoogle}
					>
						<div class="bg-zinc-900 p-1 rounded-full w-8">
							<GoogleLogo />
						</div>
						<span class="ml-4 text-white"> Sign Up with Google </span>
					</button>
				</div>
				<div class="h-12" />
			</div>
		</div>
	</div>
</div>
