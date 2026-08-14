import { topStats } from "@/lib/content";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import { Ticks } from "./Frame";

export default function StatsStrip() {
  return (
    <ul className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
      {topStats.map((s, i) => (
        <Reveal
          as="li"
          key={s.caption}
          delay={i * 0.06}
          className="tick-host relative bg-surface px-5 py-6 sm:px-6 sm:py-7"
        >
          <Ticks />
          <p className="font-mono text-[clamp(1.75rem,5vw,2.5rem)] font-semibold leading-none tabular-nums tracking-tight text-accent">
            <CountUp to={s.value} delay={0.1 + i * 0.06} />
            {s.suffix}
          </p>
          <p className="mt-3 border-t border-line pt-3 text-[0.8125rem] leading-snug text-muted">
            {s.caption}
          </p>
        </Reveal>
      ))}
    </ul>
  );
}
