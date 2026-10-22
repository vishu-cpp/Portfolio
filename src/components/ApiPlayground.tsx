import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { ENDPOINTS, type Endpoint } from "../lib/data";
import { EASE, Reveal, SectionHead } from "./ui";

/* ---------- recursive JSON pretty-printer ---------- */

function linesOf(
  value: unknown,
  key: string | null,
  level: number,
  isLast: boolean,
  lines: ReactNode[],
  path: string
) {
  const indent = { paddingLeft: level * 22 };
  const comma = isLast ? "" : ",";
  const keyNode =
    key !== null ? (
      <>
        <span className="text-[#c9d6cb]">&quot;{key}&quot;</span>
        <span className="text-dim">: </span>
      </>
    ) : null;

  if (Array.isArray(value)) {
    lines.push(
      <div key={path} style={indent}>
        {keyNode}
        <span className="text-dim">[</span>
      </div>
    );
    value.forEach((v, i) =>
      linesOf(v, null, level + 1, i === value.length - 1, lines, `${path}/${i}`)
    );
    lines.push(
      <div key={`${path}]`} style={indent}>
        <span className="text-dim">]{comma}</span>
      </div>
    );
  } else if (typeof value === "object" && value !== null) {
    lines.push(
      <div key={path} style={indent}>
        {keyNode}
        <span className="text-dim">{"{"}</span>
      </div>
    );
    const entries = Object.entries(value);
    entries.forEach(([k, v], i) =>
      linesOf(v, k, level + 1, i === entries.length - 1, lines, `${path}/${k}`)
    );
    lines.push(
      <div key={`${path}c`} style={indent}>
        <span className="text-dim">
          {"}"}
          {comma}
        </span>
      </div>
    );
  } else {
    let node: ReactNode;
    if (typeof value === "string")
      node = <span className="text-acc">&quot;{value}&quot;</span>;
    else if (typeof value === "number")
      node = <span className="text-amber">{String(value)}</span>;
    else if (typeof value === "boolean")
      node = <span className="text-lav">{String(value)}</span>;
    else node = <span className="text-blush">null</span>;
    lines.push(
      <div key={path} style={indent}>
        {keyNode}
        {node}
        <span className="text-dim">{comma}</span>
      </div>
    );
  }
}

export function JsonView({ data }: { data: unknown }) {
  const lines: ReactNode[] = [];
  linesOf(data, null, 0, true, lines, "r");
  return (
    <div className="flex">
      <div className="select-none pr-4 text-right font-mono text-[10px] leading-[2] text-dim/50">
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div className="flex-1 overflow-x-auto font-mono text-[11.5px] leading-[2] md:text-xs">
        {lines}
      </div>
    </div>
  );
}

/* ---------- section ---------- */

export default function ApiPlayground() {
  const [active, setActive] = useState<Endpoint>(ENDPOINTS[0]);
  const [ms, setMs] = useState(4);
  const [copied, setCopied] = useState(false);

  const select = (e: Endpoint) => {
    setActive(e);
    setMs(Math.floor(2 + Math.random() * 12));
  };

  const curl = `curl -s https://api.vishesh.dev${active.path} | jq .`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(curl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="api" className="relative py-24 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-acc/[0.04] blur-[120px]" />
      <div className="relative mx-auto w-full max-w-[1680px] px-5 md:px-10">
        <SectionHead index="02" label="api reference" note="interactive — hit an endpoint" />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* endpoint picker */}
          <div className="flex flex-col gap-3 lg:col-span-4">
            <Reveal>
              <p className="mb-6 max-w-sm text-[15px] leading-relaxed text-fog">
                My resume, <span className="text-bone">machine-readable</span>. Pick an
                endpoint — the console responds with live, syntax-highlighted JSON.
              </p>
            </Reveal>
            {ENDPOINTS.map((e, i) => (
              <Reveal key={e.id} delay={0.05 + i * 0.05}>
                <button
                  onClick={() => select(e)}
                  data-cursor="GET"
                  className={`group w-full rounded-lg border px-4 py-3.5 text-left transition-all duration-300 ${
                    active.id === e.id
                      ? "border-acc/50 bg-panel-2"
                      : "border-line bg-transparent hover:border-fog/40 hover:bg-panel"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                        active.id === e.id ? "bg-acc text-ink" : "bg-acc/15 text-acc"
                      }`}
                    >
                      {e.method}
                    </span>
                    <span className="font-mono text-sm text-bone">{e.path}</span>
                    {active.id === e.id && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-acc animate-pulse-dot" />
                    )}
                  </span>
                  <span className="mt-1.5 block font-mono text-[10px] text-dim">
                    {e.desc}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          {/* console */}
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="overflow-hidden rounded-xl border border-line bg-panel">
              {/* title bar */}
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <span className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blush/60" />
                    <span className="h-2 w-2 rounded-full bg-amber/60" />
                    <span className="h-2 w-2 rounded-full bg-acc/60" />
                  </span>
                  <span className="font-mono text-[10px] text-dim">
                    api.vishesh.dev — console
                  </span>
                </div>
                <span className="flex items-center gap-2 font-mono text-[10px] text-acc">
                  <span className="h-1.5 w-1.5 rounded-full bg-acc" />
                  200 OK
                </span>
              </div>

              {/* request bar */}
              <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                <span className="shrink-0 rounded bg-acc/15 px-2 py-0.5 font-mono text-[10px] font-bold text-acc">
                  {active.method}
                </span>
                <span className="truncate font-mono text-xs text-bone/90 md:text-sm">
                  https://api.vishesh.dev
                  <span className="text-acc">{active.path}</span>
                </span>
                <button
                  onClick={copy}
                  data-cursor="copy"
                  aria-label="Copy curl command"
                  className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line text-fog transition-colors hover:border-acc/50 hover:text-acc"
                >
                  {copied ? <Check size={13} className="text-acc" /> : <Copy size={13} />}
                </button>
              </div>

              {/* response meta */}
              <div className="flex items-center justify-between px-4 pt-3 font-mono text-[10px] text-dim">
                <span>content-type: application/json; charset=utf-8</span>
                <span className="text-acc tabular-nums">{ms}ms</span>
              </div>

              {/* response body */}
              <div className="min-h-[420px] p-4 md:p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <JsonView data={active.body} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* footer */}
              <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-dim">
                <span>content-encoding: gzip</span>
                <span>
                  server: <span className="text-fog">vishesh/2.0</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
