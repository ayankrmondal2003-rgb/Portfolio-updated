import { ArrowUpRight, Code2 } from "lucide-react";
import type { Project } from "../../types/portfolio";
import { TechnologyBadge } from "./TechnologyBadge";

export function ProjectCard({ project }: { project?: Project }) {
  if (!project)
    return (
      <article className="project-card placeholder-card">
        <div className="project-visual" aria-hidden="true">
          <Code2 size={42} strokeWidth={1} />
          <span className="mono">WORK IN PROGRESS</span>
          <span className="visual-corner">[ 01 ]</span>
        </div>
        <div className="project-copy">
          <p className="eyebrow">PROJECT ARCHIVE</p>
          <h3>The first chapter is coming.</h3>
          <p>Project details will appear here as they are added.</p>
          <span className="technology-badge">Details pending</span>
        </div>
      </article>
    );
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
