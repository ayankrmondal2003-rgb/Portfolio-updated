import { ArrowUpRight } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { DoorsSection } from "./DoorsSection";
import { SectionHeading } from "../ui/SectionHeading";
import { FeaturedProjectCard } from "../ui/FeaturedProjectCard";
import { ProjectCard } from "../ui/ProjectCard";
import { ProjectCaseStudy } from "./ProjectCaseStudy";
import { GithubContributions } from "../ui/GithubContributions";

export function Projects() {
  return (
    <>
      {/* 3D Doors Experience - "Magic happens behind the doors" */}
      <DoorsSection />

      {/* Editorial Selected Work Showcase */}
      <div className="section-title-row">
        <SectionHeading
          number="01"
          eyebrow="SELECTED WORK"
          title="Ideas into practice"
          description="Working software, hackathon starters, and ideas taking shape. Each project tells you exactly where it stands."
        />
        <a
          className="text-link"
          href={portfolio.socials[0].url}
          target="_blank"
          rel="noreferrer"
        >
          Explore GitHub <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>

      <div className="editorial-projects">
        {portfolio.featuredProjects.map((project) => (
          <FeaturedProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* Live Updating GitHub Contributions */}
      <GithubContributions username="ayankrmondal2003-rgb" />

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
