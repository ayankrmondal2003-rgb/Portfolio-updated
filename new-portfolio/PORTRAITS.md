# Personal portrait integration

Completed locally on 2026-11-07. No deployment was performed. All task writes are inside `new-portfolio`; the previous portfolio and deployment were not modified.

## Assets

Exact originals were extracted from `Photos-1-001.zip` and preserved under `docs/profile-originals/`. The optional third portrait was not used.

| Use | Original filename | Dimensions (unchanged) | Original bytes | WebP bytes | Reduction |
| --- | --- | --- | ---: | ---: | ---: |
| Hero | 20260326_175836-IMG_STYLE~2.jpg | 638 × 781 | 63,626 | 37,982 | 40.3% |
| About | 20260326_175857-IMG_STYLE.jpg | 1024 × 1024 | 81,274 | 26,656 | 67.2% |

WebP quality 90, without resizing, cropping, facial alteration, filters, or sharpening. Full framing and monochrome appearance are retained. Display widths stay below original pixel widths.

## Files created or modified

- `src/components/sections/Home.tsx`: portrait beside the existing introduction and actions.
- `src/components/sections/About.tsx`: portrait beside existing biography and education; team content retained.
- `src/styles/portraits.css`: scoped responsive layouts, restrained framing and entrance motion.
- `src/main.tsx`: imports the portrait stylesheet.
- `public/images/profile/hero.webp` and `about.webp`: optimized local assets.
- `docs/profile-originals/`: two preserved originals.
- `docs/portrait-hero-preview.jpg` and `docs/portrait-about-preview.jpg`: browser previews.
- `PORTRAITS.md`: this report.
- `dist/`: regenerated production output, including both portraits.

## Layout and accessibility

Desktop hero uses 58/42 text/image columns, a maximum 480px portrait, subtle edge framing and a small blue accent. Existing text, actions, technical grid and particle system remain. About uses an editorial image/text layout with a maximum 420px image. Mobile stacks content with hero actions before the compact 240px-wide portrait; About is capped at 320px.

Both images have descriptive alt text and explicit dimensions. Neither is cropped or stretched. Entrance effects use opacity and small transforms, gated by reduced-motion preference. Existing keyboard navigation and particle visibility/performance controls remain unchanged. No new dependencies, APIs, image services, particle counts or postprocessing were introduced.

## Validation

- TypeScript: pass.
- ESLint: pass.
- Available tests: all 5 pass.
- Production build: pass; existing large lazy 3D chunk warning remains.
- Responsive checks at 320, 375, 430, 768, 1024, 1440 and 1920px: no horizontal overflow or checked hero/About text clipping; images retain aspect ratios and remain below source sizes.
- Both production-build image paths return HTTP 200 with `image/webp` from the local preview.
- Browser confirmed hero natural dimensions 638 × 781 and About lazy-load completion at 1024 × 1024 after navigation.
- No browser console errors observed during verification.
- Hero and About layouts visually reviewed; screenshots saved in `docs/`.

## Performance and remaining verification

Hero loads eagerly with high fetch priority; About loads lazily. Explicit dimensions reserve image space before decoding. The images total 64,638 bytes. Main JavaScript is approximately 83.73 KB gzip; the 3D bundle remains lazy-loaded. No new Lighthouse, CLS, INP or frame-rate benchmark was measured for this portrait update, and previous phase measurements should not be treated as current results.

No requested assets are missing. Public production image URLs remain unverified because this update has intentionally not been deployed. Deployment and a post-deployment smoke check are the only remaining release steps; they require a separate request.
