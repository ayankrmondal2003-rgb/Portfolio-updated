import { useState, useRef } from "react";
import { Check, ArrowLeft, ArrowUpRight, Github, Layers } from "lucide-react";
import { playDoorOpen } from "../../lib/soundEffects";

interface DisciplineDoor {
  id: string;
  discipline: string;
  colorTheme: "navy" | "violet" | "sage" | "terracotta";
  doorColor: string;
  doorTrim: string;
  plaqueText: string;
  subtitle: string;
  checklist: string[];
  projects: Array<{
    title: string;
    category: string;
    description: string;
    tags: string[];
    image?: string;
    demoUrl?: string;
    repoUrl?: string;
  }>;
}

const DOORS_DATA: DisciplineDoor[] = [
  {
    id: "web-dev",
    discipline: "Web Development",
    colorTheme: "navy",
    doorColor: "#273952",
    doorTrim: "#182436",
    plaqueText: "WEB DEVELOPER",
    subtitle: "END TO END: FROM SKETCH TO PRODUCTION",
    checklist: [
      "Discovery, architecture & planning",
      "UX & visual interaction design",
      "Front-end & back-end development",
      "Technical SEO & lighthouse 100 performance",
      "Analytics, automated CI/CD & ongoing launch",
    ],
    projects: [
      {
        title: "ZENITH — Real-Time Collaborative Workspace",
        category: "FULL-STACK WEB APPLICATION",
        description:
          "High-performance workspace featuring real-time document synchronization, low-latency live cursors, and responsive editorial layout with soft glowing typography.",
        tags: ["React 19", "TypeScript", "Tailwind CSS", "WebSockets", "Vite"],
        demoUrl: "https://github.com/ayankumar04/ZENITH",
        repoUrl: "https://github.com/ayankumar04/ZENITH",
        image: "/images/projects/zenith-preview.webp",
      },
      {
        title: "CartGuard — Smart Checkout Verifier",
        category: "WEB APPLICATION & SECURITY",
        description:
          "Intelligent shopping assistant detecting cart inconsistencies and deceptive pricing in real time with high accessibility standards.",
        tags: ["TypeScript", "Chrome Extension API", "Tailwind", "Security"],
        demoUrl: "https://github.com/ayankumar04",
        repoUrl: "https://github.com/ayankumar04",
      },
    ],
  },
  {
    id: "app-dev",
    discipline: "App Development",
    colorTheme: "violet",
    doorColor: "#433454",
    doorTrim: "#281e33",
    plaqueText: "APP DEVELOPER",
    subtitle: "CROSS-PLATFORM & FLUID MICRO-INTERACTIONS",
    checklist: [
      "Native iOS & Android performance architectures",
      "Fluid 60 FPS micro-interactions and haptics",
      "Offline-first sync & local database caching",
      "Push notifications & biometric authentication",
      "Clean test coverage & automated App Store releases",
    ],
    projects: [
      {
        title: "OmniFocus — Mobile Task Hub",
        category: "CROSS-PLATFORM UTILITY",
        description:
          "Minimalist mobile task and schedule manager designed around physical gesture interactions, haptic feedback, and offline persistence.",
        tags: ["React Native", "TypeScript", "SQLite", "Gesture Handler"],
        demoUrl: "https://github.com/ayankumar04",
        repoUrl: "https://github.com/ayankumar04",
      },
      {
        title: "Pulse — Ambient Health Metrics",
        category: "HEALTH & WELLNESS APP",
        description:
          "Sensory mobile interface tracking daily habits and focus cycles with custom SVG radial progress dials and dark mode aesthetics.",
        tags: ["Mobile Web", "Canvas 2D", "PWA", "Tailwind"],
        demoUrl: "https://github.com/ayankumar04",
        repoUrl: "https://github.com/ayankumar04",
      },
    ],
  },
  {
    id: "ui-ux",
    discipline: "UI/UX Design",
    colorTheme: "sage",
    doorColor: "#3e4f42",
    doorTrim: "#263329",
    plaqueText: "UI/UX DESIGNER",
    subtitle: "SYSTEMATIC & HUMAN-CENTERED EXPERIENCES",
    checklist: [
      "User research, persona mapping & discovery",
      "Interactive component design systems in Figma",
      "Tactile physics, 3D motion & interaction polish",
      "Accessibility audit (WCAG AAA standards)",
      "Design-to-code token parity and engineering handoff",
    ],
    projects: [
      {
        title: "Editorial Design System 2.0",
        category: "DESIGN SYSTEM & ATOMIC COMPONENTS",
        description:
          "Comprehensive design tokens, typography scales, and tactile card components developed for content-heavy modern applications.",
        tags: ["Figma Tokens", "Design System", "CSS 3D", "WCAG AAA"],
        demoUrl: "https://github.com/ayankumar04",
        repoUrl: "https://github.com/ayankumar04",
      },
      {
        title: "FinTrack — Wealth Analytics Dashboard",
        category: "FINANCIAL INTERFACE",
        description:
          "Data-dense dashboard organizing portfolios, dividends, and real-time P&L breakdowns with high legibility and soft contrast lighting.",
        tags: ["Data Viz", "Figma", "UI/UX", "Responsive Layout"],
        demoUrl: "https://github.com/ayankumar04",
        repoUrl: "https://github.com/ayankumar04",
      },
    ],
  },
  {
    id: "ai-systems",
    discipline: "AI & Software Systems",
    colorTheme: "terracotta",
    doorColor: "#573c2e",
    doorTrim: "#362217",
    plaqueText: "AI & SYSTEM ARCHITECT",
    subtitle: "INTELLIGENT MODELS & SCALABLE PIPELINES",
    checklist: [
      "Neural network development & fine-tuning",
      "Computer vision & real-time visual recognition",
      "Scalable backend APIs & asynchronous workers",
      "Agentic workflows & autonomous LLM tools",
      "Hackathon prototyping & rapid execution",
    ],
    projects: [
      {
        title: "VisionAI — Intelligent Defect Detection",
        category: "COMPUTER VISION & MACHINE LEARNING",
        description:
          "Edge-compatible neural model classifying industrial surface defects in real-time video streams with 98.4% validation accuracy.",
        tags: ["PyTorch", "Python", "OpenCV", "FastAPI", "Docker"],
        demoUrl: "https://github.com/ayankumar04",
        repoUrl: "https://github.com/ayankumar04",
      },
      {
        title: "SmartAgri — Crop Disease Diagnosis",
        category: "HACKATHON WINNING PROTOTYPE",
        description:
          "Machine learning mobile system diagnosing leaf pathogens from smartphone camera captures with offline inference capabilities.",
        tags: ["Deep Learning", "CNNs", "MobileNet", "Python"],
        demoUrl: "https://github.com/ayankumar04",
        repoUrl: "https://github.com/ayankumar04",
      },
    ],
  },
];

export function DoorsSection() {
  const [activeDoorIndex, setActiveDoorIndex] = useState(0);
  const [openedDoorId, setOpenedDoorId] = useState<string | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeDoor = DOORS_DATA[activeDoorIndex];

  const handleOpenDoor = (door: DisciplineDoor) => {
    playDoorOpen();
    setOpenedDoorId(door.id);
    setIsZooming(true);
  };

  const handleBackToDoors = () => {
    setIsZooming(false);
    setTimeout(() => {
      setOpenedDoorId(null);
    }, 450);
  };

  return (
    <section id="doors" className="doors-section" aria-labelledby="doors-heading">
      {/* If inside the door, render the Inside-Door Project Room */}
      {openedDoorId ? (
        <DoorProjectRoom
          door={DOORS_DATA.find((d) => d.id === openedDoorId) || activeDoor}
          onBack={handleBackToDoors}
          isZooming={isZooming}
        />
      ) : (
        <div className={`doors-viewport ${isZooming ? "is-zooming" : ""}`} ref={containerRef}>
          <div className="doors-header">
            <span className="mono doors-eyebrow">ONE DOOR PER DISCIPLINE • DISCOVERY</span>
            <h2 id="doors-heading" className="doors-title">Magic happens behind the doors</h2>
          </div>

          {/* Door Selector Tabs */}
          <div className="doors-tabs" role="tablist" aria-label="Select discipline door">
            {DOORS_DATA.map((door, idx) => (
              <button
                key={door.id}
                role="tab"
                aria-selected={activeDoorIndex === idx}
                className={`door-tab-btn ${activeDoorIndex === idx ? "is-active" : ""}`}
                onClick={() => setActiveDoorIndex(idx)}
              >
                <span className={`door-tab-indicator door-theme-${door.colorTheme}`} />
                <span>{door.discipline}</span>
              </button>
            ))}
          </div>

          <div className="doors-showcase-stage">
            {/* Left: Capability Checklist for Active Door */}
            <div className="door-checklist-card">
              <div className="checklist-header">
                <span className="discipline-tag mono">{activeDoor.discipline}</span>
                <p className="discipline-subtitle mono">{activeDoor.subtitle}</p>
              </div>

              <ul className="checklist-items">
                {activeDoor.checklist.map((item, i) => (
                  <li key={i} className="checklist-item">
                    <span className="check-bullet" aria-hidden="true">
                      <Check size={14} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="door-action-hint">
                <button
                  className="enter-door-btn"
                  onClick={() => handleOpenDoor(activeDoor)}
                >
                  Enter {activeDoor.discipline} Room →
                </button>
              </div>
            </div>

            {/* Right: The 3D Arched Door */}
            <div className="door-3d-wrapper">
              <div
                className={`architectural-door door-theme-${activeDoor.colorTheme} ${
                  openedDoorId === activeDoor.id ? "door-is-open" : ""
                }`}
                onClick={() => handleOpenDoor(activeDoor)}
                role="button"
                tabIndex={0}
                aria-label={`Open ${activeDoor.discipline} door`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenDoor(activeDoor);
                  }
                }}
              >
                {/* 3D Wall Frame & Arch Molding */}
                <div className="door-arch-frame" aria-hidden="true" />

                {/* Dark Room Interior (visible when door swings open) */}
                <div className="door-interior-portal" aria-hidden="true">
                  <div className="portal-glow" />
                  <span className="portal-text mono">ENTERING ROOM...</span>
                </div>

                {/* Hinged Swinging Door Leaf */}
                <div className="door-leaf-panel">
                  {/* Fluted Vertical Wood Grooves */}
                  <div className="door-fluting" aria-hidden="true">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span key={i} className="flute-line" />
                    ))}
                  </div>

                  {/* Golden Plaque Engraved with Discipline */}
                  <div className="door-brass-plaque">
                    <span className="plaque-screw plaque-screw-tl" />
                    <span className="plaque-screw plaque-screw-tr" />
                    <span className="plaque-text mono">{activeDoor.plaqueText}</span>
                    <span className="plaque-screw plaque-screw-bl" />
                    <span className="plaque-screw plaque-screw-br" />
                  </div>

                  {/* Brass Door Handle & Keyhole */}
                  <div className="door-brass-hardware">
                    <span className="door-keyhole-plate" />
                    <span className="door-lever-handle" />
                    <span className="door-keyhole" />
                  </div>

                  {/* Floating Pill: "Click to enter" */}
                  <div className="door-click-pill">
                    <span>Click to enter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * The Inside-Door Project Room
 * Reveals stacked project cards with 3D iMac / Studio Display mockups
 */
function DoorProjectRoom({
  door,
  onBack,
  isZooming,
}: {
  door: DisciplineDoor;
  onBack: () => void;
  isZooming: boolean;
}) {
  return (
    <div className={`inside-door-room ${isZooming ? "room-enter" : ""}`}>
      {/* Top persistent Back to Doors Navigation */}
      <div className="room-nav-bar">
        <button className="back-to-doors-btn" onClick={onBack} aria-label="Return to the doors">
          <ArrowLeft size={16} />
          <span>Back to the doors</span>
        </button>
        <span className="room-discipline-indicator mono">{door.discipline} Archive</span>
      </div>

      <div className="room-header">
        <span className="mono room-eyebrow">DISCIPLINE SHOWCASE • SELECTED WORK</span>
        <h2 className="room-title">{door.discipline}</h2>
        <p className="room-subtitle">{door.subtitle}</p>
      </div>

      {/* Stacked Project Showcase Cards */}
      <div className="room-projects-stack">
        {door.projects.map((proj, idx) => (
          <article className="room-project-card" key={idx}>
            <div className="project-info-column">
              <span className="proj-category mono">{proj.category}</span>
              <h3 className="proj-title">{proj.title}</h3>
              <p className="proj-desc">{proj.description}</p>

              {/* Tag Chips */}
              <div className="proj-tags">
                {proj.tags.map((tag) => (
                  <span key={tag} className="proj-tag mono">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="proj-actions">
                {proj.demoUrl && (
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="proj-btn proj-btn-primary"
                  >
                    <span>Visit live site</span>
                    <ArrowUpRight size={16} />
                  </a>
                )}
                {proj.repoUrl && (
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="proj-btn proj-btn-ghost"
                  >
                    <Github size={16} />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right: High-Fidelity Desktop Monitor / Device Mockup */}
            <div className="project-display-column">
              <div className="studio-display-mockup" aria-hidden="true">
                <div className="display-bezel">
                  <div className="display-camera" />
                  <div className="display-screen">
                    {proj.image ? (
                      <img src={proj.image} alt={proj.title} className="screen-image" />
                    ) : (
                      <div className="display-screen-placeholder">
                        <div className="screen-wireframe-header">
                          <span className="screen-dot screen-dot-red" />
                          <span className="screen-dot screen-dot-yellow" />
                          <span className="screen-dot screen-dot-green" />
                          <span className="screen-url-bar mono">https://{proj.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.dev</span>
                        </div>
                        <div className="screen-wireframe-body">
                          <Layers size={36} className="wireframe-icon" />
                          <h4 className="wireframe-title">{proj.title}</h4>
                          <span className="wireframe-sub mono">ACTIVE SYSTEM PREVIEW</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="screen-reflection" />
                </div>
                {/* Aluminum Desktop Stand */}
                <div className="display-stand-neck" />
                <div className="display-stand-base" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
