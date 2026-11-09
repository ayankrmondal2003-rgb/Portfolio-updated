import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ArrowUpRight, Github, RefreshCw, ExternalLink } from "lucide-react";
import fallbackJson from "../../data/github-contributions-fallback.json";

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface ContributionsData {
  total: {
    lastYear?: number;
    [key: string]: number | undefined;
  };
  contributions: ContributionDay[];
}

interface GithubContributionsProps {
  username?: string;
}

const CELL_SIZE = 10;
const CELL_GAP = 3;
const CELL_STEP = CELL_SIZE + CELL_GAP;
const CELL_RADIUS = 2;
const OFFSET_X = 28;
const OFFSET_Y = 22;

export function GithubContributions({ username = "ayankrmondal2003-rgb" }: GithubContributionsProps) {
  const [data, setData] = useState<ContributionsData>(fallbackJson as ContributionsData);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>("Live");
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
    level: number;
    x: number;
    y: number;
  } | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const CACHE_KEY = `gh_contribs_v2_${username}`;

  // Fetch contributions from live API
  const syncLiveContributions = useCallback(async (manual = false) => {
    if (manual) setIsSyncing(true);
    try {
      const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json: ContributionsData = await res.json();
      if (json && Array.isArray(json.contributions) && json.contributions.length > 0) {
        setData(json);
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setLastSyncTime(`Synced at ${timeStr}`);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: json, timestamp: Date.now() }));
        } catch {
          // ignore quota issues
        }
      }
    } catch (err) {
      console.warn("Failed to fetch live GitHub contributions:", err);
      setLastSyncTime("Offline cache");
    } finally {
      if (manual) {
        setTimeout(() => setIsSyncing(false), 500);
      }
    }
  }, [username, CACHE_KEY]);

  // Initial load from cache or live fetch
  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.data?.contributions?.length) {
          setData(parsed.data);
        }
      }
    } catch {
      // ignore
    }

    // Immediate background fetch
    syncLiveContributions(false);

    // Auto-update every 5 minutes
    const interval = setInterval(() => {
      syncLiveContributions(false);
    }, 5 * 60 * 1000);

    // Re-sync on window focus or visibility change
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        syncLiveContributions(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", () => syncLiveContributions(false));

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", () => syncLiveContributions(false));
    };
  }, [syncLiveContributions, CACHE_KEY]);

  // Scroll to the latest weeks on smaller screens on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [data]);

  // Group contributions into 53 columns (weeks), each with 7 days (Sun-Sat)
  const { weeks, monthLabels, totalContributions } = useMemo(() => {
    const list = data?.contributions || [];
    if (!list.length) {
      return { weeks: [], monthLabels: [], totalContributions: 0 };
    }

    const firstParts = list[0].date.split("-").map(Number);
    const firstDate = new Date(firstParts[0], firstParts[1] - 1, firstParts[2]);
    const firstDayOfWeek = firstDate.getDay(); // 0 is Sunday

    const calculatedWeeks: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];

    // Pad days before start
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    let calculatedTotal = 0;

    list.forEach((item) => {
      currentWeek.push(item);
      calculatedTotal += item.count;
      if (currentWeek.length === 7) {
        calculatedWeeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      calculatedWeeks.push(currentWeek);
    }

    // Determine month labels
    const labels: { weekIndex: number; label: string }[] = [];
    let prevMonth = -1;

    calculatedWeeks.forEach((week, wIdx) => {
      const firstValid = week.find((d) => d !== null);
      if (!firstValid) return;
      const parts = firstValid.date.split("-").map(Number);
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      const month = d.getMonth();

      if (month !== prevMonth) {
        const monthName = d.toLocaleString("en-US", { month: "short" });
        labels.push({ weekIndex: wIdx, label: monthName });
        prevMonth = month;
      }
    });

    const displayTotal = data.total?.lastYear ?? calculatedTotal;

    return {
      weeks: calculatedWeeks,
      monthLabels: labels,
      totalContributions: displayTotal,
    };
  }, [data]);

  const svgWidth = OFFSET_X + weeks.length * CELL_STEP;
  const svgHeight = OFFSET_Y + 7 * CELL_STEP;

  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split("-").map(Number);
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="github-showcase-section" aria-label="GitHub Contributions and Open Source Activity">
      <div className="github-showcase-grid">
        {/* Left Column: Open Source Narrative & Profile Card */}
        <div className="github-overview-card">
          <div className="github-overview-top">
            <div className="github-status-chip">
              <span className="github-live-pulse" aria-hidden="true" />
              <span className="mono">ACTIVE ON GITHUB</span>
            </div>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="github-user-badge"
              title="Open GitHub profile"
            >
              <Github size={18} className="github-icon" />
              <div className="github-user-info">
                <span className="github-user-name">Ayan Kumar Mondal</span>
                <span className="github-user-handle mono">@{username}</span>
              </div>
              <ArrowUpRight size={14} className="github-arrow-icon" />
            </a>
          </div>

          <div className="github-overview-body">
            <p className="eyebrow">BUILDING IN THE OPEN</p>
            <h3 className="github-overview-title">Follow the source.</h3>
            <p className="github-overview-copy">
              Explore public codebases, AI pipelines, system architectures, and verified commits.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="github-metrics-grid">
            <div className="metric-box">
              <span className="metric-val">{totalContributions}</span>
              <span className="metric-lbl mono">Contributions</span>
            </div>
            <div className="metric-box">
              <span className="metric-val">20+</span>
              <span className="metric-lbl mono">Repositories</span>
            </div>
            <div className="metric-box">
              <span className="metric-val">4</span>
              <span className="metric-lbl mono">Hackathons</span>
            </div>
          </div>

          <div className="github-overview-actions">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="github-main-btn"
            >
              <Github size={14} />
              <span>Explore GitHub</span>
              <ArrowUpRight size={13} />
            </a>
            <button
              type="button"
              className={`github-sync-mini-btn ${isSyncing ? "is-syncing" : ""}`}
              onClick={() => syncLiveContributions(true)}
              title="Refresh live contribution data"
              aria-label="Refresh live contribution data"
            >
              <RefreshCw size={12} className={isSyncing ? "spin-icon" : ""} />
              <span>{isSyncing ? "Syncing..." : "Sync"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Snug, Live Contribution Calendar Card */}
        <div className="github-contributions-card">
          {/* Card Header */}
          <div className="github-card-header">
            <div className="github-header-left">
              <div className="github-eyebrow-row">
                <span className="github-live-pulse" aria-hidden="true" />
                <span className="mono github-eyebrow">CONTRIBUTION CALENDAR</span>
                <span className="mono github-sync-tag">{lastSyncTime}</span>
              </div>
              <h3 className="github-card-title">
                <span className="github-count-highlight">{totalContributions}</span> contributions in the last year
              </h3>
              <p className="github-card-subtitle mono">
                Automatically synced with GitHub activity
              </p>
            </div>
          </div>

          {/* Contribution Calendar Scroll Area */}
          <div
            className="github-calendar-viewport"
            ref={scrollContainerRef}
            onMouseLeave={() => setHoveredCell(null)}
          >
            <div className="github-calendar-inner" style={{ minWidth: `${svgWidth}px` }}>
              <svg
                className="github-calendar-svg"
                width={svgWidth}
                height={svgHeight}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                role="img"
                aria-label={`GitHub contribution calendar: ${totalContributions} contributions in the last year`}
              >
                {/* Month Labels */}
                {monthLabels.map(({ weekIndex, label }) => (
                  <text
                    key={`${weekIndex}-${label}`}
                    x={OFFSET_X + weekIndex * CELL_STEP}
                    y={12}
                    className="github-svg-month"
                  >
                    {label}
                  </text>
                ))}

                {/* Day Labels (Mon, Wed, Fri) */}
                <text x={4} y={OFFSET_Y + 1 * CELL_STEP + 8} className="github-svg-day">
                  Mon
                </text>
                <text x={4} y={OFFSET_Y + 3 * CELL_STEP + 8} className="github-svg-day">
                  Wed
                </text>
                <text x={4} y={OFFSET_Y + 5 * CELL_STEP + 8} className="github-svg-day">
                  Fri
                </text>

                {/* Day Squares Grid */}
                {weeks.map((week, wIdx) =>
                  week.map((day, dIdx) => {
                    if (!day) return null;
                    const x = OFFSET_X + wIdx * CELL_STEP;
                    const y = OFFSET_Y + dIdx * CELL_STEP;
                    const isHovered = hoveredCell?.date === day.date;

                    return (
                      <rect
                        key={day.date}
                        x={x}
                        y={y}
                        width={CELL_SIZE}
                        height={CELL_SIZE}
                        rx={CELL_RADIUS}
                        ry={CELL_RADIUS}
                        className={`github-cell level-${day.level} ${isHovered ? "is-hovered" : ""}`}
                        data-date={day.date}
                        data-count={day.count}
                        data-level={day.level}
                        onMouseEnter={() =>
                          setHoveredCell({
                            date: day.date,
                            count: day.count,
                            level: day.level,
                            x: x + CELL_SIZE / 2,
                            y: y,
                          })
                        }
                      >
                        <title>
                          {day.count === 0
                            ? `No contributions on ${formatDate(day.date)}`
                            : `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`}
                        </title>
                      </rect>
                    );
                  })
                )}
              </svg>

              {/* Hover Tooltip */}
              {hoveredCell && (
                <div
                  className="github-cell-tooltip"
                  style={{
                    left: `${hoveredCell.x}px`,
                    top: `${hoveredCell.y}px`,
                  }}
                >
                  <strong>
                    {hoveredCell.count === 0
                      ? "No contributions"
                      : `${hoveredCell.count} contribution${hoveredCell.count === 1 ? "" : "s"}`}
                  </strong>
                  <span>on {formatDate(hoveredCell.date)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Card Footer */}
          <div className="github-card-footer">
            <a
              href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
              target="_blank"
              rel="noreferrer"
              className="github-footer-learn"
            >
              Learn how contributions are counted <ExternalLink size={11} />
            </a>

            <div className="github-footer-legend">
              <span className="mono">Less</span>
              <span className="legend-box level-0" title="0 contributions" />
              <span className="legend-box level-1" title="1-3 contributions" />
              <span className="legend-box level-2" title="4-6 contributions" />
              <span className="legend-box level-3" title="7-9 contributions" />
              <span className="legend-box level-4" title="10+ contributions" />
              <span className="mono">More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
