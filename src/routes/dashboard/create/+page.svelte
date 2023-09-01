<script lang="ts">
	import { goto } from '$app/navigation';
	import BackButton from '../../../components/icons/BackButton.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SveltyPicker from 'svelty-picker';

	export let data: PageData;

	const { form, errors } = superForm(data.form);

	form.update((currentForm) => ({
		...currentForm,
		creator_uid: data.userProfile.userProfile!.id
	}));

	function goBack() {
		goto('/dashboard');
	}
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
	<div class="desktop:w-1/3 w-full h-full flex flex-col items-center justify-center p-6">
		<div class="w-full mb-4">
			<BackButton on:click={goBack} />
		</div>
		<form method="POST" class="flex flex-col w-full">
			<label for="name" class="block mb-2 text-md font-medium font-white"
				>Name your awesome event!
			</label>
			<input
				type="text"
				class="block p-2.5 w-full text-sm rounded-lg border text-center bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
				name="event_name"
				placeholder="Like '✨Supa-awesome-mega-party✨' "
				bind:value={$form.event_name}
			/>
			{#if $errors.event_name}
				<small>{$errors.event_name}</small>
			{/if}

			<label for="description" class="block mb-2 text-md font-medium font-white"
				>What do you want people to know?
			</label>
			<textarea
				rows="6"
				name="description"
				class="block p-2.5 w-full text-sm rounded-lg border text-center bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
				bind:value={$form.description}
				placeholder="What is the party going to be like ? 🥰🥳"
			/>
			{#if $errors.description}
				<small>{$errors.description}</small>
			{/if}

			<label for="start_date" class="block mb-2 text-md font-medium font-white"
				>When is the event starting and ending?
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
					<label for="start_date" class="block mb-2 text-sm font-medium font-white">End </label>
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
			<input type="text" class="w-0 h-0" name="creator_uid" bind:value={$form.creator_uid} />
			<div class="w-full flex -tems-center justify-center mt-10">
				<button class="btn bg-indigo-500 hover:underline text-white font-semibold">
					Create Event
				</button>
			</div>
		</form>
	</div>
</div>
