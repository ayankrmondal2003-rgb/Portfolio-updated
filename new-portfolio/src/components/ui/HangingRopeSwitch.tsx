import React, { useRef, useState, useEffect, useCallback } from "react";
import { useTheme } from "../../hooks/useTheme";
import {
  playRopePull,
  playBeadTick,
  playLampPullFull,
  preloadLampAudio,
} from "../../lib/soundEffects";

const RESTING_LENGTH = 200;
const MAX_PULL = 280;

export function HangingRopeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const [length, setLength] = useState(RESTING_LENGTH);
  const [isPulling, setIsPulling] = useState(false);
  const [isRebounding, setIsRebounding] = useState(false);
  const startYRef = useRef(0);
  const lastBeadYRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  // Preload real YouTube sound effects on mount
  useEffect(() => {
    preloadLampAudio();
  }, []);

  // Elastic snap-back spring simulation
  const triggerSpring = useCallback(() => {
    setIsPulling(false);
    setIsRebounding(true);

    toggleTheme();

    const initialOffset = Math.max(0, length - RESTING_LENGTH);
    const startTime = performance.now();
    const duration = 650;
    const stiffness = 0.05;
    const damping = 0.82;

    let velocity = -initialOffset * stiffness * 10;
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

      // Ensure the rope never pushes upward past the resting length minus a subtle 5px rebound
      const clampedOffset = Math.max(-5, currentOffset);
      setLength(RESTING_LENGTH + clampedOffset);
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
    hasDraggedRef.current = false;
    startYRef.current = e.clientY;
    lastBeadYRef.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPulling) return;
    const deltaY = e.clientY - startYRef.current;
    if (deltaY > 2) {
      if (!hasDraggedRef.current) {
        hasDraggedRef.current = true;
        // Play real string pull friction as the rope is pulled down
        playRopePull();
      }
      const stretch = Math.min(MAX_PULL, RESTING_LENGTH + deltaY * 0.75);
      setLength(stretch);

      // Micro bead ticks as chain passes through
      if (Math.abs(e.clientY - lastBeadYRef.current) >= 8) {
        lastBeadYRef.current = e.clientY;
        playBeadTick();
      }
    } else {
      // Firmly keep handle anchored at RESTING_LENGTH if moved upward
      setLength(RESTING_LENGTH);
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
    // Play the full authentic pull-and-click sound from YouTube
    playLampPullFull();
    setLength(RESTING_LENGTH + 42);
    setTimeout(() => {
      triggerSpring();
    }, 110);
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

        {/* Ball Chain Beads */}
        {beads.map((y, idx) => (
          <circle
            key={idx}
            cx="18"
            cy={y}
            r="2.8"
            fill="url(#ballBeadGrad)"
            stroke="#54370C"
            strokeWidth="0.5"
          />
        ))}

        {/* Solid Brass Pull Handle / Acorn Tassel */}
        <g
          transform={`translate(18, ${length})`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="rope-handle-group"
          style={{ cursor: isPulling ? "grabbing" : "grab" }}
        >
          <g className="rope-handle-inner">
            {/* Tassel Coupling Collar */}
            <rect x="-4" y="0" width="8" height="4" rx="1.5" fill="#54370C" />

            {/* Main Solid Brass Teardrop Acorn */}
            <path
              d="M 0,2 
                 C 6,4 10,12 8,24 
                 C 7,30 4,36 0,38 
                 C -4,36 -7,30 -8,24 
                 C -10,12 -6,4 0,2 Z"
              fill="url(#brassBob)"
              stroke="#54370C"
              strokeWidth="0.75"
              filter="drop-shadow(0px 3px 6px rgba(0,0,0,0.45))"
            />

            {/* Decorative Ring Grooves */}
            <line x1="-6.5" y1="14" x2="6.5" y2="14" stroke="#FFF4B8" strokeWidth="0.8" opacity="0.6" />
            <line x1="-7" y1="18" x2="7" y2="18" stroke="#54370C" strokeWidth="0.8" opacity="0.7" />

            {/* Bottom Brass Bell Finial */}
            <circle cx="0" cy="38" r="2.5" fill="#E5BE5E" stroke="#54370C" strokeWidth="0.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
