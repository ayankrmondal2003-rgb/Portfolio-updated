import type { FeaturedProject } from "../types/portfolio";

const githubUser = "https://github.com/ayankrmondal2003-rgb";
const zenith = `${githubUser}/Typing-Speed-Trainer`;

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
        "Live frontend inspected. Features and architecture checked against README, typing-engine.js, session-analytics.js, script.js, and package.json.",
      sources: [
        { label: "Project README", url: `${zenith}/blob/main/README.md` },
        { label: "Typing engine", url: `${zenith}/blob/main/typing-engine.js` },
        {
          label: "Session analytics",
          url: `${zenith}/blob/main/session-analytics.js`,
        },
      ],
      checked: "2026-11-09",
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
        "Repository includes WebSocket multiplayer with a local-tab fallback.",
      ],
      architecture: [
        "HTML and CSS define the interface; vanilla JavaScript coordinates the views.",
        "typing-engine.js calculates session progress and typing metrics.",
        "session-analytics.js persists session records and personal bests in localStorage.",
        "Bundled Chart.js renders history charts.",
        "An optional Node.js WebSocket server supports multiplayer separately from the static Vercel frontend.",
      ],
      contribution:
        "Built the client-side typing engine, session analytics layer, and UI with local persistence and responsive layout.",
      challenges:
        "Accurately measuring keystroke timing across different browser event loops and ensuring seamless ghost replaying without jitter.",
      lessons:
        "Mastered DOM event timing precision, accessible keyboard navigation, and client-side storage serialization.",
    },
  },
  {
    id: "02",
    slug: "setu",
    title: "SETU",
    category: "Tourism Marketplace",
    description:
      "A dual-sided tourism platform connecting tourists with local vendors, guides, and AI-generated travel itineraries with Gemini. Selected for the TEJAS INDIA 2026 24h offline finale.",
    status: "in-progress",
    statusLabel: "Tejas 24H Offline Finalist",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Prisma",
      "Gemini",
      "Razorpay",
    ],
    repository: githubUser,
    evidence: {
      summary:
        "Selected as a finalist for the Tejas India 2026 Offline Finale in the Bihar Tourism track at Government Engineering College, Jamui.",
      sources: [
        { label: "Tejas India Hackathon", url: "https://tejasindia.org" },
        { label: "GitHub Profile", url: githubUser },
      ],
      checked: "2026-11-09",
    },
    caseStudy: {
      problem:
        "Local vendors in growing tourist states struggle to reach wider audiences digitally, while tourists lack unified booking platforms for hyper-local experiences.",
      solution:
        "A dual-sided marketplace offering localized discovery, secure payments, and AI-generated travel itineraries powered by Gemini.",
      features: [
        "Localized vendor discovery and experience bookings.",
        "AI-generated personalized travel itineraries powered by Gemini.",
        "Integrated secure payment handling via Razorpay.",
        "Vendor dashboard for inventory, schedules, and analytics.",
        "Selected for the Tejas India 2026 Offline Finale (Bihar Tourism track).",
      ],
      architecture: [
        "React and TypeScript power the responsive client interface.",
        "Node.js and Prisma ORM manage database relations and vendor profiles.",
        "Gemini API integration generates smart context-aware trip itineraries.",
        "Razorpay payment gateway securely processes vendor bookings.",
      ],
      contribution:
        "Developed the frontend architecture with React/TypeScript, implemented secure payment gateways, and integrated Gemini for the smart itinerary generator.",
      challenges:
        "Synchronizing complex state across the vendor dashboard and the tourist-facing app within a 24-hour hackathon window.",
      lessons:
        "Deepened practical skills in rapid dual-sided marketplace architecture, LLM prompt engineering, and payment gateway webhooks under intense hackathon deadlines.",
    },
  },
  {
    id: "03",
    slug: "meghdrishti",
    title: "Meghdrishti",
    category: "Satellite Cloud-Removal System",
    description:
      "A generative AI system that reconstructs cloud-obscured satellite imagery using computer vision and deep learning. Built for the ISRO Bharatiya Antariksh Hackathon 2026.",
    status: "prototype",
    statusLabel: "ISRO BAH 2026 · Team TRINOVA",
    technologies: [
      "Python",
      "PyTorch",
      "Swin Transformer",
      "FastAPI",
      "Docker",
    ],
    repository: githubUser,
    evidence: {
      summary:
        "Developed with Team TRINOVA for the ISRO Bharatiya Antariksh Hackathon 2026, focused on satellite observation restoration.",
      sources: [
        { label: "ISRO Hackathon", url: "https://hack2skill.com" },
        { label: "GitHub Profile", url: githubUser },
      ],
      checked: "2026-11-09",
    },
    caseStudy: {
      problem:
        "Optical satellite images are frequently obscured by cloud cover, severely limiting their utility for continuous earth observation, disaster tracking, and agricultural monitoring.",
      solution:
        "A generative adversarial network (GAN) augmented with Swin Transformers to synthesize highly accurate ground details beneath dense and thin clouds.",
      features: [
        "Cloud-mask detection and segmentation pipeline.",
        "Swin Transformer augmented U-Net generator for texture synthesis.",
        "Perceptual and adversarial loss optimization for sharp ground fidelity.",
        "FastAPI inference endpoint for rapid batch satellite image processing.",
        "Dockerized deployment for reproducible model serving.",
      ],
      architecture: [
        "PyTorch deep learning pipeline implementing Swin-augmented GANs.",
        "U-Net architecture with multi-scale skip connections.",
        "FastAPI backend serving real-time reconstruction inference.",
        "Docker container orchestrating GPU-accelerated dependencies.",
      ],
      contribution:
        "Designed and trained the hybrid U-Net generator, curated the training dataset, and built the FastAPI inference endpoint.",
      challenges:
        "Balancing the GAN loss functions to prevent artifact generation and optimizing the model to run inference efficiently.",
      lessons:
        "Mastered vision transformers for generative restoration, custom loss balancing, and containerized deployment for large-scale geospatial pipelines.",
    },
  },
  {
    id: "04",
    slug: "enterprise-ai-interviewer",
    title: "Enterprise AI Interviewer",
    category: "Adaptive AI Screening",
    description:
      "An adaptive, AI-driven technical interviewer that eliminates bias and dynamically adjusts to candidate responses with follow-up questions and structured assessments. Co-built during the 48-hour VICODATHON.",
    status: "prototype",
    statusLabel: "48H Build · Team Vector",
    technologies: [
      "Python",
      "FastAPI",
      "Gemini",
      "Groq",
      "Docker",
    ],
    repository: githubUser,
    evidence: {
      summary:
        "Co-built during the 48-hour VICODATHON hackathon with Team Vector, demonstrating low-latency conversational evaluation.",
      sources: [
        { label: "VICODATHON 2026", url: "https://vicodathon.dev" },
        { label: "GitHub Profile", url: githubUser },
      ],
      checked: "2026-11-09",
    },
    caseStudy: {
      problem:
        "Traditional technical screening is static, heavily biased, and often fails to deeply assess a candidate's practical reasoning and problem-solving depth.",
      solution:
        "A dynamic evaluation pipeline powered by large language models that generate context-aware questions and follow-ups based on the candidate's specific background.",
      features: [
        "Dynamic, non-linear interview questioning adapting to candidate responses.",
        "Sub-second response streaming via Groq and Gemini low-latency inference.",
        "Objective, structured rubric generation scoring reasoning and depth.",
        "FastAPI asynchronous backend with session state management.",
        "Fully containerized with Docker for instantaneous cloud deployment.",
      ],
      architecture: [
        "FastAPI asynchronous web server orchestrating the interview flow.",
        "Groq and Gemini LLM inference for low-latency question synthesis.",
        "Pydantic schema validation ensuring structured assessment output.",
        "Docker containerization ensuring reliable cross-environment execution.",
      ],
      contribution:
        "Engineered the core backend pipeline using FastAPI, integrated Groq/Gemini for low-latency inference, and dockerized the application for rapid deployment.",
      challenges:
        "Managing LLM hallucinations during technical evaluations and optimizing latency for real-time conversational interaction.",
      lessons:
        "Gained significant expertise in prompt chaining, latency reduction for conversational AI, and building resilient async backends under 48-hour pressure.",
    },
  },
];
