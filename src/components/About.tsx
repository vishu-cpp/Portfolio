import { Reveal, SectionHead, CountUp } from "./ui";

const METRICS = [
  { value: 2, suffix: "", label: "engineering roles", note: "bfsi → ai data" },
  { value: 9, suffix: "th", label: "of 80 teams", note: "ieee hackathon" },
  { value: 24, suffix: "h", label: "fastest ship", note: "api under deadline" },
  { value: 8.22, decimals: 2, suffix: "", label: "cgpa / 10", note: "b.tech — it" },
];

const SYS = [
  ["uptime", "99.98%"],
  ["latency_budget", "<50ms"],
  ["deploy_on_friday", "false"],
  ["debug_mode", "always"],
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10">
        <SectionHead index="01" label="profile" note="whoami — human readable" />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* text */}
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="font-display text-[1.65rem] leading-[1.18] font-medium tracking-tight text-bone md:text-[2.75rem]">
                I build the <span className="text-acc">backend systems</span> products depend
                on — from <span className="text-acc">fintech kiosk workflows</span> to AI data
                pipelines, with an obsession for latency budgets{" "}
                <span className="text-dim">&amp;</span> reliability.
              </h3>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-fog">
                Hands-on experience designing, building and optimising low-latency APIs and
                backend microservices with JavaScript (Node.js), Python, PostgreSQL and
                MongoDB. Proven track record across fintech product lifecycles — owning
                features end-to-end, unit testing, and leveraging AI tooling to multiply
                development throughput. Most at home debugging system-level execution and
                architecting high-reliability RESTful services.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
                {METRICS.map((m) => (
                  <div key={m.label} className="bg-panel px-5 py-6 transition-colors duration-300 hover:bg-panel-2">
                    <p className="font-display text-4xl font-semibold tabular-nums text-bone md:text-[2.6rem]">
                      <CountUp value={m.value} decimals={m.decimals ?? 0} />
                      <span className="text-acc">{m.suffix}</span>
                    </p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                      {m.label}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-dim">{m.note}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* visual */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1} className="relative">
              <figure
                data-cursor="operator"
                className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-line"
              >
                <img
                  src="/images/operator.jpg"
                  alt="Vishesh at a terminal"
                  className="h-full w-full object-cover grayscale-[45%] transition-all duration-[1.4s] ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />

                {/* corner ticks */}
                <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-acc/70" />
                <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-acc/70" />
                <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-acc/70" />
                <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-acc/70" />

                <span className="absolute right-4 top-4 rounded-full border border-line bg-ink/70 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-fog backdrop-blur">
                  est. new delhi
                </span>
                <figcaption className="absolute bottom-4 left-4 font-mono text-[10px] text-fog">
                  <span className="text-acc">fig.01</span> — the operator at work
                </figcaption>
              </figure>

              <div className="relative z-10 mx-4 -mt-14 rounded-lg border border-line bg-panel/90 p-5 font-mono text-[11px] leading-[2.1] backdrop-blur md:mx-8">
                {SYS.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between">
                    <span className="text-fog">{k}</span>
                    <span className="mx-2 flex-1 border-b border-dotted border-line" />
                    <span className={v === "false" ? "text-blush" : "text-acc"}>{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
