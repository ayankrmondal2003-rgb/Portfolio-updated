# Phase 8 — cinematic light ribbons

Completed locally, 2026-11-07. No deployment, repository push, dependency changes or previous-portfolio changes.

## Implementation

The supplied `portfolio video implement.mp4` was reviewed locally for its flowing curved trails. The implementation uses restrained electric blue and muted cyan, without copying video assets into the site. Temporary reference copies were removed.

`LightRibbons.tsx` renders all ribbons in one indexed BufferGeometry and one shared ShaderMaterial. Geometry is allocated when the device budget changes; the vertex shader deforms the strips along smooth analytic waves with varying lengths, widths, phase and depth. The fragment shader provides tapered ends, soft edges, a narrow luminous core and slow continuous brightness flow. There are no textures, bloom passes, lights or per-frame geometry allocations.

Ribbons share the particle field's time and aspect uniform objects. The existing Canvas, `frameloop="never"`, GSAP ticker, frame caps and capped elapsed-time updates drive both effects. No new RAF, frame callback, per-frame React state or animation engine was introduced. Declarative Fiber geometry/material ownership provides disposal on unmount. Existing visibility listeners, observer cleanup, context-loss handling, error boundary and slow-render fallback are retained.

## Budgets and layering

| Mode | Ribbons / segments each | Particles | FPS cap | DPR cap |
| --- | --- | ---: | ---: | ---: |
| Desktop | 4 / 128 | 1200 | 45 | 1.5 |
| Tablet | 2 / 64 | 480 | 24 | 1 |
| Mobile / reduced motion / unsupported WebGL | None; static CSS | 0 | No continuous scene | — |

Particle density stays at the established baseline; shader opacity drops from 0.65 to 0.32 so ribbons are the primary decoration. The existing atmosphere opacity mask and negative stacking layer keep trails behind the content and opaque portrait. Pointer events remain disabled. Portrait files, framing, layout, content, project interactions and editorial scroll animations are unchanged.

## Files

- Created `src/components/ui/LightRibbons.tsx`.
- Created `src/lib/ribbonGeometry.ts` for deterministic batched geometry and device budgets.
- Modified `src/components/ui/ParticleScene.tsx` to mount ribbons, soften particles and report ribbon count.
- Created `tests/ribbon-geometry.test.mjs` covering both device budgets: finite coordinates, UV bounds, valid triangle indices and separation of strips.
- Created `docs/phase8-fallback.html`: development-only fixture to simulate unavailable WebGL and reduced-motion selection. Not included in the production build; `docs` is excluded from Vercel uploads.
- Created `docs/phase8-ribbons-preview.jpg` and this report.
- Regenerated `dist/`.

## Validation

- `npm run typecheck`: pass.
- `npm run lint`: pass.
- `npm test`: 7 tests pass (five existing policy/probe tests and two ribbon geometry tests).
- `npm run build`: pass. Existing warning for the large lazy Three.js chunk remains.
- Browser: one canvas, two draw calls, two geometries on desktop and tablet. Counts remained at two after mode changes; this is not a formal GPU memory-leak profile.
- Widths 320, 375, 430, 768, 1024, 1440 and 1920: no horizontal overflow. Mobile widths have no canvas; tablet and desktop select their respective budgets.
- Local browser fixture: unavailable WebGL and simulated reduced-motion preference both select static mode with zero canvases. This tests application selection, not an operating-system preference change.
- Scrolling to About sets the atmosphere inactive; sampled frame counter stopped at 1800. Hidden-tab guards and cleanup remain in the existing code; no separate OS background-tab benchmark was run.
- Explore My Work anchor and ZENITH case-study action work; Escape closes the dialog. Existing external repository/demo destinations were preserved, not re-audited remotely in this visual-only task.
- Hero screenshot reviewed: portrait unobscured, text and actions readable, restrained curved trails. No console errors observed.

## Performance observations and limits

Local development browser samples reported mean synchronous render submission cost of 0.66ms at 120 desktop frames and 0.37ms at 60 tablet frames. These include JS/renderer submission, not complete GPU execution. They are short samples on this machine, not controlled before/after benchmarks or FPS guarantees.

Production main JavaScript remains 83.73 KB gzip. The lazy scene chunk is 252.17 KB gzip (previously 251.29 KB), approximately 0.88 KB added gzip. Existing GSAP chunk remains 28.10 KB gzip. Mobile's static path does not mount/import the lazy scene. No video, server, backend, paid service or runtime API was added.

No new Lighthouse, LCP, CLS or INP measurements were made. Those targets remain unverified for this update. Production smoke testing awaits an explicitly requested deployment; the live site has not been changed.
