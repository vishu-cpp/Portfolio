import {
  GitPullRequest,
  GraduationCap,
  Network,
  School,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { ACTIVITIES, EDUCATION } from "../lib/data";
import { CountUp, Reveal, SectionHead } from "./ui";

const ICONS: Record<string, typeof Trophy> = {
  oss: GitPullRequest,
  trophy: Trophy,
  network: Network,
  shield: ShieldCheck,
};

const EDU_ICONS = [GraduationCap, School];

export default function Activities() {
  return (
    <section id="beyond" className="relative py-24 md:py-36">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10">
        <SectionHead index="06" label="beyond the terminal" note="oss · hackathons · leadership" />

        <div className="grid gap-4 md:grid-cols-2">
          {ACTIVITIES.map((a, i) => {
            const Icon = ICONS[a.icon] ?? Trophy;
            return (
              <Reveal key={a.title} delay={i * 0.05}>
                <div className="group relative h-full overflow-hidden rounded-xl border border-line bg-panel p-7 transition-colors duration-300 hover:border-acc/40 md:p-8">
                  <span className="pointer-events-none absolute -right-4 -top-6 font-display text-[7rem] font-bold leading-none text-bone/[0.04] transition-colors duration-500 group-hover:text-acc/[0.07]">
                    0{i + 1}
                  </span>
                  <div className="relative">
                    <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-panel-2 text-acc">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-bone md:text-2xl">
                      {a.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[14px] leading-relaxed text-fog">{a.desc}</p>
                    <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-acc/80">
                      {a.tag}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* education */}
        <div className="mt-20 md:mt-28">
          <Reveal>
            <p className="mb-8 font-mono text-xs text-dim">
              <span className="text-acc">//</span> education — the formal bits
            </p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {EDUCATION.map((e, i) => {
              const Icon = EDU_ICONS[i] ?? GraduationCap;
              return (
                <Reveal key={e.school} delay={i * 0.06}>
                  <div className="flex h-full flex-col justify-between gap-8 rounded-xl border border-line bg-panel p-7 transition-colors duration-300 hover:border-acc/40 md:p-8">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h3 className="font-display text-2xl font-semibold tracking-tight text-bone">
                          {e.school}
                        </h3>
                        <p className="mt-2 font-mono text-xs text-fog">
                          {e.degree} · {e.place}
                        </p>
                        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
                          {e.period}
                        </p>
                      </div>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-panel-2 text-acc">
                        <Icon size={18} />
                      </div>
                    </div>
                    <div className="flex items-end justify-between border-t border-line pt-5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
                        {e.scoreLabel}
                      </span>
                      <span className="font-display text-4xl font-semibold tabular-nums text-acc">
                        {i === 0 ? <CountUp value={8.22} decimals={2} /> : e.score}
                      </span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
