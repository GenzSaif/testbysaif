# Nusrat Fateh Ali Khan — The Definitive Digital Legacy Archive (v2)

A modern, static Next.js site celebrating the life, music and legacy of
Nusrat Fateh Ali Khan (1948–1997). **An immortal voice. A timeless legacy.**

This is version 2 — a complete visual rebuild of the v1 poster-style site.
It is **not** a static HTML/CSS site: it is a real Next.js (App Router) +
TypeScript + Tailwind CSS project.

## The v2 theme — "Gallery"

A fresh, ultra-modern direction, deliberately different from both the
rejected midnight-black / antique-gold luxury look and the v1
poster/vermillion look (bright paper, Anton poster type, vermillion accent).

- **Canvas:** warm ivory `#FAF9F6` (light) / deep night `#0D1117` (dark)
- **Ink:** deep slate `#111827` (light) / `#F3F4F6` (dark)
- **Muted text:** `#6B7280` · **Hairlines:** `#E7E5E0` / `#262D38` (dark)
- **Accent:** one vivid indigo `#4F46E5`, with a soft indigo tint `#EEF2FF`
  and a secondary teal `#0D9488` used sparingly
- **Type:** Fraunces (elegant serif display, with italics) for headlines,
  Inter for UI text, JetBrains Mono for small labels and indexes
- **Shape:** rounded cards (`rounded-2xl` / `rounded-3xl`), pill buttons and
  filter chips, soft shadows, generous whitespace, a glassy sticky header,
  and a floating rounded Listening Desk bar — a calm gallery / streaming
  feel, not a poster wall and not a luxury template
- **Themes:** Light opens by default, Dark is one tap away (toggle in the
  header, remembered in `localStorage`)

All tokens live in `tailwind.config.js` and `app/globals.css`.

## What's inside

- **Biography:** 6 chapters, plus an interactive 15-entry timeline (1948–2024)
- **Music archive:** 14 essential recordings with search, language and mood
  filters, favourites, random discovery and 3 curated listening journeys
- **Albums:** 10 landmark albums (1988–2024)
- **Gallery:** 9 real archival photographs (Wikimedia Commons, credited),
  filterable by category, with a full-screen lightbox
- **Videos / Performances:** 6 historic performances, linked to YouTube
- **Collaborations:** Peter Gabriel, Michael Brook, Eddie Vedder, Javed
  Akhtar, Bally Sagoo, Massive Attack
- **Poetry & heritage:** Bulleh Shah, Amir Khusro tradition, Mirabai
  tradition, Purnam Allahabadi, Javed Akhtar — traditional vs. lyricist
  clearly distinguished, no copyrighted lyrics reproduced
- **Legacy:** honours and a sources section (Britannica, Real World Records,
  Encyclopedia.com, Wikipedia, Dawn)
- **Listening Desk:** fixed player bar with queue, shuffle, repeat,
  favourites and recently played (localStorage)

Every dated fact comes from the published sources listed in the Legacy
section. Nothing is invented: no discography entries, dates, photographs,
awards, quotes or collaborations were made up.

## Honest limitations

- **Playback opens YouTube in a new tab.** Play / Watch links are
  YouTube *search* links for the track or performance — no video IDs were
  invented, and no copyrighted audio or video is hosted here.
- **Photographs are modest resolution** (e.g. the hero portrait is
  402×402 px) because those are the real Commons files available; 4 of the
  9 gallery photos are from the same Sabri photo session.
- **No CMS or backend.** This is a static site; all content lives in
  `lib/data.ts`.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other commands:

```bash
npm run typecheck   # tsc --noEmit
npm run build       # production build
npm run start       # serve the production build
```

Requires Node.js 18.17 or newer.

## Deploy to Vercel

1. Push this folder to a GitHub repository (e.g. `yourname/nusrat-nextjs-v2`).
2. In Vercel, **Add New → Project**, import that repository.
3. Vercel auto-detects Next.js — leave the build settings as they are
   (`npm run build`, output handled by Next.js).
4. Click **Deploy**. No environment variables are needed.

Or, from the command line with the Vercel CLI installed:

```bash
vercel
```

## Project structure

```
app/
  layout.tsx      # root layout, metadata, header + Listening Desk
  page.tsx        # home page — all eight sections + footer
  globals.css     # fonts, theme tokens, base styles
components/
  Header.tsx      # sticky nav, hero, section headings
  ThemeToggle.tsx # light/dark toggle (persisted)
  MusicArchive.tsx# search, filters, random discovery, journeys
  Gallery.tsx     # photo grid, filters, lightbox
  Sections.tsx    # Biography + timeline, Albums, Videos,
                  #   Collaborations, Poetry, Legacy + sources
  ListeningDesk.tsx# floating player bar: queue, shuffle, repeat
  player.tsx      # player state (queue, favourites, recent)
lib/
  data.ts         # all verified content — do not invent entries
public/photos/    # 9 real archival photographs
```

## Tech

- Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3
- No database, no API keys, no backend.
