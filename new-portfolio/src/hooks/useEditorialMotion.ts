import { useEffect } from "react";

/** Progressive enhancement: content remains visible if animation never loads. */
export function useEditorialMotion() {
  useEffect(() => {
    const preference = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    let disposed = false;
    let cleanAnimation: (() => void) | undefined;
    let generation = 0;
    const sync = async () => {
      const current = ++generation;
      cleanAnimation?.();
      cleanAnimation = undefined;
      if (!preference.matches || !("IntersectionObserver" in window)) return;
      try {
        const { gsap } = await import("gsap");
        if (disposed || current !== generation || !preference.matches) return;
        const context = gsap.context(() => {});
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              observer.unobserve(entry.target);
              context.add(() => {
                const line = entry.target.classList.contains("section-divider");
                gsap.fromTo(
                  entry.target,
                  line
                    ? { scaleX: 0.94, opacity: 0.4 }
                    : { y: 14, opacity: 0.45 },
                  {
                    scaleX: 1,
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    clearProps: "transform,opacity",
                  },
                );
              });
            }
          },
          { threshold: 0.2 },
        );
        document
          .querySelectorAll(".section-heading, .section-divider")
          .forEach((element) => observer.observe(element));
        cleanAnimation = () => {
          observer.disconnect();
          context.revert();
        };
      } catch {
        // An unavailable animation chunk must never affect access to the page.
      }
    };
    void sync();
    preference.addEventListener("change", sync);
    return () => {
      disposed = true;
      generation++;
      preference.removeEventListener("change", sync);
      cleanAnimation?.();
    };
  }, []);
}
