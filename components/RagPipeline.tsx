"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { pipelineStages } from "@/lib/content";

/** A packet travelling along one hop of the pipeline. */
function Flow({ index, vertical }: { index: number; vertical: boolean }) {
  const reduced = useReducedMotion();

  const line = vertical ? (
    <span
      className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, var(--line) 0 3px, transparent 3px 7px)",
      }}
      aria-hidden="true"
    />
  ) : (
    <span
      className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, var(--line) 0 3px, transparent 3px 7px)",
      }}
      aria-hidden="true"
    />
  );

  return (
    <span
      className={
        vertical
          ? "relative block h-6 w-full shrink-0"
          : "relative block h-6 w-8 shrink-0 grow-0"
      }
      aria-hidden="true"
    >
      {line}
      {!reduced && (
        <motion.span
          className="absolute h-[5px] w-[5px] rounded-full bg-accent"
          style={
            vertical
              ? { left: "50%", marginLeft: -2.5, marginTop: -2.5 }
              : { top: "50%", marginLeft: -2.5, marginTop: -2.5 }
          }
          initial={vertical ? { top: "0%" } : { left: "0%" }}
          animate={vertical ? { top: "100%" } : { left: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 1.1,
            delay: index * 0.32,
            ease: "linear",
          }}
        />
      )}
    </span>
  );
}

function Node({ label, detail }: { label: string; detail: string }) {
  return (
    <span className="tick-host relative flex min-w-0 flex-1 flex-col justify-center border border-line bg-surface-2 px-3 py-2 text-center">
      <span className="tick tick-tl" />
      <span className="tick tick-br" />
      <span className="font-mono text-[0.75rem] leading-tight text-ink">
        {label}
      </span>
      {detail ? (
        <span className="mt-0.5 font-mono text-[0.625rem] leading-tight text-faint">
          {detail}
        </span>
      ) : null}
    </span>
  );
}

export default function RagPipeline() {
  return (
    <div>
      <p className="label mb-3">Ingestion → retrieval path</p>

      {/* Horizontal once there is room for six nodes in a row */}
      <div className="hidden items-stretch gap-0 lg:flex">
        {pipelineStages.map((s, i) => (
          <Fragment key={s.key}>
            <Node label={s.label} detail={s.detail} />
            {i < pipelineStages.length - 1 ? (
              <Flow index={i} vertical={false} />
            ) : null}
          </Fragment>
        ))}
      </div>

      {/* Stacked on narrow viewports */}
      <div className="flex flex-col items-stretch lg:hidden">
        {pipelineStages.map((s, i) => (
          <Fragment key={s.key}>
            <Node label={s.label} detail={s.detail} />
            {i < pipelineStages.length - 1 ? (
              <Flow index={i} vertical />
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
