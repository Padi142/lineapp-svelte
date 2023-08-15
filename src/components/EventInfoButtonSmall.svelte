<script lang="ts">
	export let text: string;
	export let icon: string;
	export let link: string;

	function handleClick() {
		window.open(link, '_blank');
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="w-1/4 flex flex-col items-center justify-center bg-purple-600 h-24 rounded-xl drop-shadow-lg btn mx-1"
	on:click={handleClick}
	on:keypress={handleClick}
>
	<div class="avatar mb-1">
		<div class="desktop:w-6 w-8 rounded">
			<img src={icon} alt="icon" />
		</div>
	</div>
	<h
		class="text-white text-center font-medium desktop:text-2xl text-xl text-ellipsis desktop:flex hidden"
		>{text}</h
	>
</div>
