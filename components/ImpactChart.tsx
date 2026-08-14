"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { impactBars, impactMultiplier } from "@/lib/content";
import CountUp from "./CountUp";

const GRIDLINES = [25, 50, 75];

/** Blueprint hatch used inside every bar fill. */
function Hatch({ id }: { id: string }) {
  return (
    <pattern
      id={id}
      width="4"
      height="12"
      patternUnits="userSpaceOnUse"
      patternTransform="skewX(-20)"
    >
      <rect width="4" height="12" fill="var(--accent)" />
      <rect width="1" height="12" fill="var(--accent-ink)" opacity="0.22" />
    </pattern>
  );
}

function Track({
  value,
  max,
  index,
  active,
}: {
  value: number;
  max: number;
  index: number;
  active: boolean;
}) {
  const reduced = useReducedMotion();
  const pct = (value / max) * 100;
  const patternId = `hatch-${index}`;

  return (
    <svg
      viewBox="0 0 100 12"
      preserveAspectRatio="none"
      className="h-7 w-full"
      aria-hidden="true"
    >
      <defs>
        <Hatch id={patternId} />
      </defs>

      <rect
        x="0"
        y="0"
        width="100"
        height="12"
        fill="var(--surface-2)"
        stroke="var(--line)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {GRIDLINES.map((g) => (
        <line
          key={g}
          x1={g}
          y1="0"
          x2={g}
          y2="12"
          stroke="var(--line)"
          strokeWidth="1"
          strokeDasharray="2 3"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      <motion.rect
        x="0"
        y="0"
        height="12"
        fill={`url(#${patternId})`}
        initial={reduced ? { width: pct } : { width: 0 }}
        animate={active ? { width: pct } : { width: 0 }}
        transition={{
          duration: reduced ? 0 : 0.85,
          delay: reduced ? 0 : 0.12 + index * 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      {/* Leading edge — the drafting "measured to here" mark. */}
      <motion.line
        y1="-1"
        y2="13"
        stroke="var(--accent)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        initial={reduced ? { x1: pct, x2: pct } : { x1: 0, x2: 0 }}
        animate={active ? { x1: pct, x2: pct } : { x1: 0, x2: 0 }}
        transition={{
          duration: reduced ? 0 : 0.85,
          delay: reduced ? 0 : 0.12 + index * 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </svg>
  );
}

export default function ImpactChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref}>
      {/* Percent-scale metrics ------------------------------------- */}
      <div className="flex items-baseline justify-between gap-4">
        <span className="label">Fig. 02 — reported per project</span>
        <span className="font-mono text-[0.6875rem] text-faint">
          scale: 0—100%
        </span>
      </div>

      <ul className="mt-5 space-y-5">
        {impactBars.map((bar, i) => (
          <li
            key={`${bar.project}-${bar.metric}`}
            className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2 sm:grid-cols-[minmax(9.5rem,14rem)_1fr_4.25rem] sm:items-center"
          >
            <div className="min-w-0 sm:pr-2">
              <p className="truncate font-mono text-[0.8125rem] text-ink">
                {bar.project}
              </p>
              <p className="mt-0.5 text-[0.75rem] leading-tight text-faint">
                {bar.metric}
              </p>
            </div>

            <p className="justify-self-end font-mono text-[1.0625rem] tabular-nums text-accent sm:order-3 sm:justify-self-end">
              <CountUp
                to={bar.value}
                duration={0.9}
                delay={0.12 + i * 0.1}
              />
              %
            </p>

            <div className="col-span-2 sm:col-span-1 sm:order-2">
              <Track value={bar.value} max={100} index={i} active={inView} />
            </div>
          </li>
        ))}
      </ul>

      {/* Shared axis ------------------------------------------------ */}
      <div className="mt-3 sm:grid sm:grid-cols-[minmax(9.5rem,14rem)_1fr_4.25rem] sm:gap-x-4">
        <span className="hidden sm:block" />
        <div className="flex justify-between font-mono text-[0.6875rem] text-faint">
          {[0, 25, 50, 75, 100].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <span className="hidden sm:block" />
      </div>

      {/* Off-scale metric ------------------------------------------- */}
      <div className="mt-8 border-t border-line pt-6">
        <div className="flex items-baseline justify-between gap-4">
          <span className="label">Fig. 03 — separate scale</span>
          <span className="font-mono text-[0.6875rem] text-faint">
            multiplier, not a percentage
          </span>
        </div>

        <div className="mt-4 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8">
          <div>
            <p className="font-mono text-[0.8125rem] text-ink">
              {impactMultiplier.project}
            </p>
            <p className="mt-0.5 text-[0.75rem] text-faint">
              {impactMultiplier.metric}
            </p>

            <div className="mt-3 space-y-2">
              {[
                { name: "baseline", v: 1 },
                { name: "compressed", v: impactMultiplier.value },
              ].map((row, i) => (
                <div
                  key={row.name}
                  className="grid grid-cols-[5.5rem_1fr_2.75rem] items-center gap-3"
                >
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-faint">
                    {row.name}
                  </span>
                  <div className="h-4">
                    <svg
                      viewBox="0 0 100 8"
                      preserveAspectRatio="none"
                      className="h-4 w-full"
                      aria-hidden="true"
                    >
                      <line
                        x1="50"
                        y1="0"
                        x2="50"
                        y2="8"
                        stroke="var(--line)"
                        strokeWidth="1"
                        strokeDasharray="2 3"
                        vectorEffect="non-scaling-stroke"
                      />
                      <motion.rect
                        x="0"
                        y="0"
                        height="8"
                        fill={
                          i === 0 ? "var(--line-strong)" : "var(--accent)"
                        }
                        initial={{ width: 0 }}
                        animate={{
                          width: inView ? (row.v / 2.5) * 100 : 0,
                        }}
                        transition={{
                          duration: 0.8,
                          delay: 0.45 + i * 0.12,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    </svg>
                  </div>
                  <span className="text-right font-mono text-[0.8125rem] tabular-nums text-ink">
                    {row.v.toFixed(1)}×
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative shrink-0 border border-line bg-surface-2 px-6 py-4 text-center">
            <span className="tick tick-tl" />
            <span className="tick tick-br" />
            <span className="block font-mono text-[2.25rem] leading-none tabular-nums text-accent">
              <CountUp to={impactMultiplier.value} decimals={1} delay={0.45} />
              {impactMultiplier.unit}
            </span>
            <span className="label mt-2 block">QPS throughput</span>
          </p>
        </div>
      </div>
    </div>
  );
}
