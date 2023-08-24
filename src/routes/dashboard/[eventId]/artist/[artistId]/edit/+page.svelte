<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SveltyPicker from 'svelty-picker';
	import { uploadAvatar } from '../../../../../../functions/upload';
	import BackButton from '../../../../../../components/icons/BackButton.svelte';

	export let data: PageData;

	let uploading = false;
	let files: FileList;

	const { form, errors } = superForm(data.form);

	async function uploadArtistPhoto() {
		uploading = true;
		const result = await uploadAvatar('artist-photos', data.event.event_uid, files, data.supabase);

		if (result !== undefined) {
			form.update((currentForm) => ({
				...currentForm,
				event_logo: result
			}));
		}
		uploading = false;
	}

	function goBack() {
		goto('/dashboard/' + data.event.event_uid + '/artist/' + data.artist.artist_uid);
	}
</script>

<!-- <SuperDebug data={$form} /> -->
<div class="w-full h-full flex flex-col items-center justify-center">
	<div class="desktop:w-1/3 w-full h-full flex flex-col items-center justify-center p-6">
		<div class="w-full mb-4">
			<BackButton on:click={goBack} />
		</div>
		<form method="POST" class="flex flex-col w-full">
			<label for="name" class="block mb-2 text-md font-medium font-white">Artist photo! </label>
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
				name="artist_description"
				class="block p-2.5 w-full text-sm rounded-lg border text-center bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
				bind:value={$form.artist_description}
				placeholder="What will they play ? 🥰"
			/>
			{#if $errors.artist_description}
				<small>{$errors.artist_description}</small>
			{/if}

			<label for="start_date" class="block mb-2 text-md font-medium font-white"
				>What time do they play?
			</label>
			<div class="w-full flex flex-row items-center justify-center">
				<div class="flex flex-col">
					<label for="start_date" class="block mb-2 text-sm font-medium font-white">Start </label>

					<SveltyPicker
						inputClasses="form-control w-1/2"
						format="yyyy-mm-dd hh:ii"
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
					<label for="start_date" class="block mb-2 text-sm font-medium font-white">Start </label>
					<SveltyPicker
						inputClasses="form-control w-1/2"
						format="yyyy-mm-dd hh:ii"
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
			<div class="w-full flex flex-row items-center justify-start mt-2">
				<div class="flex flex-col w-full">
					<label for="apple_link" class="block mb-2 text-sm font-medium font-white"
						>Apple music
					</label>
					<input
						type="text"
						class="block p-2.5 w-1/2 text-sm rounded-lg border text-center mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
						name="apple_link"
						placeholder="https://music.apple.com/..."
						bind:value={$form.apple_link}
					/>
				</div>
			</div>
			<div class="w-full flex -tems-center justify-center mt-10">
				<button class="btn bg-indigo-500 hover:underline text-white font-semibold"> Update </button>
			</div>
		</form>
	</div>
</div>
