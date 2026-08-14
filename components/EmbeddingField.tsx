"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------
   An embedding space, drawn as a blueprint. Three subject clusters,
   each fenced inside its own scope boundary; a query vector hops
   between them and resolves to its k nearest neighbours — and never
   crosses a boundary. That is the whole thesis of the Andy's Hub
   retrieval design, made visible.
------------------------------------------------------------------- */

const VB = { w: 360, h: 280 };

type Cluster = {
  id: string;
  label: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  seed: number;
  n: number;
};

const CLUSTERS: Cluster[] = [
  { id: "c0", label: "physics", cx: 92, cy: 86, rx: 46, ry: 40, seed: 7, n: 17 },
  { id: "c1", label: "calculus", cx: 272, cy: 74, rx: 44, ry: 38, seed: 21, n: 16 },
  { id: "c2", label: "systems", cx: 178, cy: 206, rx: 52, ry: 40, seed: 43, n: 18 },
];

type Point = { x: number; y: number; r: number; ci: number; i: number };

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Built once at module scope so server and client render identical markup. */
const POINTS: Point[] = CLUSTERS.flatMap((c, ci) => {
  const rand = mulberry32(c.seed);
  return Array.from({ length: c.n }, (_, i) => {
    // Sample inside the ellipse, biased toward the centroid.
    const theta = rand() * Math.PI * 2;
    const rho = Math.sqrt(rand()) * 0.82;
    return {
      x: +(c.cx + Math.cos(theta) * c.rx * rho).toFixed(2),
      y: +(c.cy + Math.sin(theta) * c.ry * rho).toFixed(2),
      r: +(1.7 + rand() * 1.5).toFixed(2),
      ci,
      i,
    };
  });
});

const QUERY_OFFSETS = [
  { dx: 14, dy: -18 },
  { dx: -16, dy: 16 },
  { dx: 18, dy: -14 },
];

const K = 5;

/** Deterministic per-point drift so the field never sits perfectly still. */
const DRIFT = POINTS.map((p) => {
  const rand = mulberry32(p.ci * 977 + p.i * 31 + 5);
  return {
    dx: +((rand() - 0.5) * 7).toFixed(2),
    dy: +((rand() - 0.5) * 7).toFixed(2),
    dur: +(5.5 + rand() * 4).toFixed(2),
    delay: +(rand() * 3).toFixed(2),
  };
});

export default function EmbeddingField() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);

  const target = pinned ?? active;

  useEffect(() => {
    if (!inView || pinned !== null || reduced) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % CLUSTERS.length),
      3200
    );
    return () => window.clearInterval(id);
  }, [inView, pinned, reduced]);

  const query = useMemo(() => {
    const c = CLUSTERS[target];
    const o = QUERY_OFFSETS[target];
    return { x: c.cx + o.dx, y: c.cy + o.dy };
  }, [target]);

  /** k nearest neighbours — searched only within the active subject scope. */
  const neighbours = useMemo(() => {
    return POINTS.filter((p) => p.ci === target)
      .map((p) => ({ p, d: Math.hypot(p.x - query.x, p.y - query.y) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, K);
  }, [target, query]);

  const neighbourKeys = useMemo(
    () => new Set(neighbours.map((n) => `${n.p.ci}-${n.p.i}`)),
    [neighbours]
  );

  const radius = neighbours.length
    ? neighbours[neighbours.length - 1].d + 6
    : 30;

  return (
    <div ref={ref} className="relative">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Embedding-space scatter plot: three subject clusters — ${CLUSTERS.map(
          (c) => c.label
        ).join(", ")} — with a query vector resolving to its nearest neighbours inside the ${
          CLUSTERS[target].label
        } scope only.`}
      >
        <defs>
          <pattern
            id="ef-grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 0H0V20"
              fill="none"
              stroke="var(--line)"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </pattern>
          <radialGradient id="ef-glow">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width={VB.w} height={VB.h} fill="url(#ef-grid)" />

        {/* Axes ------------------------------------------------------- */}
        <g stroke="var(--line-strong)" strokeWidth="0.9" opacity="0.8">
          <path d="M16 264 H344" />
          <path d="M16 264 V16" />
        </g>
        <g
          fill="var(--text-faint)"
          fontFamily="var(--font-mono-stack)"
          fontSize="7.5"
          letterSpacing="1.1"
        >
          <text x="320" y="276">
            DIM 1
          </text>
          <text x="6" y="14" writingMode="tb" transform="rotate(-90 10 20)">
            DIM 2
          </text>
        </g>

        {/* Subject scope boundaries ----------------------------------- */}
        {CLUSTERS.map((c, ci) => {
          const isActive = ci === target;
          return (
            <g key={c.id}>
              <motion.ellipse
                cx={c.cx}
                cy={c.cy}
                rx={c.rx + 12}
                ry={c.ry + 12}
                fill="none"
                stroke={isActive ? "var(--accent)" : "var(--line-strong)"}
                strokeWidth={isActive ? 1.1 : 0.8}
                strokeDasharray="3 4"
                initial={false}
                animate={{ opacity: isActive ? 0.95 : 0.4 }}
                transition={{ duration: 0.3 }}
              />
              <text
                x={c.cx}
                y={c.cy - c.ry - 18}
                textAnchor="middle"
                fontFamily="var(--font-mono-stack)"
                fontSize="8"
                letterSpacing="1.4"
                fill={isActive ? "var(--accent)" : "var(--text-faint)"}
                style={{ transition: "fill 240ms ease" }}
              >
                {c.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Points ----------------------------------------------------- */}
        {POINTS.map((p, idx) => {
          const key = `${p.ci}-${p.i}`;
          const isNeighbour = neighbourKeys.has(key);
          const inScope = p.ci === target;
          const d = DRIFT[idx];
          return (
            <motion.g
              key={key}
              initial={reduced ? false : { opacity: 0, scale: 0.4 }}
              animate={
                inView
                  ? reduced
                    ? { opacity: 1 }
                    : {
                        opacity: 1,
                        scale: 1,
                        x: [0, d.dx, 0],
                        y: [0, d.dy, 0],
                      }
                  : { opacity: 0, scale: 0.4 }
              }
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      opacity: { duration: 0.35, delay: 0.2 + idx * 0.012 },
                      scale: { duration: 0.35, delay: 0.2 + idx * 0.012 },
                      x: {
                        duration: d.dur,
                        delay: d.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      y: {
                        duration: d.dur * 1.17,
                        delay: d.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
              }
            >
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={isNeighbour ? p.r + 1.4 : p.r}
                fill={
                  isNeighbour
                    ? "var(--accent)"
                    : inScope
                      ? "var(--text-muted)"
                      : "var(--text-faint)"
                }
                initial={false}
                animate={{ opacity: inScope ? 1 : 0.35 }}
                transition={{ duration: 0.3 }}
              />
              {isNeighbour ? (
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={p.r + 4.5}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="0.7"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 0.55, scale: 1 }}
                  transition={{ duration: 0.28 }}
                />
              ) : null}
            </motion.g>
          );
        })}

        {/* Query vector + retrieval fan ------------------------------- */}
        {inView ? (
          <g>
            <motion.circle
              animate={{ cx: query.x, cy: query.y }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              r="44"
              fill="url(#ef-glow)"
              initial={{ cx: query.x, cy: query.y }}
            />

            <AnimatePresence mode="wait">
              <motion.g key={target}>
                {neighbours.map((n, i) => (
                  <motion.line
                    key={`${n.p.ci}-${n.p.i}`}
                    x1={query.x}
                    y1={query.y}
                    x2={n.p.x}
                    y2={n.p.y}
                    stroke="var(--accent)"
                    strokeWidth="0.8"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.18 + i * 0.05,
                      ease: "easeOut",
                    }}
                  />
                ))}
                <motion.circle
                  cx={query.x}
                  cy={query.y}
                  r={radius}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="0.7"
                  strokeDasharray="2 3"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              </motion.g>
            </AnimatePresence>

            {/* The query marker itself — a drafting crosshair. */}
            <motion.g
              animate={{ x: query.x, y: query.y }}
              initial={{ x: query.x, y: query.y }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
            >
              <path
                d="M-7 0H7M0 -7V7"
                stroke="var(--accent)"
                strokeWidth="1"
                opacity="0.9"
              />
              <rect
                x="-3.2"
                y="-3.2"
                width="6.4"
                height="6.4"
                fill="var(--accent)"
              />
              <text
                x="10"
                y="-6"
                fontFamily="var(--font-mono-stack)"
                fontSize="7.5"
                letterSpacing="0.8"
                fill="var(--accent)"
              >
                query
              </text>
            </motion.g>
          </g>
        ) : null}
      </svg>

      {/* Scope selector ---------------------------------------------- */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="label mr-1">Scope</span>
        {CLUSTERS.map((c, ci) => {
          const isActive = ci === target;
          return (
            <button
              key={c.id}
              type="button"
              onMouseEnter={() => setPinned(ci)}
              onMouseLeave={() => setPinned(null)}
              onFocus={() => setPinned(ci)}
              onBlur={() => setPinned(null)}
              onClick={() => {
                setActive(ci);
                setPinned(null);
              }}
              aria-pressed={isActive}
              className={`border px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isActive
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-line text-faint hover:border-line-strong hover:text-ink"
              }`}
            >
              {c.label}
            </button>
          );
        })}
        <span className="ml-auto font-mono text-[0.6875rem] text-faint">
          k={K} · {POINTS.filter((p) => p.ci === target).length} vectors in scope
        </span>
      </div>
    </div>
  );
}
