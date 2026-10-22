import { useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import { setLenis } from "./lib/scroll";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import ApiPlayground from "./components/ApiPlayground";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Stack from "./components/Stack";
import Activities from "./components/Activities";
import Footer from "./components/Footer";

export default function App() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    setLenis(lenis);
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-ink text-bone">
      <Cursor />
      <AnimatePresence>
        {!booted && <Preloader onDone={() => setBooted(true)} />}
      </AnimatePresence>
      <Nav />
      <main>
        <Hero booted={booted} />
        <Marquee />
        <About />
        <ApiPlayground />
        <Projects />
        <Experience />
        <Stack />
        <Activities />
        <Footer />
      </main>
    </div>
  );
}
