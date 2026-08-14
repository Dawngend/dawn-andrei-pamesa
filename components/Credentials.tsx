import { certifications, education } from "@/lib/content";
import Reveal from "./Reveal";
import { Ticks } from "./Frame";

export default function Credentials() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <Reveal className="tick-host relative border border-line bg-surface p-5 sm:p-6">
        <Ticks />
        <p className="label">Education</p>
        <h3 className="mt-3 font-mono text-[1rem] font-semibold leading-snug tracking-tight text-ink">
          {education.degree}
        </h3>
        <p className="mt-1.5 text-[0.875rem] text-muted">{education.school}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-4">
          <span className="font-mono text-[0.75rem] text-faint">
            {education.expected}
          </span>
          <span className="h-3 w-px bg-line" aria-hidden="true" />
          <span className="border border-accent bg-accent-soft px-2 py-0.5 font-mono text-[0.6875rem] text-accent">
            {education.note}
          </span>
        </div>
      </Reveal>

      <Reveal
        delay={0.06}
        className="tick-host relative border border-line bg-surface p-5 sm:p-6"
      >
        <Ticks />
        <p className="label">Certifications</p>
        <ul className="mt-3 divide-y divide-[var(--line)]">
          {certifications.map((c) => (
            <li
              key={c.name}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5 first:pt-0 last:pb-0"
            >
              <span className="font-mono text-[0.875rem] text-ink">
                {c.name}
              </span>
              <span className="flex items-baseline gap-2 font-mono text-[0.75rem] text-faint">
                <span>{c.issuer}</span>
                <span className="text-accent">{c.when}</span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
