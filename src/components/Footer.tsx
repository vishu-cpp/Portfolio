import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { PROFILE } from "../lib/data";
import { scrollToId } from "../lib/scroll";
import { Magnetic, Reveal, SectionHead } from "./ui";
import { GithubIcon, LinkedinIcon } from "./brands";

function IstClock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const f = () =>
      setT(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    f();
    const id = window.setInterval(f, 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums text-bone">{t} IST</span>;
}

const ROWS = [
  { icon: Mail, label: "email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: Phone, label: "phone", value: PROFILE.phone, href: "tel:+919953307161" },
  { icon: LinkedinIcon, label: "linkedin", value: "/in/vishesh2003", href: PROFILE.linkedin },
  { icon: GithubIcon, label: "github", value: "/vishu-cpp", href: PROFILE.github },
];

export default function Footer() {
  return (
    <footer id="contact" className="noise relative overflow-hidden pb-8 pt-24 md:pt-36">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,black,transparent)]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-acc/[0.06] blur-[130px]" />

      <div className="relative mx-auto w-full max-w-[1680px] px-5 md:px-10">
        <SectionHead index="07" label="contact" note="response time < 24h" />

        <Reveal>
          <h3 className="font-display text-[clamp(2.9rem,10vw,9.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em] text-bone">
            Let&rsquo;s build
            <br />
            <span className="text-stroke-acc">something</span>{" "}
            <span className="text-acc">reliable</span>
            <span className="text-bone">.</span>
          </h3>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-8">
          <Reveal delay={0.08}>
            <Magnetic strength={0.25}>
              <a
                href={`mailto:${PROFILE.email}`}
                data-cursor="send"
                className="group flex items-center gap-3.5 rounded-full bg-acc px-8 py-5 font-mono text-xs font-bold tracking-[0.12em] text-ink glow-acc transition-transform md:text-sm"
              >
                <Mail size={16} className="transition-transform duration-300 group-hover:-rotate-12" />
                {PROFILE.email}
              </a>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col gap-2 font-mono text-[11px] text-dim md:text-right">
              <span className="flex items-center gap-2.5 md:justify-end">
                <MapPin size={12} className="text-acc" />
                new delhi, in — <IstClock />
              </span>
              <span className="flex items-center gap-2.5 md:justify-end">
                <span className="h-1.5 w-1.5 rounded-full bg-acc animate-pulse-dot" />
                open to backend & platform roles
              </span>
            </div>
          </Reveal>
        </div>

        {/* contact rows */}
        <div className="mt-16 grid border-t border-line md:grid-cols-2">
          {ROWS.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.05}>
              <a
                href={r.href}
                target={r.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                data-cursor="ping"
                className={`group flex items-center gap-5 border-b border-line py-6 pr-2 transition-colors hover:bg-panel-2 md:px-4 ${
                  i % 2 === 0 ? "md:border-r" : ""
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-panel-2 text-acc">
                  <r.icon size={15} />
                </span>
                <span className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-dim">
                    {r.label}
                  </span>
                  <span className="mt-1 font-mono text-sm text-bone transition-colors group-hover:text-acc">
                    {r.value}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="ml-auto text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acc"
                />
              </a>
            </Reveal>
          ))}
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line pt-6 font-mono text-[10px] text-dim">
          <span>© 2026 vishesh — all systems nominal</span>
          <span className="hidden md:block">28.6139°n · 77.2090°e</span>
          <span className="text-acc">status: 200 ok</span>
          <span className="hidden lg:block">react · vite · tailwind · framer-motion</span>
          <button
            onClick={() => scrollToId("#top")}
            data-cursor="top"
            className="group flex items-center gap-2 text-fog transition-colors hover:text-acc"
          >
            $ cd ~
            <ArrowUp size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
