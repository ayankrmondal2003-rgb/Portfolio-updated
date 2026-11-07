import { Trophy, ArrowUpRight } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
export function Achievements() {
  return (
    <>
      <SectionHeading
        number="03"
        eyebrow="MILESTONES"
        title="Learning. Building. Winning"
      />
      <div className="achievement-grid">
        <div>
          {portfolio.achievements.map((achievement) => (
            <article className="achievement" key={achievement.title}>
              <Trophy size={28} strokeWidth={1.5} className="text-accent" />
              <div>
                <p className="eyebrow">ACHIEVEMENT</p>
                <h3>{achievement.title}</h3>
                <p className="muted">Event and project details coming soon.</p>
              </div>
            </article>
          ))}
        </div>
        <article className="certificate-panel">
          <p className="eyebrow">CONTINUED LEARNING</p>
          <h3>Certificates</h3>
          {portfolio.certificates.length ? (
            portfolio.certificates.map((certificate) => (
              <p key={certificate.title}>
                {certificate.url ? (
                  <a href={certificate.url}>
                    {certificate.title} <ArrowUpRight size={14} />
                  </a>
                ) : (
                  certificate.title
                )}{" "}
                · {certificate.issuer}
              </p>
            ))
          ) : (
            <p className="muted">Verified credentials will be added here.</p>
          )}
        </article>
      </div>
    </>
  );
}

