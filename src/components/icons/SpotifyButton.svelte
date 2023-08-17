<script lang="ts">
	import SpotifyIcon from '../../assets/spotify-icon.svelte';

	export let spotifyLink: string;

	function handleClick() {
		if (spotifyLink != null && spotifyLink != undefined) {
			window.open(spotifyLink, '_blank');
		}
	}
</script>

<button on:click={handleClick}>
	<div class="avatar mx-2">
		<div class="desktop:w-10 w-8 rounded">
			<SpotifyIcon />
		</div>
	</div>
</button>
