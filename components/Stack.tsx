import { stack } from "@/lib/content";
import Reveal from "./Reveal";
import { Ticks } from "./Frame";

export default function Stack() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {stack.map((group, i) => (
        <Reveal
          key={group.label}
          delay={Math.min(i, 3) * 0.05}
          className="tick-host relative border border-line bg-surface p-5 transition-colors hover:border-line-strong sm:p-6"
        >
          <Ticks />
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[0.6875rem] tabular-nums text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-mono text-[0.9375rem] font-semibold tracking-tight text-ink">
              {group.label}
            </h3>
          </div>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <li
                key={item}
                className="border border-line bg-bg px-2.5 py-1 font-mono text-[0.75rem] leading-tight text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
