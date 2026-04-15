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
├── lib/           # Shared utilities (animations.ts, lenis.ts)
├── pages/         # File-based routing
├── styles/        # Global CSS (app.css — Tailwind v4 @import + design tokens)
└── assets/        # Images, fonts (processed by Astro)
```

## Astro Config

Tailwind v4 is configured as a Vite plugin, not an Astro integration. React and sitemap integrations are also enabled:

```js
// astro.config.mjs
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://rodrigonarvaez.com',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
})
```

## Design Tokens

All design tokens live as CSS custom properties inside `@theme {}` in `src/styles/app.css`. Tailwind v4 reads them automatically — no `tailwind.config` file.

### Palette (dark mode defaults, light mode overrides via `[data-theme='light']`)

| Token                 | Dark      | Light     |
| --------------------- | --------- | --------- |
| `--color-base`        | `#0a0a0a` | `#fafaf8` |
| `--color-raised`      | `#111111` | `#f5f5f3` |
| `--color-overlay`     | `#1a1a1a` | `#ebebea` |
| `--color-high`        | `#242424` | `#e0e0de` |
| `--color-fg`          | `#fafafa` | `#1a1a1a` |
| `--color-fg-subtle`   | `#a3a3a3` | `#525252` |
| `--color-accent`      | `#a3e635` | `#3f6212` |
| `--color-accent-text` | `#a3e635` | `#3f6212` |
| `--color-border`      | `#262626` | `#d4d4d4` |

`--color-accent-text` is always WCAG AA on all surfaces. In light mode, `#a3e635` is only 1.4:1 on cream — invisible. Both `--color-accent` and `--color-accent-text` must be set to `#3f6212` in the light theme override block.

### Fonts

- **Display/headings:** Cabinet Grotesk — loaded via Fontshare CDN, non-blocking (`media="print" onload="this.media='all'"` + `rel="preload"` + `<noscript>` fallback)
- **Body:** Plus Jakarta Sans Variable — self-hosted via `@fontsource-variable/plus-jakarta-sans`
- **Mono:** JetBrains Mono Variable — self-hosted via `@fontsource-variable/jetbrains-mono`

Font family names in CSS: `'Plus Jakarta Sans Variable'` and `'JetBrains Mono Variable'` (space before "Variable" is required).

### Easing

- `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`
- `--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1)`

## Theme System

Dark/light toggle is implemented entirely without React — `ThemeToggle.astro` handles the button and script.

### Architecture

- Dark is the default theme. No `prefers-color-scheme` detection — user choice only.
- `data-theme` attribute on `<html>` drives all styling.
- No-flash init: `<script is:inline>` in `<head>` (blocking) reads localStorage and sets `data-theme` synchronously before the browser paints.
- Theme transitions: ThemeToggle JS adds `.theme-transitioning` class for ~300ms around the switch. `prefers-reduced-motion` overrides transitions via `!important` in global CSS.
- Icon visibility is CSS-driven via `[data-theme-icon-sun]` / `[data-theme-icon-moon]` attribute selectors — no JS needed on load.

### Header backdrop

The scrolled header background uses `color-mix(in srgb, var(--color-base) 88%, transparent)` — automatically theme-aware, no hardcoded rgba values. Triggered via `[data-header][data-scrolled]` CSS.

## Conventions

### Components

- Astro components (`.astro`) for static content and lightweight interactivity (ThemeToggle, Header, etc.)
- React (`.tsx`) ONLY for islands that require React-specific features or state
- Use `client:visible` or `client:idle` for React islands — never `client:load`

### Styling

- Tailwind utility classes directly in markup
- `@apply` only for truly repeated patterns (rare)
- Design tokens as CSS custom properties in `src/styles/app.css`, referenced via Tailwind
- Use `text-accent-text` (not `text-accent`) for any text or interactive element coloring — `accent-text` is guaranteed to pass WCAG AA in both themes

### Animations

- Centralize GSAP setup in `src/lib/animations.ts`
- Export reusable functions: `revealOnScroll()`, `staggerChildren()`, `heroReveal()`
- Register ScrollTrigger once
- Sync Lenis with GSAP in `src/lib/lenis.ts`
- ALL animations MUST respect `prefers-reduced-motion` — disable GSAP/Lenis and use instant state changes
- `[data-animate]` pattern: JS sets the attribute on a container, CSS hides its children (`opacity: 0; transform: translateY(30px)`), GSAP animates them in on scroll. Without JS the attribute is never set, so content stays visible.

### Lenis (smooth scroll)

Lenis is skipped on `prefers-reduced-motion` and `pointer: coarse` (touch) devices.

Lenis intercepts all `a[href^="#"]` clicks and calls `lenis.scrollTo(target, { offset })` to prevent native hash navigation from conflicting with Lenis scroll tracking. The offset is `-(header.offsetHeight + 24)` — read at click time.

### TypeScript

- Strict mode, no `any`
- Prefer `interface` over `type` for object shapes
- Define types for project data, content collections, and component props

### Accessibility

- Semantic HTML first (`main`, `nav`, `section`, `article`, `footer`)
- ARIA labels only when semantic elements are insufficient
- Skip-to-content link in BaseLayout — uses `focus:text-[#0a0a0a]` (hardcoded, not `focus:text-base`) because the accent bg needs dark text in both themes
- Visible `:focus-visible` styles using `var(--color-accent-text)`
- All content must be fully accessible without animations
- Touch targets minimum 44×44px
- Eyebrow labels (small uppercase decorators) are `aria-hidden="true"` — they are visual flourishes, not heading content

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

- Lighthouse Performance: 95+ (currently 98)
- LCP < 2.0s, FCP < 1.2s, CLS < 0.05, TBT < 150ms
- Total JS bundle < 80KB gzipped
- Self-host variable fonts with `font-display: swap`
- Defer non-critical JS (GSAP, Lenis)
- Fontshare CSS loaded non-blocking to avoid render-blocking

## Site Sections (single-page scroll)

1. **Hero** — Animated name reveal (GSAP), title, one-liner, scroll indicator
2. **About** — Short bio, LinkedIn link
3. **Work** — Featured projects with type badge, tech stack, optional source link
4. **Experience** — Timeline of roles (vertical line + dot markers)
5. **Skills** — Grouped by domain
6. **Contact** — Email, LinkedIn, GitHub links

## Copy Voice

First person, present tense. Concise and direct. No buzzwords, no filler.
Sounds like a seasoned engineer who respects people's time.
