import { render, fireEvent } from '@testing-library/svelte';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import Page from './+page.svelte';

vi.mock('$app/navigation', () => ({ goto: vi.fn() }));

const genesis = { name: 'Genesis', slug: 'genesis', chapters: 50, testament: 'OT' as const };
const verses = [
	{ verse: 1, text: 'In the beginning, God created the heavens and the earth.' },
	{ verse: 2, text: 'The earth was formless and empty.' },
	{ verse: 3, text: 'God said, "Let there be light," and there was light.' },
];

describe('chapter reader', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('renders the chapter heading', () => {
		const { getByText } = render(Page, { data: { book: genesis, chapter: 5, verses } });
		expect(getByText('Chapter 5')).toBeInTheDocument();
	});

	it('renders verse text', () => {
		const { getByText } = render(Page, { data: { book: genesis, chapter: 1, verses } });
		expect(getByText(/The earth was formless/)).toBeInTheDocument();
	});

	it('shows the chapter counter', () => {
		const { getByText } = render(Page, { data: { book: genesis, chapter: 3, verses } });
		expect(getByText('3 / 50')).toBeInTheDocument();
	});

	it('disables prev chip on first chapter', () => {
		const { getByText } = render(Page, { data: { book: genesis, chapter: 1, verses } });
		expect(getByText('Start')).toBeInTheDocument();
	});

	it('disables next chip on last chapter', () => {
		const { getByText } = render(Page, { data: { book: genesis, chapter: 50, verses } });
		expect(getByText('End')).toBeInTheDocument();
	});

	it('shows next chapter link on non-last chapters', () => {
		const { getByRole } = render(Page, { data: { book: genesis, chapter: 1, verses } });
		expect(getByRole('link', { name: /Genesis 2/ })).toBeInTheDocument();
	});

	it('shows prev chapter link on non-first chapters', () => {
		const { getByRole } = render(Page, { data: { book: genesis, chapter: 5, verses } });
		expect(getByRole('link', { name: /Genesis 4/ })).toBeInTheDocument();
	});

	it('shows both nav links on a middle chapter', () => {
		const { getByRole } = render(Page, { data: { book: genesis, chapter: 25, verses } });
		expect(getByRole('link', { name: /Genesis 24/ })).toBeInTheDocument();
		expect(getByRole('link', { name: /Genesis 26/ })).toBeInTheDocument();
	});

	it('cycles font size sm → md → lg → sm on Aa click', async () => {
		const { getByRole, container } = render(Page, { data: { book: genesis, chapter: 1, verses } });
		const aaBtn = getByRole('button', { name: 'Cycle font size' });
		const reader = container.querySelector('.reader') as HTMLElement;

		expect(reader).toHaveStyle('font-size: 18px');
		await fireEvent.click(aaBtn);
		expect(reader).toHaveStyle('font-size: 22px');
		await fireEvent.click(aaBtn);
		expect(reader).toHaveStyle('font-size: 26px');
		await fireEvent.click(aaBtn);
		expect(reader).toHaveStyle('font-size: 18px');
	});

	it('saves font size to localStorage on Aa click', async () => {
		const { getByRole } = render(Page, { data: { book: genesis, chapter: 1, verses } });
		await fireEvent.click(getByRole('button', { name: 'Cycle font size' }));
		expect(localStorage.getItem('bible-font-size')).toBe('md');
	});

	it('restores saved font size from localStorage on mount', async () => {
		localStorage.setItem('bible-font-size', 'lg');
		const { container } = render(Page, { data: { book: genesis, chapter: 1, verses } });
		const reader = container.querySelector('.reader') as HTMLElement;
		expect(reader).toHaveStyle('font-size: 26px');
	});
});
