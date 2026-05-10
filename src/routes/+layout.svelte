<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/theme.svelte.js';

	let { children } = $props();

	onMount(() => theme.init());
</script>

<svelte:head>
	<title>Bible Reader</title>
	<meta name="description" content="Read the World English Bible on any device" />
	<meta name="theme-color" content={theme.name === 'ivory' ? '#FAF8F4' : '#15171A'} />
	<link rel="manifest" href="/manifest.webmanifest" />
	<link rel="icon" href="/favicon.ico" sizes="any" />
	<link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<meta name="apple-mobile-web-app-title" content="Bible" />
	<meta name="mobile-web-app-capable" content="yes" />
</svelte:head>

<div data-theme={theme.name} style="background: {theme.c.bg}; color: {theme.c.text}; min-height: 100dvh; transition: background 0.15s, color 0.15s;">
	{@render children()}
</div>

<style>
	:global(*, *::before, *::after) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(html, body) {
		height: 100%;
		-webkit-tap-highlight-color: transparent;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	:global(button) {
		font: inherit;
	}
</style>
