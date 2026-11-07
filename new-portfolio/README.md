# Ayan Kumar Mondal — portfolio

Static React + Vite + TypeScript portfolio, deployed separately at:
https://new-portfolio-two-amber.vercel.app/

## Local development

Run only inside `new-portfolio`; never run installs, builds or deployments in the parent portfolio.
Node.js 22.12 or newer is required.

```sh
npm ci
npm run dev
npm run check
npm run preview
```

`check` runs TypeScript, ESLint, five fallback-policy tests and the production build.
Production files are in `dist`. No environment variables, backend, database, serverless functions, authentication or runtime API requests are required.

## Content and architecture

- `src/data/portfolio.ts`: profile, socials, skills, achievements, certificates and team.
- `src/data/projects.ts`: four featured projects, evidence, case studies and editable factual TODOs.
- `src/components/{layout,sections,ui}`: semantic layout and reusable components.
- `src/styles`: shared design tokens, responsive styles and restrained motion.
- `src/lib/particlePolicy.ts`: mobile, reduced-motion and low-resource fallback rules.
- `src/components/ui/ParticleScene.tsx`: lazy Three.js/R3F field using a shared GSAP ticker.
- `public`: local screenshots, certificate originals and optimized previews, favicon, SEO assets.

Case studies use hash links (`/#case-study-zenith`), not path routes. No SPA rewrite is necessary. Refresh and direct hash navigation preserve the selected case study. Fonts and required content are hosted locally.

## Content boundaries

Only user-supplied facts, the previous public portfolio and inspected repositories/documents are used. Hacktoberfest’26 is Special Thanks, not a winning certificate. The claimed hackathon win has no confirmed event details. Only four actual certificate images are in the gallery; the two old links containing project screenshots were excluded.

Remaining TODOs: winning certificate/event details; Special Thanks image/issuer; verified implementations/stacks/screenshots/demos for incomplete projects; exact backend contributions; real challenges/lessons; actual resume PDF; original optional team logo. Do not infer these from unrelated projects or invent details. No resume action renders without a PDF.

## Vercel Hobby

The existing separate project is `new-portfolio` under `ayankrmondal2003-rgb`. Do not link to or overwrite the previous portfolio project.

1. Set the project root to this folder (or repository root if only this folder is pushed).
2. Framework: Vite. Install: `npm ci`. Build: `npm run build`. Output: `dist`.
3. Run `npm run check` before publishing.
4. Verify `.vercel/project.json` identifies **new-portfolio**, then run `vercel deploy --prod` from this folder. Existing local linkage is ignored by Git.
5. If the production URL changes, update canonical, Open Graph and Twitter image URLs in `index.html`, plus `public/robots.txt` and `public/sitemap.xml`.

No paid service is needed by the application. Vercel usage remains subject to the account’s Hobby limits. No deployment secrets belong in source. `.env*`, `.vercel`, dependencies and build output are ignored.

## Performance and verification

Initial JavaScript is approximately 83 KB gzip; desktop GSAP and 3D are separate lazy chunks. Mobile and reduced-motion devices select CSS before importing 3D. Canvas rendering pauses offscreen/hidden, DPR is capped, and slow devices can fall back to CSS. R3F owns GPU resource disposal.

Certificate thumbnails use WebP while original JPEGs remain available for inspection. Hero heading font is preloaded; all font styles use swap.

See `PHASE7.md` for final checks, measured results and limitations. Earlier `PHASE*.md` files are historical records. Reports and screenshots in `docs` are excluded from deployment.

A scoped minimatch override patches the TypeScript ESLint development dependency (GHSA-g3hv-75wg-m249). Remove it when upstream adopts a patched version, then rerun `npm run check` and `npm audit`.
