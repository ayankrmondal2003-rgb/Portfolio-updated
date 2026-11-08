import { useState, useEffect, useCallback } from "react";
import { playPageFlip } from "../../lib/soundEffects";

const ROLES = [
  { title: "App Developer", category: "MOBILE & CROSS-PLATFORM" },
  { title: "Web Developer", category: "FRONTEND & FULL-STACK" },
  { title: "AI & ML Engineer", category: "INTELLIGENT SYSTEMS" },
  { title: "UI/UX Designer", category: "CREATIVE & INTERACTION" },
  { title: "Software Architect", category: "SYSTEMS & SCALABILITY" },
];

export function SpiralFlipNotebook() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const flipNext = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);
    playPageFlip();

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % ROLES.length);
      setIsFlipping(false);
    }, 450);
  }, [isFlipping]);

  useEffect(() => {
    const timer = setInterval(() => {
      flipNext();
    }, 3800);
    return () => clearInterval(timer);
  }, [flipNext]);

  const activeRole = ROLES[currentIndex];
  const pageNumber = `0${currentIndex + 1} / 0${ROLES.length}`;

  return (
    <div
      className="spiral-notebook-widget"
      onClick={flipNext}
      role="button"
      tabIndex={0}
      aria-label={`Current discipline: ${activeRole.title}. Click to flip to next.`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          flipNext();
        }
      }}
      title="Click to flip page"
    >
      {/* 3D Wire-O Binder Rings along top */}
      <div className="notebook-ring-header" aria-hidden="true">
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className="notebook-ring-coil">
            <span className="coil-hole coil-hole-top" />
            <span className="coil-metal" />
            <span className="coil-hole coil-hole-bottom" />
          </div>
        ))}
      </div>

      {/* Layered paper stack underneath for depth */}
      <div className="notebook-page-stack" aria-hidden="true">
        <div className="stack-layer layer-3" />
        <div className="stack-layer layer-2" />
        <div className="stack-layer layer-1" />
      </div>

      {/* Main Flipping Card Surface */}
      <div className={`notebook-card-surface ${isFlipping ? "is-flipping" : ""}`}>
        <div className="card-content">
          <span className="role-sublabel mono">{activeRole.category}</span>
          <h2 className="role-headline">{activeRole.title}</h2>
          <span className="page-counter mono">{pageNumber}</span>
        </div>
      </div>
    </div>
  );
}

