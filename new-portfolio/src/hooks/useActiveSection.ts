import { useEffect, useState } from "react";
import { navigation } from "../data/portfolio";

// One scheduled read per frame; only six sections, with no React updates unless
// the active section changes. The bottom check includes short final sections.
export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("home");
  useEffect(() => {
    let frame = 0;
    const sections = navigation.map(({ id }) => document.getElementById(id));
    const update = () => {
      frame = 0;
      let current = "home";
      for (const section of sections) {
        if (section && section.getBoundingClientRect().top <= 180)
          current = section.id;
      }
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4
      )
        current = "contact";
      setActiveSection(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, []);
  return activeSection;
}
