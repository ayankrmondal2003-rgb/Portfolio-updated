import { useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, portfolio } from "../../data/portfolio";
import { Container } from "./Container";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  return (
    <header className="site-header">
      <Container className="nav-container">
        <a
          href="#home"
          className="wordmark"
          aria-label={`${portfolio.profile.name}, home`}
        >
          ayan<span className="text-accent">.</span>
          <span className="wordmark-suffix">/ dev</span>
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-controls="primary-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="primary-navigation"
          aria-label="Primary navigation"
          className={open ? "navigation is-open" : "navigation"}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              toggleRef.current?.focus();
            }
          }}
        >
          <ul>
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => {
                    setOpen(false);
                    document
                      .getElementById(item.id)
                      ?.focus({ preventScroll: true });
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="nav-github" href={portfolio.socials[0].url}>
            GitHub <ArrowUpRight size={15} />
          </a>
        </nav>
      </Container>
    </header>
  );
}
