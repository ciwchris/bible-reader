import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig(({ mode }) => ({
	plugins: [sveltekit()],
	resolve: {
		conditions: mode === 'test' ? ['browser'] : [],
	},
	test: {
		environment: 'jsdom',
		include: ['src/**/*.test.ts'],
		setupFiles: ['src/test-setup.ts'],
	},
}));
