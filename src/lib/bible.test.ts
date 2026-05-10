import { describe, it, expect } from 'vitest';
import { BOOKS, OT, NT, bookBySlug } from './bible.js';

describe('BOOKS data integrity', () => {
	it('contains exactly 66 books', () => {
		expect(BOOKS).toHaveLength(66);
	});

	it('has 39 Old Testament books', () => {
		expect(OT).toHaveLength(39);
	});

	it('has 27 New Testament books', () => {
		expect(NT).toHaveLength(27);
	});

	it('every book has at least 1 chapter', () => {
		for (const book of BOOKS) {
			expect(book.chapters, `${book.name} chapter count`).toBeGreaterThan(0);
		}
	});

	it('all slugs are unique', () => {
		const slugs = BOOKS.map((b) => b.slug);
		expect(new Set(slugs).size).toBe(BOOKS.length);
	});

	it('all OT books have testament OT', () => {
		expect(OT.every((b) => b.testament === 'OT')).toBe(true);
	});

	it('all NT books have testament NT', () => {
		expect(NT.every((b) => b.testament === 'NT')).toBe(true);
	});

	it('spot-checks known chapter counts', () => {
		const cases: [string, number][] = [
			['genesis', 50],
			['psalms', 150],
			['proverbs', 31],
			['philemon', 1],
			['revelation', 22],
			['matthew', 28],
		];
		for (const [slug, expected] of cases) {
			expect(bookBySlug(slug)?.chapters, slug).toBe(expected);
		}
	});
});

describe('bookBySlug', () => {
	it('returns the correct book for a simple slug', () => {
		const book = bookBySlug('genesis');
		expect(book).toBeDefined();
		expect(book?.name).toBe('Genesis');
	});

	it('handles numbered-book slugs', () => {
		expect(bookBySlug('1-samuel')?.name).toBe('1 Samuel');
		expect(bookBySlug('2-kings')?.name).toBe('2 Kings');
		expect(bookBySlug('1-corinthians')?.name).toBe('1 Corinthians');
	});

	it('handles multi-word slugs', () => {
		expect(bookBySlug('song-of-solomon')?.name).toBe('Song of Solomon');
	});

	it('returns undefined for an unknown slug', () => {
		expect(bookBySlug('not-a-book')).toBeUndefined();
	});

	it('returns undefined for an empty string', () => {
		expect(bookBySlug('')).toBeUndefined();
	});
});
