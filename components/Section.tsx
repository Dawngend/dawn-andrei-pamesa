import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  id?: string;
  index: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
};

/** A titled band with a drawing-sheet header rule. */
export default function Section({
  id,
  index,
  title,
  lead,
  children,
  className = "",
}: Props) {
  return (
    <section
      id={id}
      className={`border-b border-line py-16 sm:py-20 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[0.6875rem] tabular-nums text-accent">
              {index}
            </span>
            <h2 className="font-mono text-[1.375rem] font-semibold tracking-tight text-ink sm:text-[1.625rem]">
              {title}
            </h2>
            <span className="rule-dashed hidden flex-1 sm:block" />
          </div>
          {lead ? (
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
              {lead}
            </p>
          ) : null}
        </Reveal>

        <div className="mt-9">{children}</div>
      </div>
    </section>
  );
}
