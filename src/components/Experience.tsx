import { motion } from "framer-motion";
import { ChevronRight, FileText } from "lucide-react";
import { EXPERIENCE } from "../lib/data";
import { EASE, Reveal, SectionHead } from "./ui";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-36">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10">
        <SectionHead index="04" label="experience" note="2025 → present" />

        <div className="relative">
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease: EASE }}
            className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-line"
          />

          <div className="space-y-16 md:space-y-24">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.company} delay={i * 0.06}>
                <article className="relative pl-10 md:pl-16">
                  <span
                    className={`absolute left-0 top-2.5 h-[11px] w-[11px] rounded-full border-2 border-ink ${
                      e.current ? "bg-acc animate-pulse-dot" : "bg-dim"
                    }`}
                  />

                  <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-4">
                    <div>
                      <h3 className="font-display text-3xl font-semibold tracking-tight text-bone md:text-5xl">
                        {e.company}
                      </h3>
                      <p className="mt-2.5 flex flex-wrap items-center gap-3 font-mono text-xs text-acc md:text-sm">
                        {e.role}
                        {e.current && (
                          <span className="rounded-full border border-acc/30 bg-acc/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-acc">
                            current
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="md:text-right">
                      <p className="font-mono text-xs text-fog">{e.period}</p>
                      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
                        {e.type}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-8 max-w-3xl space-y-3.5">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[14px] leading-relaxed text-fog">
                        <ChevronRight size={13} className="mt-1 shrink-0 text-acc" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {e.letter && (
                    <a
                      href={e.letter}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="pdf"
                      className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fog transition-colors hover:border-acc/50 hover:text-acc"
                    >
                      <FileText size={12} />
                      experience letter
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
