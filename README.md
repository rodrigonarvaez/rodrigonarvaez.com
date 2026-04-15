# rodrigonarvaez.com

Personal portfolio site for [Rodrigo Narvaez](https://rodrigonarvaez.com) — Senior Software Engineer.

## Stack

- [Astro 5](https://astro.build) — static-first framework
- [Tailwind CSS 4](https://tailwindcss.com) — via `@tailwindcss/vite`
- [GSAP 3](https://gsap.com) + [Lenis](https://lenis.darkroom.engineering) — scroll animations
- [TypeScript](https://www.typescriptlang.org) — strict mode throughout
- Deployed on [Netlify](https://netlify.com)

## Commands

```sh
npm install        # Install dependencies
npm run dev        # Start dev server at localhost:4321
npm run build      # Type-check + build to ./dist/
npm run preview    # Preview production build locally
npm run check      # Astro type checking
npm run format     # Prettier (single quotes, no semis, Tailwind class sorting)
```

## Project structure

```
src/
├── components/    # Astro and React components
├── layouts/       # BaseLayout.astro
├── lib/           # animations.ts, lenis.ts
├── pages/         # index.astro (single-page)
└── styles/        # app.css — Tailwind v4 @import + design tokens
```
