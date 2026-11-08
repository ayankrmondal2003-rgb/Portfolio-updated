import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import type { FeaturedProject } from "../../types/portfolio";
import { TechnologyBadge } from "./TechnologyBadge";
import { ProjectImage } from "./ProjectImage";

export function FeaturedProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <article className="project-door-card" aria-labelledby={`title-${project.slug}`}>
      <a className="project-door" href={`#case-study-${project.slug}`} aria-label={`Open ${project.title} case study`}>
        <div className="door-interior"><ProjectImage project={project} /><span className="door-invitation">Explore the story <ArrowUpRight aria-hidden="true" /></span></div>
        <div className="door-leaf" aria-hidden="true">
          <span className="door-number">{project.id}</span>
          <span className="door-plaque">{project.title}<small>{project.category}</small></span>
          <span className="door-inset" /><span className="door-handle" />
          <span className="door-caption mono">OPEN A NEW POSSIBILITY ↗</span>
        </div>
      </a>
      <div className="door-project-copy">
        <p className="project-status">{project.statusLabel}</p>
        <h3 id={`title-${project.slug}`}>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-technologies">
          {project.technologies.length ? project.technologies.map(tech => <TechnologyBadge key={tech}>{tech}</TechnologyBadge>) : <span className="mono muted">Technology stack pending verification</span>}
        </div>
        <div className="featured-actions">
          <a className="case-study-link" href={`#case-study-${project.slug}`} aria-label={`View case study: ${project.title}`}>Case study <ArrowRight size={16} aria-hidden="true" /></a>
          <div className="project-source-links">
            {project.repository && <a href={project.repository} aria-label={`${project.title} GitHub repository`}><Github size={16} aria-hidden="true" /> Source</a>}
            {project.demo && <a href={project.demo} aria-label={`${project.title} live demo`}>Live <ArrowUpRight size={16} aria-hidden="true" /></a>}
          </div>
        </div>
      </div>
    </article>
  );
}
