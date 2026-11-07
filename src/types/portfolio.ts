export type Todo = `TODO: ${string}`;
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  repository?: string;
  demo?: string;
}
export interface Portfolio {
  profile: {
    name: string;
    role: string;
    education: string;
    institution: string;
    email: Todo | string;
    biography: Todo | string;
  };
  socials: { label: string; url: string }[];
  projects: Project[];
  skills: { category: string; technologies: string[]; todo?: Todo }[];
  achievements: { title: string; detail: Todo | string }[];
  certificates: { title: string; issuer: string; url?: string }[];
  team: { name: string; details: Todo | string };
  todos: { projects: Todo; certificates: Todo; socials: Todo };
}
