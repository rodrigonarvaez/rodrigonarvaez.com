# rodrigonarvaez.com

Personal portfolio site for Rodrigo Narvaez — Senior Software Engineer.

## Stack

- **Framework:** Astro 5.x (static-first, island architecture)
- **Styling:** Tailwind CSS 4.x via `@tailwindcss/vite` (NOT the `@astrojs/tailwind` integration — that's for v3)
- **Language:** TypeScript (strict mode)
- **Animation:** GSAP 3.x + Lenis 1.x (smooth scroll)
- **Interactive islands:** React 19 (hydrated via `client:visible` or `client:idle`)
- **Hosting:** Netlify (current production host)

## Commands

```sh
npm run dev        # Start dev server
npm run build      # Type-check + build
npm run preview    # Preview production build
npm run check      # Astro type checking
npm run format     # Prettier format (single quotes, no semis, tailwind plugin)
npm run format:check
```

## Architecture

```
src/
├── components/    # Astro (.astro) and React (.tsx) components
├── layouts/       # Page layouts (BaseLayout.astro)
├── lib/           # Shared utilities (animations.ts, lenis.ts, constants.ts)
├── pages/         # File-based routing
├── styles/        # Global CSS (app.css — Tailwind v4 @import + design tokens)
├── content/       # Astro content collections (blog posts, project data)
└── assets/        # Images, fonts (processed by Astro)
```

## Astro Config

Tailwind v4 is configured as a Vite plugin, not an Astro integration:

```js
// astro.config.mjs
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
})
```

## Design Tokens (WIP)

All design tokens live as CSS custom properties inside `@theme {}` in `src/styles/app.css`. Tailwind v4 reads them automatically — no `tailwind.config` file.

Starting point — palette, fonts, and accent color may change during development:

- **Palette:** near-black surfaces (#0a0a0a–#242424), off-white text (#fafafa), warm amber accent (#e2a04a)
- **Fonts:** Cabinet Grotesk (display/headings), Plus Jakarta Sans (body), JetBrains Mono (code)
- **Easing:** `--ease-out-expo`, `--ease-out-quart` for animations

## Conventions

### Components

- Astro components (.astro) for static content
- React (.tsx) ONLY for interactive islands (theme toggle, contact form, generative canvas)
- Use `client:visible` or `client:idle` for React islands — never `client:load`

### Styling

- Tailwind utility classes directly in markup
- `@apply` only for truly repeated patterns (rare)
- Design tokens as CSS custom properties in `src/styles/app.css`, referenced via Tailwind

### Animations

- Centralize GSAP setup in `src/lib/animations.ts`
- Export reusable functions: `revealOnScroll()`, `staggerChildren()`, `heroReveal()`
- Register ScrollTrigger once
- Sync Lenis with GSAP in `src/lib/lenis.ts`
- ALL animations MUST respect `prefers-reduced-motion` — disable GSAP/Lenis and use instant state changes

### TypeScript

- Strict mode, no `any`
- Prefer `interface` over `type` for object shapes
- Define types for project data, content collections, and component props

### Accessibility

- Semantic HTML first (main, nav, section, article, footer)
- ARIA labels only when semantic elements are insufficient
- Skip-to-content link in BaseLayout
- Visible `:focus-visible` styles (accent-colored outline)
- All content must be fully accessible without animations
- Touch targets minimum 44×44px

### Comments

- Descriptive comments for complex logic only
- No comments for self-explanatory code
- Final code should be clean

## Formatting

Prettier handles all formatting. Config in `.prettierrc`:

- Single quotes
- No semicolons
- Trailing commas
- Tailwind class sorting via `prettier-plugin-tailwindcss`
- Astro file support via `prettier-plugin-astro`

Run `npm run format` before committing.

## Performance Budget

- Lighthouse Performance: 95+
- LCP < 2.0s, FCP < 1.2s, CLS < 0.05, TBT < 150ms
- Total JS bundle < 80KB gzipped
- Font files < 100KB total (subset fonts)
- Self-host fonts with `font-display: swap`
- Defer non-critical JS (GSAP, Lenis, canvas)
- Use Astro's built-in image optimization

## Site Sections (single-page scroll)

1. **Hero** — Animated name reveal (GSAP split text), title, one-liner, optional generative canvas
2. **About** — 2-3 sentences max, first person
3. **Work** — 3-4 featured projects with descriptions and links
4. **Experience** — Career highlights from 13+ year timeline
5. **Skills** — Grouped by domain, interesting visual treatment (not badge soup)
6. **Contact** — Email, LinkedIn, GitHub, optional form

## Copy Voice

First person, present tense. Concise and direct. No buzzwords, no filler.
Sounds like a seasoned engineer who respects people's time.
