import { portfolio } from "../../data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { CertificateGallery } from "./CertificateGallery";
export function Achievements() {
  return (
    <>
      <SectionHeading
        number="03"
        eyebrow="MILESTONES"
        title="Learning through participation"
      />
      <ol className="milestone-timeline">
        {portfolio.achievements.map((a) => (
          <li key={a.title}>
            <article>
              <p className="eyebrow">{a.kind ?? "Project participation"}</p>
              <h3>{a.title}</h3>
              <p className="muted">
                {a.detail.startsWith("TODO:")
                  ? "Winning event, date and award details await the supporting certificate."
                  : a.detail}
              </p>
            </article>
          </li>
        ))}
      </ol>
      <CertificateGallery />
    </>
  );
}
