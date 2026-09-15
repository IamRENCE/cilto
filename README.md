# cilto.dev

Single-viewport studio hub by **Terence Goh** for [Slofi](https://slofi.cilto.dev) and [Travyen](https://travyen.cilto.dev).

## Stack

**Vite + vanilla HTML/CSS/TypeScript** — static build, no React/Next.

This page is a no-auth, no-scroll directory with two outbound links. A framework SPA or SSR app would add runtime weight without benefit. Vite gives a fast local server, hashed assets, and a static `dist/` that Vercel serves as a static site (framework preset: Vite).

## Develop

```bash
npm install
npm run dev
```

Regenerate the Open Graph image (matches page fonts/atmosphere, no portal cards):

```bash
npx playwright install chromium
npm run og
```

## Build / preview

```bash
npm run build
npm run preview
```

## Deploy (Vercel)

1. Import this repo in Vercel
2. Framework preset: **Vite** (build `npm run build`, output `dist`)
3. Point `cilto.dev` at the project

Or CLI: `npx vercel` from this directory.
