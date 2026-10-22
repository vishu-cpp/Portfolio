import { Asterisk } from "lucide-react";
import { MARQUEE } from "../lib/data";

export default function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="relative overflow-hidden border-y border-line bg-panel py-5 md:py-7">
      <div className="mask-fade-x flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="cursor-default whitespace-nowrap px-6 font-display text-2xl font-medium uppercase tracking-tight text-fog transition-colors duration-300 hover:text-acc md:px-10 md:text-4xl">
              {item}
            </span>
            <Asterisk size={22} className="shrink-0 text-acc/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
