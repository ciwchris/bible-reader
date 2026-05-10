# Bible Reader

A progressive web app (PWA) for reading the [World English Bible (WEB)](https://worldenglishbible.org/) on mobile and desktop. The full Bible text is bundled with the app, so it works completely offline after the first install.

## Features

- **Three-screen drill-in navigation** — Books list → Chapter grid → Chapter reader
- **Fully offline** — all 66 books are precached by the service worker on install
- **Installable PWA** — runs as a standalone app on Android, iOS, and desktop
- **Two themes** — Ivory (light) and Slate (dark), persisted to `localStorage`
- **Adjustable font size** — cycles through sm/md/lg via the Aa button, persisted to `localStorage`
- **Touch swipe** — swipe left/right to navigate between chapters
- **Drop cap + verse markers** — styled reader with Source Serif 4 body font

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) with Svelte 5 runes
- [TypeScript](https://www.typescriptlang.org/)
- [`vite-plugin-pwa`](https://vite-pwa-org.netlify.app/) + Workbox for service worker and precaching
- [`@sveltejs/adapter-node`](https://kit.svelte.dev/docs/adapter-node) for SSR

## Routes

| Route | File | Description |
|---|---|---|
| `/` | `src/routes/+page.svelte` | Full list of all 66 books, grouped OT/NT |
| `/[book]` | `src/routes/[book]/+page.svelte` | Chapter grid (e.g. `/genesis`) |
| `/[book]/[chapter]` | `src/routes/[book]/[chapter]/+page.svelte` | Chapter reader (e.g. `/genesis/1`) |

Book slugs are lowercase with hyphens: `genesis`, `1-samuel`, `song-of-solomon`.

## Getting Started

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build (also generates service worker) |
| `npm run preview` | Preview the production build locally |
| `npm start` | Run the production Node.js server |
| `npm run check` | TypeScript + Svelte type checking |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run unit tests in watch mode |
| `npm run test:coverage` | Unit tests with coverage report |
| `npm run test:e2e` | Run end-to-end tests (Playwright, headless) |
| `npm run test:e2e:headed` | Run end-to-end tests in a visible browser |
| `npm run test:e2e:install` | Install the Playwright Chromium browser |
| `npm run download-bible` | Regenerate `static/bible/` from the eBible zip (see below) |

## Running Tests

### Unit Tests

```bash
npm test
```

Unit tests live next to the code they cover (e.g. `src/lib/bible.test.ts`). They use [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/docs/svelte-testing-library/intro/).

### End-to-End Tests

```bash
# First-time setup (downloads Chromium)
npm run test:e2e:install

# Run all e2e tests
npm run test:e2e
```

E2E tests live under `e2e/` and use [Playwright](https://playwright.dev/). They cover navigation flow (`navigation.spec.ts`), the chapter reader (`reader.spec.ts`), and theme toggling (`theme.spec.ts`).

## Bible Text

The bundled Bible text is the **World English Bible (WEB)**, a public domain modern-English translation. The 66 per-book JSON files in `static/bible/` were generated from the eBible.org read-aloud distribution:

> **Source:** https://ebible.org/Scriptures/details.php?id=engwebp  
> **License:** Public Domain — no copyright restrictions

The `engwebu_readaloud.zip` download is not committed to the repository. To regenerate `static/bible/` from a fresh copy of the zip:

1. Download `engwebu_readaloud.zip` from the URL above and place it in the project root.
2. Run:
   ```bash
   npm run download-bible
   ```

This parses the plain-text chapter files from the zip and writes one JSON file per book (`static/bible/[slug].json`) in the format:

```json
{
  "1": [{ "verse": 1, "text": "In the beginning..." }, ...],
  "2": [...]
}
```

## Key Source Files

| File | Description |
|---|---|
| `src/lib/bible.ts` | All 66 books with name, slug, chapter count, and testament |
| `src/lib/theme.svelte.ts` | Reactive theme state (Ivory / Slate) |
| `src/routes/[book]/[chapter]/+page.ts` | Load function — reads from `static/bible/[slug].json` |
| `static/bible/` | Bundled WEB Bible text (66 JSON files) |
| `static/icons/` | PWA icons (192px, 512px, maskable variants, SVG) |
| `scripts/download-bible.ts` | One-time script to generate `static/bible/` from eBible zip |
| `vite.config.ts` | Vite + SvelteKit + PWA plugin configuration |
