<script lang="ts">
	import { goto } from '$app/navigation';
	import BackButton from '../../components/icons/BackButton.svelte';
	import LoginForm from './components/LoginForm.svelte';

	function goBack() {
		goto('/');
	}

	export let data;

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
				<LoginForm {data} />
			{/if}
		</div>
	</div>
</div>
