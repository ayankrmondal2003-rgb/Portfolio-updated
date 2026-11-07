import type { Portfolio } from "../types/portfolio";
import { featuredProjects } from "./projects";

// Facts transcribed from the user's public site; not independently certified.
const source = "https://portfolio-ayankumar.vercel.app";
export const portfolio: Portfolio = {
  profile: {
    name: "Ayan Kumar Mondal",
    role: "Student Developer / AI & ML Enthusiast",
    education: "B.Tech CSE (AI & ML)",
    institution: "Haldia Institute of Technology",
    educationYears: "2025–2029",
    location: "Tamluk, West Bengal, India",
    email: "ayankr.mondal2003@gmail.com",
    biography:
      "I’m interested in artificial intelligence, machine learning, and software development. I enjoy practical engineering projects: turning an idea into something I can test, understand, and improve. Hackathons and collaboration give me opportunities to learn with others and contribute to a shared project.",
    resume: {
      todo: "TODO: Provide a current resume PDF before enabling the download button.",
    },
  },
  socials: [
    { label: "GitHub", url: "https://github.com/ayankrmondal2003-rgb" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/ayan-kumar-mondal" },
  ],
  featuredProjects,
  projects: [
    {
      id: "01",
      title: "Enterprise AI Interviewer",
      description:
        "An adaptive AI interviewer with follow-up questions and structured candidate assessments. Co-built during the 48-hour VICODATHON with Team Vector.",
      technologies: ["Python", "FastAPI", "Gemini", "Groq", "Docker"],
      todo: "TODO: Confirm project-specific repository and demo URLs; the old case study links only to the GitHub profile.",
    },
    {
      id: "02",
      title: "SETU",
      description:
        "A Bihar tourism marketplace for local experiences, AI trip planning, and vendor bookings. Selected for the TEJAS INDIA 2026 offline finale.",
      technologies: [
        "React",
        "TypeScript",
        "Node.js",
        "Prisma",
        "Gemini",
        "Razorpay",
      ],
      todo: "TODO: Add verified project repository and demo URLs.",
    },
    {
      id: "03",
      title: "Meghdrishti",
      description:
        "A generative AI system for reconstructing cloud-obscured satellite imagery. Built with Team Trinova for the ISRO Bharatiya Antariksh Hackathon 2026.",
      technologies: [
        "Python",
        "PyTorch",
        "Swin Transformer",
        "FastAPI",
        "Docker",
      ],
      todo: "TODO: Add verified project repository and demo URLs.",
    },
    {
      id: "04",
      title: "Parkinson’s Disease Prediction",
      description:
        "A machine-learning prediction project developed during HackArena 2025 at Haldia Institute of Technology.",
      technologies: ["Python", "Machine Learning", "Predictive Modeling"],
      todo: "TODO: Add verified project repository and demo URLs.",
    },
  ],
  skills: [
    {
      category: "Programming languages",
      technologies: ["JavaScript", "Python", "TypeScript"],
      evidence:
        "JavaScript in ZENITH; Python in the AI project archive; TypeScript in SETU.",
    },
    {
      category: "AI / ML technologies",
      technologies: ["PyTorch", "Gemini", "Groq"],
      evidence:
        "Reported in the earlier Meghdrishti, SETU, and AI Interviewer projects. Not attributed to the unverified healthcare or cart concepts.",
    },
    {
      category: "Frontend development",
      technologies: [
        "HTML",
        "CSS",
        "React",
        "Vite",
        "Tailwind CSS",
        "Chart.js",
      ],
      evidence:
        "HTML, CSS and Chart.js in ZENITH; React in SETU; Vite and Tailwind CSS in this portfolio.",
    },
    {
      category: "Backend & data",
      technologies: [
        "Node.js",
        "WebSocket",
        "FastAPI",
        "Prisma",
        "localStorage",
      ],
      evidence:
        "Node.js, WebSocket and localStorage in ZENITH; FastAPI and Prisma in the earlier project archive.",
    },
    {
      category: "Development tools",
      technologies: ["Git", "npm", "Node.js test runner", "jsdom", "Docker"],
      evidence:
        "Repository and test tooling in ZENITH; Docker reported in the AI project archive.",
    },
    {
      category: "Platforms",
      technologies: ["GitHub", "Vercel"],
      evidence:
        "Public repositories and the verified ZENITH and portfolio deployments.",
    },
  ],
  achievements: [
    {
      title: "Hacktoberfest’26 — Special Thanks",
      kind: "Recognition · artwork pending",
      detail:
        "Special Thanks recognition, as supplied by Ayan. This is not a hackathon winning certificate.",
    },
    {
      title: "Team 4LOOPS participation",
      kind: "Team participation",
      detail:
        "Collaborating as Team 4LOOPS. Event names, dates and results will be added only when confirmed.",
    },
    {
      title: "1× Hackathon Winner",
      kind: "Self-reported · certificate pending",
      detail:
        "TODO: Confirm the winning event, date, award, and project. Supplied by the user; not tied to any event on the old website.",
    },
    {
      title: "TEJAS INDIA · 2026",
      detail:
        "Selected for the 24-hour offline finale at Government Engineering College, Jamui, with SETU in the Bihar Tourism track.",
    },
    {
      title: "ISRO BAH · 2026",
      detail:
        "Worked on Meghdrishti, a satellite cloud-removal system, with Team Trinova.",
    },
    {
      title: "VICODATHON · 2026",
      detail:
        "Co-built an adaptive AI technical interviewer in 48 hours with Team Vector.",
    },
    {
      title: "HackArena · 2025",
      detail:
        "Developed the Parkinson’s disease prediction project at Haldia Institute of Technology.",
    },
  ],
  certificates: [
    {
      title: "The Joy of Computing using Python",
      issuer: "NPTEL",
      kind: "Course completion · Elite",
      image: "/certificates/nptel-python.jpg",
    },
    {
      title: "The Complete Python Bootcamp: From Zero to Hero in Python",
      issuer: "Udemy",
      kind: "Course completion",
      image: "/certificates/udemy-python.jpg",
    },
    {
      title: "Business Communication and Ethics in Organizations",
      issuer: "Udemy",
      kind: "Course completion",
      image: "/certificates/udemy-comm.jpg",
    },
    {
      title: "Bharatiya Antariksh Hackathon 2026",
      issuer: "ISRO · Hack2skill",
      kind: "Participation & idea submission",
      image: "/certificates/isro.jpg",
    },
    {
      title: "Hacktoberfest’26 — Special Thanks",
      issuer: "Issuer to be confirmed",
      kind: "Special Thanks · not a winning certificate",
      todo: "TODO: Provide the actual Special Thanks certificate image or PDF.",
    },
  ],
  team: {
    name: "4LOOPS",
    details:
      "A team for building, learning, and participating together.",
    members: ["Arpan Biswas", "Aritra Adak", "Ayan Kumar Mondal", "Aritra Pal"],
  },
  experience: [],
  provenance: {
    source,
    accessed: "2026-11-06",
    notes: [
      "Biography, education dates, skills, projects, events, credentials, and links were transcribed from the rendered public site.",
      "The current user brief supplies 4LOOPS and the 1× win. No listed event is assumed to be that win.",
      "No standalone employment or internship history was found. Project work is not presented as employment.",
      "The old site's second-year label is omitted pending confirmation of the current academic year.",
      "Phase 4: four certificate images were visually inspected and copied locally. TEJAS and VICODATHON image URLs contained project material, not certificates, and were excluded. Issuer authenticity has not been independently verified.",
    ],
  },
  todos: {
    projects:
      "TODO: Verify project-specific repository and demo links before exposing project actions.",
    certificates:
      "TODO: Confirm credential identifiers and issuer verification URLs; existing links are public certificate images.",
    experience:
      "TODO: Add confirmed employment or internship history, if applicable.",
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
