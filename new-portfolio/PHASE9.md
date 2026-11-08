# Phase 9 — complete visual redesign

Completed locally on 2026-11-08 inside `new-portfolio`. No deployment, GitHub write, dependency installation or modification to the previous portfolio was performed.

## Reference analysis and section mapping

The supplied `portfolio 2.mp4` is an approximately 18-second recording of a laptop screen. Frames at 0, 2, 5, 7, 8, 10, 12, 15 and 17 seconds were inspected locally. Visible features include:

| Observed reference feature | Portfolio implementation |
| --- | --- |
| Cream introduction, dark type, portrait at right | Cream hero with Ayan's original portrait, greeting, introduction, work and GitHub actions |
| Spiral notebook with changing role text | CSS notebook with three factual areas of focus; two slow cycles on desktop only |
| Small navigation changing from light to dark context | Existing accessible navigation restyled, with section-aware light/dark treatment |
| Charcoal sections and four colored doors with brass plaques | Four large project doors in blue-grey, violet-grey, sage and ochre; keyboard-accessible case-study links |
| Door/detail interaction and large project previews | CSS hinged doors reveal existing image/fallback; case studies retain full details and images |
| Large year labels beside a vertical journey | Sticky 2026/2025 labels, dated event boxes, education milestone and scroll-progress lines |
| Large conversational contact heading | “Got an idea? Let’s talk.” with the existing Gmail compose links, copy email and social links |

The exact font, unseen sections, underlying code and all hover mechanics cannot be established from an angled recording. Skills boxes and the paper-style About spread extend the observed visual language; they are adaptations, not claims about unseen video content. No video, portrait, logo or project asset from the reference was copied into the shipped site.

## Design and functionality

- Replaced the electric-blue visual identity with warm paper, charcoal, sage, muted painted surfaces and brass accents.
- Rebuilt the hero composition, notebook detail, typography, spacing and portrait presentation. Original portrait files and aspect ratios remain unchanged.
- Replaced project presentation with four door boxes on large desktops, two on tablets and one on small mobile screens. Hover/focus provides the hinged reveal; project facts, source/demo links and case-study access remain readable outside it.
- Reworked skills into varied modular boxes while preserving every category and technology.
- Rebuilt the timeline around supplied dates only. Hacktoberfest Special Thanks remains recognition, not a winning certificate. Undated team participation and the self-reported win remain explicitly undated. Education uses the existing 2025–2029 record.
- Restyled certificates, About, Team 4LOOPS, contact, footer and case-study dialogs consistently.
- Kept Gmail compose behavior, active navigation, mobile menu, Escape handling, dialog focus restoration and all project content.

## Animation and performance

The existing GSAP hook now reveals project boxes, skills and milestones once and uses the existing GSAP package's lazily imported ScrollTrigger for timeline progress. No scroll locking or pinning is used; sticky years are CSS. GSAP context cleanup removes the animations and triggers on preference/breakpoint changes and unmount.

The existing single React Three Fiber scene is moved from the hero to a restrained timeline atmosphere and recolored amber/sage. Its canvas height is capped at 650px. The same manual GSAP render ticker, particle/ribbon budgets, DPR/frame caps, visibility checks, failure handling and disposal remain. No second canvas or continuous JavaScript loop was added. Mobile and reduced-motion selection keep the static treatment.

Hero/photo and door motion use CSS transforms and opacity. Door motion is disabled for reduced motion and non-hover devices. Notebook cycling is desktop-only, limited to two cycles, with a stable accessible label. The site remains static and requires no runtime API, backend or paid service.

Final production output:

- Main JavaScript: **84.32 KB gzip**.
- GSAP lazy chunk: **28.10 KB gzip**.
- ScrollTrigger lazy chunk: **18.29 KB gzip**.
- Three.js/Fiber scene lazy chunk: **252.17 KB gzip**.
- CSS: **12.02 KB gzip**.

A local development timeline sample reported 0.24ms mean synchronous render submission cost over 1080 frames, two draw calls and two geometries. This is not full GPU time or a controlled performance benchmark. No new Lighthouse, LCP, CLS, INP or guaranteed FPS claim is made. Vite still warns about the large lazy 3D chunk.

## Validation

- TypeScript: pass.
- ESLint: pass.
- Available tests: all 7 pass.
- Final production build: pass.
- 320, 375, 430, 768, 1024, 1440 and 1920px: no page overflow; checked heading/body/notebook content does not clip.
- Mobile uses natural vertical reading order; no mandatory horizontal carousel or hidden project descriptions.
- Mobile menu opens and Escape closes it; expanded state changes correctly.
- All four case studies open, show the correct title, have no horizontal dialog overflow and close with Escape. ZENITH screenshot loads.
- Hero/About portraits, ZENITH preview and all four optimized certificate images return HTTP 200 locally.
- Three existing featured repository URLs and the ZENITH live demo return HTTP 200 in read-only checks. CartGuard still has no invented repository/demo link.
- Gmail recipient links remain correct; no email was sent.
- The existing local fixture simulates reduced-motion selection and unavailable WebGL: both yield zero canvases and static mode; reduced-motion selection creates no timeline-progress inline animation. CSS media gates were reviewed. An actual OS-level reduced-motion toggle was not performed.
- Browser console: no errors observed during the checks.
- Visual reviews covered desktop hero, project doors, skills, timeline, About and mobile hero.

## Files changed

Created:
- `src/styles/redesign.css`
- `PHASE9.md`
- `docs/phase9-hero.jpg`
- `docs/phase9-projects.jpg`
- `docs/phase9-mobile.jpg`

Modified:
- `src/main.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/sections/Home.tsx`
- `src/components/sections/Projects.tsx`
- `src/components/sections/Skills.tsx`
- `src/components/sections/Achievements.tsx`
- `src/components/sections/About.tsx`
- `src/components/sections/Contact.tsx`
- `src/components/ui/FeaturedProjectCard.tsx`
- `src/components/ui/ParticleScene.tsx`
- `src/components/ui/LightRibbons.tsx`
- `src/hooks/useEditorialMotion.ts`
- `dist/` regenerated by the build.

Existing data files, photographs, certificates, resume availability and social destinations were preserved. Temporary copies used to inspect the reference video were removed; no background video is shipped.

## Remaining differences and content gaps

The reference uses a cutout portrait; this version intentionally retains the complete supplied studio photo on a paper mount. Doors are lightweight original CSS constructions rather than detailed 3D models. A four-column showcase replaces any uncertain horizontal behavior in the recording, and ordinary vertical flow keeps mobile content accessible. Exact perspective, typeface and unseen reference sections are not reproduced literally.

Existing missing screenshots, unverified implementation/contribution details, supporting win certificate and resume PDF remain as before. No facts were invented to fill them. The new visuals have not been deployed; use the local `new-portfolio` server (port 5191 for this session) to review them.
