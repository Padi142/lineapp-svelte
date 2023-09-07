<script lang="ts">
	import { goto } from '$app/navigation';
	import BackButton from '../../components/icons/BackButton.svelte';
	import LoginForm from './components/LoginForm.svelte';
	import UserProfile from './components/UserProfile.svelte';

	function goBack() {
		goto('/');
	}

	export let data;

	async function logOut() {
		goto('/logout');
	}

	async function goToDashboard() {
		goto('/dashboard');
	}
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
	<div class="desktop:w-1/3 w-full h-full flex flex-col items-center justify-center p-6">
		<div class="w-full mb-4">
			<BackButton on:click={goBack} />
		</div>

		<div class="w-full flex flex-col items-center justify-center mt-10">
			{#if data.profile !== undefined}
				<UserProfile user={data.profile} />
				<button on:click={goToDashboard} class="btn btn-primary font-extrabold mt-48"
					>Dashboard</button
				>
				<button on:click={logOut} class="btn w-18 bg-indigo-500 text-gray-50 font-extrabold mt-6"
					>Log Out</button
				>
			{:else}
				<LoginForm {data} />
			{/if}
		</div>
	</div>
</div>
