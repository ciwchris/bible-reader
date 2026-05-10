@AGENTS.md

## App Overview

Bible Reader is a SvelteKit PWA for reading the Bible on mobile and desktop. It has three screens that drill in: Books list → Chapter grid → Chapter reader. Bible text is fetched at runtime from `bible-api.com` using the **World English Bible (WEB)** translation (`?translation=web`).

## Route Structure

| Route | File | Description |
|---|---|---|
| `/` | `src/routes/+page.svelte` | Full list of all 66 books, grouped OT/NT |
| `/[book]` | `src/routes/[book]/+page.svelte` | Chapter grid for a book (e.g. `/genesis`) |
| `/[book]/[chapter]` | `src/routes/[book]/[chapter]/+page.svelte` | Chapter reader (e.g. `/genesis/1`) |

Book URL slugs are lowercase with hyphens: `genesis`, `1-samuel`, `song-of-solomon`. The load function in `src/routes/[book]/[chapter]/+page.ts` fetches verse data from the API and returns `{ book, chapter, verses }`.

## Key Libraries

- `src/lib/bible.ts` — Complete list of all 66 books (`BOOKS`, `OT`, `NT`) with name, URL slug, chapter count, testament, and `apiName` (the format used in the bible-api.com URL). Also exports `bookBySlug(slug)`.
- `src/lib/theme.svelte.ts` — Reactive Svelte 5 rune-based theme state. Two themes: **Ivory** (light) and **Slate** (dark). Import `theme` and use `theme.c` for current color tokens, `theme.name` for the active theme name, `theme.toggle()` to switch, and `theme.init()` (called once in the layout `onMount`) to load from `localStorage`.

## Design System

**Fonts:** Geist (UI), Geist Mono (chapter numbers, verse markers), Source Serif 4 (reader body text). All loaded from Google Fonts.

**Theme color tokens** (accessed via `theme.c.*`):

| Token | Usage |
|---|---|
| `bg` | Page background |
| `surface` | Card / tile background |
| `text` | Primary text |
| `sub` | Secondary / muted text |
| `faint` | Hover background |
| `accent` | Verse number superscripts |
| `line` | Borders and dividers |

**Layout:** Max-width 700px, centered. Books and chapters screens scroll naturally (`min-height: 100dvh`). The reader screen is `height: 100dvh` with `overflow: hidden`; the verse area scrolls internally via a `bind:this` ref that resets to top on chapter navigation.

## Reader Features

- **Font size** cycles through sm/md/lg via the Aa button; persisted to `localStorage` as `bible-font-size`.
- **Touch swipe** (>60px horizontal) navigates to the previous or next chapter.
- **Nav chips** at the bottom show "‹ Book N" and "Book N ›" with a chapter counter (N / total) in the center. A CSS gradient fades the text into the nav bar.
- **Drop cap** on the first letter of verse 1; verse numbers are superscript in the accent color.

## User Preferences (localStorage keys)

| Key | Values | Description |
|---|---|---|
| `bible-theme` | `ivory`, `slate` | Active color theme |
| `bible-font-size` | `sm`, `md`, `lg` | Reader font size |
