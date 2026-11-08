import { useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { Container } from "../layout/Container";
import { ButtonLink } from "../ui/Button";
import { SpiralFlipNotebook } from "../ui/SpiralFlipNotebook";
import { AbilityCardBadge, AbilityCardModal } from "../ui/AbilityCardModal";

export function Home() {
  const [isAbilityOpen, setIsAbilityOpen] = useState(false);

  return (
    <section id="home" tabIndex={-1} className="hero paper-hero" aria-labelledby="hero-heading">
      <Container>
        <div className="paper-hero-layout">
          {/* Left Column: Greeting, 3D Flip Notebook Calendar, CTAs */}
          <div className="paper-introduction">
            <p className="eyebrow">
              <span className="status-dot live-pulse" />
              <span>• Independent Freelancer & Student Engineer</span>
            </p>
            <h1 id="hero-heading">
              Hi, I’m Ayan.
              <br />
              <span>I am a</span>
            </h1>

            {/* 3D Wire-O Flip Notebook Widget */}
            <SpiralFlipNotebook />

            <p className="paper-description">
              Turning ideas into intelligent experiences. I build practical software,
              interactive web applications, and explore AI-driven solutions through
              projects, hackathons, and experiments.
            </p>

            <div className="hero-actions">
              <ButtonLink href="#doors">
                See my work <ArrowDown size={18} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink variant="secondary" href={portfolio.socials[0].url}>
                GitHub <ArrowUpRight size={18} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>

          {/* Right Column: Studio Portrait Cutout + Floating Ability Badge */}
          <div className="hero-portrait-stage">
            <figure className="paper-portrait">
              <img
                src="/images/profile/hero.webp"
                width={638}
                height={781}
                alt="Studio portrait of Ayan Kumar Mondal wearing glasses and a dark shirt."
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="portrait-cutout-img"
              />
              <figcaption>
                <span className="mono">THE PERSON BEHIND THE CODE</span>
                <span>Ayan Kumar Mondal ↗</span>
              </figcaption>

              {/* Pinned "My ability card" Floating Pill Badge */}
              <div className="ability-badge-pin">
                <AbilityCardBadge onClick={() => setIsAbilityOpen(true)} />
              </div>
            </figure>
          </div>
        </div>

        {/* Hero Bottom Ticker */}
        <div className="paper-hero-footer mono">
          <span>AVAILABLE FOR WORK</span>
          <span>REMOTE-FIRST, WORLDWIDE</span>
          <a href="#doors">SCROLL TO EXPLORE ↓</a>
        </div>
      </Container>

      {/* Ability Card Modal */}
      <AbilityCardModal isOpen={isAbilityOpen} onClose={() => setIsAbilityOpen(false)} />
    </section>
  );
}
