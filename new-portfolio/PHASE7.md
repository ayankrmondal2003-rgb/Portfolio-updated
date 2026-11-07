# Phase 7 — Production audit

## Scope
All edits, installs, reports and builds were confined to new-portfolio. The previous portfolio, repository and deployment were not modified.

## Features reviewed
Hero, responsive navigation, projects, hash-based case studies, skills, About, hackathon milestones, achievements, certificates, contact and footer retain their working functionality. Removed the unused empty-project skeleton and certificate artwork placeholder from the gallery; Special Thanks remains correctly labeled in the timeline. Missing case-study screenshots no longer occupy an empty detail-page figure. Missing project implementation facts remain explicitly unverified.

## Files changed
- index.html: canonical, Open Graph/Twitter metadata, social image and heading-font preload.
- public/robots.txt, public/sitemap.xml, public/social-card.png; editable artwork in docs/social-card.svg.
- Four public/certificates/*.webp previews; original JPEG links retained.
- src/main.tsx: Latin font subsets only.
- ProjectCard.tsx, Projects.tsx, ProjectCaseStudy.tsx, CertificateGallery.tsx, Footer.tsx and portfolio.ts: production cleanup.
- package.json/package-lock.json: test/check scripts, Node requirement and scoped patched minimatch override.
- vercel.json: explicit npm ci installation; Vite build/dist preserved, no unnecessary rewrites.
- README.md: current structure, development, content editing, limitations and deployment instructions.

## Validation
Clean npm ci passed after stopping the owned preview process to release a Windows file lock. TypeScript, ESLint, five tests and production build passed. npm audit reports zero vulnerabilities after a scoped development-tooling patch. Existing dependencies are used; no runtime services were added.
Local entrypoint/data asset references all exist. A targeted common-token/private-key pattern scan of source/config found no matches; this is not an exhaustive secret-history audit. Environment files, .vercel, dependencies and output remain ignored. No Git push or repository changes outside this folder were made.

## Performance
Initial entry JavaScript: 83,417 gzip bytes (about 83.4 KB), below the approximate 200 KB target. Optional GSAP: 28.10 KB gzip. Lazy 3D: 251.29 KB gzip. Vite still emits a large-chunk advisory for the intentionally deferred Three.js/R3F bundle.
Certificate previews total 185,386 bytes versus 395,305 original JPEG bytes, a 53.1% reduction. Project screenshot remains a 59,098-byte WebP. Local Latin font subsets use swap; the hero 600 weight is preloaded. No required runtime APIs or third-party fonts.
Lighthouse local run failed at a Chrome interstitial; no security interstitial was bypassed. HTTPS production run results follow below when available. No field INP, LCP or CLS values are claimed.

## Accessibility and content
Semantic headings, labeled navigation, keyboard-native controls, focus outlines, descriptive certificate/screenshot alternatives, fixed preview aspect ratios, reduced-motion CSS and particle fallback preserved. Copy email has live feedback and a graceful failure message. No backend form or missing resume action.
Remaining content TODOs: winning certificate/event/date/award; Special Thanks image/issuer; project-specific backend contributions; implementations/stacks/demos/screenshots for incomplete projects; real challenges/lessons; current resume PDF; optional original 4LOOPS artwork. No facts invented to fill these gaps.

## Deployment
Existing separate project: new-portfolio, scope ayankrmondal2003-rgb.
1. Work only in new-portfolio; verify .vercel/project.json identifies new-portfolio.
2. Run npm ci and npm run check.
3. Vite preset, npm run build, dist output, npm ci install, no environment variables.
4. Publish with vercel deploy --prod. Hash routing needs no rewrite.
5. If domain changes, update index.html canonical/social URLs, robots.txt and sitemap.xml together.

## Known limits
The app is static and compatible with Hobby hosting; billing/plan settings and future usage quotas were not changed or independently audited. React Three Fiber emits an upstream THREE.Clock deprecation warning with Three r187. ESLint 9 emits a support/deprecation notice at installation; lint passes. No exhaustive GPU/heap or assistive-technology certification was performed.

## Final production results — 7 November 2026
Deployment completed successfully (Vercel READY): dpl_6pA6aES7SHy2UH9KN9YrSJMrAjys.
Live URL: https://new-portfolio-two-amber.vercel.app/

Lighthouse 13.6.0, production HTTPS URL, simulated mobile throttling, final run at 2026-11-07T11:59:23.800Z:
- Performance 99 / Accessibility 100 / Best Practices 100 / SEO 100.
- LCP 1.7 s; CLS 0; Total Blocking Time 120 ms; FCP 1.0 s.
- No ParticleScene request in the mobile network log.
- These are one-run lab results, not field Core Web Vitals. INP was not measured; TBT is not INP.
- Initial run scored performance 96 and identified a wordmark accessible-name mismatch plus oversized screenshot delivery. Both were fixed; final label audit passes.
Reports: docs/lighthouse-final.report.html and .json. Responsive 640/800px screenshot variants added to public/projects and ProjectImage.tsx; Navbar.tsx label now includes visible AKM text. Final initial JS is about 83.54 KB gzip.

Live responsive checks: 320, 375, 430, 768, 1024, 1440 and 1920px had no page overflow or clipped headings. Settled tablet canvas = container 753px; desktop 1920 viewport canvas = container 1905px. Mobile canvas unmount confirmed. Mobile menu keyboard Enter/Escape and focus return pass. Mobile case-study overflow/focus checks pass. Direct case-study hash and refresh open the correct dialog. Copy email succeeds with feedback. No application console errors.

Deployed root, robots.txt, sitemap.xml, social PNG, favicon, responsive screenshots and four WebP certificate previews all return HTTP 200 with appropriate content types. No field INP data, exhaustive heap analysis, or guarantee of scores on every network/device is implied. Reduced-motion/WebGL policy test limits from Phase 6 remain documented.

Audit complete. No future work or phases implemented.
