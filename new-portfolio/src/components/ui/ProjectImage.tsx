import { useState } from "react";
import { ImageOff } from "lucide-react";
import type { FeaturedProject } from "../../types/portfolio";

export function ProjectImage({ project, fullWidth = false }: { project: FeaturedProject; fullWidth?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="project-media">
      {project.screenshot && !failed ? (
        <img
          src={project.screenshot.src}
          srcSet={project.screenshot.src === "/projects/zenith.webp" ? "/projects/zenith-640.webp 640w, /projects/zenith-800.webp 800w, /projects/zenith.webp 1200w" : undefined}
          sizes={fullWidth ? "(max-width: 1120px) calc(100vw - 68px), 1048px" : "(max-width: 1023px) calc(100vw - 48px), 640px"}
          alt={project.screenshot.alt}
          width={project.screenshot.width}
          height={project.screenshot.height}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="project-image-fallback">
          <ImageOff size={24} aria-hidden="true" />
          <span className="fallback-title">{project.title}</span>
          <span className="mono">
            {failed ? "Preview unavailable" : "Screenshot pending"}
          </span>
        </div>
      )}
    </div>
  );
}
