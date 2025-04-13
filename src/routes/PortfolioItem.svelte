<script lang="ts">
	import type { PortfolioItem } from '$lib/types';

	export let item: PortfolioItem;
</script>

<a href={item.url} target="_blank" rel="noopener noreferrer" class="link">
	<div class="portfolio-item">
		<div class="portfolio-header">
			<h3 class="portfolio-title">{item.title}</h3>
			<span class="portfolio-date"
				>{item.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span
			>
		</div>
		{#if item.description}
			<p class="portfolio-description">{item.description}</p>
		{/if}
	</div>
</a>

<style>
	.link {
		text-decoration: none;
		color: inherit;
	}

	.portfolio-item {
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 12px;

		background: rgba(255, 255, 255, 0.1);
		transition:
			background 0.3s ease,
			color 0.3s ease;
		box-shadow: 0 4px 32px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}

	.portfolio-item:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.portfolio-header {
		display: flex;
		flex: 1;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.portfolio-title {
		font-size: 24px;
	}

	.portfolio-date {
		opacity: 0.6;
	}

	.portfolio-description {
		line-height: 1.5;
	}
</style>
