<script lang="ts">
	import type { UserProfileType } from '../types/user_profile_type';
	export let user: UserProfileType | undefined;
	export let goToLogin: Function;
	export let goToDashboard: Function;
</script>

{#if user === undefined}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={() => goToLogin()}
		class="bg-zinc-900 hover:bg-zinc-950 rounded-md max-w-32 flex flec-row items-center justify-center px-2 py-1"
	>
		<h1 class="hover:underline">Log in</h1>
	</div>
{:else}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={() => goToDashboard()}
		class="bg-zinc-900 hover:bg-zinc-950 rounded-md max-w-32 flex flec-row items-center justify-center px-2 py-1"
	>
		<div class="avatar">
			<div class="w-8 rounded">
				<img src={user.avatar_url} alt={user.full_name} />
			</div>
		</div>
		<h1 class="ml-1 hover:underline">
			{user.full_name}
		</h1>
	</div>
{/if}
