<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { bookBySlug } from '$lib/bible.js';
	import { theme } from '$lib/theme.svelte.js';

	const book = $derived(bookBySlug($page.params.book ?? ''));
	const chapters = $derived(book ? Array.from({ length: book.chapters }, (_, i) => i + 1) : []);
</script>

{#if book}
	<div class="screen">
		<div class="top-bar" style="background: {theme.c.bg};">
			<a href="{base}/" class="back" style="color: {theme.c.text};">
				<svg width="18" height="18" viewBox="0 0 16 16" fill="none">
					<path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
				<span>The Bible</span>
			</a>
		</div>

		<div class="heading-area">
			<h1 class="large-title" style="color: {theme.c.text};">{book.name}</h1>
			<div class="subtitle" style="color: {theme.c.sub};">{book.chapters} {book.chapters === 1 ? 'chapter' : 'chapters'}</div>
		</div>

		<div class="section-label" style="color: {theme.c.sub};">Chapter</div>

		<div class="grid">
			{#each chapters as n}
				<a
					href="{base}/{book.slug}/{n}"
					class="tile"
					style="
						background: {theme.c.surface};
						border: 1px solid {theme.c.line};
						color: {theme.c.text};
						--tile-hover-bg: {theme.c.faint};
					"
				>
					{n}
				</a>
			{/each}
		</div>
	</div>
{:else}
	<div class="not-found" style="color: {theme.c.text}; padding: 24px; font-family: 'Geist', system-ui, sans-serif;">
		<a href="{base}/">← The Bible</a>
		<p>Book not found.</p>
	</div>
{/if}

<style>
	.screen {
		max-width: 700px;
		margin: 0 auto;
		padding-bottom: 48px;
	}

	.top-bar {
		position: sticky;
		top: 0;
		z-index: 10;
		padding: 8px 20px 0;
		height: 52px;
		display: flex;
		align-items: center;
	}

	.back {
		display: flex;
		align-items: center;
		gap: 6px;
		font-family: 'Geist', system-ui, sans-serif;
		font-size: 15px;
		letter-spacing: -0.1px;
		padding: 6px 8px 6px 0;
		cursor: pointer;
	}

	.heading-area {
		padding: 14px 20px 0;
	}

	.large-title {
		font-family: 'Geist', system-ui, sans-serif;
		font-size: 34px;
		font-weight: 600;
		letter-spacing: -1px;
		line-height: 1.05;
	}

	.subtitle {
		font-family: 'Geist', system-ui, sans-serif;
		font-size: 13px;
		margin-top: 4px;
	}

	.section-label {
		font-family: 'Geist', system-ui, sans-serif;
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 1.4px;
		text-transform: uppercase;
		padding: 20px 24px 12px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
		padding: 0 20px;
	}

	.tile {
		aspect-ratio: 1 / 1;
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Geist Mono', 'JetBrains Mono', ui-monospace, monospace;
		font-size: 18px;
		font-weight: 400;
		cursor: pointer;
		transition: background 120ms, color 120ms;
	}

	.tile:hover {
		background: var(--tile-hover-bg) !important;
	}
</style>
