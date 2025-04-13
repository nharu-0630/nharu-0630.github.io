<script lang="ts">
	import type { Work } from '$lib/types';

	export let work: Work;
</script>

<div class="work-item">
	<div class="work-title">
		<a href={work.url} target="_blank" rel="noopener noreferrer">{work.title}</a>
		<span class="work-date">{work.date.toDateString()}</span>
	</div>
	{#if work.description}
		<p class="work-description">{work.description}</p>
	{/if}
</div>

<style>
	.work-item {
		display: flex;
		flex-direction: column;
		gap: 0.5vh;
	}

	.work-title {
		display: flex;
		flex: 1;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.work-date {
		opacity: 0.6;
	}

	.work-description {
		line-height: 1.5;
	}
</style>
