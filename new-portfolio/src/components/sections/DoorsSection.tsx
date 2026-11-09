import { useState, useRef, useEffect } from "react";
import { Check, ArrowLeft, ArrowUpRight, Github, Layers } from "lucide-react";
import { playDoorOpen, playDoorClose } from "../../lib/soundEffects";

interface DisciplineDoor {
  id: string;
  discipline: string;
  colorTheme: "navy" | "violet" | "sage" | "terracotta";
  doorColor: string;
  doorTrim: string;
  doorWallShadow: string;
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
    doorColor: "#22334a",
    doorTrim: "#141f2e",
    doorWallShadow: "rgba(34, 51, 74, 0.4)",
    plaqueText: "WEB DEVELOPER",
    subtitle: "END TO END: FROM SKETCH TO LIVE SITE",
    checklist: [
      "Discovery & planning",
      "UX & visual design",
      "Front-end & back-end development",
      "Technical SEO & performance",
      "Analytics, launch & ongoing support",
    ],
    projects: [
      {
        title: "ZENITH — Real-Time Typing Speed Platform",
        category: "FULL-STACK WEB APPLICATION",
        description:
          "High-performance practice platform featuring speed and accuracy calculation, session analytics, custom test modes, and real-time multiplayer synchronization.",
        tags: ["JavaScript", "HTML5", "CSS3", "Node.js", "WebSockets", "Chart.js"],
        demoUrl: "https://typing-speed-trainer-xi.vercel.app",
        repoUrl: "https://github.com/ayankrmondal2003-rgb/Typing-Speed-Trainer",
        image: "/projects/zenith.webp",
      },
      {
        title: "SETU — Bihar Tourism Marketplace",
        category: "FULL-STACK WEB APPLICATION",
        description:
          "Dual-sided tourism marketplace offering localized discovery, vendor booking flows, secure Razorpay checkout, and Gemini-powered travel itineraries.",
        tags: ["React", "TypeScript", "Node.js", "Prisma", "Gemini", "Razorpay"],
        demoUrl: "https://github.com/ayankrmondal2003-rgb",
        repoUrl: "https://github.com/ayankrmondal2003-rgb",
      },
    ],
  },
  {
    id: "app-dev",
    discipline: "App Development",
    colorTheme: "violet",
    doorColor: "#3d2d4c",
    doorTrim: "#251b2e",
    doorWallShadow: "rgba(61, 45, 76, 0.4)",
    plaqueText: "APP DEVELOPER",
    subtitle: "AI-POWERED SYSTEMS & BACKEND PIPELINES",
    checklist: [
      "AI model architecture & pipelines",
      "Low-latency REST / inference APIs",
      "Dynamic prompt engineering & evaluation",
      "Containerization & Docker deployment",
      "Analytics, monitoring & performance",
    ],
    projects: [
      {
        title: "Enterprise AI Interviewer",
        category: "ADAPTIVE AI SCREENING • 48H BUILD",
        description:
          "Adaptive, AI-driven technical interviewer co-built during VICODATHON with Team Vector that dynamically evaluates candidates with real-time follow-up questioning.",
        tags: ["Python", "FastAPI", "Gemini", "Groq", "Docker"],
        demoUrl: "https://github.com/ayankrmondal2003-rgb",
        repoUrl: "https://github.com/ayankrmondal2003-rgb",
      },
      {
        title: "Meghdrishti — Satellite Cloud-Removal System",
        category: "COMPUTER VISION & GENAI • ISRO BAH 2026",
        description:
          "Generative adversarial network augmented with Swin Transformers to synthesize clear ground details beneath cloud-obscured optical satellite imagery.",
        tags: ["Python", "PyTorch", "Swin Transformer", "FastAPI", "Docker"],
        demoUrl: "https://github.com/ayankrmondal2003-rgb",
        repoUrl: "https://github.com/ayankrmondal2003-rgb",
      },
    ],
  },
  {
    id: "ui-ux",
    discipline: "UI/UX Design",
    colorTheme: "sage",
    doorColor: "#3e4f42",
    doorTrim: "#253328",
    doorWallShadow: "rgba(62, 79, 66, 0.4)",
    plaqueText: "UI/UX DESIGNER",
    subtitle: "SYSTEMATIC & HUMAN-CENTERED EXPERIENCES",
    checklist: [
      "User research & mental models",
      "Wireframing & design systems in Figma",
      "Interactive micro-interactions & prototyping",
      "Design token parity & accessibility audit",
      "Usability testing & developer handoff",
    ],
    projects: [
      {
        title: "SETU — Tourism Discovery & Vendor Experience",
        category: "MARKETPLACE UX & BOOKING FLOWS",
        description:
          "Comprehensive dual-sided experience connecting tourists with local guides and vendors with AI-assisted itinerary generation and seamless checkout.",
        tags: ["UX Research", "Figma", "Design Tokens", "Accessibility"],
        demoUrl: "https://github.com/ayankrmondal2003-rgb",
        repoUrl: "https://github.com/ayankrmondal2003-rgb",
      },
      {
        title: "CartGuard — Smart Checkout Assistant",
        category: "ACCESSIBLE WEB APPLICATION",
        description:
          "Intelligent shopping assistant detecting cart inconsistencies and deceptive pricing in real time with high accessibility and legibility standards.",
        tags: ["Accessibility", "Tailwind CSS", "Micro-Interactions", "Design System"],
        demoUrl: "https://github.com/ayankrmondal2003-rgb",
        repoUrl: "https://github.com/ayankrmondal2003-rgb",
      },
    ],
  },
  {
    id: "graphic-design",
    discipline: "Graphic Design",
    colorTheme: "terracotta",
    doorColor: "#a34827",
    doorTrim: "#612712",
    doorWallShadow: "rgba(163, 72, 39, 0.4)",
    plaqueText: "GRAPHIC DESIGNER",
    subtitle: "VISUAL CONTENT TRUE TO THE BRAND",
    checklist: [
      "Brand, audience & tone analysis",
      "Built around brand guidelines",
      "Pitch decks & presentation design",
      "Social & campaign assets",
      "Print, vector & digital outputs",
    ],
    projects: [
      {
        title: "Hackathon Visual Identity & Pitch Decks",
        category: "BRANDING & PRESENTATION DESIGN",
        description:
          "High-impact pitch presentations, architectural system diagrams, and identity decks developed for TEJAS India, ISRO BAH, and Vicodathon finales.",
        tags: ["Pitch Decks", "System Diagrams", "Brand Identity", "Typography"],
        demoUrl: "https://github.com/ayankrmondal2003-rgb",
        repoUrl: "https://github.com/ayankrmondal2003-rgb",
      },
      {
        title: "Team 4LOOPS Visual Identity",
        category: "COMMUNITY & TEAM BRANDING",
        description:
          "Brand marks, social media identity assets, and technical publication visual graphics designed for Team 4LOOPS.",
        tags: ["Vector Design", "Brand Guidelines", "Social Media", "Illustrator"],
        demoUrl: "https://github.com/ayankrmondal2003-rgb",
        repoUrl: "https://github.com/ayankrmondal2003-rgb",
      },
    ],
  },
];

export function DoorsSection() {
  // Only open when mouse cursor is on the door (null on page load)
  const [hoveredDoorIndex, setHoveredDoorIndex] = useState<number | null>(null);
  const [openedDoor, setOpenedDoor] = useState<DisciplineDoor | null>(null);
  const [animPhase, setAnimPhase] = useState<
    "idle" | "opening" | "zooming" | "inside" | "exiting" | "unzooming"
  >("idle");
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const [isHandleDepressed, setIsHandleDepressed] = useState(false);
  const [isDoorWideOpen, setIsDoorWideOpen] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const corridorTrackRef = useRef<HTMLDivElement>(null);
  const doorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  // Clear any pending timers on unmount
  useEffect(() => {
    return () => clearTimers();
  }, []);

  const handleOpenDoor = (door: DisciplineDoor, idx: number) => {
    if (animPhase !== "idle") return;
    clearTimers();

    // 1. Calculate zoom origin from the clicked door relative to the stage
    const doorEl = doorRefs.current[idx];
    const stageEl = stageRef.current;
    if (doorEl && stageEl) {
      const dRect = doorEl.getBoundingClientRect();
      const sRect = stageEl.getBoundingClientRect();
      const originX = ((dRect.left + dRect.width / 2 - sRect.left) / sRect.width) * 100;
      const originY = ((dRect.top + dRect.height * 0.45 - sRect.top) / sRect.height) * 100;
      setZoomOrigin(`${originX.toFixed(1)}% ${originY.toFixed(1)}%`);
    } else {
      const fallbackOrigins = ["18% 45%", "39% 45%", "61% 45%", "82% 45%"];
      setZoomOrigin(fallbackOrigins[idx] || "50% 45%");
    }

    setOpenedDoor(door);
    setAnimPhase("opening");
    setIsHandleDepressed(true);
    playDoorOpen();

    // 2. Door swings wide open in 3D along its hinges
    timersRef.current.push(
      window.setTimeout(() => {
        setIsDoorWideOpen(true);
      }, 80)
    );

    // 3. Camera zooms forward directly into the open doorway
    timersRef.current.push(
      window.setTimeout(() => {
        setAnimPhase("zooming");
      }, 180)
    );

    // 4. Blackout overlay as camera passes the door threshold
    timersRef.current.push(
      window.setTimeout(() => {
        setIsBlackout(true);
      }, 580)
    );

    // 5. Mount inside Project Showcase Room
    timersRef.current.push(
      window.setTimeout(() => {
        setAnimPhase("inside");
        setIsBlackout(false);
      }, 920)
    );
  };

  const handleBackToDoors = () => {
    if (animPhase !== "inside") return;
    clearTimers();

    // 1. Blackout overlay smoothly covers room to mask transition
    setIsBlackout(true);
    setAnimPhase("exiting");

    // 2. Once blackout covers screen (240ms), swap views seamlessly
    timersRef.current.push(
      window.setTimeout(() => {
        // Reset scroll position to doors section while black curtain is active
        const doorsEl = document.getElementById("doors");
        if (doorsEl) {
          try {
            doorsEl.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
          } catch {
            doorsEl.scrollIntoView(true);
          }
        }

        // Switch to unzooming phase: stage mounts at scale(1.10) with elegant pull-back
        setAnimPhase("unzooming");
        setIsDoorWideOpen(false);
        setIsHandleDepressed(false);
        playDoorClose();

        // 3. Fade out blackout overlay as hallway gently settles
        timersRef.current.push(
          window.setTimeout(() => {
            setIsBlackout(false);
          }, 60)
        );

        // 4. Return to idle corridor
        timersRef.current.push(
          window.setTimeout(() => {
            setAnimPhase("idle");
            setOpenedDoor(null);
            setHoveredDoorIndex(null);
          }, 650)
        );
      }, 240)
    );
  };

  const isZoomingStage = animPhase === "zooming";
  const isUnzoomingStage = animPhase === "unzooming";
  const hasActiveDoor = hoveredDoorIndex !== null;

  return (
    <div id="doors" className="doors-section" aria-labelledby="doors-heading">
      {/* Cinematic Blackout Overlay Transition */}
      <div
        className={`door-portal-blackout ${isBlackout ? "is-active" : ""}`}
        aria-hidden="true"
      />

      {/* If inside a door, render the Inside-Door Project Room */}
      {animPhase === "inside" && openedDoor && (
        <DoorProjectRoom
          door={openedDoor}
          onBack={handleBackToDoors}
          isZooming={false}
        />
      )}

      {/* The 4 Arched 3D Doors Hallway Viewport */}
      {animPhase !== "inside" && (
        <div
          ref={stageRef}
          className={`doors-stage-zoomable ${isZoomingStage ? "stage-is-zooming" : ""} ${
            isUnzoomingStage ? "stage-is-unzooming" : ""
          }`}
          style={{ transformOrigin: zoomOrigin }}
        >
          {/* Section Heading */}
          <div className="doors-header">
            <span className="mono doors-eyebrow">ONE DOOR PER DISCIPLINE • DISCOVERY</span>
            <h2 id="doors-heading" className="doors-title">Magic happens behind the doors</h2>
          </div>

          {/* DISCIPLINE PILLS SELECTOR TABS (4s-7s in video) */}
          <div className="doors-nav-pills" role="tablist" aria-label="Discipline doors">
            {DOORS_DATA.map((door, idx) => {
              const isPillActive = hoveredDoorIndex === idx;
              return (
                <button
                  key={door.id}
                  className={`door-nav-pill ${isPillActive ? "is-active" : ""}`}
                  onClick={() => {
                    if (animPhase === "idle") {
                      setHoveredDoorIndex((prev) => (prev === idx ? null : idx));
                    }
                  }}
                  role="tab"
                  aria-selected={isPillActive}
                >
                  <span>{door.discipline}</span>
                </button>
              );
            })}
          </div>

          {/* ALL FOUR DOORS SIDE BY SIDE - EXPLORE MENU OPENS ONLY ON MOUSE HOVER */}
          <div
            className={`doors-corridor-track ${hasActiveDoor ? "has-active-door" : "all-resting"}`}
            ref={corridorTrackRef}
            onMouseLeave={() => {
              if (animPhase === "idle") setHoveredDoorIndex(null);
            }}
            role="region"
            aria-label="Hallway of 4 discipline doors"
          >
            {DOORS_DATA.map((door, idx) => {
              const isSelected = hoveredDoorIndex === idx;
              const isInactive = hasActiveDoor && !isSelected;
              const isEnteringThis = openedDoor?.id === door.id;
              const isWideOpenThis = isEnteringThis && isDoorWideOpen;
              const isClosingThis = isEnteringThis && isUnzoomingStage;

              // For door 2 (UI/UX) and door 3 (Graphic Design), place checklist on left
              // For door 0 (Web Dev) and door 1 (App Dev), place checklist on right
              const checklistOnLeft = idx >= 2;

              return (
                <div
                  key={door.id}
                  className={`door-station ${
                    isSelected ? "is-selected" : isInactive ? "is-inactive" : "is-resting"
                  } ${isEnteringThis ? "door-entering" : ""} ${checklistOnLeft ? "layout-reversed" : ""}`}
                  onMouseEnter={() => {
                    if (animPhase === "idle") setHoveredDoorIndex(idx);
                  }}
                >
                  {/* The 3D Architectural Door Unit */}
                  <div
                    ref={(el) => {
                      doorRefs.current[idx] = el;
                    }}
                    className="door-unit-wrapper"
                    onClick={() => {
                      if (animPhase === "idle") {
                        if (isSelected) {
                          handleOpenDoor(door, idx);
                        } else {
                          setHoveredDoorIndex(idx);
                        }
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${door.discipline} door (${door.plaqueText}). ${
                      isSelected ? "Click to enter." : "Click to explore."
                    }`}
                    onKeyDown={(e) => {
                      if ((e.key === "Enter" || e.key === " ") && animPhase === "idle") {
                        e.preventDefault();
                        if (isSelected) {
                          handleOpenDoor(door, idx);
                        } else {
                          setHoveredDoorIndex(idx);
                        }
                      }
                    }}
                  >
                    <div
                      className={`architectural-door door-theme-${door.colorTheme} ${
                        isWideOpenThis ? "door-wide-open" : ""
                      } ${isClosingThis ? "door-is-closing" : ""} ${
                        isSelected ? "door-is-selected" : ""
                      }`}
                      style={{
                        "--theme-door": door.doorColor,
                        "--theme-trim": door.doorTrim,
                        "--theme-shadow": door.doorWallShadow,
                      } as React.CSSProperties}
                    >
                      {/* Arch Molding & Door Frame */}
                      <div className="door-arch-frame" aria-hidden="true" />

                      {/* Dark Interior Portal behind the door */}
                      <div className="door-interior-portal" aria-hidden="true">
                        <div className="portal-glow" />
                        <span className="portal-text mono">ENTER</span>
                      </div>

                      {/* Swinging Door Leaf */}
                      <div className="door-leaf-panel">
                        {/* Vertical Fluted Wood Grooves */}
                        <div className="door-fluting" aria-hidden="true">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <span key={i} className="flute-line" />
                          ))}
                        </div>

                        {/* Golden Plaque Engraved with Discipline */}
                        <div className="door-brass-plaque">
                          <span className="plaque-screw plaque-screw-tl" />
                          <span className="plaque-screw plaque-screw-tr" />
                          <span className="plaque-text mono">{door.plaqueText}</span>
                          <span className="plaque-screw plaque-screw-bl" />
                          <span className="plaque-screw plaque-screw-br" />
                        </div>

                        {/* Brass Hardware: Lever Handle & Keyhole */}
                        <div className="door-brass-hardware">
                          <span className="door-keyhole-plate" />
                          <span
                            className={`door-lever-handle ${
                              isHandleDepressed && isEnteringThis ? "is-depressed" : ""
                            }`}
                          />
                          <span className="door-keyhole" />
                        </div>

                        {/* "Click to enter" Tooltip Pill (visible ONLY when hovered/selected) */}
                        {isSelected && (
                          <div
                            className="door-click-pill"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDoor(door, idx);
                            }}
                          >
                            <span>Click to enter</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Door Name Label underneath */}
                    <span className="door-under-label mono">{door.discipline}</span>
                  </div>

                  {/* Active Capability Checklist (floats beside the active door) */}
                  {isSelected && (
                    <DoorChecklistCard
                      door={door}
                      onEnter={() => handleOpenDoor(door, idx)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Active Discipline Capability Checklist (rendered right beside the active door)
 */
function DoorChecklistCard({
  door,
  onEnter,
}: {
  door: DisciplineDoor;
  onEnter: () => void;
}) {
  return (
    <div className="door-inline-checklist" aria-live="polite">
      <div className="inline-checklist-header">
        <span className="mono inline-checklist-tag">{door.discipline}</span>
        <h3 className="inline-checklist-title">{door.discipline}</h3>
        <p className="mono inline-checklist-sub">{door.subtitle}</p>
      </div>

      <ul className="inline-checklist-items">
        {door.checklist.map((item, i) => (
          <li key={i} className="inline-checklist-item">
            <span className="checklist-bullet" aria-hidden="true">
              <Check size={13} />
            </span>
            <span className="checklist-text">{item}</span>
          </li>
        ))}
      </ul>

      <button className="inline-checklist-enter-btn" onClick={onEnter}>
        <span>Enter {door.discipline} Room</span>
        <span className="btn-arrow" aria-hidden="true">→</span>
      </button>
    </div>
  );
}

/**
 * Inside the Door: Project Showcase Room
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
      {/* Back to Doors Navigation */}
      <div className="room-nav-bar">
        <button className="back-to-doors-btn" onClick={onBack} aria-label="Return to the doors">
          <ArrowLeft size={16} />
          <span>Back to the doors</span>
        </button>
        <span className="room-discipline-indicator mono">{door.discipline}</span>
      </div>

      <div className="room-header">
        <span className="mono room-eyebrow">DISCIPLINE SHOWCASE • SELECTED WORK</span>
        <h2 className="room-title">{door.discipline}</h2>
        <p className="room-subtitle mono">{door.subtitle}</p>
      </div>

      {/* Stacked Project Cards */}
      <div className="room-projects-stack">
        {door.projects.map((proj, idx) => (
          <article className="room-project-card" key={idx}>
            <div className="project-info-column">
              <span className="proj-category mono">{proj.category}</span>
              <h3 className="proj-title">{proj.title}</h3>
              <p className="proj-desc">{proj.description}</p>

              {/* Tags */}
              <div className="proj-tags">
                {proj.tags.map((tag) => (
                  <span key={tag} className="proj-tag mono">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
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

            {/* Desktop Mockup */}
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
                          <span className="screen-url-bar mono">
                            https://{proj.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.dev
                          </span>
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
