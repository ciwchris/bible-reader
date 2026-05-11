import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/svelte';
import '@testing-library/jest-dom/vitest';

// Unmount components between tests so DOM doesn't accumulate across renders
afterEach(() => cleanup());

// jsdom doesn't implement Element.prototype.scrollTo — stub it out
Element.prototype.scrollTo = () => {};
