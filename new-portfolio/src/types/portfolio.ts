export type Todo = `TODO: ${string}`;
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  repository?: string;
  demo?: string;
  todo?: Todo;
}
export interface FeaturedProject extends Project {
  slug: string;
  status: "deployed" | "in-progress" | "prototype" | "concept" | "starter";
  statusLabel: string;
  category: string;
  screenshot?: { src: string; alt: string; width: number; height: number };
  evidence: {
    summary: string;
    sources: { label: string; url: string }[];
    checked: string;
  };
  caseStudy: {
    problem: string;
    solution: string;
    features: string[];
    architecture: string[];
    contribution: string;
    contributionTodo: Todo;
    challenges: string;
    lessons: string;
  };
}
export interface Portfolio {
  profile: {
    name: string;
    role: string;
    education: string;
    institution: string;
    email: Todo | string;
    biography: Todo | string;
    location: string;
    educationYears: string;
    resume: { url?: string; todo: Todo };
  };
  socials: { label: string; url: string }[];
  projects: Project[];
  featuredProjects: FeaturedProject[];
  skills: {
    category: string;
    technologies: string[];
    todo?: Todo;
    evidence?: string;
  }[];
  achievements: { title: string; detail: Todo | string; kind?: string }[];
  certificates: {
    title: string;
    issuer: string;
    kind: string;
    url?: string;
    image?: string;
    pdf?: string;
    todo?: Todo;
  }[];
  team: { name: string; details: Todo | string; members: string[] };
  experience: { title: string; organization: string; description: string }[];
  provenance: { source: string; accessed: string; notes: string[] };
  todos: { projects: Todo; certificates: Todo; experience: Todo };
}
