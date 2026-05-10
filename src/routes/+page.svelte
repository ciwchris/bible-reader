<script lang="ts">
	import { OT, NT } from '$lib/bible.js';
	import { theme } from '$lib/theme.svelte.js';
	import type { Book } from '$lib/bible.js';

	function monogram(name: string): string {
		const m = name.match(/^(\d)\s+(.+)/);
		if (m) return (m[1] + m[2].slice(0, 2)).toUpperCase();
		return name.slice(0, 2).toUpperCase();
	}
</script>

{#snippet BookRow(book: Book, isLast: boolean)}
	<a
		href="/{book.slug}"
		class="row"
		style="
			border-bottom: {isLast ? 'none' : `1px solid ${theme.c.line}`};
			--faint: {theme.c.faint};
		"
	>
		<div class="monogram" style="background: {theme.c.bg}; border: 1px solid {theme.c.line}; color: {theme.c.sub};">
			{monogram(book.name)}
		</div>
		<div class="info">
			<div class="name" style="color: {theme.c.text};">{book.name}</div>
			<div class="chapters" style="color: {theme.c.sub};">{book.chapters} {book.chapters === 1 ? 'chapter' : 'chapters'}</div>
		</div>
		<svg class="chevron" width="14" height="14" viewBox="0 0 16 16" fill="none">
			<path d="M6 3l5 5-5 5" stroke={theme.c.sub} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</a>
{/snippet}

{#snippet Section(title: string, books: Book[])}
	<div class="section">
		<div class="section-header">
			<span style="color: {theme.c.sub};">{title}</span>
			<div class="section-line" style="background: {theme.c.line};"></div>
			<span style="color: {theme.c.sub};">{books.length}</span>
		</div>
		<div class="card" style="background: {theme.c.surface}; border: 1px solid {theme.c.line};">
			{#each books as book, i}
				{@render BookRow(book, i === books.length - 1)}
			{/each}
		</div>
	</div>
{/snippet}

<div class="screen">
	<div class="top-bar" style="background: {theme.c.bg};">
		<h1 class="large-title" style="color: {theme.c.text};">The Bible</h1>
		<div class="top-right">
			<div class="subtitle" style="color: {theme.c.sub};">World English Bible</div>
			<button
				class="theme-toggle"
				onclick={() => theme.toggle()}
				aria-label="Toggle theme"
				style="color: {theme.c.sub}; border: 1px solid {theme.c.line};"
			>
				{#if theme.name === 'ivory'}
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				{:else}
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
						<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/>
						<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
				{/if}
			</button>
		</div>
	</div>

	<div class="content">
		{@render Section('Old Testament', OT)}
		{@render Section('New Testament', NT)}
	</div>
</div>

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
		padding: 20px 20px 16px;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 12px;
	}

	.large-title {
		font-family: 'Geist', system-ui, sans-serif;
		font-size: 34px;
		font-weight: 600;
		letter-spacing: -1px;
		line-height: 1.05;
	}

	.top-right {
		display: flex;
		align-items: center;
		gap: 10px;
		padding-bottom: 4px;
		flex-shrink: 0;
	}

	.subtitle {
		font-family: 'Geist', system-ui, sans-serif;
		font-size: 13px;
	}

	.theme-toggle {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 0;
		flex-shrink: 0;
	}

	.content {
		padding: 0 20px;
	}

	.section {
		margin-bottom: 8px;
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 0 4px 10px;
		font-family: 'Geist', system-ui, sans-serif;
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 1.4px;
		text-transform: uppercase;
		margin-top: 20px;
	}

	.section-line {
		flex: 1;
		height: 1px;
	}

	.card {
		border-radius: 16px;
		overflow: hidden;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 14px 16px;
		cursor: pointer;
		transition: background 120ms;
	}

	.row:hover {
		background: var(--faint) !important;
	}

	.monogram {
		width: 38px;
		height: 38px;
		border-radius: 9px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Geist Mono', 'JetBrains Mono', ui-monospace, monospace;
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.5px;
	}

	.info {
		flex: 1;
		min-width: 0;
	}

	.name {
		font-family: 'Geist', system-ui, sans-serif;
		font-size: 16px;
		font-weight: 500;
		letter-spacing: -0.2px;
	}

	.chapters {
		font-family: 'Geist', system-ui, sans-serif;
		font-size: 12px;
		margin-top: 2px;
	}

	.chevron {
		flex-shrink: 0;
	}
</style>
