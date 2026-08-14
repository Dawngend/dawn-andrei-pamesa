"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { experience } from "@/lib/content";

export default function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();

  return (
    <ol ref={ref} className="relative pl-6 sm:pl-8">
      {/* Timeline spine — draws downward as the section enters. */}
      <motion.span
        className="absolute left-0 top-1 w-px origin-top bg-line-strong"
        style={{ bottom: "0.75rem" }}
        initial={reduced ? false : { scaleY: 0 }}
        animate={{ scaleY: inView ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        aria-hidden="true"
      />

      {experience.map((role, i) => (
        <motion.li
          key={`${role.org}-${role.title}`}
          className="relative pb-9 last:pb-0"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.28,
            delay: 0.18 + i * 0.1,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          <motion.span
            className="absolute -left-6 top-1.5 h-2.5 w-2.5 border border-accent bg-bg sm:-left-8"
            initial={reduced ? false : { scale: 0 }}
            animate={inView ? { scale: 1 } : undefined}
            transition={{ duration: 0.24, delay: 0.24 + i * 0.1 }}
            aria-hidden="true"
          />
          <p className="label">{role.period}</p>
          <h3 className="mt-1.5 font-mono text-[1rem] font-semibold tracking-tight text-ink">
            {role.title}
          </h3>
          <p className="mt-0.5 font-mono text-[0.8125rem] text-accent">
            {role.org}
          </p>
          <p className="mt-2.5 max-w-2xl text-[0.875rem] leading-relaxed text-muted">
            {role.blurb}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
