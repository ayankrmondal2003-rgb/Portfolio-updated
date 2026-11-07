import { ArrowDown, ArrowUpRight } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { Container } from "../layout/Container";
import { ButtonLink } from "../ui/Button";

export function Home() {
  return (
    <section id="home" tabIndex={-1} className="hero">
      <Container>
        <div className="hero-topline">
          <p className="eyebrow">
            <span className="status-dot" /> STUDENT DEVELOPER · AI & ML
          </p>
          <span className="mono hero-index">PORTFOLIO / 01</span>
        </div>
        <div className="hero-layout">
          <div>
            <p className="hero-intro">Hello, I’m Ayan.</p>
            <h1>
              Ayan Kumar
              <br />
              <span className="hero-lastname">
                Mondal<span className="text-accent">.</span>
              </span>
            </h1>
            <p className="hero-description">
              A student developer exploring the intersection of{" "}
              <span>code</span> and <span>intelligence</span>.
            </p>
            <div className="hero-actions">
              <ButtonLink href="#projects">
                Explore projects <ArrowDown size={17} />
              </ButtonLink>
              <ButtonLink variant="secondary" href={portfolio.socials[0].url}>
                View GitHub <ArrowUpRight size={17} />
              </ButtonLink>
            </div>
          </div>
          <aside className="profile-note" aria-label="Profile overview">
            <div className="note-mark" aria-hidden="true">
              [ a<span className="text-accent">.</span>m ]
            </div>
            <dl>
              <div>
                <dt>FOCUS</dt>
                <dd>
                  Artificial intelligence
                  <br />& machine learning
                </dd>
              </div>
              <div>
                <dt>EDUCATION</dt>
                <dd>{portfolio.profile.education}</dd>
              </div>
              <div>
                <dt>TEAM</dt>
                <dd>
                  {portfolio.team.name} <span className="text-accent">↗</span>
                </dd>
              </div>
            </dl>
            <span className="note-caption mono">LEARN. BUILD. ITERATE.</span>
          </aside>
        </div>
        <div className="hero-bottom">
          <p>
            <span className="text-accent">↳</span>{" "}
            {portfolio.profile.institution}
          </p>
          <a href="#projects" className="mono">
            SCROLL TO EXPLORE <ArrowDown size={14} />
          </a>
        </div>
      </Container>
    </section>
  );
}
