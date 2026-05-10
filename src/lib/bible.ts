export interface Book {
	name: string;
	slug: string;
	chapters: number;
	testament: 'OT' | 'NT';
	apiName: string;
}

export const BOOKS: Book[] = [
	// Old Testament
	{ name: 'Genesis', slug: 'genesis', chapters: 50, testament: 'OT', apiName: 'genesis' },
	{ name: 'Exodus', slug: 'exodus', chapters: 40, testament: 'OT', apiName: 'exodus' },
	{ name: 'Leviticus', slug: 'leviticus', chapters: 27, testament: 'OT', apiName: 'leviticus' },
	{ name: 'Numbers', slug: 'numbers', chapters: 36, testament: 'OT', apiName: 'numbers' },
	{ name: 'Deuteronomy', slug: 'deuteronomy', chapters: 34, testament: 'OT', apiName: 'deuteronomy' },
	{ name: 'Joshua', slug: 'joshua', chapters: 24, testament: 'OT', apiName: 'joshua' },
	{ name: 'Judges', slug: 'judges', chapters: 21, testament: 'OT', apiName: 'judges' },
	{ name: 'Ruth', slug: 'ruth', chapters: 4, testament: 'OT', apiName: 'ruth' },
	{ name: '1 Samuel', slug: '1-samuel', chapters: 31, testament: 'OT', apiName: '1+samuel' },
	{ name: '2 Samuel', slug: '2-samuel', chapters: 24, testament: 'OT', apiName: '2+samuel' },
	{ name: '1 Kings', slug: '1-kings', chapters: 22, testament: 'OT', apiName: '1+kings' },
	{ name: '2 Kings', slug: '2-kings', chapters: 25, testament: 'OT', apiName: '2+kings' },
	{ name: '1 Chronicles', slug: '1-chronicles', chapters: 29, testament: 'OT', apiName: '1+chronicles' },
	{ name: '2 Chronicles', slug: '2-chronicles', chapters: 36, testament: 'OT', apiName: '2+chronicles' },
	{ name: 'Ezra', slug: 'ezra', chapters: 10, testament: 'OT', apiName: 'ezra' },
	{ name: 'Nehemiah', slug: 'nehemiah', chapters: 13, testament: 'OT', apiName: 'nehemiah' },
	{ name: 'Esther', slug: 'esther', chapters: 10, testament: 'OT', apiName: 'esther' },
	{ name: 'Job', slug: 'job', chapters: 42, testament: 'OT', apiName: 'job' },
	{ name: 'Psalms', slug: 'psalms', chapters: 150, testament: 'OT', apiName: 'psalms' },
	{ name: 'Proverbs', slug: 'proverbs', chapters: 31, testament: 'OT', apiName: 'proverbs' },
	{ name: 'Ecclesiastes', slug: 'ecclesiastes', chapters: 12, testament: 'OT', apiName: 'ecclesiastes' },
	{ name: 'Song of Solomon', slug: 'song-of-solomon', chapters: 8, testament: 'OT', apiName: 'song+of+solomon' },
	{ name: 'Isaiah', slug: 'isaiah', chapters: 66, testament: 'OT', apiName: 'isaiah' },
	{ name: 'Jeremiah', slug: 'jeremiah', chapters: 52, testament: 'OT', apiName: 'jeremiah' },
	{ name: 'Lamentations', slug: 'lamentations', chapters: 5, testament: 'OT', apiName: 'lamentations' },
	{ name: 'Ezekiel', slug: 'ezekiel', chapters: 48, testament: 'OT', apiName: 'ezekiel' },
	{ name: 'Daniel', slug: 'daniel', chapters: 12, testament: 'OT', apiName: 'daniel' },
	{ name: 'Hosea', slug: 'hosea', chapters: 14, testament: 'OT', apiName: 'hosea' },
	{ name: 'Joel', slug: 'joel', chapters: 3, testament: 'OT', apiName: 'joel' },
	{ name: 'Amos', slug: 'amos', chapters: 9, testament: 'OT', apiName: 'amos' },
	{ name: 'Obadiah', slug: 'obadiah', chapters: 1, testament: 'OT', apiName: 'obadiah' },
	{ name: 'Jonah', slug: 'jonah', chapters: 4, testament: 'OT', apiName: 'jonah' },
	{ name: 'Micah', slug: 'micah', chapters: 7, testament: 'OT', apiName: 'micah' },
	{ name: 'Nahum', slug: 'nahum', chapters: 3, testament: 'OT', apiName: 'nahum' },
	{ name: 'Habakkuk', slug: 'habakkuk', chapters: 3, testament: 'OT', apiName: 'habakkuk' },
	{ name: 'Zephaniah', slug: 'zephaniah', chapters: 3, testament: 'OT', apiName: 'zephaniah' },
	{ name: 'Haggai', slug: 'haggai', chapters: 2, testament: 'OT', apiName: 'haggai' },
	{ name: 'Zechariah', slug: 'zechariah', chapters: 14, testament: 'OT', apiName: 'zechariah' },
	{ name: 'Malachi', slug: 'malachi', chapters: 4, testament: 'OT', apiName: 'malachi' },
	// New Testament
	{ name: 'Matthew', slug: 'matthew', chapters: 28, testament: 'NT', apiName: 'matthew' },
	{ name: 'Mark', slug: 'mark', chapters: 16, testament: 'NT', apiName: 'mark' },
	{ name: 'Luke', slug: 'luke', chapters: 24, testament: 'NT', apiName: 'luke' },
	{ name: 'John', slug: 'john', chapters: 21, testament: 'NT', apiName: 'john' },
	{ name: 'Acts', slug: 'acts', chapters: 28, testament: 'NT', apiName: 'acts' },
	{ name: 'Romans', slug: 'romans', chapters: 16, testament: 'NT', apiName: 'romans' },
	{ name: '1 Corinthians', slug: '1-corinthians', chapters: 16, testament: 'NT', apiName: '1+corinthians' },
	{ name: '2 Corinthians', slug: '2-corinthians', chapters: 13, testament: 'NT', apiName: '2+corinthians' },
	{ name: 'Galatians', slug: 'galatians', chapters: 6, testament: 'NT', apiName: 'galatians' },
	{ name: 'Ephesians', slug: 'ephesians', chapters: 6, testament: 'NT', apiName: 'ephesians' },
	{ name: 'Philippians', slug: 'philippians', chapters: 4, testament: 'NT', apiName: 'philippians' },
	{ name: 'Colossians', slug: 'colossians', chapters: 4, testament: 'NT', apiName: 'colossians' },
	{ name: '1 Thessalonians', slug: '1-thessalonians', chapters: 5, testament: 'NT', apiName: '1+thessalonians' },
	{ name: '2 Thessalonians', slug: '2-thessalonians', chapters: 3, testament: 'NT', apiName: '2+thessalonians' },
	{ name: '1 Timothy', slug: '1-timothy', chapters: 6, testament: 'NT', apiName: '1+timothy' },
	{ name: '2 Timothy', slug: '2-timothy', chapters: 4, testament: 'NT', apiName: '2+timothy' },
	{ name: 'Titus', slug: 'titus', chapters: 3, testament: 'NT', apiName: 'titus' },
	{ name: 'Philemon', slug: 'philemon', chapters: 1, testament: 'NT', apiName: 'philemon' },
	{ name: 'Hebrews', slug: 'hebrews', chapters: 13, testament: 'NT', apiName: 'hebrews' },
	{ name: 'James', slug: 'james', chapters: 5, testament: 'NT', apiName: 'james' },
	{ name: '1 Peter', slug: '1-peter', chapters: 5, testament: 'NT', apiName: '1+peter' },
	{ name: '2 Peter', slug: '2-peter', chapters: 3, testament: 'NT', apiName: '2+peter' },
	{ name: '1 John', slug: '1-john', chapters: 5, testament: 'NT', apiName: '1+john' },
	{ name: '2 John', slug: '2-john', chapters: 1, testament: 'NT', apiName: '2+john' },
	{ name: '3 John', slug: '3-john', chapters: 1, testament: 'NT', apiName: '3+john' },
	{ name: 'Jude', slug: 'jude', chapters: 1, testament: 'NT', apiName: 'jude' },
	{ name: 'Revelation', slug: 'revelation', chapters: 22, testament: 'NT', apiName: 'revelation' }
];

export const OT = BOOKS.filter((b) => b.testament === 'OT');
export const NT = BOOKS.filter((b) => b.testament === 'NT');

export function bookBySlug(slug: string): Book | undefined {
	return BOOKS.find((b) => b.slug === slug);
}
