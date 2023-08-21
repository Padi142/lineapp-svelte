<script lang="ts">
	export let instagramLink: string;

	function handleClick() {
		if (instagramLink != null && instagramLink != undefined && instagramLink !== '') {
			window.open(instagramLink, '_blank');
		}
	}
</script>

<button on:click={handleClick}>
	<div class="avatar mx-2">
		<div class="desktop:w-10 w-8 rounded">
			<img
				src="https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-white-glyph-900x900.png"
				alt="icon"
			/>
		</div>
	</div>
</button>
