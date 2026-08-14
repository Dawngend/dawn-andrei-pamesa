import type { ReactNode } from "react";

/** The four blueprint reference ticks. Parent must be `relative`. */
export function Ticks() {
  return (
    <>
      <span className="tick tick-tl" aria-hidden="true" />
      <span className="tick tick-tr" aria-hidden="true" />
      <span className="tick tick-bl" aria-hidden="true" />
      <span className="tick tick-br" aria-hidden="true" />
    </>
  );
}

/** A bordered panel with corner reference marks. */
export function Panel({
  children,
  className = "",
  tickHost = false,
}: {
  children: ReactNode;
  className?: string;
  tickHost?: boolean;
}) {
  return (
    <div
      className={`relative border border-line bg-surface ${
        tickHost ? "tick-host" : ""
      } ${className}`}
    >
      <Ticks />
      {children}
    </div>
  );
}

/** Small uppercase monospace annotation, optionally numbered like a drawing callout. */
export function Callout({
  index,
  children,
}: {
  index?: string;
  children: ReactNode;
}) {
  return (
    <span className="label inline-flex items-center gap-2">
      {index ? (
        <span className="border border-line px-1.5 py-0.5 text-accent">
          {index}
        </span>
      ) : null}
      {children}
    </span>
  );
}
