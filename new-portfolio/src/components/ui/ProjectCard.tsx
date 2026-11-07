import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../types/portfolio";
import { TechnologyBadge } from "./TechnologyBadge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-copy">
        <p className="eyebrow">PROJECT / {project.id}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechnologyBadge key={tech}>{tech}</TechnologyBadge>
          ))}
        </div>
        <div className="project-links">
          {project.repository && (
            <a href={project.repository}>
              Source code <ArrowUpRight size={16} />
            </a>
          )}
          {project.demo && (
            <a href={project.demo}>
              Live project <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
