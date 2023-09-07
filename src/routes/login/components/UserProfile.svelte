<script lang="ts">
	import type { UserProfileType } from '../../../types/user_profile_type';

	export let user: UserProfileType;
</script>

<div class="w-full flex flex-col items-center justify-start">
	<div class="w-full flex flex-row justify-center items-center">
		<div class="avatar">
			<div class="w-24 rounded-full shadow-xl">
				<img src={user.avatar_url} alt={user.full_name} />
			</div>
		</div>
	</div>
	<div class="w-full flex items-center justify-center mt-2">
		<h1 class="text-center text-white text-2xl">
			{user.full_name}
		</h1>
	</div>
</div>
