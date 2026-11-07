# Phase 4 — Personal profile and achievements

All changes are confined to new-portfolio. The previous portfolio and deployment were not modified.

## Files
- Updated src/data/portfolio.ts and src/types/portfolio.ts: biography, team members, recognition labels, certificate metadata and optional resume PDF.
- Updated About.tsx, Achievements.tsx and Contact.tsx in src/components/sections.
- Added CertificateGallery.tsx and src/styles/profile.css; imported styles in src/main.tsx.
- Added four actual certificate JPEGs in public/certificates.

## Content review
- Four images visually inspected: NPTEL Python, two Udemy courses, and ISRO participation/idea submission. These are not represented as hackathon wins.
- The old TEJAS and VICODATHON certificate URLs returned project screenshots instead of certificates. Excluded from the gallery.
- Hacktoberfest’26 is labeled Special Thanks, explicitly not a winning certificate. Its artwork and issuer remain pending.
- 1× Hackathon Winner is self-reported; no event, date, ranking or award details were invented.
- Four 4LOOPS members supplied by the user are included without invented roles. No logo asset exists.
- Email and LinkedIn retain the previously verified public-portfolio values.
- No resume PDF exists. The old JPG CV action was removed; download renders only for a supplied PDF.

## Validation
- TypeScript, ESLint and production build passed.
- Source certificate URLs returned actual JPEGs and all four local files are included in the build.
- Accessible real preview links, descriptive image alternatives, image-error fallback, keyboard-native links/buttons and copy feedback live region.
- Responsive gallery uses one/two/three columns; team uses one/two/four. Existing focus and reduced-motion rules retained.
- Local browser preview timed out; live visual and interaction checks pending.

## Remaining content TODOs
Winning certificate/event details; Special Thanks artwork/issuer; actual resume PDF; optional original team logo and confirmed participation details. PDF certificate links are supported but no PDFs were supplied.

## Deployment and live checks
Published to https://new-portfolio-two-amber.vercel.app (Vercel READY, deployment dpl_7HfZSnEt3mrh6GkRvLkzWAyRZkqF).
Live browser checks completed: no horizontal overflow at 320, 375, 430, 768, 1024 and 1440px; expected gallery column counts; copy-email success feedback; four certificate images fully loaded; no console errors. Desktop gallery screenshot saved in docs/phase4-gallery.jpg. Temporary viewport override reset.
Phase 4 only. No future phases implemented.
