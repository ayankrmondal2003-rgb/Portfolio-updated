import { ArrowUpRight } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "../ui/ProjectCard";
export function Projects() {
  return (
    <>
      <div className="section-title-row">
        <SectionHeading
          number="01"
          eyebrow="SELECTED WORK"
          title="Ideas into practice"
          description="A growing collection of projects, experiments, and lessons learned."
        />
        <a className="text-link" href={portfolio.socials[0].url}>
          Explore GitHub <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="project-grid">
        {portfolio.projects.length ? (
          portfolio.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <ProjectCard />
        )}
      </div>
    </>
  );
}
