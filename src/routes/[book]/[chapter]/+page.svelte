<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { theme } from '$lib/theme.svelte.js';
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();

	const { book, chapter, verses } = $derived(data);
	const prevChapter = $derived(chapter > 1 ? chapter - 1 : null);
	const nextChapter = $derived(chapter < book.chapters ? chapter + 1 : null);

	let fontSize = $state<'sm' | 'md' | 'lg'>('sm');
	const fontSizeMap = { sm: '18px', md: '22px', lg: '26px' };
	const fontSizeLineMap = { sm: 1.7, md: 1.75, lg: 1.85 };

	onMount(() => {
		const saved = localStorage.getItem('bible-font-size');
		if (saved === 'sm' || saved === 'md' || saved === 'lg') fontSize = saved;
	});

	function cycleFont() {
		fontSize = fontSize === 'sm' ? 'md' : fontSize === 'md' ? 'lg' : 'sm';
		localStorage.setItem('bible-font-size', fontSize);
	}

	let readerEl = $state<HTMLElement | null>(null);

	$effect(() => {
		chapter;
		readerEl?.scrollTo({ top: 0 });
	});

	// Touch swipe
	let touchStartX = 0;
	function onTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
	}
	function onTouchEnd(e: TouchEvent) {
		const dx = e.changedTouches[0].clientX - touchStartX;
		if (dx > 60 && prevChapter) goto(`${base}/${book.slug}/${prevChapter}`);
		else if (dx < -60 && nextChapter) goto(`${base}/${book.slug}/${nextChapter}`);
	}

	const dropCapLetter = $derived(verses[0]?.text?.[0] ?? '');
	const firstVerseRest = $derived(verses[0]?.text?.slice(1) ?? '');
</script>

<div
	class="screen"
	ontouchstart={onTouchStart}
	ontouchend={onTouchEnd}
	role="main"
	style="background: {theme.c.bg};"
>
	<!-- Top bar -->
	<div class="top-bar" style="background: {theme.c.bg};">
		<a href="{base}/{book.slug}" class="back" style="color: {theme.c.text};">
			<svg width="18" height="18" viewBox="0 0 16 16" fill="none">
				<path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
			<span>{book.name}</span>
		</a>
		<button
			class="aa-btn"
			onclick={cycleFont}
			aria-label="Cycle font size"
			style="color: {theme.c.text}; border: 1px solid {theme.c.line};"
		>
			Aa
		</button>
	</div>

	<!-- Scrollable reader area -->
	<div
		class="reader"
		bind:this={readerEl}
		style="font-size: {fontSizeMap[fontSize]}; line-height: {fontSizeLineMap[fontSize]};"
	>
		<div class="chapter-heading" style="color: {theme.c.text};">Chapter {chapter}</div>

		{#if verses.length === 0}
			<div class="loading">
				<div class="loading-dots">
					<span style="background: {theme.c.sub};"></span>
					<span style="background: {theme.c.sub};"></span>
					<span style="background: {theme.c.sub};"></span>
				</div>
			</div>
		{:else}
			<p class="verses" style="color: {theme.c.text};">
				{#if dropCapLetter}
					<span class="drop-cap">{dropCapLetter}</span>
				{/if}
				<span class="verse">
					<sup class="vnum" style="color: {theme.c.accent};">1</sup>{firstVerseRest}{' '}
				</span>
				{#each verses.slice(1) as v}
					<span class="verse">
						<sup class="vnum" style="color: {theme.c.accent};">{v.verse}</sup>{v.text}{' '}
					</span>
				{/each}
			</p>
		{/if}

		<div class="reader-pad"></div>
	</div>

	<!-- Sticky bottom nav -->
	<div class="nav-area" style="--nav-bg: {theme.c.bg};">
		<div class="nav-bar">
			{#if prevChapter}
				<a
					href="{base}/{book.slug}/{prevChapter}"
					class="chip"
					style="border: 1px solid {theme.c.line}; color: {theme.c.text}; --chip-hover: {theme.c.surface};"
				>
					<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
						<path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					<span>{book.name} {prevChapter}</span>
				</a>
			{:else}
				<div class="chip disabled" style="border: 1px solid transparent; color: {theme.c.sub}; opacity: 0.4;">
					<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
						<path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					<span>Start</span>
				</div>
			{/if}

			<div class="counter" style="color: {theme.c.sub};">{chapter} / {book.chapters}</div>

			{#if nextChapter}
				<a
					href="{base}/{book.slug}/{nextChapter}"
					class="chip"
					style="border: 1px solid {theme.c.line}; color: {theme.c.text}; --chip-hover: {theme.c.surface};"
				>
					<span>{book.name} {nextChapter}</span>
					<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
						<path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
			{:else}
				<div class="chip disabled" style="border: 1px solid transparent; color: {theme.c.sub}; opacity: 0.4;">
					<span>End</span>
					<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
						<path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.screen {
		height: 100dvh;
		max-width: 700px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.top-bar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 20px;
		height: 52px;
	}

	.back {
		display: flex;
		align-items: center;
		gap: 6px;
		font-family: 'Geist', system-ui, sans-serif;
		font-size: 15px;
		letter-spacing: -0.1px;
		padding: 6px 8px 6px 0;
	}

	.aa-btn {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 0;
		font-family: 'Geist', system-ui, sans-serif;
		font-size: 14px;
		font-weight: 500;
	}

	.reader {
		flex: 1;
		overflow-y: auto;
		padding: 0 24px;
	}

	.chapter-heading {
		font-family: 'Geist', system-ui, sans-serif;
		font-size: 34px;
		font-weight: 600;
		letter-spacing: -1px;
		line-height: 1.05;
		padding: 14px 0 18px;
	}

	.verses {
		font-family: 'Source Serif 4', Georgia, serif;
		margin: 0;
	}

	.drop-cap {
		float: left;
		font-family: 'Source Serif 4', Georgia, serif;
		font-size: 3.4em;
		line-height: 0.88;
		padding-right: 10px;
		padding-top: 4px;
		margin-left: -2px;
	}

	.verse {
		display: inline;
	}

	.vnum {
		font-family: 'Geist Mono', 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.58em;
		font-weight: 500;
		vertical-align: super;
		line-height: 0;
		margin-right: 3px;
		margin-left: 2px;
	}

	.loading {
		padding: 48px 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loading-dots {
		display: flex;
		gap: 8px;
	}

	.loading-dots span {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		animation: pulse 1.2s ease-in-out infinite;
	}

	.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
	.loading-dots span:nth-child(3) { animation-delay: 0.4s; }

	@keyframes pulse {
		0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
		40% { opacity: 1; transform: scale(1); }
	}

	.reader-pad {
		height: 24px;
	}

	.nav-area {
		flex-shrink: 0;
		position: relative;
	}

	.nav-area::before {
		content: '';
		position: absolute;
		bottom: 100%;
		left: 0;
		right: 0;
		height: 48px;
		background: linear-gradient(to top, var(--nav-bg), transparent);
		pointer-events: none;
	}

	.nav-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px clamp(8px, 5vw, 48px) 20px;
	}

	.chip {
		display: flex;
		align-items: center;
		gap: 8px;
		border-radius: 999px;
		padding: 8px 14px;
		font-family: 'Geist', system-ui, sans-serif;
		font-size: 13px;
		letter-spacing: -0.1px;
		cursor: pointer;
		transition: background 120ms;
		white-space: nowrap;
	}

	.chip:hover {
		background: var(--chip-hover);
	}

	.chip.disabled {
		cursor: default;
	}

	.counter {
		font-family: 'Geist Mono', 'JetBrains Mono', ui-monospace, monospace;
		font-size: 11px;
		letter-spacing: 1px;
		flex-shrink: 0;
	}
</style>
