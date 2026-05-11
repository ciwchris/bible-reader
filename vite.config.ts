import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const base = process.env.BASE_PATH ?? '';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: null,
			manifest: {
				name: 'Bible Reader',
				short_name: 'Bible',
				description: 'Read the World English Bible on any device',
				theme_color: '#FAF8F4',
				background_color: '#FAF8F4',
				display: 'standalone',
				start_url: `${base}/`,
				scope: `${base}/`,
				icons: [
					{
						src: `${base}/icons/icon-192.png`,
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: `${base}/icons/icon-512.png`,
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: `${base}/icons/icon-maskable-192.png`,
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable',
					},
					{
						src: `${base}/icons/icon-maskable-512.png`,
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
				],
			},
			workbox: {
				// Precache client assets + all bundled Bible JSON
				globPatterns: ['**/*.{js,css,ico,png,svg,webp,woff,woff2}', 'bible/*.json'],
				// Don't use navigate fallback — SSR handles routing
				navigateFallback: null,
				runtimeCaching: [
					{
						// Google Fonts stylesheet
						urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
						handler: 'StaleWhileRevalidate',
						options: { cacheName: 'google-fonts-stylesheets' },
					},
					{
						// Google Fonts files
						urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts-webfonts',
							expiration: {
								maxEntries: 30,
								maxAgeSeconds: 60 * 60 * 24 * 365,
							},
							cacheableResponse: { statuses: [0, 200] },
						},
					},
				],
			},
		}),
	],
});
