<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/theme.svelte.js';

	let { children } = $props();

	onMount(() => theme.init());
</script>

<svelte:head>
	<title>Bible Reader</title>
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
