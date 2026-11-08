import { ArrowUpRight } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { DoorsSection } from "./DoorsSection";
import { ProjectCard } from "../ui/ProjectCard";
import { ProjectCaseStudy } from "./ProjectCaseStudy";

export function Projects() {
  return (
    <>
      {/* 3D Doors Experience - "Magic happens behind the doors" */}
      <DoorsSection />

      {/* GitHub Repository Strip */}
      <div className="github-strip">
        <div>
          <p className="eyebrow">BUILDING IN THE OPEN</p>
          <h3>Follow the source.</h3>
          <p className="muted">
            Explore repositories, architecture discussions, and open-source contributions.
          </p>
        </div>
        <a
          className="button button--secondary"
          href={portfolio.socials[0].url}
          target="_blank"
          rel="noreferrer"
        >
          GitHub profile <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>

      {/* Earlier Projects Archive */}
      <details className="project-archive">
        <summary>
          Earlier projects <span className="mono">/ Archive</span>
        </summary>
        <p className="muted archive-note">
          Software prototypes, hackathon builds, and academic milestones.
        </p>
        <div className="project-grid">
          {portfolio.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </details>

      <ProjectCaseStudy />
    </>
  );
}
