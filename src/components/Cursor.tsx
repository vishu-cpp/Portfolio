import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [fine] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("cursor-none-all");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(el ? el.getAttribute("data-cursor") : null);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("cursor-none-all");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  return (
    <>
      {/* core dot */}
      <motion.div
        style={{ x, y, opacity: visible ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-acc"
      />
      {/* trailing ring */}
      <motion.div
        style={{ x: rx, y: ry, opacity: visible ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[99]"
      >
        <motion.div
          animate={{
            width: label ? 66 : 30,
            height: label ? 66 : 30,
            backgroundColor: label ? "rgba(76,240,139,1)" : "rgba(76,240,139,0)",
            borderColor: label ? "rgba(76,240,139,0)" : "rgba(234,240,231,0.35)",
          }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
        >
          {label && (
            <span className="select-none font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-ink">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
