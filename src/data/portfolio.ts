import type { Portfolio } from "../types/portfolio";

export const portfolio: Portfolio = {
  profile: {
    name: "Ayan Kumar Mondal",
    role: "Student Developer / AI & ML Enthusiast",
    education: "B.Tech CSE (AI & ML)",
    institution: "Haldia Institute of Technology",
    email: "TODO: Add a public contact email.",
    biography: "TODO: Add a personal biography, interests, and goals.",
  },
  socials: [
    { label: "GitHub", url: "https://github.com/ayankrmondal2003-rgb" },
  ],
  projects: [],
  skills: [
    {
      category: "Languages",
      technologies: [],
      todo: "TODO: Confirm programming languages.",
    },
    {
      category: "AI & machine learning",
      technologies: [],
      todo: "TODO: Confirm AI and ML tools.",
    },
    {
      category: "Development tools",
      technologies: [],
      todo: "TODO: Confirm frameworks and developer tools.",
    },
  ],
  achievements: [
    {
      title: "1× Hackathon Winner",
      detail: "TODO: Add the event name, date, project, and award details.",
    },
  ],
  certificates: [],
  team: {
    name: "4LOOPS",
    details: "TODO: Add team members, role, and team links.",
  },
  todos: {
    projects:
      "TODO: Add verified projects, descriptions, technologies, and links.",
    certificates:
      "TODO: Add verified certificates, issuers, and credential links.",
    socials: "TODO: Add any additional public social links.",
  },
};

export const navigation = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;
