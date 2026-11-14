# QR Studio — QR Code Generator

Next.js 15 (App Router) + TypeScript + Tailwind CSS 3.

Design: playful, premium storybook style in the gokiwi design language
(tokens, structure and motion only — original QR Studio work, no gokiwi
copy, brand, logo or artwork): pale kiwi `#F4FFEB` canvas, ink `#212121`,
accent green `#58A60A`, bright kiwi `#81D829`, lime `#BDE930`, sky `#DFF1FC`,
blue-gray `#E7ECEF`, olive-gray `#555C4D` secondary text, Playfair Display
serif headings + Sora body, fluid `clamp()` type, pill radii, glass pill
navbar, stacked rounded white sheets, pastel badges, marquee and a giant
lime footer wordmark. Light theme by default, with a Dark toggle.

Link, Text, Wi-Fi, Email and Contact (vCard) QR codes, generated entirely in
the browser. No server, no sign-up, nothing uploaded.

## Features

- 5 QR types: Link, Text, Wi-Fi, Email, Contact
- Live preview, rendered on canvas from the QR matrix (`qrcode` package)
- 10 colour presets + custom foreground / background pickers
- 10 dot styles: Square, Rounded, Dots, Diamond, Star, Heart, Hex, Sparkle, Bars, Rings
  - Finder patterns stay solid, so codes stay scannable in every style
- Download PNG (512–2048 px) and SVG, copy image to clipboard
- Error-correction level L / M / Q / H, recent codes saved in localStorage
- Light theme by default, with a clear Light / Dark toggle
- Fields start empty; nothing is pre-filled

## Run it

```bash
npm install
npm run dev
# open http://localhost:3000
```

Other commands:

```bash
npm run build    # production build
npm run start    # run the production build
npm run typecheck
```

## Deploy to Vercel

1. Push this folder to GitHub (or import it in Vercel directly).
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset: **Next.js**. No build settings to change.
4. Deploy. No environment variables are needed.

## Project structure

```
src/
  app/
    layout.tsx     # metadata + html/body shell
    page.tsx       # the whole generator UI (form + style + preview)
    globals.css    # Tailwind + small colour-input styles
  components/
    QrPreview.tsx  # canvas renderer + SVG builder, dot styles
  lib/
    qr.ts          # types, payload builders (Wi-Fi / mailto / vCard),
                   # colour presets, dot-style list
tailwind.config.ts
next.config.mjs
```

## Notes

- QR generation is client-side only. The `qrcode` package builds the module
  matrix; `QrPreview.tsx` draws it with the chosen dot style.
- For print, use Error Correction **H** and download PNG at 2048 px, or SVG.
