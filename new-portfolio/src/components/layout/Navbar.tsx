import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, portfolio } from "../../data/portfolio";
import { useActiveSection } from "../../hooks/useActiveSection";
import { Container } from "./Container";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const activeSection = useActiveSection();

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 701px)");
    const closeOnResize = () => setOpen(false);
    desktop.addEventListener("change", closeOnResize);
    return () => desktop.removeEventListener("change", closeOnResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const navigate = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.focus({ preventScroll: true });
  };

  return (
    <header
      ref={headerRef}
      className="site-header"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <Container className="nav-container">
        <a
          href="#home"
          className="wordmark"
          aria-label={`AKM. — ${portfolio.profile.name}, home`}
          onClick={() => navigate("home")}
        >
          AKM<span className="text-accent">.</span>
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-controls="primary-navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav
          id="primary-navigation"
          aria-label="Primary navigation"
          className={open ? "navigation is-open" : "navigation"}
        >
          <ul>
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={
                    activeSection === item.id ? "location" : undefined
                  }
                  onClick={() => navigate(item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="nav-github" href={portfolio.socials[0].url}>
            GitHub <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
      </Container>
    </header>
  );
}
