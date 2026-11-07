import { portfolio } from "../../data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { TechnologyBadge } from "../ui/TechnologyBadge";
export function Skills() {
  return (
    <>
      <SectionHeading
        number="02"
        eyebrow="THE TOOLKIT"
        title="Always learning"
        description="The tools and technologies behind the work. A detailed skill set is on its way."
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
          </article>
        ))}
      </div>
    </>
  );
}
