# Phase 6 — Optimized Three.js experience

All changes are exclusive to new-portfolio. Existing content, editorial design and GSAP reveals are preserved.

## Implementation
- HeroAtmosphere.tsx: lazy import gate, device/reduced-motion/data-saver policy, viewport and document visibility observers, WebGL preflight and error boundary.
- ParticleScene.tsx: one Points object, one BufferGeometry, one shader material. 1,200 desktop or 480 tablet particles, deterministic typed-array buffers and GPU vertex movement.
- Shared GSAP RAF ticker advances Fiber manually (frameloop never), capped at 45 desktop / 24 tablet renders per second. These are upper limits, not measured FPS claims.
- DPR capped at 1.5 desktop / 1 tablet. No postprocessing, textures, per-frame React updates or per-particle components.
- Mouse-only desktop pointer input smoothly interpolates and returns to neutral. Tablet has ambient movement only.
- Tick listener stops offscreen/hidden; visibility guard also prevents rendering before React processes the event. Resize/reduced-motion changes remove the canvas when required.
- Slow sustained render scheduling or CPU submission cost falls back to CSS. Hardware cores/memory hints and data-saving preference select CSS proactively.
- R3F owns declarative geometry/material disposal and renderer/context release. Observers, pointer/context listeners and GSAP callback are removed on cleanup.
- Existing CSS grid remains behind the entire experience. Decorative layers are aria-hidden and pointer-events none.

## Files
Added src/lib/particlePolicy.ts, src/components/ui/HeroAtmosphere.tsx, src/components/ui/ParticleScene.tsx, src/styles/particles.css, tests/particle-policy.test.mjs.
Modified Home.tsx, main.tsx, package.json and package-lock.json.

## Validation
TypeScript, ESLint and production build passed. Five Node tests pass (mobile/reduced-motion policy, tablet/desktop budgets, low-resource/data saver, disabled/throwing WebGL, temporary-context release).
Run tests with: node --test tests/particle-policy.test.mjs
The production build emits a separate ParticleScene chunk: 935.83 kB / 251.27 kB gzip. Vite reports its large-chunk advisory; it is deliberately lazy and excluded from the mobile/static path.
No claims of 60 FPS, measured GPU time or exhaustive memory-leak freedom.

## Documentation consulted
https://r3f.docs.pmnd.rs/api/canvas
https://r3f.docs.pmnd.rs/api/hooks
https://threejs.org/manual/pages/how-to-dispose-of-objects.html
Installed Fiber source also checked for manual timestamp units and disposal behavior.

Phase 6 only; no future phases implemented.

## Live QA and limits
- 375px mobile: static mode, no canvas, no horizontal overflow. Source/build inspection confirms lazy ParticleScene is only rendered after the eligibility checks; browser resource timing was unavailable.
- Desktop and 768px tablet: canvas initializes and particles are visible. Ordinary navigation remains functional.
- Scrolling fully beyond the hero changes data-particle-active to false; the GSAP render callback is removed on that transition.
- Reduced-motion and WebGL-disabled behavior tested through policy tests and source review. Full browser/OS emulation of these settings was not available.
- Buffer/material disposal verified against installed R3F reconciler code. Cleanup paths reviewed; no exhaustive heap profiling performed.
- Browser logs show no application/shader errors. An upstream THREE.Clock deprecation warning is emitted by R3F with Three r187.
- The browser session does not provide reliable sustained frame timing. Render submission diagnostics are exposed on the decorative host when samples are available; they are not GPU timing or FPS promises.

## Final deployment
https://new-portfolio-two-amber.vercel.app
Vercel READY: dpl_4pDSPk8gHaWQZ5bR6iv6gz6SZ8Bj.
Final lazy chunk: 935.95 kB / 251.29 kB gzip. Final TypeScript, lint and production build passed after diagnostics refinement.
Final screenshot capture was unavailable because the browser connection failed. The prior live desktop rendering screenshot was visually inspected during QA.
