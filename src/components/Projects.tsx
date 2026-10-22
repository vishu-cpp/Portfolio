import { ArrowUpRight, ChevronRight } from "lucide-react";
import { GitBranch } from "lucide-react";
import { OSS, PROJECTS } from "../lib/data";
import { Chip, Reveal, SectionHead } from "./ui";

export default function Projects() {
  return (
    <section id="work" className="relative py-24 md:py-36">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10">
        <SectionHead index="03" label="selected work" note="github.com/vishu-cpp" />

        {PROJECTS.map((p, i) => (
          <Reveal key={p.id}>
            <article className="group grid items-center gap-10 border-t border-line py-14 md:py-20 lg:grid-cols-12 lg:gap-14">
              {/* visual */}
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                className={`relative block overflow-hidden rounded-xl border border-line lg:col-span-7 ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover grayscale-[35%] transition-all duration-[1.3s] ease-out group-hover:scale-[1.045] group-hover:grayscale-0"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/10" />

                <span className="absolute left-4 top-4 rounded-full border border-line bg-ink/70 px-3 py-1 font-mono text-[10px] text-acc backdrop-blur">
                  /{p.index}
                </span>
                <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-acc text-ink opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <ArrowUpRight size={17} />
                </span>
                <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-line bg-ink/70 px-3.5 py-1.5 font-mono text-[10px] text-fog backdrop-blur">
                  <GitBranch size={11} className="text-acc" />
                  git: {p.repo}
                </span>
              </a>

              {/* copy */}
              <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="mb-3 flex items-baseline gap-4">
                  <span className="font-mono text-sm text-acc">/{p.index}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
                    {p.year}
                  </span>
                </div>
                <h3 className="font-display text-4xl font-semibold tracking-tight text-bone transition-colors duration-500 group-hover:text-acc md:text-5xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] text-fog">{p.tagline}</p>

                <ul className="mt-7 space-y-3.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[13.5px] leading-relaxed text-fog">
                      <ChevronRight size={13} className="mt-1 shrink-0 text-acc" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>

                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="visit"
                  className="group/link mt-9 inline-flex items-center gap-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-acc text-ink transition-transform duration-500 group-hover/link:rotate-45">
                    <ArrowUpRight size={15} />
                  </span>
                  <span className="border-b border-acc/40 pb-0.5 transition-colors group-hover/link:text-acc">
                    view on github
                  </span>
                </a>
              </div>
            </article>
          </Reveal>
        ))}

        {/* open source strip */}
        <div className="border-t border-line">
          <Reveal>
            <p className="py-7 font-mono text-xs text-dim">
              <span className="text-acc">//</span> also contributing — open source
            </p>
          </Reveal>
          <div className="border-t border-line">
            {OSS.map((o, i) => (
              <Reveal key={o.name} delay={i * 0.05}>
                <a
                  href={o.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="oss"
                  className="group -mx-3 flex items-center gap-6 rounded-lg border-b border-line px-3 py-6 transition-colors duration-300 hover:bg-panel-2"
                >
                  <span className="font-mono text-[10px] text-dim">0{i + 1}</span>
                  <span className="font-display text-xl font-medium text-bone transition-colors duration-300 group-hover:text-acc md:text-2xl">
                    {o.name}
                  </span>
                  <span className="ml-auto hidden font-mono text-[11px] text-dim md:block">
                    {o.note}
                  </span>
                  <ArrowUpRight
                    size={17}
                    className="shrink-0 text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acc md:ml-4"
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
