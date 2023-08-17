<script lang="ts">
	import AppleLogo from '../../assets/apple-logo.svelte';
	import ApplemusicIcon from '../../assets/applemusic-icon.svelte';
	import SpotifyIcon from '../../assets/spotify-icon.svelte';

	export let appleMusicLink: string;

	function handleClick() {
		if (appleMusicLink != null && appleMusicLink != undefined) {
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
