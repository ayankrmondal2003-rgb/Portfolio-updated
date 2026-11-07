import { ArrowUpRight } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "../ui/ProjectCard";
import { FeaturedProjectCard } from "../ui/FeaturedProjectCard";
import { ProjectCaseStudy } from "./ProjectCaseStudy";
export function Projects() {
  return (
    <>
      <div className="section-title-row">
        <SectionHeading
          number="01"
          eyebrow="SELECTED WORK"
          title="Ideas into practice"
          description="Working software, hackathon starters, and ideas taking shape. Each project tells you exactly where it stands."
        />
        <a className="text-link" href={portfolio.socials[0].url}>
          Explore GitHub <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="editorial-projects">
        {portfolio.featuredProjects.map((project) => (
          <FeaturedProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <div className="github-strip">
        <div>
          <p className="eyebrow">BUILDING IN THE OPEN</p>
          <h3>Follow the source.</h3>
          <p className="muted">
            Explore repositories, implementation details, and the work behind
            the interface.
          </p>
        </div>
        <a className="button button--secondary" href={portfolio.socials[0].url}>
          GitHub profile <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <details className="project-archive">
        <summary>
          Earlier projects <span className="mono">/ Archive</span>
        </summary>
        <p className="muted archive-note">
          Retained from the previous portfolio. Additional source links and
          contribution details are pending.
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
