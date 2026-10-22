import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowDown } from "lucide-react";
import { PROFILE, ROTATING } from "../lib/data";
import { scrollToId } from "../lib/scroll";
import { EASE, EASE_SNAP, Magnetic } from "./ui";
import { GithubIcon } from "./brands";

/* ---------------- IST clock ---------------- */

function Clock() {
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
  return <span className="tabular-nums text-fog">{t} IST</span>;
}

/* ---------------- rotating specialty ---------------- */

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % ROTATING.length), 2500);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex h-[1.5em] items-center overflow-hidden font-mono text-xs tracking-wide text-acc md:text-sm">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          transition={{ duration: 0.45, ease: EASE }}
          className="inline-block whitespace-nowrap"
        >
          &gt; {ROTATING[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ---------------- latency sparkline ---------------- */

function Sparkline() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const N = 64;
    const data: number[] = Array.from({ length: N }, () => 0.45);
    let v = 0.45;
    let raf = 0;
    let last = 0;

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last > 90) {
        last = t;
        v += (Math.random() - 0.5) * 0.24;
        v = Math.max(0.1, Math.min(0.9, v));
        data.push(v);
        data.shift();
      }
      ctx.clearRect(0, 0, w, h);

      ctx.beginPath();
      data.forEach((d, i) => {
        const px = (i / (N - 1)) * w;
        const py = h - d * (h * 0.66) - h * 0.17;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = "#4cf08b";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "rgba(76,240,139,0.75)";
      ctx.shadowBlur = 9;
      ctx.stroke();

      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(76,240,139,0.16)");
      g.addColorStop(1, "rgba(76,240,139,0)");
      ctx.shadowBlur = 0;
      ctx.fillStyle = g;
      ctx.fill();
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="h-full w-full" />;
}

/* ---------------- live request log ---------------- */

type Log = { id: number; method: string; path: string; status: number; ms: number; time: string };

const POOL = [
  { method: "POST", path: "/v1/auth/token", status: 200 },
  { method: "GET", path: "/v1/kyc/verify", status: 200 },
  { method: "POST", path: "/v1/cheque/print", status: 201 },
  { method: "GET", path: "/v1/facilities?pin=110016", status: 200 },
  { method: "POST", path: "/v1/webhooks/sms", status: 204 },
  { method: "GET", path: "/v1/health", status: 200 },
  { method: "PATCH", path: "/v1/ledger/txn_9812", status: 200 },
  { method: "GET", path: "/v1/metrics/p99", status: 200 },
  { method: "POST", path: "/v1/queue/retry", status: 202 },
  { method: "PUT", path: "/v1/cache/invalidate", status: 200 },
  { method: "POST", path: "/v1/payments/collect", status: 201 },
  { method: "GET", path: "/v1/users/vishesh", status: 200 },
];

const methodColor = (m: string) =>
  m === "GET"
    ? "text-acc"
    : m === "POST"
      ? "text-lav"
      : m === "DELETE"
        ? "text-blush"
        : "text-amber";

const statusColor = (s: number) =>
  s >= 500 ? "text-blush" : s >= 400 ? "text-amber" : "text-acc";

function useRequestLog() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    let to = 0;
    let id = 0;
    const makeLog = (): Log => {
      const base = POOL[Math.floor(Math.random() * POOL.length)];
      const rare = Math.random() < 0.05;
      id += 1;
      return {
        id,
        method: base.method,
        path: base.path,
        status: rare ? (Math.random() < 0.5 ? 429 : 500) : base.status,
        ms: Math.floor(1 + Math.random() * 42),
        time: new Date().toLocaleTimeString("en-GB", { hour12: false }),
      };
    };
    setLogs([makeLog(), makeLog(), makeLog(), makeLog()]);
    const push = () => {
      setLogs((prev) => [...prev.slice(-5), makeLog()]);
      to = window.setTimeout(push, 750 + Math.random() * 950);
    };
    to = window.setTimeout(push, 700);
    return () => window.clearTimeout(to);
  }, []);

  return logs;
}

/* ---------------- hero ---------------- */

export default function Hero({ booted }: { booted: boolean }) {
  const logs = useRequestLog();
  const latency = logs.length ? logs[logs.length - 1].ms : 12;
  const name = "VISHESH".split("");

  return (
    <section id="top" className="noise relative flex min-h-screen flex-col overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_65%_at_50%_32%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-44 right-[-8%] h-[560px] w-[560px] rounded-full bg-acc/[0.07] blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-12%] h-[440px] w-[440px] rounded-full bg-acc/[0.05] blur-[120px]" />

      <div className="relative mx-auto flex w-full max-w-[1680px] flex-1 flex-col px-5 md:px-10">
        {/* meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={booted ? { opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 1 }}
          className="flex items-center justify-between pt-24 font-mono text-[10px] text-dim md:pt-28 md:text-[11px]"
        >
          <span>~/portfolio — zsh — 80×24</span>
          <span className="hidden items-center gap-5 sm:flex">
            <span>{PROFILE.coords}</span>
            <Clock />
          </span>
        </motion.div>

        {/* headline */}
        <div className="mt-10 md:mt-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
            className="mb-4 font-mono text-[11px] text-fog md:mb-6 md:text-sm"
          >
            <span className="text-acc">//</span> product-minded backend engineer
          </motion.p>

          <h1
            aria-label="Vishesh"
            className="font-display text-[clamp(4.3rem,16.5vw,17.5rem)] leading-[0.83] font-bold tracking-[-0.035em] text-bone"
          >
            {name.map((c, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  initial={{ y: "115%" }}
                  animate={booted ? { y: 0 } : {}}
                  transition={{ duration: 1.05, delay: 0.12 + i * 0.055, ease: EASE_SNAP }}
                  className="inline-block"
                >
                  {c}
                </motion.span>
              </span>
            ))}
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={booted ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.75, duration: 0.5, ease: EASE_SNAP }}
              className="ml-2 inline-block text-acc"
            >
              .
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={booted ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.9 }}
            className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line pt-5 md:mt-9"
          >
            <span className="font-display text-lg font-medium tracking-tight text-bone md:text-2xl">
              Backend Engineer
              <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.25em] text-dim md:text-[11px]">
                ex-fintech / bfsi
              </span>
            </span>
            <RotatingWord />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-dim md:block md:text-[11px]">
              b.tech it — bvp &rsquo;25
            </span>
          </motion.div>
        </div>

        {/* lower */}
        <div className="mt-auto grid gap-10 pb-10 pt-14 md:pb-14 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.85, duration: 0.9, ease: EASE }}
            className="flex flex-col gap-8 lg:col-span-5"
          >
            <p className="max-w-md text-[15px] leading-relaxed text-fog">
              I design, build and optimise the invisible machinery of products —{" "}
              <span className="text-bone">REST APIs</span>,{" "}
              <span className="text-bone">microservices</span> and{" "}
              <span className="text-bone">databases</span> that stay fast under pressure.
              Currently shipping at Innodata.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Magnetic>
                <button
                  onClick={() => scrollToId("#work")}
                  data-cursor="view"
                  className="group flex items-center gap-3 rounded-full bg-acc px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink glow-acc"
                >
                  view work
                  <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="gh"
                  className="flex items-center gap-2.5 rounded-full border border-line px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-fog transition-colors hover:border-bone/40 hover:text-bone"
                >
                  <GithubIcon size={14} />
                  github
                </a>
              </Magnetic>
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
              <ArrowDown size={12} className="animate-bounce text-acc" />
              scroll to explore
            </div>
          </motion.div>

          {/* live console */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.95, duration: 1, ease: EASE }}
            className="lg:col-span-6 lg:col-start-7"
          >
            <div className="overflow-hidden rounded-xl border border-line bg-panel/80 backdrop-blur">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <span className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blush/60" />
                    <span className="h-2 w-2 rounded-full bg-amber/60" />
                    <span className="h-2 w-2 rounded-full bg-acc/60" />
                  </span>
                  <span className="font-mono text-[10px] text-dim">
                    tail -f /var/log/vishesh.api.log
                  </span>
                </div>
                <span className="font-mono text-[10px] text-acc">uptime 99.98%</span>
              </div>

              <div className="flex items-end justify-between gap-6 border-b border-line px-4 py-4">
                <div>
                  <p className="mb-1.5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-dim">
                    <Activity size={11} className="text-acc" />
                    live latency
                  </p>
                  <p className="font-display text-4xl font-semibold tabular-nums text-bone md:text-5xl">
                    {latency}
                    <span className="ml-1 text-xl text-acc md:text-2xl">ms</span>
                  </p>
                </div>
                <div className="h-14 w-40 md:h-16 md:w-60">
                  <Sparkline />
                </div>
              </div>

              <div className="mask-fade-t flex h-[170px] flex-col justify-end overflow-hidden px-4 py-3 font-mono text-[11px] leading-[2]">
                <AnimatePresence initial={false}>
                  {logs.map((l) => (
                    <motion.div
                      key={l.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="flex items-center gap-3 whitespace-nowrap"
                    >
                      <span className="text-dim tabular-nums">{l.time}</span>
                      <span className={`w-12 ${methodColor(l.method)}`}>{l.method}</span>
                      <span className="truncate text-bone/80">{l.path}</span>
                      <span className="ml-auto flex items-center gap-3">
                        <span className={`tabular-nums ${statusColor(l.status)}`}>{l.status}</span>
                        <span className="w-12 text-right tabular-nums text-dim">{l.ms}ms</span>
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
