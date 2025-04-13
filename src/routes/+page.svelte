<script lang="ts">
	import { ExternalLinks, PortfolioGroups } from '$lib/data';
	import '../app.css';
	import Background from './Background.svelte';
	import PortfolioItem from './PortfolioItem.svelte';
</script>

<svelte:head>
	<title>Yuto Sahashi</title>
</svelte:head>

<Background />

<main class="content">
	<header>
		<h1 class="name">Yuto Sahashi</h1>
	</header>
	<section class="bio">
		<p>Shizuoka University, Japan. Kano Laboratory. Specializing in Natural Language Processing.</p>
	</section>
	{#each Object.entries(PortfolioGroups) as [title, items]}
		<section class="groups">
			<h2 class="section-title">{title}</h2>
			{#each items as item}
				<PortfolioItem {item} />
			{/each}
		</section>
	{/each}
	<section class="links">
		{#each ExternalLinks as link}
			<a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
		{/each}
	</section>
</main>

<style>
	.content {
		position: relative;
		max-width: 576px;
		margin: 0 auto;
		padding: 48px 24px;
		display: flex;
		flex-direction: column;
		gap: 48px;
	}

	.name {
		font-size: 48px;
		font-weight: 700;
	}

	.bio p {
		font-size: 18px;
		line-height: 1.5;
	}

	.section-title {
		font-size: 36px;
		font-weight: 700;
	}

	.groups {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.links {
		padding-left: 12px;
		display: flex;
		flex-direction: row;
		gap: 48px;
	}

	a {
		color: var(--link-color);
		text-decoration: none;
		transition: opacity 0.3s ease;
	}

	a:hover {
		color: var(--link-hover-color);
	}
</style>
