import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Page from './+page.svelte';

describe('books list', () => {
	it('renders all 66 books as links', () => {
		const { getAllByRole } = render(Page);
		expect(getAllByRole('link')).toHaveLength(66);
	});

	it('shows Old Testament and New Testament section headings', () => {
		const { getByText } = render(Page);
		expect(getByText('Old Testament')).toBeInTheDocument();
		expect(getByText('New Testament')).toBeInTheDocument();
	});

	it('book links point to the correct slugs', () => {
		const { getByRole } = render(Page);
		expect(getByRole('link', { name: /Genesis/ })).toHaveAttribute('href', '/genesis');
		expect(getByRole('link', { name: /Song of Solomon/ })).toHaveAttribute('href', '/song-of-solomon');
		expect(getByRole('link', { name: /1 Samuel/ })).toHaveAttribute('href', '/1-samuel');
		expect(getByRole('link', { name: /Revelation/ })).toHaveAttribute('href', '/revelation');
	});

	it('shows chapter counts', () => {
		const { getByText, getAllByText } = render(Page);
		expect(getByText('50 chapters')).toBeInTheDocument(); // Genesis
		expect(getByText('150 chapters')).toBeInTheDocument(); // Psalms
		expect(getAllByText('1 chapter').length).toBeGreaterThan(0); // Obadiah, Philemon, etc.
	});
});
