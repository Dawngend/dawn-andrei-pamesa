"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contactLinks, profile } from "@/lib/content";
import EmbeddingField from "./EmbeddingField";
import { Ticks } from "./Frame";

const headline = ["AI/ML engineer", "and backend", "systems architect"];

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line pt-[calc(var(--nav-h)+3rem)] pb-16 sm:pb-20"
    >
      <div
        className="graph-paper-major pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center lg:gap-14">
        {/* Left: identity block ------------------------------------- */}
        <div>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            <span className="label">{profile.location}</span>
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent">
              <span className="relative flex h-1.5 w-1.5">
                {!reduced && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </span>
          </motion.div>

          <h1 className="mt-6 font-mono text-[clamp(1.9rem,5.4vw,3.15rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
            {headline.map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.34,
                  delay: 0.06 + i * 0.07,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, delay: 0.3 }}
            className="mt-6 max-w-xl border-l-2 border-accent/60 pl-4 text-[0.975rem] leading-relaxed text-muted"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2 bg-accent px-5 py-2.5 font-mono text-[0.8125rem] tracking-tight text-accent-ink transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Selected work
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M8 3v10M4 9l4 4 4-4" />
              </svg>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="tick-host relative inline-flex items-center gap-2 border border-line-strong px-5 py-2.5 font-mono text-[0.8125rem] tracking-tight text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Ticks />
              {profile.email}
            </a>
          </motion.div>

          <motion.ul
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {contactLinks
              .filter((l) => l.label !== "Email")
              .map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-baseline gap-2 font-mono text-[0.75rem] text-faint transition-colors hover:text-accent"
                  >
                    <span className="uppercase tracking-[0.12em]">
                      {l.label}
                    </span>
                    <span className="border-b border-dotted border-current pb-px text-ink transition-colors group-hover:text-accent">
                      {l.value}
                    </span>
                  </a>
                </li>
              ))}
          </motion.ul>
        </div>

        {/* Right: embedding-space plate ------------------------------ */}
        <motion.figure
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="tick-host relative border border-line bg-surface/85 p-4 backdrop-blur-[2px] sm:p-5"
        >
          <Ticks />
          <figcaption className="mb-3 flex items-baseline justify-between gap-3">
            <span className="label">Fig. 01 — embedding space</span>
            <span className="font-mono text-[0.6875rem] text-faint">
              subject-scoped retrieval
            </span>
          </figcaption>
          <EmbeddingField />
          <p className="mt-4 border-t border-line pt-3 text-[0.8125rem] leading-relaxed text-muted">
            Vectors are partitioned by subject before they are ever searched.
            The query resolves to its nearest neighbours{" "}
            <span className="text-ink">inside one scope only</span> — which is
            how cross-subject context contamination stops being a retrieval
            problem.
          </p>
        </motion.figure>
      </div>
    </section>
  );
}
