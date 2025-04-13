<script lang="ts">
	import { links, works } from '$lib/data';
	import '../app.css';
	import Background from './Background.svelte';
	import WorkItem from './WorkItem.svelte';
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
	<section class="works">
		{#each works as work}
			<WorkItem {work} />
		{/each}
	</section>
	<section class="links">
		{#each links as link}
			<a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
		{/each}
	</section>
</main>

<style>
	.content {
		position: relative;
		max-width: 600px;
		margin: 0 auto;
		padding: 5vh 20px;
		display: flex;
		flex-direction: column;
		gap: 5vh;
	}

	.name {
		font-size: 3rem;
		font-weight: 700;
	}

	.bio p {
		font-size: 1.1rem;
		line-height: 1.5;
	}

	.works {
		display: flex;
		flex-direction: column;
		gap: 3vh;
	}

	.links {
		display: flex;
		flex-direction: column;
		gap: 1.5vh;
	}
</style>
