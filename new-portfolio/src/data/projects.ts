import type { FeaturedProject } from "../types/portfolio";

const zenith = "https://github.com/ayankrmondal2003-rgb/Typing-Speed-Trainer";
const sanjeevani =
  "https://github.com/arpbiswas04-coder/Sanjeevani---Health-for-a-Better-Tomorrow";
const voyage = "https://github.com/Voyage-Hack4Haldia-26/TEAM-B";
const contribution =
  "Backend development (self-reported). The exact project-specific scope is awaiting documentation.";
const contributionTodo =
  "TODO: Describe the endpoints, modules, or integrations you personally built and link the relevant commits or pull requests." as const;
const challenges =
  "TODO: Add a real technical challenge you encountered, the trade-off you made, and how you addressed it.";
const lessons =
  "TODO: Describe what you learned from your own work on this project.";

export const featuredProjects: FeaturedProject[] = [
  {
    id: "01",
    slug: "zenith",
    title: "ZENITH",
    category: "Typing Speed Trainer",
    description:
      "A typing practice platform with speed and accuracy tracking, session analytics, and targeted practice. Published as Type e.",
    status: "deployed",
    statusLabel: "Deployed frontend",
    technologies: [
      "JavaScript",
      "HTML",
      "CSS",
      "Node.js",
      "WebSocket",
      "Chart.js",
    ],
    repository: zenith,
    demo: "https://typing-speed-trainer-xi.vercel.app",
    screenshot: {
      src: "/projects/zenith.webp",
      alt: "Type e typing trainer home screen with practice difficulty, duration, and mode controls.",
      width: 1200,
      height: 675,
    },
    evidence: {
      summary:
        "Live frontend inspected. Features and architecture checked against README, typing-engine.js, session-analytics.js, script.js, and package.json. Cross-device multiplayer hosting was not verified.",
      sources: [
        { label: "Project README", url: `${zenith}/blob/main/README.md` },
        { label: "Typing engine", url: `${zenith}/blob/main/typing-engine.js` },
        {
          label: "Session analytics",
          url: `${zenith}/blob/main/session-analytics.js`,
        },
      ],
      checked: "2026-11-06",
    },
    caseStudy: {
      problem:
        "Typing practice needs more than a final speed score: users need feedback on accuracy, mistakes, and progress across sessions.",
      solution:
        "A browser-based practice interface backed by a standalone typing engine and locally stored session analytics. The repository also contains an optional multiplayer server.",
      features: [
        "Timed typing with WPM and accuracy calculation.",
        "Programming snippets and custom-text practice modes.",
        "Session history, personal bests, and keyboard error analysis.",
        "Targeted weak-key practice and personal-best ghost replay.",
        "JSON backup/restore and CSV history export.",
        "Repository includes WebSocket multiplayer with a local-tab fallback; a deployed multiplayer backend is not confirmed.",
      ],
      architecture: [
        "HTML and CSS define the interface; vanilla JavaScript coordinates the views.",
        "typing-engine.js calculates session progress and typing metrics.",
        "session-analytics.js persists session records and personal bests in localStorage.",
        "Bundled Chart.js renders history charts.",
        "An optional Node.js WebSocket server supports multiplayer separately from the static Vercel frontend.",
      ],
      contribution,
      contributionTodo,
      challenges,
      lessons,
    },
  },
  {
    id: "02",
    slug: "sanjeevani",
    title: "SANJEEVANI",
    category: "Healthcare Resource Coordination",
    description:
      "A concept for AI-assisted healthcare resource planning and emergency coordination. Implementation details are not available in the public default branch.",
    status: "concept",
    statusLabel: "Concept · implementation unverified",
    technologies: [],
    repository: sanjeevani,
    evidence: {
      summary:
        "The accessible main branch contains only a title-only README. The concept comes from the portfolio owner's brief; no stack, implemented features, or deployment is claimed.",
      sources: [
        { label: "Public README", url: `${sanjeevani}/blob/main/README.md` },
      ],
      checked: "2026-11-06",
    },
    caseStudy: {
      problem:
        "The stated concept addresses coordination of healthcare resources and emergency needs.",
      solution:
        "Proposed direction: AI-assisted resource planning and emergency coordination. TODO: Provide implementation evidence before describing this as a working system.",
      features: [
        "TODO: Document implemented features with an accessible implementation branch or demo.",
      ],
      architecture: [
        "TODO: Add the actual backend, data model, frontend, and AI integration after verifying the source.",
      ],
      contribution,
      contributionTodo,
      challenges,
      lessons,
    },
  },
  {
    id: "03",
    slug: "cartguard",
    title: "CartGuard AI",
    category: "Cart Verification & Reconciliation",
    description:
      "A proposed independent cart-verification and checkout-reconciliation solution. Repository, implementation, and technology choices await verification.",
    status: "concept",
    statusLabel: "Concept · details pending",
    technologies: [],
    evidence: {
      summary:
        "Concept supplied by the portfolio owner. No matching CartGuard repository was found in the owner's GitHub account during this review; no source or demo link is exposed.",
      sources: [],
      checked: "2026-11-06",
    },
    caseStudy: {
      problem:
        "The proposed problem is identifying differences between a shopping cart and its checkout record.",
      solution:
        "Proposed direction: independent cart verification and checkout reconciliation. TODO: Confirm the actual workflow and implementation status.",
      features: [
        "TODO: List verified features; no detection model, hardware, or accuracy claim is assumed.",
      ],
      architecture: [
        "TODO: Confirm how cart data is collected, verified, and reconciled with checkout data.",
      ],
      contribution,
      contributionTodo,
      challenges,
      lessons,
    },
  },
  {
    id: "04",
    slug: "voyage-team-b",
    title: "Voyage Hack4Haldia",
    category: "TEAM-B · Live Whiteboard",
    description:
      "A hackathon starter for collaborative drawing rooms. The public code provides an API tester and health endpoint; room operations are still stubs.",
    status: "starter",
    statusLabel: "Hackathon starter",
    technologies: [
      "HTML",
      "JavaScript",
      "Python",
      "Flask",
      "Node.js",
      "Express",
    ],
    repository: voyage,
    evidence: {
      summary:
        "README, app.py, and script.js inspected. Python/Flask and Node/Express are alternative starter stacks. Room APIs return HTTP 501; live drawing, persistence, Redis, and WebSockets are requirements, not verified implementations.",
      sources: [
        { label: "Challenge README", url: `${voyage}/blob/main/README.md` },
        { label: "Flask starter", url: `${voyage}/blob/main/app.py` },
        { label: "Express starter", url: `${voyage}/blob/main/script.js` },
      ],
      checked: "2026-11-06",
    },
    caseStudy: {
      problem:
        "The challenge brief asks for a shared drawing canvas where remote participants join rooms and see each other's strokes.",
      solution:
        "The public repository is a starting scaffold, not a completed collaborative whiteboard. It includes a frontend API tester and two alternative server starters.",
      features: [
        "Implemented: a health-check endpoint in both server starters.",
        "Included: a starter HTML interface with an API tester.",
        "Not implemented in main: room creation and board retrieval, which return HTTP 501.",
        "Planned in the brief: synchronized strokes, late-join state, and reconnect handling.",
        "Bonus ideas only: undo/redo, presence, Redis pub/sub, and PNG export.",
      ],
      architecture: [
        "Starter index.html is served by either a Python/Flask or Node/Express server.",
        "Both servers expose a working /health endpoint.",
        "POST /api/rooms and GET /api/rooms/:id remain explicit placeholders.",
        "No implemented real-time transport or persistent board storage was found in the reviewed files.",
      ],
      contribution,
      contributionTodo,
      challenges,
      lessons,
    },
  },
];


