import { portfolio } from "../../data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
export function About() {
  return (
    <>
      <SectionHeading
        number="04"
        eyebrow="BEHIND THE CODE"
        title="Curiosity is the starting point"
      />
      <div className="about-portrait-layout">
        <figure className="profile-portrait about-portrait">
          <img
            src="/images/profile/about.webp"
            width={1024}
            height={1024}
            alt="Black-and-white studio portrait of Ayan Kumar Mondal in a suit, looking toward the camera."
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="about-copy">
          <p>
            I’m {portfolio.profile.name}, a student developer and AI & ML
            enthusiast pursuing {portfolio.profile.education} at{" "}
            {portfolio.profile.institution}.
          </p>
          <p>{portfolio.profile.biography}</p>
          <dl className="about-facts">
            <div>
              <dt>STUDYING</dt>
              <dd>{portfolio.profile.education}</dd>
              <dd>{portfolio.profile.educationYears}</dd>
            </div>
            <div>
              <dt>BUILDING WITH</dt>
              <dd>Team {portfolio.team.name}</dd>
            </div>
            <div>
              <dt>BASED IN</dt>
              <dd>{portfolio.profile.location}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="team-showcase" aria-labelledby="team-title">
        <div>
          <p className="eyebrow">COLLABORATION</p>
          <h3 id="team-title">Team {portfolio.team.name}</h3>
          <p className="muted">{portfolio.team.details}</p>
        </div>
        <ul className="team-members">
          {portfolio.team.members.map((member) => (
            <li key={member}>
              {member}
              <span className="mono muted">TEAM MEMBER</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
