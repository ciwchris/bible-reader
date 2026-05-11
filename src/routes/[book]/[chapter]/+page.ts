import { error } from '@sveltejs/kit';
import { assets } from '$app/paths';
import { bookBySlug } from '$lib/bible.js';
import type { PageLoad } from './$types.js';

export interface Verse {
	verse: number;
	text: string;
}

export const load: PageLoad = async ({ params, fetch }) => {
	const book = bookBySlug(params.book);
	if (!book) throw error(404, 'Book not found');

	const chapter = parseInt(params.chapter, 10);
	if (isNaN(chapter) || chapter < 1 || chapter > book.chapters) {
		throw error(404, 'Chapter not found');
	}

	const res = await fetch(`${assets}/bible/${book.slug}.json`);
	if (!res.ok) throw error(500, 'Bible data unavailable');

	const data: Record<string, Verse[]> = await res.json();
	const verses = data[chapter] ?? [];

	return { book, chapter, verses };
};
