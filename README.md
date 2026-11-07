# Ayan Kumar Mondal — portfolio foundation

Phase 1 only. A fully static React + Vite + TypeScript portfolio with Tailwind CSS,
Lucide icons, and locally bundled Space Grotesk and IBM Plex Mono fonts.

## Development

Use Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Structure

- `src/data/portfolio.ts`: typed profile, links, projects, skills, achievements, certificates, team, and TODOs.
- `src/types/portfolio.ts`: content interfaces.
- `src/components/ui`: buttons, heading, project card/skeleton, technology badge.
- `src/components/layout`: navigation, footer, container, section divider.
- `src/components/sections`: the six page sections.
- `src/styles/index.css`: Tailwind theme tokens, responsive styles, accessibility.
- `src/hooks` and `src/lib`: boundaries for reusable behavior and utilities.

No project or skill claims are inferred from the site's implementation stack.
Empty data collections render honest, styled placeholders. The project skeleton
is a static content placeholder, not a loading animation.

## Vercel Hobby

Import the repository into Vercel and choose the **Vite** preset. Build command:
`npm run build`. Output directory: `dist`. No environment variables are required.
The output is static; there are no functions, APIs, accounts, or database services.
Anchor navigation needs no SPA rewrite. Deployment is not performed by this phase.

## Remaining content TODOs

Add verified project descriptions and links; confirmed languages, ML tools and
frameworks; hackathon name/date/award details; certificate issuers and URLs;
team information; a personal biography; public email and additional social links.
All missing content is tracked in `src/data/portfolio.ts`.

## Future extension boundaries

Three.js, React Three Fiber, and GSAP are intentionally not installed. If needed
in later phases, put isolated, lazy-loaded scenes in a dedicated component folder
and animation hooks in `src/hooks`. Retain semantic content outside canvas,
provide static fallbacks, respect reduced motion, and clean up animation resources.

## Visual direction

Original code and geometric styling, inspired by the supplied DEV, KAEL-9,
Murmur, and Kai Nomura references. No reference source or assets were copied.
The DEV reference could not be fetched during implementation.
