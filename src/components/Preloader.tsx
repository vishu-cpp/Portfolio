import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_SNAP } from "./ui";

const LINES: Array<[number, string]> = [
  [4, "> boot vishesh.dev --mode=prod"],
  [26, "> mounting /api /db /oss ......... ok"],
  [50, "> verifying latency budget <50ms . ok"],
  [72, "> compiling interface ............ ok"],
  [90, "> status: ready"],
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    let to = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else to = window.setTimeout(onDone, 420);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(to);
    };
  }, [onDone]);

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 0.85, ease: EASE_SNAP }}
      className="fixed inset-0 z-[90] flex flex-col justify-between overflow-hidden bg-ink p-6 md:p-10"
    >
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* boot log */}
      <div className="relative font-mono text-[11px] leading-[2.2] text-fog md:text-xs">
        {LINES.map(([threshold, line]) => (
          <p
            key={line}
            className="transition-opacity duration-500"
            style={{ opacity: n >= threshold ? 1 : 0.12 }}
          >
            <span className={n >= threshold ? "text-acc" : ""}>{line.split(" ")[0]} </span>
            {line.split(" ").slice(1).join(" ")}
          </p>
        ))}
      </div>

      {/* counter */}
      <div className="relative flex items-end justify-between">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
          backend engineer
          <br />
          portfolio v2.0 — new delhi
        </p>
        <p className="font-display text-[24vw] font-bold leading-[0.78] tracking-tighter text-bone md:text-[15rem]">
          {n}
          <span className="text-acc">%</span>
        </p>
      </div>

      {/* progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[3px] bg-acc transition-[width] duration-100 ease-linear glow-acc"
        style={{ width: `${n}%` }}
      />
    </motion.div>
  );
}
