import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { particleMode, supportsParticles } from "../../lib/particlePolicy";
import type { ParticleMode } from "../../lib/particlePolicy";

const ParticleScene = lazy(() => import("./ParticleScene"));

class AtmosphereBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function HeroAtmosphere() {
  const host = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<ParticleMode>("static");
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const fail = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const element = host.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tablet = window.matchMedia("(min-width: 768px)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    const device = navigator as Navigator & {
      deviceMemory?: number;
      connection?: {
        saveData?: boolean;
        addEventListener?: (name: string, listener: () => void) => void;
        removeEventListener?: (name: string, listener: () => void) => void;
      };
    };
    let visible = false;
    let supported: boolean | undefined;
    const sync = () => {
      const selected = particleMode({
        width: window.innerWidth,
        reducedMotion: motion.matches,
        cores: device.hardwareConcurrency,
        memory: device.deviceMemory,
        saveData: device.connection?.saveData,
      });
      const shouldRun = visible && !document.hidden && selected !== "static";
      if (shouldRun && supported === undefined)
        supported = supportsParticles(() => document.createElement("canvas"));
      setMode(selected !== "static" && supported ? selected : "static");
      setActive(shouldRun && Boolean(supported));
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    observer.observe(element);
    [motion, tablet, desktop].forEach((query) =>
      query.addEventListener("change", sync),
    );
    document.addEventListener("visibilitychange", sync);
    device.connection?.addEventListener?.("change", sync);
    return () => {
      observer.disconnect();
      [motion, tablet, desktop].forEach((query) =>
        query.removeEventListener("change", sync),
      );
      document.removeEventListener("visibilitychange", sync);
      device.connection?.removeEventListener?.("change", sync);
    };
  }, []);

  return (
    <div
      ref={host}
      className="hero-atmosphere"
      aria-hidden="true"
      data-particle-mode={failed ? "static" : mode}
      data-particle-active={!failed && active}
    >
      {!failed && mode !== "static" && (
        <AtmosphereBoundary onFailure={fail}>
          <Suspense fallback={null}>
            <ParticleScene
              mode={mode}
              active={active}
              host={host}
              onFailure={fail}
            />
          </Suspense>
        </AtmosphereBoundary>
      )}
    </div>
  );
}
