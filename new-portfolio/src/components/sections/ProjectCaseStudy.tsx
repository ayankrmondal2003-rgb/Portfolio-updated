import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { TechnologyBadge } from "../ui/TechnologyBadge";
import { ProjectImage } from "../ui/ProjectImage";

function projectFromHash() {
  return portfolio.featuredProjects.find(
    (project) => window.location.hash === `#case-study-${project.slug}`,
  );
}

export function ProjectCaseStudy() {
  const [project, setProject] = useState(projectFromHash);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sync = () => setProject(projectFromHash());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !project) return;
    if (!dialog.contains(document.activeElement)) {
      previousFocus.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    dialog.scrollTop = 0;
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      const fallback = document.querySelector<HTMLAnchorElement>(
        `a[href="#case-study-${project.slug}"]`,
      );
      if (
        previousFocus.current &&
        previousFocus.current !== document.body &&
        previousFocus.current.isConnected
      )
        previousFocus.current.focus({ preventScroll: true });
      else fallback?.focus({ preventScroll: true });
    };
  }, [project]);

  const nextProject = project
    ? portfolio.featuredProjects[
        (portfolio.featuredProjects.indexOf(project) + 1) %
          portfolio.featuredProjects.length
      ]
    : undefined;
  const jumpTo = (id: string) => {
    const target = dialogRef.current?.querySelector<HTMLElement>(
      `#study-${id}`,
    );
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  const close = () => {
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#projects`,
    );
    setProject(undefined);
  };

  return (
    <dialog
      ref={dialogRef}
      className="case-study-dialog"
      aria-labelledby="case-study-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            close();
        }
      }}
    >
      {project && (
        <div className="case-study-content">
          <div className="case-study-toolbar">
            <span className="eyebrow">CASE STUDY / {project.id}</span>
            <button
              type="button"
              className="case-study-close"
              onClick={close}
              aria-label="Close case study"
              autoFocus
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <header id="study-overview" tabIndex={-1}>
            <p className="project-status">{project.statusLabel}</p>
            <h2 id="case-study-title">{project.title}</h2>
            <p className="eyebrow">{project.category}</p>
            <p className="study-overview">{project.description}</p>
            <div className="study-opening-links">
              {project.repository && (
                <a href={project.repository}>
                  GitHub repository{" "}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
              {project.demo && (
                <a href={project.demo}>
                  Live demo <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          </header>
          <nav className="study-navigation" aria-label="Case study sections">
            {[
              ["overview", "Overview"],
              ["problem", "Problem"],
              ["solution", "Solution"],
              ["features", "Features"],
              ["architecture", "Architecture"],
              ["contribution", "My role"],
              ["evidence", "Sources"],
            ].map(([id, label]) => (
              <button type="button" key={id} onClick={() => jumpTo(id)}>
                {label}
              </button>
            ))}
          </nav>
          {project.screenshot && (
            <figure className="study-figure">
              <ProjectImage key={project.slug} project={project} fullWidth />
              <figcaption className="mono muted">
                {project.screenshot
                  ? project.screenshot.alt
                  : "Project screenshot pending — no substitute artwork."}
              </figcaption>
            </figure>
          )}
          <div className="case-study-grid">
            <section id="study-problem" tabIndex={-1}>
              <h3>01 / Problem</h3>
              <p>{project.caseStudy.problem}</p>
            </section>
            <section id="study-solution" tabIndex={-1}>
              <h3>02 / Solution</h3>
              <p>{project.caseStudy.solution}</p>
            </section>
            <section id="study-features" tabIndex={-1}>
              <h3>03 / Key features</h3>
              <ul>
                {project.caseStudy.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section id="study-architecture" tabIndex={-1}>
              <h3>04 / Architecture</h3>
              <ul>
                {project.caseStudy.architecture.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section id="study-stack" tabIndex={-1}>
              <h3>05 / Technology stack</h3>
              <div className="project-technologies">
                {project.technologies.map((tech) => (
                  <TechnologyBadge key={tech}>{tech}</TechnologyBadge>
                ))}
              </div>
              {!project.technologies.length && (
                <p className="editable-todo">
                  TODO: Add the verified technology stack.
                </p>
              )}
            </section>
            <section id="study-contribution" tabIndex={-1}>
              <h3>06 / My contribution</h3>
              <p>{project.caseStudy.contribution}</p>
              <p className="editable-todo">
                {project.caseStudy.contributionTodo}
              </p>
            </section>
            <section id="study-challenges" tabIndex={-1}>
              <h3>07 / Challenges</h3>
              <p className="editable-todo">{project.caseStudy.challenges}</p>
            </section>
            <section id="study-lessons" tabIndex={-1}>
              <h3>08 / Lessons learned</h3>
              <p className="editable-todo">{project.caseStudy.lessons}</p>
            </section>
          </div>
          <section
            id="study-evidence"
            tabIndex={-1}
            className="case-study-evidence"
          >
            <h3>09 / Source & verification</h3>
            <p>{project.evidence.summary}</p>
            <p className="mono muted">Reviewed {project.evidence.checked}</p>
            <div className="case-study-resources">
              {project.repository && (
                <a href={project.repository}>
                  GitHub repository{" "}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
              {project.demo && (
                <a href={project.demo}>
                  Live demo <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
              {project.evidence.sources.map((source) => (
                <a key={source.url} href={source.url}>
                  {source.label} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
              {!project.repository && (
                <p className="editable-todo">
                  TODO: Add a verified repository or demo link.
                </p>
              )}
            </div>
          </section>
          {nextProject && (
            <a
              className="next-project"
              href={`#case-study-${nextProject.slug}`}
            >
              <span>
                <span className="eyebrow">NEXT PROJECT / {nextProject.id}</span>
                <strong>{nextProject.title}</strong>
              </span>
              <ArrowRight aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </dialog>
  );
}
