import { ArrowDown, ArrowUpRight } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { Container } from "../layout/Container";
import { ButtonLink } from "../ui/Button";
import { HeroAtmosphere } from "../ui/HeroAtmosphere";

export function Home() {
  return (
    <section
      id="home"
      tabIndex={-1}
      className="hero"
      aria-labelledby="hero-heading"
    >
      <HeroAtmosphere />
      <Container>
        <div className="portrait-hero-layout">
          <div className="hero-introduction">
            <div className="hero-topline">
              <p className="eyebrow">
                <span>01</span> / DEVELOPER PORTFOLIO
              </p>
              <span className="hero-index mono">CODE / CURIOSITY / CRAFT</span>
            </div>
            <div className="hero-content">
              <p className="hero-name">
                Ayan Kumar Mondal<span aria-hidden="true">.</span>
              </p>
              <h1 id="hero-heading">
                Turning ideas into <span>intelligent</span> experiences.
              </h1>
              <div className="hero-details">
                <div>
                  <p className="hero-description">
                    I build practical software and explore AI-driven solutions
                    through projects, experiments, and hackathons.
                  </p>
                  <div className="hero-actions">
                    <ButtonLink href="#projects">
                      Explore My Work <ArrowDown size={18} aria-hidden="true" />
                    </ButtonLink>
                    <ButtonLink
                      variant="secondary"
                      href={portfolio.socials[0].url}
                    >
                      GitHub <ArrowUpRight size={18} aria-hidden="true" />
                    </ButtonLink>
                  </div>
                </div>
                <ul className="identity-labels" aria-label="Areas of focus">
                  <li>
                    <span aria-hidden="true">01 /</span> AI / ML
                  </li>
                  <li>
                    <span aria-hidden="true">02 /</span> Software Development
                  </li>
                  <li>
                    <span aria-hidden="true">03 /</span> Hackathons
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <figure className="profile-portrait hero-portrait">
            <img
              src="/images/profile/hero.webp"
              width={638}
              height={781}
              alt="Black-and-white studio portrait of Ayan Kumar Mondal wearing glasses and a dark shirt."
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </figure>
        </div>
        <div className="hero-bottom">
          <p>
            <span aria-hidden="true">↳</span> {portfolio.profile.institution}
          </p>
          <a href="#projects" className="scroll-indicator mono">
            SCROLL TO EXPLORE <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}
