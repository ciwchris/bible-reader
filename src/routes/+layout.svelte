<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { theme } from '$lib/theme.svelte.js';

	let { children } = $props();

	const LAST_PATH_KEY = 'bible-last-path';

	onMount(() => {
		theme.init();

		const saved = localStorage.getItem(LAST_PATH_KEY);
		if (saved) {
			goto(saved, { replaceState: true });
		}

		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register(`${base}/sw.js`, { scope: `${base}/` });
		}
	});

	afterNavigate(({ to }) => {
		// Don't save the home route — it's the default, no need to restore it
		if (to?.route.id !== '/' && to?.url.pathname) {
			localStorage.setItem(LAST_PATH_KEY, to.url.pathname);
		}
	});
</script>

<svelte:head>
	<title>Bible Reader</title>
	<meta name="description" content="Read the World English Bible on any device" />
	<meta name="theme-color" content={theme.name === 'ivory' ? '#FAF8F4' : '#15171A'} />
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
