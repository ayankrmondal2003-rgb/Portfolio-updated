import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import type { FeaturedProject } from "../../types/portfolio";
import { TechnologyBadge } from "./TechnologyBadge";
import { ProjectImage } from "./ProjectImage";

export function FeaturedProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <article
      className="featured-project"
      aria-labelledby={`title-${project.slug}`}
    >
      <div className="project-card-top">
        <span className="project-number" aria-label={`Project ${project.id}`}>
          {project.id}
          <span aria-hidden="true"> /</span>
        </span>
        <span className={`project-status status-${project.status}`}>
          {project.statusLabel}
        </span>
      </div>
      <ProjectImage project={project} />
      <div className="featured-copy">
        <p className="eyebrow">{project.category}</p>
        <h3 id={`title-${project.slug}`}>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <dl className="project-story">
          <div>
            <dt>THE PROBLEM</dt>
            <dd>{project.caseStudy.problem}</dd>
          </div>
          <div>
            <dt>
              {project.status === "concept"
                ? "PROPOSED APPROACH"
                : "THE APPROACH"}
            </dt>
            <dd>{project.caseStudy.solution}</dd>
          </div>
        </dl>
        <div className="project-technologies">
          {project.technologies.length ? (
            project.technologies.map((tech) => (
              <TechnologyBadge key={tech}>{tech}</TechnologyBadge>
            ))
          ) : (
            <span className="mono muted">
              Technology stack pending verification
            </span>
          )}
        </div>
        <div className="featured-actions">
          <a
            className="case-study-link"
            href={`#case-study-${project.slug}`}
            aria-label={`View case study: ${project.title}`}
          >
            View case study <ArrowRight size={16} aria-hidden="true" />
          </a>
          <div className="project-source-links">
            {project.repository && (
              <a
                href={project.repository}
                aria-label={`${project.title} GitHub repository`}
              >
                <Github size={16} aria-hidden="true" /> GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} aria-label={`${project.title} live demo`}>
                Live <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
