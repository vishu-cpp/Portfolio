import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_SNAP: [number, number, number, number] = [0.76, 0, 0.24, 1];

/* ---------------- Reveal ---------------- */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Scramble text ---------------- */

const CHARS = "!<>-_\\/[]{}=+*^?#";

export function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      const done = Math.floor(frame / 2);
      setOut(
        text
          .split("")
          .map((c, i) =>
            c === " " ? " " : i < done ? c : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("")
      );
      if (done >= text.length) {
        setOut(text);
        window.clearInterval(id);
      }
    }, 26);
    return () => window.clearInterval(id);
  }, [inView, text]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}

/* ---------------- Section heading ---------------- */

export function SectionHead({
  index,
  label,
  note,
}: {
  index: string;
  label: string;
  note?: string;
}) {
  return (
    <Reveal className="mb-12 md:mb-20">
      <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
        <div className="flex items-baseline gap-4 md:gap-6">
          <span className="font-mono text-[11px] md:text-xs text-acc">/{index}</span>
          <h2 className="font-mono text-xs md:text-sm uppercase tracking-[0.35em] text-fog">
            <Scramble text={label} />
          </h2>
        </div>
        {note && (
          <span className="hidden md:block font-mono text-[11px] text-dim">{note}</span>
        )}
      </div>
    </Reveal>
  );
}

/* ---------------- Magnetic wrapper ---------------- */

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 160, damping: 14, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={className}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Chip ---------------- */

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-panel-2 px-3 py-1 font-mono text-[11px] text-fog transition-colors duration-300 hover:border-acc/40 hover:text-bone">
      {children}
    </span>
  );
}

/* ---------------- CountUp ---------------- */

export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration, ease: EASE });
    return () => controls.stop();
  }, [inView, value, duration, mv]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
