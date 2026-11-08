import { portfolio } from "../../data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { TechnologyBadge } from "../ui/TechnologyBadge";
export function Skills() {
  return (
    <>
      <SectionHeading
        number="02"
        eyebrow="THE TOOLKIT"
        title="A toolkit for possibilities"
        description="Technologies used across the verified source and earlier project archive. No proficiency scores—just the tools and their context."
      />
      <div className="skills-grid">
        {portfolio.skills.map((group, index) => (
          <article className="skill-group" key={group.category}>
            <span className="mono text-accent">0{index + 1} /</span>
            <h3>{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.technologies.length ? (
                group.technologies.map((tech) => (
                  <TechnologyBadge key={tech}>{tech}</TechnologyBadge>
                ))
              ) : (
                <p className="muted">Tools to be added.</p>
              )}
            </div>
            {group.evidence && (
              <p className="skill-evidence">{group.evidence}</p>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
