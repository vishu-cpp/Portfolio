<img src="docs/header.svg" width="100%" alt="vishesh.dev — backend engineer portfolio"/>

<div align="center">

[![React](https://img.shields.io/badge/React_19-101010?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_7-101010?style=flat-square&logo=vite&logoColor=BD34FE)](https://vite.dev)
[![Tailwind v4](https://img.shields.io/badge/Tailwind_v4-101010?style=flat-square&logo=tailwindcss&logoColor=38BDF8)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-101010?style=flat-square&logo=framer&logoColor=white)](https://motion.dev)
[![Lenis](https://img.shields.io/badge/Lenis-101010?style=flat-square&logoColor=4cf08b)](https://lenis.darkroom.engineering)
[![Vercel](https://img.shields.io/badge/▲_Deployed_on_Vercel-101010?style=flat-square)](https://vercel.com)

<br>

### [`  view live demo  →  `](https://your-vercel-url.vercel.app) <!-- TODO: replace with your deployed URL -->

<sub>**a portfolio that behaves like the systems I build — terminal-first, API-driven, and obsessed with latency**</sub>

</div>

<!-- TODO: drop your screen recording in as docs/demo.gif, then uncomment the block below
<div align="center">
  <img src="docs/demo.gif" width="92%" alt="portfolio walkthrough"/>
</div>
-->

<img src="docs/divider.svg" width="100%"/>

<br>

Instead of an "About Me" page, this portfolio presents the resume the way a backend engineer would — **as a production system**. A terminal boot sequence greets you, a live request log streams mock traffic with a real-time latency sparkline, and an interactive console lets you query my profile, stack, and education as REST-style endpoints that return syntax-highlighted JSON.

No templates. No UI kits. Every pixel is hand-rolled.

<div align="center">
<table>
<tr>
<td align="center" width="200"><br><samp><b>200 OK</b></samp><br><sub>site status</sub><br>&nbsp;</td>
<td align="center" width="200"><br><samp><b>12ms</b></samp><br><sub>latency budget</sub><br>&nbsp;</td>
<td align="center" width="200"><br><samp><b>4</b></samp><br><sub>queryable endpoints</sub><br>&nbsp;</td>
<td align="center" width="200"><br><samp><b>99.98%</b></samp><br><sub>uptime (allegedly)</sub><br>&nbsp;</td>
</tr>
</table>
</div>

<img src="docs/divider.svg" width="100%"/>

<h2><samp>&gt; ./features</samp></h2>

<table>
<tr>
<td width="50%" valign="top">

**▸ terminal boot preloader**
<br><sub>typed system logs, progress counter, exit sweep — the site literally boots</sub>

**▸ live request log**
<br><sub>`tail -f` console streaming mock production traffic — `POST /v1/cheque/print → 201 · 12ms`</sub>

**▸ latency sparkline**
<br><sub>real-time canvas chart with phosphor glow, driven by a random-walk engine</sub>

**▸ api playground**
<br><sub>four interactive endpoints returning my resume as recursive, highlighted JSON</sub>

</td>
<td width="50%" valign="top">

**▸ custom cursor**
<br><sub>spring-follow physics with contextual labels — `open`, `GET`, `copy`, `send`</sub>

**▸ butter-smooth motion**
<br><sub>Lenis scroll + staggered Framer Motion reveals + magnetic buttons</sub>

**▸ package.json manifest**
<br><sub>the stack presented as pinned deps, with an `npm install vishesh` copy button</sub>

**▸ ai-generated artwork**
<br><sub>bespoke project covers + operator shot, tuned to the phosphor palette</sub>

</td>
</tr>
</table>

<img src="docs/divider.svg" width="100%"/>

<h2><samp>&gt; ./api — the resume, machine-readable</samp></h2>

The signature piece. Hit an endpoint, get structured data back:

| Endpoint            | Returns                               | Try it in the console                          |
| ------------------- | ------------------------------------- | ---------------------------------------------- |
| `GET /v1/profile`   | whoami — role, focus, current company | `curl -s https://api.vishesh.dev/v1/profile`   |
| `GET /v1/stack`     | languages, databases, tooling         | `curl -s https://api.vishesh.dev/v1/stack`     |
| `GET /v1/activity`  | open source, hackathons, leadership   | `curl -s https://api.vishesh.dev/v1/activity`  |
| `GET /v1/education` | degrees & scores                      | `curl -s https://api.vishesh.dev/v1/education` |

<details>
<summary><samp>&gt; sample response — GET /v1/profile</samp></summary>
<br>

```json
{
  "name": "Vishesh",
  "title": "Backend Engineer",
  "location": "New Delhi, IN",
  "currently": { "company": "Innodata", "role": "Software / AI Analyst" },
  "focus": ["low-latency APIs", "microservices", "fintech workflows"],
  "superpowers": [
    "system-level debugging",
    "end-to-end ownership",
    "ai-assisted velocity"
  ],
  "ships_on_fridays": false
}
```

</details>

<img src="docs/divider.svg" width="100%"/>

<h2><samp>&gt; ./stack</samp></h2>

<table>
<tr>
<td width="33%" valign="top">

**core**
<br><sub>React 19 · TypeScript</sub>
<br><sub>Vite 7</sub>
<br><sub>Tailwind CSS v4</sub>

</td>
<td width="33%" valign="top">

**motion & feel**
<br><sub>Framer Motion</sub>
<br><sub>Lenis smooth scroll</sub>
<br><sub>Canvas API</sub>

</td>
<td width="33%" valign="top">

**details**
<br><sub>Lucide + custom SVGs</sub>
<br><sub>Space Grotesk · JetBrains Mono</sub>
<br><sub>deployed on ▲ Vercel</sub>

</td>
</tr>
</table>

<img src="docs/divider.svg" width="100%"/>

<h2><samp>&gt; ./quickstart</samp></h2>

**prereq:** `node >= 20`

```bash
git clone https://github.com/vishu-cpp/portfolio.git
cd portfolio
npm install        # one-time
npm run dev        # → http://localhost:5173
```

| script            | what it does               |
| ----------------- | -------------------------- |
| `npm run dev`     | dev server with hot reload |
| `npm run build`   | optimized build → `dist/`  |
| `npm run preview` | serve the production build |

<img src="docs/divider.svg" width="100%"/>

<h2><samp>&gt; ./structure</samp></h2>

```
src/
├── components/
│   ├── Preloader.tsx      # terminal boot sequence
│   ├── Cursor.tsx         # custom contextual cursor
│   ├── Nav.tsx            # fixed nav + scroll progress + mobile overlay
│   ├── Hero.tsx           # giant type · live request log · sparkline
│   ├── Marquee.tsx        # infinite skills ticker
│   ├── About.tsx          # profile · animated metrics · sys stats
│   ├── ApiPlayground.tsx  # resume-as-JSON console (recursive JsonView)
│   ├── Projects.tsx       # case cards + open-source index
│   ├── Experience.tsx     # timeline with animated rail
│   ├── Stack.tsx          # skill groups + package.json manifest
│   ├── Activities.tsx     # oss · hackathon · leadership · education
│   ├── Footer.tsx         # contact + status bar
│   └── ui.tsx             # Reveal · Magnetic · Scramble · CountUp
├── lib/
│   ├── data.ts            # ← all content lives here (single source of truth)
│   └── scroll.ts          # Lenis singleton + anchor scrolling
├── index.css              # design tokens · keyframes · utilities
└── App.tsx                # composition + smooth-scroll bootstrap
```

> **want to reuse this?** edit `src/lib/data.ts` — projects, experience, endpoints, everything updates site-wide. theme tokens live in the `@theme` block of `src/index.css`.

<img src="docs/divider.svg" width="100%"/>

<h2><samp>&gt; ./deploy</samp></h2>

Zero config — it's a standard Vite app.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vishu-cpp/portfolio)

<sub>or manually: push to GitHub → [vercel.com](https://vercel.com) → import repo → Vercel auto-detects Vite → **deploy** · every push to `main` auto-redeploys</sub>

<img src="docs/divider.svg" width="100%"/>

<h2><samp>&gt; ./contact</samp></h2>

<div align="center">

[![Email](https://img.shields.io/badge/vishesh.9612@gmail.com-101010?style=flat-square&logo=gmail&logoColor=4cf08b)](mailto:vishesh.9612@gmail.com)
[![LinkedIn](https://img.shields.io/badge/in/vishesh2003-101010?style=flat-square&logo=linkedin&logoColor=4cf08b)](https://www.linkedin.com/in/vishesh2003)
[![GitHub](https://img.shields.io/badge/@vishu--cpp-101010?style=flat-square&logo=github&logoColor=4cf08b)](https://github.com/vishu-cpp)
[![Phone](https://img.shields.io/badge/+91_99533_07161-101010?style=flat-square&logoColor=4cf08b)](tel:+919953307161)

<sub>backend engineer · new delhi, in · **open to backend & platform roles**</sub>

<br>

**if this repo helped you build something cool — a star goes a long way ⭐**

</div>

<img src="docs/footer.svg" width="100%" alt="session closed"/>
