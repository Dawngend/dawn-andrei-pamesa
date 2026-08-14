import { contactLinks, footerCta, profile } from "@/lib/content";
import Reveal from "./Reveal";
import { Ticks } from "./Frame";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden py-16 sm:py-20">
      <div
        className="graph-paper pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[0.6875rem] tabular-nums text-accent">
              06
            </span>
            <h2 className="font-mono text-[1.375rem] font-semibold tracking-tight text-ink sm:text-[1.625rem]">
              Contact
            </h2>
            <span className="rule-dashed hidden flex-1 sm:block" />
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-8 max-w-3xl font-mono text-[clamp(1.25rem,3.4vw,1.875rem)] font-semibold leading-[1.25] tracking-tight text-ink">
            {footerCta}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <a
            href={`mailto:${profile.email}`}
            className="tick-host relative mt-7 inline-flex items-center gap-2 bg-accent px-6 py-3 font-mono text-[0.875rem] text-accent-ink transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {profile.email}
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </Reveal>

        <Reveal delay={0.16}>
          <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {contactLinks.map((l) => (
              <li key={l.label} className="bg-surface">
                <a
                  href={l.href}
                  target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    l.href.startsWith("mailto:")
                      ? undefined
                      : "noreferrer noopener"
                  }
                  className="tick-host group relative block px-5 py-4 transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                >
                  <Ticks />
                  <span className="label block">{l.label}</span>
                  <span className="mt-1.5 block truncate font-mono text-[0.8125rem] text-ink transition-colors group-hover:text-accent">
                    {l.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-6">
          <p className="font-mono text-[0.75rem] text-faint">
            {profile.name} · {profile.location}
          </p>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
            {profile.availability}
          </p>
        </div>
      </div>
    </footer>
  );
}
