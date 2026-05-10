import { error } from '@sveltejs/kit';
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

	let verses: Verse[] = [];
	try {
		const res = await fetch(`https://bible-api.com/${book.apiName}+${chapter}?translation=web`);
		if (res.ok) {
			const data = await res.json();
			verses = (data.verses ?? []).map((v: { verse: number; text: string }) => ({
				verse: v.verse,
				text: v.text.trim()
			}));
		}
	} catch {
		// leave verses empty; component shows a fallback
	}

	return { book, chapter, verses };
};
