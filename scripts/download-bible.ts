/**
 * Parses the eBible.org engwebu_readaloud.zip into per-book JSON files at
 * static/bible/[slug].json.
 *
 * File format inside the zip:
 *   engwebu_NNN_ABC_CC_read.txt
 *   Line 1: book title (skip)
 *   Line 2: "Chapter N." (skip)
 *   Lines 3+: one verse per line
 *
 * Output per file:
 *   { "1": [{verse:1, text:"..."}, ...], "2": [...], ... }
 *
 * Run with: npx tsx scripts/download-bible.ts
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'fs';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ZIP = join(ROOT, 'engwebu_readaloud.zip');
const TMP = join(ROOT, '.bible-tmp');
const OUT_DIR = join(ROOT, 'static', 'bible');

// 3-letter eBible abbreviation → our URL slug (deuterocanonical books omitted)
const ABBREV_TO_SLUG: Record<string, string> = {
	GEN: 'genesis',
	EXO: 'exodus',
	LEV: 'leviticus',
	NUM: 'numbers',
	DEU: 'deuteronomy',
	JOS: 'joshua',
	JDG: 'judges',
	RUT: 'ruth',
	'1SA': '1-samuel',
	'2SA': '2-samuel',
	'1KI': '1-kings',
	'2KI': '2-kings',
	'1CH': '1-chronicles',
	'2CH': '2-chronicles',
	EZR: 'ezra',
	NEH: 'nehemiah',
	EST: 'esther',
	JOB: 'job',
	PSA: 'psalms',
	PRO: 'proverbs',
	ECC: 'ecclesiastes',
	SNG: 'song-of-solomon',
	ISA: 'isaiah',
	JER: 'jeremiah',
	LAM: 'lamentations',
	EZK: 'ezekiel',
	DAN: 'daniel',
	HOS: 'hosea',
	JOL: 'joel',
	AMO: 'amos',
	OBA: 'obadiah',
	JON: 'jonah',
	MIC: 'micah',
	NAM: 'nahum',
	HAB: 'habakkuk',
	ZEP: 'zephaniah',
	HAG: 'haggai',
	ZEC: 'zechariah',
	MAL: 'malachi',
	MAT: 'matthew',
	MRK: 'mark',
	LUK: 'luke',
	JHN: 'john',
	ACT: 'acts',
	ROM: 'romans',
	'1CO': '1-corinthians',
	'2CO': '2-corinthians',
	GAL: 'galatians',
	EPH: 'ephesians',
	PHP: 'philippians',
	COL: 'colossians',
	'1TH': '1-thessalonians',
	'2TH': '2-thessalonians',
	'1TI': '1-timothy',
	'2TI': '2-timothy',
	TIT: 'titus',
	PHM: 'philemon',
	HEB: 'hebrews',
	JAS: 'james',
	'1PE': '1-peter',
	'2PE': '2-peter',
	'1JN': '1-john',
	'2JN': '2-john',
	'3JN': '3-john',
	JUD: 'jude',
	REV: 'revelation',
};

// Extract zip to temp dir
rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

console.log('Extracting zip...');
execSync(`unzip -q "${ZIP}" -d "${TMP}"`);

// Accumulate chapters keyed by slug
const books: Record<string, Record<number, { verse: number; text: string }[]>> = {};

const files = readdirSync(TMP).filter((f) => f.endsWith('_read.txt') && !f.includes('000_000'));

for (const filename of files) {
	// engwebu_002_GEN_01_read.txt  →  abbrev=GEN, chapter=1
	const m = filename.match(/engwebu_\d+_([A-Z0-9]+)_(\d+)_read\.txt/);
	if (!m) continue;

	const abbrev = m[1];
	const chapterNum = parseInt(m[2], 10);
	const slug = ABBREV_TO_SLUG[abbrev];
	if (!slug) continue; // deuterocanonical — skip

	const raw = readFileSync(join(TMP, filename), 'utf-8');
	const lines = raw
		.replace(/^﻿/, '') // strip BOM
		.split('\n')
		.map((l) => l.trim())
		.filter(Boolean);

	// lines[0] = book title, lines[1] = "Chapter N." — skip both
	const verses = lines.slice(2).map((text, i) => ({ verse: i + 1, text }));

	if (!books[slug]) books[slug] = {};
	books[slug][chapterNum] = verses;
}

// Write one JSON file per book
let count = 0;
for (const [slug, chapters] of Object.entries(books)) {
	writeFileSync(join(OUT_DIR, `${slug}.json`), JSON.stringify(chapters));
	count++;
}

// Clean up
rmSync(TMP, { recursive: true });

console.log(`✓ Wrote ${count} books to static/bible/`);
