# Phase 3 — projects, GitHub and skills

All work remains inside new-portfolio. Previous portfolio files and deployment
were not modified. Earlier project content is retained in an expandable archive.

## Content verification (2026-11-06)

- ZENITH: inspected README, package.json, typing-engine.js, session-analytics.js
  and script.js in ayankrmondal2003-rgb/Typing-Speed-Trainer. Live frontend verified
  at https://typing-speed-trainer-xi.vercel.app. An actual screenshot was captured
  and compressed to public/projects/zenith.webp (1200×675, 59,098 bytes).
  Cross-device multiplayer backend deployment is not claimed.
- SANJEEVANI: accessible main branch has only a title-only README. User-supplied
  healthcare coordination concept is explicitly labeled implementation-unverified.
- CartGuard AI: no matching repository found in the owner's GitHub account.
  Concept-only metadata; no guessed source, stack or deployment URL.
- Voyage Hack4Haldia TEAM-B: README is a Live Whiteboard challenge starter;
  app.py and script.js provide alternative Flask/Express scaffolds. /health works
  in source, while room creation/retrieval return HTTP 501. Planned collaboration,
  Redis, presence and export features are not presented as implemented.
- User stated their contribution is backend work. Each study records this as
  self-reported with explicit TODOs for project-specific modules and commit links.
- Skills identify their evidence: inspected ZENITH source, the earlier portfolio
  project archive, or this portfolio. No expertise levels or percentages.

## Changed / created files

- src/data/projects.ts: typed featured project metadata, sources and case studies.
- src/data/portfolio.ts: featured projects plus six skill categories; archive kept.
- src/types/portfolio.ts: FeaturedProject, screenshot, status, study and evidence types.
- src/components/ui/FeaturedProjectCard.tsx: visual cards and real anchor actions.
- src/components/ui/ProjectImage.tsx: lazy image and missing/error fallback.
- src/components/sections/ProjectCaseStudy.tsx: native accessible dialog with hash
  deep links, browser Back support, focus containment and focus restoration.
- src/components/sections/Projects.tsx: featured grid, GitHub strip and archive.
- src/components/sections/Skills.tsx: six contextual skill categories.
- src/styles/projects.css and src/main.tsx: responsive project styling/import.
- public/projects/zenith.webp: optimized real screenshot.
- docs/zenith-capture.jpg: raw browser capture.
  docs is excluded from deployment; only the WebP is served.

## Validation

- TypeScript check, ESLint with zero warnings, and production build: passed.
- New GitHub profile, repository, README, implementation and demo links: all 12
  unique HTTP targets returned 200. No runtime GitHub data fetch or token.
- Grid tested at 320, 375, 430, 768, 1024 and 1440 CSS pixels: no overflow.
- Mobile case-study layouts: no horizontal dialog overflow.
- Keyboard opening, focus containment, Escape dismissal and restoration: passed.
- Direct case-study link, reload, close and browser Back: passed.
- Screenshot error tested with a temporary missing path, then the real path was
  restored and loading verified. Missing-image placeholders are also displayed.
- No heavy UI or carousel dependencies added. Screenshot compression used a
  build-time CLI only; package dependencies are unchanged.

## Editable TODOs

Edit src/data/projects.ts to add actual implementation branches and screenshots
for SANJEEVANI/CartGuard/TEAM-B, verified stacks, individual backend contributions,
challenges, lessons learned and missing demo links. Update status only when supported
by source evidence. Existing Phase 1 personal-content TODOs remain unchanged.

Phase 3 only; no future phases implemented.

## Deployment

Deployed successfully to the separate Vercel project new-portfolio:
https://new-portfolio-two-amber.vercel.app
Deployment ID: dpl_dwn3wNHCKpGLXYrMQWRZs7iC4Vcb (READY).
The final production browser check was blocked by automatic approval review
because of a usage limit; local browser validation above was completed.
The previous portfolio and deployment were not modified.
