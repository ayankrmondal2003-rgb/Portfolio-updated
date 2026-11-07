import { portfolio } from "../../data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
export function About() {
  return (
    <div className="about-grid">
      <SectionHeading
        number="04"
        eyebrow="BEHIND THE CODE"
        title="Curiosity is the starting point"
      />
      <div className="about-copy">
        <p>
          I’m {portfolio.profile.name}, a student developer and AI & ML
          enthusiast pursuing {portfolio.profile.education} at{" "}
          {portfolio.profile.institution}.
        </p>
        <p>
          I’m part of team <strong>{portfolio.team.name}</strong> and a
          hackathon winner. This space brings together my work, learning, and
          the next things I build.
        </p>
        <dl className="about-facts">
          <div>
            <dt>STUDYING</dt>
            <dd>{portfolio.profile.education}</dd>
          </div>
          <div>
            <dt>BUILDING WITH</dt>
            <dd>Team {portfolio.team.name}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
