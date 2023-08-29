<script lang="ts">
	import ApplemusicIcon from '../../assets/applemusic-icon.svelte';

	export let appleMusicLink: string;

	function handleClick() {
		if (appleMusicLink != null && appleMusicLink != undefined && appleMusicLink !== '') {
			window.open(appleMusicLink, '_blank');
		}
	}
</script>

<button on:click={handleClick}>
	<div class="avatar mx-2">
		<div class="desktop:w-10 w-8 rounded">
			<ApplemusicIcon />
		</div>
	</div>
</button>
