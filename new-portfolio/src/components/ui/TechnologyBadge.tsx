import type { ReactNode } from "react";
export function TechnologyBadge({ children }: { children: ReactNode }) {
  return <span className="technology-badge">{children}</span>;
}
