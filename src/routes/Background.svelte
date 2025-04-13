<script lang="ts">
	import { destroyBackground, initBackground } from '$lib/background';
	import { onDestroy, onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		if (typeof window !== 'undefined') {
			initBackground(canvas);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			destroyBackground();
		}
	});
</script>

<div class="canvas-container">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.canvas-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	.canvas-container canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
