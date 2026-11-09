import React, { useRef, useState, useEffect, useCallback } from "react";
import { useTheme } from "../../hooks/useTheme";

const RESTING_LENGTH = 200;
const MAX_PULL = 280;

export function HangingRopeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const [length, setLength] = useState(RESTING_LENGTH);
  const [isPulling, setIsPulling] = useState(false);
  const [isRebounding, setIsRebounding] = useState(false);
  const startYRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Elastic snap-back spring simulation
  const triggerSpring = useCallback(() => {
    setIsPulling(false);
    setIsRebounding(true);

    toggleTheme();

    const initialOffset = length - RESTING_LENGTH;
    const startTime = performance.now();
    const duration = 850;
    const stiffness = 0.04;
    const damping = 0.86;

    let velocity = -initialOffset * stiffness * 14;
    let currentOffset = initialOffset;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      if (elapsed > duration || (Math.abs(currentOffset) < 0.2 && Math.abs(velocity) < 0.2)) {
        setLength(RESTING_LENGTH);
        setIsRebounding(false);
        return;
      }

      const acceleration = -stiffness * currentOffset;
      velocity = (velocity + acceleration) * damping;
      currentOffset += velocity;

      setLength(RESTING_LENGTH + currentOffset);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [length, toggleTheme]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsPulling(true);
    setIsRebounding(false);
    startYRef.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPulling) return;
    const deltaY = e.clientY - startYRef.current;
    if (deltaY > 0) {
      const stretch = Math.min(MAX_PULL, RESTING_LENGTH + deltaY * 0.75);
      setLength(stretch);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPulling) return;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
    triggerSpring();
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isRebounding || isPulling) return;
    e.stopPropagation();
    setLength(RESTING_LENGTH + 40);
    setTimeout(() => {
      triggerSpring();
    }, 60);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e as unknown as React.MouseEvent);
    }
  };

  // Generate bead coordinates along the chain length
  const beadSpacing = 7;
  const beadCount = Math.floor((length - 12) / beadSpacing);
  const beads = Array.from({ length: beadCount }, (_, i) => 8 + i * beadSpacing);

  return (
    <div
      className={`hanging-rope-container ${isRebounding ? "is-rebounding" : ""} ${isPulling ? "is-pulling" : ""}`}
      aria-label={`Toggle theme (currently ${theme} mode)`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={`Pull cord to switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <svg
        className="hanging-rope-svg"
        width="36"
        height={length + 50}
        viewBox={`0 0 36 ${length + 50}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic brass bead gradient */}
          <radialGradient id="brassBob" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFF4B8" />
            <stop offset="30%" stopColor="#E5BE5E" />
            <stop offset="70%" stopColor="#A87524" />
            <stop offset="100%" stopColor="#54370C" />
          </radialGradient>

          {/* Individual ball chain bead gradient */}
          <radialGradient id="ballBeadGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFF9D6" />
            <stop offset="45%" stopColor="#D4A745" />
            <stop offset="100%" stopColor="#6E4812" />
          </radialGradient>
        </defs>

        {/* Top ceiling bracket mount */}
        <rect x="12" y="0" width="12" height="4" rx="2" fill="#54370C" />
        <circle cx="18" cy="4" r="3" fill="#D4A745" />

        {/* Central Core Cord Backbone */}
        <line
          x1="18"
          y1="4"
          x2="18"
          y2={length}
          stroke={theme === "dark" ? "#8A6220" : "#5A3E12"}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* The Ball Chain Beads along the middle */}
        {beads.map((beadY, idx) => (
          <circle
            key={idx}
            cx="18"
            cy={beadY}
            r="2.6"
            fill="url(#ballBeadGrad)"
            stroke="#4A3008"
            strokeWidth="0.6"
          />
        ))}

        {/* Lower brass collar ring (ferrule connector) */}
        <rect
          x="13.5"
          y={length - 6}
          width="9"
          height="7"
          rx="2"
          fill="url(#brassBob)"
          stroke="#54370C"
          strokeWidth="0.8"
        />

        {/* 3D Brass/Turned Wood Teardrop Handle */}
        <g
          className="rope-handle-group"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ cursor: isPulling ? "grabbing" : "grab" }}
        >
          {/* Main Teardrop Capsule */}
          <path
            d={`M 18 ${length} 
               C 11 ${length + 9}, 10 ${length + 20}, 13.5 ${length + 29}
               C 15.5 ${length + 33}, 20.5 ${length + 33}, 22.5 ${length + 29}
               C 26 ${length + 20}, 25 ${length + 9}, 18 ${length} Z`}
            fill="url(#brassBob)"
            stroke="#4A3008"
            strokeWidth="1.2"
          />

          {/* Specular Highlight Reflection on handle */}
          <ellipse
            cx="15.8"
            cy={length + 15}
            rx="2.2"
            ry="8.5"
            fill="rgba(255, 255, 240, 0.7)"
            transform={`rotate(-14 15.8 ${length + 15})`}
          />

          {/* Bottom terminal bead ring */}
          <circle cx="18" cy={length + 31} r="2.8" fill="#54370C" />
          <circle cx="18" cy={length + 31} r="1.8" fill="#D4A745" />
        </g>
      </svg>
    </div>
  );
}
