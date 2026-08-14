"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/content";
import RagPipeline from "./RagPipeline";
import Reveal from "./Reveal";
import { Ticks } from "./Frame";

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M6 3H3v10h10v-3M9.5 2.5H13.5V6.5M13 3L7.5 8.5" />
    </svg>
  );
}

const FIELDS = [
  { key: "problem", label: "Problem" },
  { key: "built", label: "Built" },
  { key: "impact", label: "Impact" },
] as const;

export default function Projects() {
  const [open, setOpen] = useState<string | null>(projects[0].id);
  const reduced = useReducedMotion();

  return (
    <ul className="space-y-4">
      {projects.map((p, i) => {
        const isOpen = open === p.id;
        const panelId = `project-panel-${p.id}`;

        return (
          <Reveal as="li" key={p.id} delay={Math.min(i, 3) * 0.05}>
            <article
              data-repo-url={p.href ?? ""}
              className={`tick-host relative border bg-surface transition-colors duration-200 ${
                isOpen ? "border-line-strong" : "border-line hover:border-line-strong"
              }`}
            >
              <Ticks />

              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group flex w-full items-start gap-4 px-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent sm:px-6 sm:py-5"
                >
                  <span
                    className={`mt-0.5 shrink-0 border px-1.5 py-0.5 font-mono text-[0.6875rem] tabular-nums transition-colors ${
                      isOpen
                        ? "border-accent bg-accent text-accent-ink"
                        : "border-line text-faint group-hover:border-accent group-hover:text-accent"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-[1.0625rem] font-semibold tracking-tight text-ink">
                        {p.name}
                      </span>
                      <span className="font-mono text-[0.75rem] text-faint">
                        {p.context}
                      </span>
                    </span>

                    <span className="mt-2 block text-[0.875rem] leading-relaxed text-muted">
                      {p.impact}
                    </span>

                    <span className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="border border-line px-2 py-0.5 font-mono text-[0.6875rem] text-faint"
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                  </span>

                  <motion.span
                    className="mt-1 shrink-0 text-faint transition-colors group-hover:text-accent"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M3 6l5 5 5-5" />
                    </svg>
                  </motion.span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    key="panel"
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduced ? undefined : { height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.28, ease: [0.22, 0.61, 0.36, 1] },
                      opacity: { duration: 0.2 },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-line px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
                      <dl className="grid gap-4 sm:grid-cols-3 sm:gap-6">
                        {FIELDS.map((f, fi) => (
                          <motion.div
                            key={f.key}
                            initial={reduced ? false : { opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.22,
                              delay: 0.06 + fi * 0.06,
                            }}
                          >
                            <dt className="label flex items-center gap-2">
                              <span className="text-accent">
                                {String(fi + 1).padStart(2, "0")}
                              </span>
                              {f.label}
                            </dt>
                            <dd className="mt-2 border-t border-line pt-2 text-[0.875rem] leading-relaxed text-muted">
                              {p[f.key]}
                            </dd>
                          </motion.div>
                        ))}
                      </dl>

                      {p.diagram === "rag-pipeline" ? (
                        <div className="mt-6 border-t border-line pt-5">
                          <RagPipeline />
                        </div>
                      ) : null}

                      <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
                        <span className="font-mono text-[0.6875rem] text-faint">
                          {p.name} · {p.context}
                        </span>
                        {p.href ? (
                          <a
                            href={p.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] text-accent transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                          >
                            {p.linkLabel}
                            <ExternalIcon />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          </Reveal>
        );
      })}
    </ul>
  );
}
