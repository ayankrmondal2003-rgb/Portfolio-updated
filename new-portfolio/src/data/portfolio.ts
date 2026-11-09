import type { Portfolio } from "../types/portfolio";
import { featuredProjects } from "./projects";

const source = "https://portfolio-ayankumar.vercel.app";

export const portfolio: Portfolio = {
  profile: {
    name: "Ayan Kumar Mondal",
    role: "AI / ML Developer & Full-Stack Builder",
    education: "B.Tech CSE (AI & ML)",
    institution: "Haldia Institute of Technology",
    educationYears: "2025–2029",
    location: "Tamluk, West Bengal, India",
    email: "ayankr.mondal2003@gmail.com",
    biography:
      "I'm Ayan, a B.Tech student at Haldia Institute of Technology, specializing in Artificial Intelligence and Machine Learning. I work across AI, web development, and IoT. I enjoy taking an idea from an early sketch to a working prototype, then testing and refining it.",
    resume: {
      url: "/Ayan-Kumar-Mondal-CV.jpg",
    },
  },
  socials: [
    { label: "GitHub", url: "https://github.com/ayankrmondal2003-rgb" },
    { label: "LinkedIn", url: "https://linkedin.com/in/ayan-kumar-mondal" },
  ],
  featuredProjects,
  projects: [
    {
      id: "01",
      title: "Parkinson’s Disease Prediction",
      description:
        "A diagnostic machine-learning model analyzing dysphonia (vocal impairment) metrics to classify neurodegenerative disease likelihood. Developed during HackArena at Haldia Institute of Technology.",
      technologies: ["Python", "Machine Learning", "SVM", "Random Forest", "FastAPI"],
      repository: "https://github.com/ayankrmondal2003-rgb",
    },
    {
      id: "02",
      title: "Voyage Hack4Haldia — Live Canvas",
      description:
        "A collaborative digital whiteboard scaffold designed for multi-participant real-time sketching rooms, built for the Hack4Haldia hackathon.",
      technologies: ["JavaScript", "Python", "Flask", "Node.js", "Express"],
      repository: "https://github.com/Voyage-Hack4Haldia-26/TEAM-B",
    },
    {
      id: "03",
      title: "CartGuard — Smart Checkout Verifier",
      description:
        "An intelligent shopping assistant detecting cart inconsistencies and deceptive pricing in real time with high accessibility standards.",
      technologies: ["TypeScript", "Chrome Extension API", "Tailwind CSS", "Security"],
      repository: "https://github.com/ayankrmondal2003-rgb",
    },
    {
      id: "04",
      title: "Sanjeevani — Healthcare Coordination",
      description:
        "A healthcare resource planning concept coordinating emergency services, hospital occupancy, and critical patient logistics.",
      technologies: ["React", "TypeScript", "Node.js", "Healthcare ML"],
      repository: "https://github.com/ayankrmondal2003-rgb",
    },
  ],
  skills: [
    {
      category: "Programming languages",
      technologies: ["Python", "TypeScript", "JavaScript", "C", "C++"],
      evidence:
        "Core languages applied across full-stack applications, machine learning pipelines, and systems programming.",
    },
    {
      category: "AI / ML technologies",
      technologies: ["PyTorch", "Gemini", "Groq", "FastAPI", "OpenCV", "Swin Transformer"],
      evidence:
        "Deep learning models in PyTorch, Swin Transformers in Meghdrishti, and sub-second LLM inference with Groq & Gemini APIs.",
    },
    {
      category: "Frontend development",
      technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "HTML", "CSS", "Chart.js"],
      evidence:
        "Interactive interfaces in SETU and ZENITH, modern reactive component systems, and high-performance tactile UI animations.",
    },
    {
      category: "Backend & data",
      technologies: ["Node.js", "FastAPI", "REST APIs", "Prisma", "SQLite", "WebSocket", "localStorage"],
      evidence:
        "Asynchronous FastAPI backends in Enterprise AI Interviewer, Node.js WebSocket synchronization, and Prisma database persistence.",
    },
    {
      category: "Development tools & DevOps",
      technologies: ["Git", "Docker", "npm", "Vercel", "Linux"],
      evidence:
        "Containerized model serving with Docker, version control with Git, and automated edge deployment pipelines on Vercel.",
    },
    {
      category: "Hardware & IoT",
      technologies: ["Arduino", "Tinkercad", "Ultrasonic Sensing", "Servo Control"],
      evidence:
        "Physical computing prototypes, embedded sensor integration, and real-time microcontroller automation.",
    },
  ],
  achievements: [
    {
      title: "TEJAS INDIA HACKATHON 2026",
      kind: "Selected — 24H Offline Finale",
      detail:
        "Advanced with SETU in the Bihar Tourism track to the 24-hour offline finale held at Government Engineering College, Jamui.",
    },
    {
      title: "ISRO BHARATIYA ANTARIKSH HACKATHON 2026",
      kind: "Team TRINOVA",
      detail:
        "Built Meghdrishti, an advanced GenAI and Swin Transformer satellite cloud-removal system for continuous earth observation.",
    },
    {
      title: "VICODATHON 2026",
      kind: "48H Build · Team Vector",
      detail:
        "Co-built the adaptive AI technical interviewer capable of dynamic reasoning and structured candidate evaluations in 48 hours.",
    },
    {
      title: "HACKARENA 2025",
      kind: "Haldia Institute of Technology",
      detail:
        "Developed the Parkinson’s disease predictive diagnostic model analyzing acoustic dysphonia biomarkers.",
    },
    {
      title: "Hacktoberfest’26 — Special Thanks",
      kind: "Open Source Recognition",
      detail:
        "Recognized for meaningful open-source contributions and community software development.",
    },
    {
      title: "Team 4LOOPS Collaboration",
      kind: "Core Team",
      detail:
        "Collaborating with Arpan Biswas, Aritra Adak, and Aritra Pal on hackathons, experiments, and technical ventures.",
    },
  ],
  certificates: [
    {
      title: "The Joy of Computing using Python",
      issuer: "NPTEL",
      kind: "12 Weeks • 4 Credits • Elite",
      image: "/certificates/nptel-python.jpg",
    },
    {
      title: "The Complete Python Bootcamp: From Zero to Hero in Python",
      issuer: "Udemy",
      kind: "Course Completion",
      image: "/certificates/udemy-python.jpg",
    },
    {
      title: "Business Communication and Ethics in Organizations",
      issuer: "Udemy",
      kind: "21.5 Hours",
      image: "/certificates/udemy-comm.jpg",
    },
    {
      title: "TEJAS INDIA HACKATHON 2026",
      issuer: "TEJAS INDIA",
      kind: "24H Offline Finale • Bihar Tourism",
      image: "/certificates/tejas.jpg",
    },
    {
      title: "Bharatiya Antariksh Hackathon 2026",
      issuer: "ISRO · Hack2skill",
      kind: "Participation & Idea Submission",
      image: "/certificates/isro.jpg",
    },
    {
      title: "VICODATHON 2026",
      issuer: "VICODATHON",
      kind: "48H Build • Team Vector",
      image: "/certificates/vicodathon.jpg",
    },
  ],
  team: {
    name: "4LOOPS",
    details:
      "A collaborative team for building, learning, and competing together in national hackathons and software projects.",
    members: ["Arpan Biswas", "Aritra Adak", "Ayan Kumar Mondal", "Aritra Pal"],
  },
  experience: [
    {
      title: "Independent Freelancer & Full-Stack Developer",
      organization: "Remote-First",
      description:
        "Developing bespoke web applications, interactive interfaces, and AI-powered tools for founders and international clients.",
    },
    {
      title: "AI & Full-Stack Engineer / Hackathon Lead",
      organization: "InnovateX & National Competitions",
      description:
        "Led multidisciplinary sprint teams building high-impact prototypes across geospatial analysis, healthcare ML, and tourism tech.",
    },
  ],
  provenance: {
    source,
    accessed: "2026-11-09",
    notes: [
      "Authentic portfolio data, project case studies, and credential assets imported directly from the user's live deployed portfolio.",
      "CV document downloaded and linked to /Ayan-Kumar-Mondal-CV.jpg.",
      "Credential gallery updated with official NPTEL, Udemy, TEJAS, ISRO, and VICODATHON certificates.",
    ],
  },
  todos: {
    projects: "TODO: Add live production deployments as projects graduate from hackathon prototypes.",
    certificates: "TODO: Update with upcoming credentials as certifications complete.",
    experience: "TODO: Add formal company internships or roles as they commence.",
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
