import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { GithubIcon } from "./brands";
import { scrollToId } from "../lib/scroll";
import { PROFILE } from "../lib/data";
import { EASE_SNAP } from "./ui";

const LINKS = [
  { id: "#work", n: "01", label: "work" },
  { id: "#experience", n: "02", label: "experience" },
  { id: "#stack", n: "03", label: "stack" },
  { id: "#contact", n: "04", label: "contact" },
];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 26 });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE_SNAP }}
        className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-500 ${
          scrolled
            ? "border-line bg-ink/80 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1680px] items-center justify-between px-5 py-4 md:px-10">
          <button
            onClick={() => scrollToId("#top")}
            data-cursor="top"
            className="font-mono text-sm text-bone"
          >
            <span className="text-acc">./</span>vishesh
            <span className="animate-blink text-acc">_</span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                data-cursor="go"
                className="group font-mono text-[11px] uppercase tracking-[0.22em] text-fog transition-colors hover:text-bone"
              >
                <span className="mr-1.5 text-acc/60">{l.n}.</span>
                {l.label}
                <span className="block h-px max-w-0 bg-acc transition-all duration-300 group-hover:max-w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2.5 rounded-full border border-line bg-panel px-3.5 py-1.5 lg:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-acc animate-pulse-dot" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                open to work
              </span>
            </span>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="gh"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fog transition-colors hover:border-acc/50 hover:text-acc"
            >
              <GithubIcon size={15} />
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-bone md:hidden"
            >
              <Menu size={15} />
            </button>
          </div>
        </div>
        <motion.div
          style={{ scaleX: progress }}
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-acc/70"
        />
      </motion.header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: "-4%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-4%" }}
            transition={{ duration: 0.4, ease: EASE_SNAP }}
            className="fixed inset-0 z-50 flex flex-col bg-ink/97 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-mono text-sm text-bone">
                <span className="text-acc">./</span>vishesh
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-bone"
              >
                <X size={15} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: EASE_SNAP }}
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => scrollToId(l.id), 250);
                  }}
                  className="group flex items-baseline gap-4 border-b border-line py-5 text-left"
                >
                  <span className="font-mono text-xs text-acc">{l.n}</span>
                  <span className="font-display text-4xl font-semibold uppercase tracking-tight text-bone transition-colors group-hover:text-acc">
                    {l.label}
                  </span>
                  <ArrowUpRight size={18} className="ml-auto text-dim group-hover:text-acc" />
                </motion.button>
              ))}
            </nav>
            <p className="px-6 pb-8 font-mono text-[11px] text-dim">{PROFILE.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
