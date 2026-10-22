export const PROFILE = {
  name: "Vishesh",
  role: "Backend Engineer",
  location: "New Delhi, India",
  coords: "28.6139°N — 77.2090°E",
  email: "vishesh.9612@gmail.com",
  phone: "+91 99533 07161",
  linkedin: "https://www.linkedin.com/in/vishesh2003",
  github: "https://github.com/vishu-cpp",
};

export const ROTATING = [
  "low-latency rest apis",
  "fintech / bfsi systems",
  "microservices at scale",
  "query optimization",
  "execution debugging",
];

export const MARQUEE = [
  "Node.js",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Express.js",
  "TypeScript",
  "Go",
  "REST APIs",
  "Microservices",
  "Linux CLI",
  "Git",
  "CI/CD",
  "MySQL",
  "Postman",
];

export const PROJECTS = [
  {
    id: "krishihelp",
    index: "01",
    title: "KrishiHelp",
    tagline: "High-throughput RESTful web platform built for the farming ecosystem",
    year: "2025",
    image: "/images/krishihelp.jpg",
    github: "https://github.com/vishu-cpp/Farmer-Project.git",
    repo: "Farmer-Project",
    tech: ["Go (Golang)", "Node.js", "Express.js", "TypeScript", "MongoDB", "REST APIs"],
    highlights: [
      "Designed and built scalable backend REST endpoints managing real-time user requests, JSON parsing and asynchronous database calls.",
      "Implemented robust middleware for error handling, data validation and database connection pooling to minimise query latency.",
      "Authored unit tests and comprehensive API technical documentation to streamline onboarding and maintain code quality.",
    ],
  },
  {
    id: "ewaste",
    index: "02",
    title: "E-Waste Facility Locator",
    tagline: "Asynchronous API engine for discovering recycling infrastructure",
    year: "2024",
    image: "/images/ewaste.jpg",
    github: "https://github.com/vishu-cpp/EwasteLocater",
    repo: "EwasteLocater",
    tech: ["TypeScript", "JavaScript", "REST Integration", "JSON Parsing", "Client Caching"],
    highlights: [
      "Developed a lightweight, low-latency web application that ingests dynamic third-party REST APIs and parses complex JSON payloads in real time.",
      "Optimised query patterns and client-side data caching to ensure instant data availability and smooth state transitions.",
    ],
  },
];

export const OSS = [
  {
    name: "CircuitVerse",
    url: "https://github.com/CircuitVerse",
    note: "clean-code refactors · bug fixes · docs — digital logic simulator",
  },
  {
    name: "Hoodie",
    url: "https://github.com/hoodiehq",
    note: "bug fixes — offline-first javascript framework",
  },
  {
    name: "Activist Org",
    url: "https://github.com/activist-org",
    note: "contributions — open-source activism platform",
  },
];

export const EXPERIENCE = [
  {
    company: "Innodata",
    role: "Software / AI Analyst",
    period: "Feb 2026 — Present",
    type: "Full-Time",
    current: true,
    bullets: [
      "Developing automated Python/SQL backend validation scripts and API testing collections in Postman to debug data execution pipelines.",
      "Using Linux CLI utilities and execution-log analysis to diagnose high-throughput API latency bottlenecks and edge-case execution failures.",
      "Leveraging AI-assisted coding tools to automate testing workflows and script generation — increasing output and code-review velocity.",
      "Owning testing documentation, bug fixing and backend validation inside daily agile engineering stand-ups.",
    ],
  },
  {
    company: "VirtuBox Infotech Pvt. Ltd.",
    role: "Client Success Trainee — Product Management (Fintech / BFSI)",
    period: "Apr 2025 — Dec 2025",
    type: "Trainee",
    current: false,
    letter:
      "https://drive.google.com/file/d/1TCS_l8tv7iOo4PobwtBJyO2CYWp1ds2t/view?usp=sharing",
    bullets: [
      "Spearheaded 0→1 product specifications and technical execution for a native cheque-printing kiosk application serving BFSI banking clients.",
      "Collaborated with senior backend engineers to design REST APIs, optimise transaction data flows and maintain zero-downtime execution.",
      "Conducted unit testing, functional debugging and payload validation to isolate API error states and improve backend system stability.",
    ],
  },
];

export const ACTIVITIES = [
  {
    icon: "oss",
    title: "Open Source Contributor",
    desc: "Active contributor submitting clean-code refactors, bug fixes and documentation across CircuitVerse, Hoodie and Activist Org.",
    tag: "git push upstream",
  },
  {
    icon: "trophy",
    title: "IEEE Hackathon — 9th / 80",
    desc: "Secured 9th place out of 80 teams, rapidly architecting and shipping a working API service under a 24-hour deadline.",
    tag: "shipped in 24h",
  },
  {
    icon: "network",
    title: "Technical Head — Campus Blocks BVP",
    desc: "Coordinated domain setups, server infrastructure and platform testing for technical hackathons on campus.",
    tag: "infra · ops",
  },
  {
    icon: "shield",
    title: "NCC 'C' Certificate",
    desc: "Army Wing training emphasising discipline, crisis management and operational leadership.",
    tag: "army wing",
  },
];

export const EDUCATION = [
  {
    school: "Bharati Vidyapeeth College of Engineering",
    place: "New Delhi",
    degree: "B.Tech — Information Technology",
    period: "2021 — 2025",
    score: "8.22",
    scoreLabel: "CGPA / 10",
  },
  {
    school: "Kendriya Vidyalaya",
    place: "CBSE",
    degree: "Senior & Secondary Education",
    period: "— 2021",
    score: "79.66 / 86.66",
    scoreLabel: "XII %  /  X %",
  },
];

export type Endpoint = {
  id: string;
  method: string;
  path: string;
  desc: string;
  body: unknown;
};

export const ENDPOINTS: Endpoint[] = [
  {
    id: "profile",
    method: "GET",
    path: "/v1/profile",
    desc: "whoami — as structured data",
    body: {
      name: "Vishesh",
      title: "Backend Engineer",
      location: "New Delhi, IN",
      available_for: ["backend", "platform", "api-engineering"],
      currently: { company: "Innodata", role: "Software / AI Analyst" },
      previously: ["VirtuBox Infotech — fintech / BFSI"],
      focus: ["low-latency APIs", "microservices", "fintech workflows"],
      superpowers: ["system-level debugging", "end-to-end ownership", "ai-assisted velocity"],
      ships_on_fridays: false,
    },
  },
  {
    id: "stack",
    method: "GET",
    path: "/v1/stack",
    desc: "languages, databases & tooling",
    body: {
      languages: ["JavaScript / TypeScript", "Python", "C++", "Go"],
      backend: ["Node.js", "Express.js", "REST", "Microservices"],
      databases: ["PostgreSQL", "MySQL", "MongoDB"],
      tooling: ["Git", "GitHub", "Linux CLI", "Postman", "Cursor (AI-assisted)"],
      practices: ["unit testing", "query optimisation", "ci/cd", "agile / scrum"],
      latency_tolerance_ms: 50,
    },
  },
  {
    id: "activity",
    method: "GET",
    path: "/v1/activity",
    desc: "open source & beyond the terminal",
    body: {
      open_source: ["CircuitVerse", "Hoodie", "Activist Org"],
      hackathons: [{ event: "IEEE Hackathon", rank: "9 / 80", shipped_in: "24h" }],
      leadership: ["Technical Head — Campus Blocks BVP", "NCC 'C' Certificate — Army Wing"],
    },
  },
  {
    id: "education",
    method: "GET",
    path: "/v1/education",
    desc: "degrees & scores",
    body: [
      {
        school: "Bharati Vidyapeeth COE, New Delhi",
        degree: "B.Tech — Information Technology",
        period: "2021 — 2025",
        cgpa: 8.22,
      },
      {
        school: "Kendriya Vidyalaya (CBSE)",
        class_xii: "79.66%",
        class_x: "86.66%",
      },
    ],
  },
];
