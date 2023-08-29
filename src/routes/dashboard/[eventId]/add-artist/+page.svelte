<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SveltyPicker from 'svelty-picker';
	import BackButton from '../../../../components/icons/BackButton.svelte';
	import { uploadAvatar } from '../../../../functions/upload';
	import SpotifyIcon from '../../../../assets/spotify-icon.svelte';
	import SpotifyModal from './components/SpotifyModal.svelte';
	import type { SpotifyArtistType } from '../../../../types/spotify_search_artist';

	export let data: PageData;

	let uploading = false;
	let files: FileList;

	let showModal = false;

	const { form, errors } = superForm(data.form);

	async function uploadArtistPhoto() {
		uploading = true;
		const result = await uploadAvatar('artist-photos', data.eventId, files, data.supabase);

		if (result !== undefined) {
			form.update((currentForm) => ({
				...currentForm,
				artist_photo: result
			}));
		}
		uploading = false;
	}

	function goBack() {
		goto('/dashboard/' + data.eventId);
	}

	function showSpotifyModal() {
		showModal = !showModal;
	}

	function onPickArtist(artist: SpotifyArtistType) {
		form.update((currentForm) => ({
			...currentForm,
			artist_name: artist.artist_name,
			spotify_link: artist.artist_url,
			artist_photo:
				artist.artist_photos.length !== 0 ? artist.artist_photos[0].url : currentForm.artist_photo
		}));
	}
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
	<SpotifyModal bind:showModal onPickedArtist={onPickArtist} />
	<div class="desktop:w-1/3 w-full h-full flex flex-col items-center justify-center p-6">
		<div class="w-full mb-4 flex flex-row items-center justify-between">
			<BackButton on:click={goBack} />
			<button class="btn bg-[#1DB954] text-gray-50 font-semibold" on:click={showSpotifyModal}>
				<div class="flex flex-row items-center">
					<div class="w-6 mr-2">
						<SpotifyIcon />
					</div>
					<h1>Search</h1>
				</div>
			</button>
		</div>
		<form method="POST" class="flex flex-col w-full">
			<div class="w-full flex flex-row items-center justify-between">
				<h1 class="block mb-2 text-md font-medium font-white">Artist photo!</h1>
			</div>
			<div class="flex flex-col desktop:w-full items-center justify-center">
				<img
					class="h-auto object-cover desktop:max-w-lg w-56 rounded-lg drop-shadow-xl"
					src={$form.artist_photo}
					alt={$form.artist_name}
				/>
				<label class="btn btn-primary mt-2 w-32" for="event_logo_btn">
					{uploading ? 'Uploading ...' : 'Change photo'}
				</label>
				<input
					type="text"
					class="hidden w-0 h-0"
					name="artist_photo"
					bind:value={$form.artist_photo}
				/>
				<input
					class="hidden"
					type="file"
					id="event_logo_btn"
					accept="image/*"
					bind:files
					on:change={uploadArtistPhoto}
					disabled={uploading}
				/>
			</div>
			<label for="artist_name" class="block mb-2 text-md font-medium font-white"
				>Artist Name
			</label>
			<input
				type="text"
				class="block p-2.5 w-full text-sm rounded-lg border text-center bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
				name="artist_name"
				placeholder="Name..."
				bind:value={$form.artist_name}
			/>
			{#if $errors.artist_name}
				<small>{$errors.artist_name}</small>
			{/if}

			<label for="description" class="block mb-2 text-md font-medium font-white"
				>Artist description
			</label>
			<textarea
				rows="6"
				name="description"
				class="block p-2.5 w-full text-sm rounded-lg border text-center bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
				bind:value={$form.description}
				placeholder="What will they play ? 🥰"
			/>
			{#if $errors.description}
				<small>{$errors.description}</small>
			{/if}

			<label for="start_date" class="block mb-2 text-md font-medium font-white"
				>What time do they play?
			</label>
			<div class="w-full flex flex-row items-center justify-center">
				<div class="flex flex-col">
					<label for="start_date" class="block mb-2 text-sm font-medium font-white">Start </label>

					<SveltyPicker
						inputClasses="form-control w-1/2"
						format="hh:ii"
						bind:value={$form.start_time}
					>
						<svelte:fragment
							slot="inputs"
							let:displayValue
							let:onInputFocus
							let:onInputBlur
							let:onKeyDown
						>
							<input
								type="text"
								name="start_time"
								value={displayValue}
								on:keydown={onKeyDown}
								on:focus={onInputFocus}
								on:blur={onInputBlur}
								class="mr-2 p-2.5 w-full text-sm rounded-lg border text-center bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
							/>
						</svelte:fragment>
					</SveltyPicker>
					{#if $errors.start_time}
						<small>{$errors.start_time}</small>
					{/if}
				</div>

				<div class="flex flex-col">
					<label for="start_date" class="block mb-2 text-sm font-medium font-white">End </label>
					<SveltyPicker
						inputClasses="form-control w-1/2"
						format="hh:ii"
						bind:value={$form.end_time}
					>
						<svelte:fragment
							slot="inputs"
							let:displayValue
							let:onInputFocus
							let:onInputBlur
							let:onKeyDown
						>
							<input
								type="text"
								name="end_time"
								value={displayValue}
								on:keydown={onKeyDown}
								on:focus={onInputFocus}
								on:blur={onInputBlur}
								class="ml-2 p-2.5 w-full text-sm rounded-lg border text-center bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
							/>
						</svelte:fragment>
					</SveltyPicker>
					{#if $errors.end_time}
						<small>{$errors.end_time}</small>
					{/if}
				</div>
			</div>
			<label for="start_date" class="block mb-2 text-md font-medium font-white mt-8"
				>Their socials?
			</label>
			<div class="w-full flex flex-row items-center justify-center">
				<div class="flex flex-col">
					<label for="spotify_link" class="block mb-2 text-sm font-medium font-white"
						>Spotify
					</label>
					<input
						type="text"
						class="block p-2.5 w-full text-sm rounded-lg border text-center mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
						name="spotify_link"
						placeholder="https://open.spotify.com/artist/..."
						bind:value={$form.spotify_link}
					/>
				</div>
				<div class="flex flex-col">
					<label for="instagram_link" class="block mb-2 text-sm font-medium font-white"
						>Instagram
					</label>
					<input
						type="text"
						class="block p-2.5 w-full text-sm rounded-lg border text-center ml-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
						name="instagram_link"
						placeholder="https://www.instagram.com/..."
						bind:value={$form.instagram_link}
					/>
				</div>
			</div>

			<div class="w-full flex -tems-center justify-center mt-10">
				<button class="btn bg-indigo-500 hover:underline text-white font-semibold">
					Create Artist
				</button>
			</div>
		</form>
	</div>
</div>
