import type Lenis from "lenis";

let lenis: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  lenis = l;
};

export const getLenis = () => lenis;

export const scrollToId = (target: string) => {
  const l = getLenis();
  if (l) {
    l.scrollTo(target, { offset: target === "#top" ? 0 : -72, duration: 1.4 });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
};
