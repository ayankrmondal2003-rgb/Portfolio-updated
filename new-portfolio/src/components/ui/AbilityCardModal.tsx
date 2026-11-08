import { useEffect, useRef } from "react";
import { X, Sparkles, Code2, Layers, Cpu, Globe, CheckCircle2 } from "lucide-react";

interface AbilityCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AbilityCardModal({ isOpen, onClose }: AbilityCardModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="ability-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ability-card-title"
    >
      <div
        className="ability-card-dialog"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="ability-close-btn"
          onClick={onClose}
          aria-label="Close ability card"
        >
          <X size={18} />
        </button>

        <div className="ability-card-header">
          <div className="ability-avatar-wrap">
            <span className="ability-level-badge mono">LVL 2026</span>
            <Sparkles className="ability-sparkle-icon" size={20} />
          </div>
          <div>
            <span className="mono ability-tag">CREATIVE TECHNOLOGIST & ENGINEER</span>
            <h3 id="ability-card-title" className="ability-name">Ayan Kumar Mondal</h3>
            <p className="ability-institution mono">Haldia Institute of Technology • Computer Science</p>
          </div>
        </div>

        <div className="ability-stats-grid">
          <div className="stat-box">
            <div className="stat-title-row">
              <Code2 size={16} />
              <span>Full-Stack Engineering</span>
            </div>
            <div className="stat-bar-track">
              <div className="stat-bar-fill" style={{ width: "95%" }} />
            </div>
            <p className="stat-tags mono">React 19 • TypeScript • Python • Next.js • Tailwind</p>
          </div>

          <div className="stat-box">
            <div className="stat-title-row">
              <Cpu size={16} />
              <span>AI & Machine Learning</span>
            </div>
            <div className="stat-bar-track">
              <div className="stat-bar-fill" style={{ width: "90%" }} />
            </div>
            <p className="stat-tags mono">PyTorch • Neural Networks • Computer Vision • LLMs</p>
          </div>

          <div className="stat-box">
            <div className="stat-title-row">
              <Layers size={16} />
              <span>3D & Creative Interaction</span>
            </div>
            <div className="stat-bar-track">
              <div className="stat-bar-fill" style={{ width: "88%" }} />
            </div>
            <p className="stat-tags mono">Three.js • GSAP • CSS 3D • Framer • Canvas</p>
          </div>

          <div className="stat-box">
            <div className="stat-title-row">
              <Globe size={16} />
              <span>Availability & Mode</span>
            </div>
            <div className="stat-status-badge">
              <CheckCircle2 size={15} className="text-emerald-500" />
              <span>Remote-First • Open to Worldwide Contracts</span>
            </div>
          </div>
        </div>

        <div className="ability-card-footer">
          <a href="#contact" className="ability-cta-btn" onClick={onClose}>
            Start a project together →
          </a>
        </div>
      </div>
    </div>
  );
}

export function AbilityCardBadge({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="ability-card-badge"
      onClick={onClick}
      aria-label="Open My Ability Card"
      title="View developer attributes and capabilities"
    >
      <span className="ability-pulse-dot" aria-hidden="true" />
      <span className="ability-badge-text">My ability card</span>
      <span className="ability-badge-shine" aria-hidden="true" />
    </button>
  );
}
