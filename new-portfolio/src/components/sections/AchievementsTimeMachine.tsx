import { useState } from "react";
import { CertificateGallery } from "./CertificateGallery";

interface Milestone {
  id: string;
  year: string;
  dateRange: string;
  role: string;
  organization: string;
  location: string;
  points: string[];
}

const MILESTONES: Milestone[] = [
  {
    id: "m-2026-now",
    year: "2026",
    dateRange: "OCT 2026 - NOW",
    role: "Independent Freelancer & Creative Developer",
    organization: "Working for myself, remote-first",
    location: "Worldwide • Remote",
    points: [
      "Websites, full-stack applications, and interactive brand tools, carried from first sketch to launch.",
      "Working directly with international teams and product founders, wherever they are.",
      "Exploring cutting-edge 3D web interfaces, WebSockets, and AI-assisted workflows.",
    ],
  },
  {
    id: "m-2026-hack",
    year: "2026",
    dateRange: "JAN 2026 - JUN 2026",
    role: "AI & Full-Stack Engineer / Hackathon Lead",
    organization: "InnovateX & Tech Competitions",
    location: "National & Hybrid",
    points: [
      "Built production-ready prototypes across health-tech, agriculture, and workflow automation.",
      "Engineered low-latency computer vision pipelines using PyTorch and FastAPI.",
      "Led multidisciplinary sprint teams to deliver working MVPs under tight deadlines.",
    ],
  },
  {
    id: "m-2025-intern",
    year: "2025",
    dateRange: "JUL 2025 - DEC 2025",
    role: "Software Engineering Intern",
    organization: "Tech & Systems Collaborative",
    location: "Kolkata, India • Hybrid",
    points: [
      "Designed and deployed responsive web interfaces with modern React and Tailwind CSS.",
      "Integrated RESTful APIs, optimized database queries, and improved Core Web Vitals.",
      "Collaborated with senior engineers on design systems, code reviews, and test suites.",
    ],
  },
  {
    id: "m-2025-edu",
    year: "2025",
    dateRange: "JUL 2022 - MAY 2026",
    role: "B.Tech, Computer Science & Engineering",
    organization: "Haldia Institute of Technology",
    location: "West Bengal, India",
    points: [
      "Four years of core computer science: where it all started, with code in the classroom and design on the side.",
      "Deep study in Data Structures, Algorithms, Neural Networks, Operating Systems, and Distributed Computing.",
      "Active contributor to open-source initiatives and university technical societies.",
    ],
  },
];

export function AchievementsTimeMachine() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = MILESTONES[activeIndex];
  const progressPercent = ((activeIndex + 1) / MILESTONES.length) * 100;

  // Auto-rotation of the radial ticks dial
  const dialRotation = activeIndex * 90;

  return (
    <section id="achievements" className="timemachine-section" aria-labelledby="timemachine-title">
      <div className="timemachine-layout">
        {/* Left Column: 3D Year Display & Rotating Clock Dial */}
        <div className="timemachine-left-column">
          <div className="timemachine-header">
            <span className="mono timemachine-eyebrow">• My story</span>
            <h2 id="timemachine-title" className="timemachine-title">Let's go back in time.</h2>
          </div>

          <div className="year-odometer-stage">
            {/* Rotating Radial Dial with Compass Ticks */}
            <div
              className="radial-compass-dial"
              style={{ transform: `rotate(${dialRotation}deg)` }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 300 300" className="radial-svg">
                <circle cx="150" cy="150" r="140" stroke="rgba(216, 196, 148, 0.15)" strokeWidth="1" fill="none" />
                <circle cx="150" cy="150" r="120" stroke="rgba(216, 196, 148, 0.08)" strokeWidth="1" strokeDasharray="4 8" fill="none" />
                {Array.from({ length: 36 }).map((_, i) => {
                  const angle = (i * 360) / 360 * 10;
                  const isMajor = i % 3 === 0;
                  return (
                    <line
                      key={i}
                      x1="150"
                      y1={isMajor ? "15" : "22"}
                      x2="150"
                      y2="30"
                      stroke={isMajor ? "rgba(216, 196, 148, 0.45)" : "rgba(216, 196, 148, 0.2)"}
                      strokeWidth={isMajor ? "2" : "1"}
                      transform={`rotate(${angle} 150 150)`}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Giant 3D Extruded Beveled Year Digits */}
            <div className="extruded-year-container">
              <div className="year-3d-digits" key={active.year}>
                <span className="year-digit-shadow">{active.year}</span>
                <span className="year-digit-main">{active.year}</span>
              </div>
            </div>

            {/* Date Span Pill & Monospace Scrubber Bar */}
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

        {/* Right Column: Interactive Vertical Glowing Milestones */}
        <div className="timemachine-right-column">
          <div className="vertical-timeline-track" role="list">
            {MILESTONES.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <article
                  key={item.id}
                  className={`timeline-milestone-node ${isActive ? "is-active" : "is-inactive"}`}
                  onClick={() => setActiveIndex(idx)}
                  role="listitem"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveIndex(idx);
                    }
                  }}
                  aria-label={`${item.year}: ${item.role} at ${item.organization}`}
                >
                  {/* Glowing Node Dot */}
                  <div className="node-marker">
                    <span className={`marker-dot ${isActive ? "is-illuminated" : ""}`} />
                    {idx < MILESTONES.length - 1 && <span className="marker-line" />}
                  </div>

                  {/* Milestone Card Content */}
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
