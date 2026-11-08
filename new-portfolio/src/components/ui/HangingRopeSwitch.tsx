import React, { useRef, useState, useEffect, useCallback } from "react";
import { useTheme } from "../../hooks/useTheme";

const RESTING_LENGTH = 180;
const MAX_PULL = 260;

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

    const initialOffset = length - RESTING_LENGTH;
    if (Math.abs(initialOffset) < 10) {
      // Direct click trigger
      toggleTheme();
    } else {
      toggleTheme();
    }

    const startTime = performance.now();
    const duration = 800; // ms
    const stiffness = 0.035;
    const damping = 0.88;

    let velocity = -initialOffset * stiffness * 15;
    let currentOffset = initialOffset;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      if (elapsed > duration || (Math.abs(currentOffset) < 0.2 && Math.abs(velocity) < 0.2)) {
        setLength(RESTING_LENGTH);
        setIsRebounding(false);
        return;
      }

      // Spring acceleration: F = -k * x - c * v
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
      // Add resistance as it stretches
      const stretch = Math.min(MAX_PULL, RESTING_LENGTH + deltaY * 0.7);
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

  // Click fallback for accessibility / keyboard
  const handleClick = (e: React.MouseEvent) => {
    if (isRebounding || isPulling) return;
    e.stopPropagation();
    // Simulate quick pull & release
    setLength(RESTING_LENGTH + 35);
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
        width="28"
        height={length + 40}
        viewBox={`0 0 28 ${length + 40}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic brass bead gradient */}
          <radialGradient id="brassBob" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="35%" stopColor="#DFB350" />
            <stop offset="70%" stopColor="#9C6B1B" />
            <stop offset="100%" stopColor="#4A3008" />
          </radialGradient>
          {/* Cord shadow */}
          <filter id="cordDropShadow" x="-30%" y="-10%" width="160%" height="130%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Top ceiling bracket mount */}
        <rect x="9" y="0" width="10" height="4" rx="2" fill="#7A6030" />
        <circle cx="14" cy="4" r="2.5" fill="#C59B3F" />

        {/* Beaded cord path */}
        <line
          x1="14"
          y1="5"
          x2="14"
          y2={length}
          stroke={theme === "dark" ? "#A88434" : "#7A602B"}
          strokeWidth="1.8"
          strokeDasharray="1.5 3"
          strokeLinecap="round"
          filter="url(#cordDropShadow)"
        />

        {/* Lower brass collar ring */}
        <rect
          x="10.5"
          y={length - 4}
          width="7"
          height="5"
          rx="1.5"
          fill="#D8AE48"
          stroke="#7A5618"
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
            d={`M 14 ${length} 
               C 9 ${length + 8}, 8 ${length + 18}, 10.5 ${length + 26}
               C 12 ${length + 30}, 16 ${length + 30}, 17.5 ${length + 26}
               C 20 ${length + 18}, 19 ${length + 8}, 14 ${length} Z`}
            fill="url(#brassBob)"
            stroke="#634410"
            strokeWidth="0.9"
            filter="url(#cordDropShadow)"
          />
          {/* Specular Highlight Streak */}
          <ellipse
            cx="12.5"
            cy={length + 14}
            rx="2"
            ry="7"
            fill="rgba(255, 255, 240, 0.65)"
            transform={`rotate(-12 12.5 ${length + 14})`}
          />
          {/* Bottom terminal bead */}
          <circle cx="14" cy={length + 28} r="2.5" fill="#8C5C15" />
        </g>
      </svg>
    </div>
  );
}
