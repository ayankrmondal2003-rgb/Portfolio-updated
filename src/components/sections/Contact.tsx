import { ArrowUpRight } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { ButtonLink } from "../ui/Button";
export function Contact() {
  return (
    <div className="contact-layout">
      <div>
        <p className="eyebrow">05 / WHAT’S NEXT?</p>
        <h2>
          Let’s connect<span className="text-accent">.</span>
        </h2>
        <p className="muted">
          Follow the work and explore what’s taking shape.
        </p>
      </div>
      <div className="contact-actions">
        <ButtonLink href={portfolio.socials[0].url}>
          Find me on GitHub <ArrowUpRight size={18} />
        </ButtonLink>
        <p className="mono muted">
          {portfolio.profile.email.startsWith("TODO:") ? (
            "More contact details coming soon."
          ) : (
            <a href={`mailto:${portfolio.profile.email}`}>
              {portfolio.profile.email}
            </a>
          )}
        </p>
      </div>
    </div>
  );
}
