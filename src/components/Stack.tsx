import { useState } from "react";
import { Braces, Check, Copy, Database, Server, SquareTerminal, Workflow } from "lucide-react";
import { Chip, Reveal, SectionHead } from "./ui";
import { JsonView } from "./ApiPlayground";

const GROUPS = [
  {
    icon: Server,
    title: "Backend & Systems",
    items: ["Node.js", "Express.js", "Python", "C++", "Go", "RESTful APIs", "JSON", "Microservices"],
  },
  {
    icon: Database,
    title: "Databases & Caching",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Query Optimization", "Schema Design"],
  },
  {
    icon: SquareTerminal,
    title: "DevTools & Productivity",
    items: ["Git", "GitHub", "Linux CLI", "Postman", "Unit Testing", "Cursor · AI-assisted"],
  },
  {
    icon: Workflow,
    title: "Engineering Practices",
    items: ["System Optimization", "Debugging", "CI/CD Pipelines", "Product-first Architecture", "Agile / Scrum"],
  },
];

const MANIFEST = {
  name: "vishesh",
  version: "2.0.26",
  role: "backend-engineer",
  engines: { node: ">=20", python: ">=3.11" },
  dependencies: {
    express: "^4.19.2",
    postgresql: "^16.3",
    mongodb: "^7.0",
    "linux-cli": "latest",
    curiosity: "infinity",
  },
  license: "MIT",
};

export default function Stack() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText("npm install vishesh");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  };

  return (
    <section id="stack" className="relative py-24 md:py-36">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10">
        <SectionHead index="05" label="the stack" note="dependencies, pinned" />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06}>
              <div className="group h-full rounded-xl border border-line bg-panel p-6 transition-colors duration-300 hover:border-acc/40 hover:bg-panel-2">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-panel-2 text-acc transition-colors group-hover:border-acc/40">
                  <g.icon size={18} />
                </div>
                <h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-fog">
                  {g.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* manifest */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-xs text-dim">
              <span className="text-acc">//</span> manifest
            </p>
            <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-bone md:text-4xl">
              My runtime, <span className="text-acc">pinned</span>.
            </h3>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fog">
              Every engineer ships a dependency tree. Mine leans on boring, battle-tested
              technology — because reliability is a feature, and uptime is the loudest thing a
              backend can say.
            </p>
            <button
              onClick={copy}
              data-cursor="copy"
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-fog transition-colors hover:border-acc/50 hover:text-acc"
            >
              {copied ? <Check size={13} className="text-acc" /> : <Copy size={13} />}
              {copied ? "copied" : "$ npm install vishesh"}
            </button>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="overflow-hidden rounded-xl border border-line bg-panel">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="flex items-center gap-2.5 font-mono text-[10px] text-dim">
                  <Braces size={12} className="text-acc" />
                  package.json
                </span>
                <span className="font-mono text-[10px] text-dim">4.2 kb</span>
              </div>
              <div className="p-4 md:p-5">
                <JsonView data={MANIFEST} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
