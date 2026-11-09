<div align="center">

# Ayan Kumar Mondal — Developer Portfolio

**Full-Stack Developer & Machine Learning Practitioner**  
*B.Tech CSE (AI & ML) • Haldia Institute of Technology • Kolkata, India*

[![Live Demo](https://img.shields.io/badge/Demo-Live_Portfolio-2ea44f?style=for-the-badge&logo=vercel)](https://new-portfolio-two-amber.vercel.app/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[**Explore Live Portfolio ↗**](https://new-portfolio-two-amber.vercel.app/) • [**View GitHub Profile ↗**](https://github.com/ayankrmondal2003-rgb)

---

</div>

## 🌟 Overview

An editorial, high-performance developer portfolio blending physical tactile textures with modern creative engineering. Designed with high-contrast dual themes, interactive 3D spatial transitions, real-time GitHub synchronization, and authentic acoustic audio feedback.

---

## ✨ Key Features

### 1. 🚪 3D Architectural Doors Showcase
- **"Magic happens behind the doors"**: Interactive architectural double doors built with 3D perspective and dynamic lighting.
- **Domain Exploration**: Click to zoom into specialized engineering tracks (System Architecture, AI/ML Pipelines, Full-Stack Applications, Team 4LOOPS Brand Identity).
- **Capability Checklists**: Slide-out editorial checklists displaying concrete software skills and project starters.

### 2. 💡 Interactive Brass Night Lamp Pull-Cord
- **Physics-Based Spring Simulation**: Realistic elastic pull-string with spring rebound and drag tension.
- **Authentic Sourced Audio**: Real light-bulb pull string friction and mechanical switch snap sounds integrated with zero latency via the Web Audio API.
- **Theme Switcher**: Seamlessly toggles between Dark Mode and Light Mode with immediate tactile and acoustic feedback.

### 3. 📊 Real-Time GitHub Contributions Showcase
- **Dual-Provider Live Sync**: Queries live GitHub activity via primary and fallback APIs with automated failover and 15s request debouncing.
- **Rolling 52-Week Calendar**: Interactive contribution heatmap with hover tooltips, date formatting, and real-time contribution counts.
- **Manual & Automated Sync**: Auto-syncs on page load, tab focus, and background interval (every 5 mins), with on-demand instant sync.

### 4. ⏳ Achievements & Hackathons Time Machine
- **Interactive Chronological Timeline**: Interactive milestone dial documenting national hackathon participations, certifications, and academic milestones.
- **Contextual Milestone Cards**: Detailed project scope, team collaborations, and verifiable evidence links.

### 5. 🌓 Dual-Theme System (Dark Mode & Paper Light Mode)
- **Obsidian Dark Mode**: Deep `#0a0a0c` canvas with radial depth, warm metallic gold (`#d8c494`) accents, and crisp silver typography (`#d1d5db`).
- **Tactile Paper Light Mode**: Warm cream paper texture (`#eee8d8`) with dark charcoal ink typography (`#11140e`) and authentic polaroid photograph styling.

### 6. ⚡ Lightweight, High Performance & Free-Tier Optimized
- **Instant Load**: Built into optimized static bundles via Vite (production build under 2.1s).
- **Zero Server Costs**: Fully compatible with Vercel Hobby free-tier deployment — zero backend, databases, or runtime environment variables needed.

---

## 🛠️ Tech Stack & Architecture

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite 6](https://vitejs.dev/) |
| **Styling & Design System** | [Tailwind CSS 4](https://tailwindcss.com/), CSS Custom Properties, Fluid Typography |
| **Motion & Spatial Graphics**| GSAP, ScrollTrigger, CSS 3D Transforms, WebGL capability probes |
| **Audio Synthesis & FX** | Web Audio API (procedural synthesis + pre-decoded audio buffers) |
| **Typography & Icons** | [Space Grotesk](https://fontsource.org/fonts/space-grotesk), [IBM Plex Mono](https://fontsource.org/fonts/ibm-plex-mono), [Lucide React](https://lucide.dev/) |
| **Deployment & CI/CD** | [Vercel](https://vercel.com/) (Vite Static Preset) |

---

## 📂 Project Structure

```text
Portfolio-updated/
├── new-portfolio/                   # Main application workspace
│   ├── public/
│   │   ├── audio/                  # Master acoustic sound effects (.wav)
│   │   ├── certificates/           # Certifications and credentials
│   │   ├── images/                 # Optimized WebP assets and portraits
│   │   └── robots.txt              # SEO crawling instructions
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/             # Navbar, Footer, Container, SectionDivider
│   │   │   ├── sections/           # Home (Hero), Projects, Skills, Achievements, About, Contact
│   │   │   └── ui/                 # HangingRopeSwitch, GithubContributions, DoorsSection, etc.
│   │   ├── context/                # ThemeProvider (Light / Dark mode persistence)
│   │   ├── data/                   # Typed portfolio content, fallback contributions dataset
│   │   ├── hooks/                  # Custom React hooks (useTheme, useEditorialMotion)
│   │   ├── lib/                    # soundEffects.ts, particlePolicy.ts
│   │   ├── styles/                 # rishi-doors-theme.css, redesign.css, index.css
│   │   ├── types/                  # TypeScript interface declarations
│   │   ├── App.tsx                 # Primary layout and section composition
│   │   └── main.tsx                # React root mount
│   ├── tests/                      # Automated capability and fallback tests
│   ├── package.json                # App-level dependencies and scripts
│   ├── tsconfig.json               # Strict TypeScript configuration
│   ├── vercel.json                 # Vercel production rewrites and immutable caching
│   └── vite.config.ts              # Vite bundling optimization configuration
├── package.json                     # Root proxy scripts
└── README.md                       # Repository documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `20.0.0` or higher
- **npm**: `9.0.0` or higher

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ayankrmondal2003-rgb/Portfolio-updated.git
   cd Portfolio-updated
   ```

2. **Install dependencies**:
   ```bash
   npm ci
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Quality Assurance & Build Checks

Run the automated verification suite (TypeScript, ESLint, Unit Tests, and Production Build):

```bash
npm run check
```

Or run individual commands:

```bash
npm run typecheck    # Run tsc --noEmit (0 TypeScript errors)
npm run lint         # Run ESLint (0 warnings)
npm run test         # Run Node test suite (7/7 unit tests)
npm run build        # Build optimized production bundle
npm run preview      # Preview production build locally
```

---

## 🌐 Deployment (Vercel)

The project is structured for **zero-configuration deployment on Vercel**:

1. Link your GitHub repository to [Vercel](https://vercel.com/).
2. Set the **Root Directory** to `new-portfolio` (or leave default if deploying from repository root).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**. No environment variables are required!

---

## 👤 Author

**Ayan Kumar Mondal**
- **GitHub**: [@ayankrmondal2003-rgb](https://github.com/ayankrmondal2003-rgb)
- **LinkedIn**: [Ayan Kumar Mondal](https://linkedin.com/in/ayan-kumar-mondal-931686392)
- **Email**: [ayankr.mondal2003@gmail.com](mailto:ayankr.mondal2003@gmail.com)
- **Portfolio**: [portfolio-ayankumar.vercel.app](https://portfolio-ayankumar.vercel.app/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
