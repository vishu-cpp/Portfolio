<div align="center">

# Vishesh — Backend Engineer Portfolio

**A portfolio that behaves like the systems I build — a terminal-first, API-driven personal site where the resume is served as JSON endpoints.**

![React](https://img.shields.io/badge/React_19-101010?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_7-101010?style=for-the-badge&logo=vite&logoColor=BD34FE)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-101010?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-101010?style=for-the-badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-101010?style=for-the-badge&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-101010?style=for-the-badge)

[**Live Demo →**](https://your-vercel-url.vercel.app) <!-- TODO: replace with your deployed URL -->

</div>

---

## Overview

Instead of a conventional "About Me" page, this portfolio presents my resume the way a backend engineer would — **as a production system**: a terminal boot sequence, a live API request log with a latency sparkline, and an interactive console where my profile, stack, activity, and education are queryable as REST-style endpoints.

Everything is hand-built: no templates, no UI kits — custom cursor, Lenis smooth scrolling, physics-based motion, and AI-generated artwork.

> **The signature feature:** hit an endpoint, get my resume as syntax-highlighted JSON.

```bash
curl -s https://api.vishesh.dev/v1/profile | jq .
```

```json
{
  "name": "Vishesh",
  "title": "Backend Engineer",
  "location": "New Delhi, IN",
  "currently": { "company": "Innodata", "role": "Software / AI Analyst" },
  "focus": ["low-latency APIs", "microservices", "fintech workflows"],
  "ships_on_fridays": false
}
```

## Features

- **Terminal boot preloader** — typed system logs, progress counter, exit sweep
- **Live API request log** — `tail -f`-style console streaming mock production traffic (`POST /v1/cheque/print → 201 · 12ms`) with a real-time canvas latency sparkline
- **API Playground** — four interactive endpoints (`/v1/profile`, `/v1/stack`, `/v1/activity`, `/v1/education`) rendered as recursive, syntax-highlighted JSON with copyable `curl` commands
- **Selected Work** — project case cards with AI-generated cover art, tech chips, and repo links, plus an open-source contribution index (CircuitVerse, Hoodie, Activist Org)
- **Experience timeline** — animated rail with a pulsing "current role" node
- **`package.json` manifest** — the tech stack presented as pinned dependencies, with an `npm install vishesh` copy button
- **Custom cursor** — contextual labels (`open`, `GET`, `copy`, `send`) with spring-follow physics
- **Butter-smooth scrolling** — Lenis + scroll-progress bar + staggered reveals via Framer Motion
- **Live IST clock**, text-scramble section labels, magnetic buttons, animated count-up metrics
- **Fully responsive** — mobile nav overlay, touch-safe fallbacks (custom cursor only renders on `pointer: fine`)

## Tech Stack

| Layer         | Choice                                   |
| ------------- | ---------------------------------------- |
| Framework     | React 19 + TypeScript                    |
| Build tool    | Vite 7                                   |
| Styling       | Tailwind CSS v4 (`@theme` design tokens) |
| Animation     | Framer Motion, CSS keyframes, Canvas API |
| Smooth scroll | Lenis                                    |
| Icons         | Lucide + custom brand SVGs               |
| Fonts         | Space Grotesk · JetBrains Mono · Inter   |
| Hosting       | Vercel                                   |

## Getting Started

**Prerequisites:** Node.js ≥ 20 and npm.

```bash
# 1. clone
git clone https://github.com/vishu-cpp/portfolio.git
cd portfolio

# 2. install dependencies
npm install

# 3. start the dev server
npm run dev
# → http://localhost:5173

# 4. production build + preview
npm run build
npm run preview
```

| Script            | Purpose                              |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Local dev server with hot reload     |
| `npm run build`   | Optimized production build → `dist/` |
| `npm run preview` | Serve the production build locally   |

## Project Structure

```
├── public/images/            # AI-generated artwork (project covers, operator shot)
├── src/
│   ├── components/
│   │   ├── Preloader.tsx     # terminal boot sequence
│   │   ├── Cursor.tsx        # custom contextual cursor
│   │   ├── Nav.tsx           # fixed nav + scroll progress + mobile overlay
│   │   ├── Hero.tsx          # giant type, live request log, latency sparkline
│   │   ├── Marquee.tsx       # infinite skills ticker
│   │   ├── About.tsx         # profile + animated metrics + sys stats
│   │   ├── ApiPlayground.tsx # resume-as-JSON console (recursive JsonView)
│   │   ├── Projects.tsx      # case cards + open-source index
│   │   ├── Experience.tsx    # timeline with animated rail
│   │   ├── Stack.tsx         # skill groups + package.json manifest
│   │   ├── Activities.tsx    # oss / hackathon / leadership + education
│   │   ├── Footer.tsx        # contact + status bar
│   │   ├── brands.tsx        # GitHub / LinkedIn SVG icons
│   │   └── ui.tsx            # shared primitives: Reveal, Magnetic, Scramble, CountUp
│   ├── lib/
│   │   ├── data.ts           # ← all resume content lives here (single source of truth)
│   │   └── scroll.ts         # Lenis singleton + anchor scrolling
│   ├── App.tsx               # composition + smooth-scroll bootstrap
│   ├── index.css             # design tokens, keyframes, utilities
│   └── main.tsx
└── index.html
```

## Customizing

All content is centralized in **`src/lib/data.ts`** — projects, experience, skills, activities, education, and the API endpoint bodies. Edit that one file and the entire site (including the JSON playground) updates. Design tokens (colors, fonts, animations) live in the `@theme` block of `src/index.css`.

## Deployment

The project is a standard Vite app — zero config needed on Vercel:

1. Push this repo to GitHub
2. [vercel.com](https://vercel.com) → **Add New → Project** → import the repo
3. Vercel auto-detects Vite (`build: npm run build`, `output: dist/`) → **Deploy**

Every push to `main` triggers an automatic redeploy.

## Author

**Vishesh** — Backend Engineer, New Delhi

- Portfolio: [your-vercel-url.vercel.app](https://your-vercel-url.vercel.app) <!-- TODO -->
- GitHub: [@vishu-cpp](https://github.com/vishu-cpp)
- LinkedIn: [in/vishesh2003](https://www.linkedin.com/in/vishesh2003)
- Email: [vishesh.9612@gmail.com](mailto:vishesh.9612@gmail.com)

## License

MIT — feel free to fork and make it your own. A star is appreciated if it helped.

---

<div align="center">
  <sub>Designed & engineered by Vishesh · artwork AI-generated · © 2026</sub>
</div>
