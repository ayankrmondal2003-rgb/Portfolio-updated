import { useState, useEffect, useRef } from "react";
import { Calendar as CalendarIcon, Sparkles } from "lucide-react";
import { CertificateGallery } from "./CertificateGallery";

interface Milestone {
  id: string;
  year: string;
  month: string;
  dateRange: string;
  calendarHighlightDays: number[];
  calendarProjectBadge: string;
  startDayOffset: number; // 0 = Mon, 1 = Tue, etc.
  totalDays: number;
  role: string;
  organization: string;
  location: string;
  points: string[];
}

const MILESTONES: Milestone[] = [
  {
    id: "m-2026-now",
    year: "2026",
    month: "OCTOBER",
    dateRange: "2026 - PRESENT",
    calendarHighlightDays: [12, 13, 14, 15, 16, 24, 25, 26, 27, 28],
    calendarProjectBadge: "ZENITH & Full-Stack Systems",
    startDayOffset: 3,
    totalDays: 31,
    role: "AI / ML Developer & Full-Stack Builder",
    organization: "Independent & Open Source",
    location: "Worldwide • Remote",
    points: [
      "Building practical software, reactive web apps, and exploring AI-driven architectures.",
      "Engineering typing analytics engines, WebSockets, and low-latency client state synchronization.",
      "Active contributor to open-source software and creative developer ecosystems.",
    ],
  },
  {
    id: "m-2026-hack",
    year: "2026",
    month: "JULY",
    dateRange: "2026 HACKATHONS",
    calendarHighlightDays: [9, 10, 11, 12, 20, 21, 22],
    calendarProjectBadge: "TEJAS, ISRO BAH & VICODATHON",
    startDayOffset: 3,
    totalDays: 31,
    role: "National Hackathon Finalist & Sprint Lead",
    organization: "TEJAS INDIA • ISRO · Hack2skill • VICODATHON",
    location: "National Competitions",
    points: [
      "TEJAS INDIA 2026: Selected for the 24-hour offline finale in the Bihar Tourism track with SETU.",
      "ISRO BAH 2026: Built Meghdrishti, a GenAI Swin Transformer satellite cloud-removal system with Team TRINOVA.",
      "VICODATHON 2026: Co-built the adaptive AI technical interviewer in 48 hours with Team Vector using FastAPI and Groq.",
    ],
  },
  {
    id: "m-2025-hackarena",
    year: "2025",
    month: "NOVEMBER",
    dateRange: "2025 HACKARENA",
    calendarHighlightDays: [7, 8, 9, 15, 16],
    calendarProjectBadge: "Parkinson's Disease Prediction",
    startDayOffset: 5,
    totalDays: 30,
    role: "Healthcare Machine Learning Engineer",
    organization: "HackArena • Haldia Institute of Technology",
    location: "Haldia, West Bengal, India",
    points: [
      "Engineered predictive diagnostic models analyzing vocal feature dysphonia metrics.",
      "Trained and evaluated SVM, Random Forest, and neural classifier baselines.",
      "Presented working diagnostic prototype during the HackArena competition.",
    ],
  },
  {
    id: "m-2025-edu",
    year: "2025",
    month: "AUGUST",
    dateRange: "2025 - 2029",
    calendarHighlightDays: [5, 6, 7, 8, 18, 19, 20, 21],
    calendarProjectBadge: "B.Tech CSE (AI & ML) at HIT",
    startDayOffset: 4,
    totalDays: 31,
    role: "B.Tech, Computer Science & Engineering (AI & ML)",
    organization: "Haldia Institute of Technology",
    location: "West Bengal, India",
    points: [
      "Undergraduate engineering in Artificial Intelligence and Machine Learning.",
      "Rigorous foundations in Data Structures, Neural Networks, Computer Vision, and Operating Systems.",
      "Collaborative building and hackathon participation with Team 4LOOPS.",
    ],
  },
];

export function AchievementsTimeMachine() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll spy: automatically activates milestones, updates the year and calendar month on scroll
  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.42;
      let closestIdx = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height * 0.3;
        const dist = Math.abs(elementCenter - triggerY);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = index;
        }
      });

      setActiveIndex((prev) => (prev !== closestIdx ? closestIdx : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const active = MILESTONES[activeIndex] || MILESTONES[0];
  const progressPercent = ((activeIndex + 1) / MILESTONES.length) * 100;

  const scrollToMilestone = (idx: number) => {
    setActiveIndex(idx);
    const target = itemRefs.current[idx];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="achievements" className="timemachine-section" aria-labelledby="timemachine-title">
      <div className="timemachine-layout">
        {/* Left Column: Sticky 3D Year & Integrated Project Calendar */}
        <div className="timemachine-left-column">
          <div className="timemachine-sticky-wrap">
            <div className="timemachine-header">
              <span className="mono timemachine-eyebrow">• My story</span>
              <h2 id="timemachine-title" className="timemachine-title">Let's go back in time.</h2>
            </div>

            <div className="year-calendar-stage">
              {/* Massive 3D Extruded Year Digits */}
              <div className="extruded-year-container">
                <div className="year-3d-digit-single" key={active.year}>
                  {active.year}
                </div>
              </div>

              {/* TACTILE PROJECT CALENDAR CARD (Replaces background clock) */}
              <div className="timeline-calendar-widget" key={active.id}>
                {/* Perforated paper top with brass hanging pin */}
                <div className="calendar-perforated-top" aria-hidden="true">
                  <span className="calendar-brass-pin" />
                  <span className="tear-edge" />
                </div>

                <div className="calendar-inner-card">
                  {/* Calendar Month & Year Bar */}
                  <div className="calendar-header-bar">
                    <div className="calendar-month-title">
                      <CalendarIcon size={14} className="calendar-icon" />
                      <span className="mono month-name">{active.month} {active.year}</span>
                    </div>
                    <span className="calendar-milestone-index mono">0{activeIndex + 1} / 0{MILESTONES.length}</span>
                  </div>

                  {/* Weekday Row */}
                  <div className="calendar-weekdays-row mono" aria-hidden="true">
                    <span>M</span>
                    <span>T</span>
                    <span>W</span>
                    <span>T</span>
                    <span>F</span>
                    <span>S</span>
                    <span>S</span>
                  </div>

                  {/* Days Matrix */}
                  <div className="calendar-days-grid mono">
                    {/* Empty offset padding days */}
                    {Array.from({ length: active.startDayOffset }).map((_, i) => (
                      <span key={`empty-${i}`} className="calendar-day-empty" aria-hidden="true" />
                    ))}

                    {/* Actual day numbers */}
                    {Array.from({ length: active.totalDays }).map((_, i) => {
                      const dayNum = i + 1;
                      const isHighlighted = active.calendarHighlightDays.includes(dayNum);
                      return (
                        <span
                          key={dayNum}
                          className={`calendar-day-cell ${isHighlighted ? "is-highlighted-day" : ""}`}
                          title={isHighlighted ? `Active project milestone: ${active.calendarProjectBadge}` : undefined}
                        >
                          {dayNum}
                        </span>
                      );
                    })}
                  </div>

                  {/* Project Sprint Tag along the calendar */}
                  <div className="calendar-project-footer">
                    <Sparkles size={13} className="text-amber-400" />
                    <span className="mono calendar-project-text">{active.calendarProjectBadge}</span>
                  </div>
                </div>
              </div>

              {/* Date Span Pill & Progress Scrubber Bar */}
              <div className="timemachine-controls">
                <span className="date-span-pill mono">{active.dateRange}</span>

                <div className="timemachine-scrubber">
                  <span className="counter-text mono">
                    0{activeIndex + 1} / 0{MILESTONES.length}
                  </span>
                  <div className="scrubber-track">
                    <div
                      className="scrubber-fill"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Vertical Milestones (Tracks Scroll) */}
        <div className="timemachine-right-column">
          <div className="vertical-timeline-track" role="list">
            {MILESTONES.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <article
                  key={item.id}
                  ref={(el) => { itemRefs.current[idx] = el; }}
                  className={`timeline-milestone-node ${isActive ? "is-active" : "is-inactive"}`}
                  onClick={() => scrollToMilestone(idx)}
                  role="listitem"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      scrollToMilestone(idx);
                    }
                  }}
                  aria-label={`${item.year}: ${item.role} at ${item.organization}`}
                >
                  {/* Glowing Node Marker */}
                  <div className="node-marker">
                    <span className={`marker-dot ${isActive ? "is-illuminated" : ""}`} />
                    {idx < MILESTONES.length - 1 && <span className="marker-line" />}
                  </div>

                  {/* Milestone Content */}
                  <div className="node-content">
                    <span className="milestone-date mono">{item.dateRange}</span>
                    <h3 className="milestone-role">{item.role}</h3>
                    <p className="milestone-org mono">
                      {item.organization} • {item.location}
                    </p>

                    <ul className="milestone-points">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Retained Certificates Gallery below the timeline */}
      <div className="timemachine-certificates">
        <CertificateGallery />
      </div>
    </section>
  );
}
