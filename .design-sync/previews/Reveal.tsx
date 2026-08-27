import { Reveal, Panel } from "dawn-pamesa-portfolio";

export const Primary = () => (
  <Reveal>
    <Panel className="p-5">
      <p>Content settles into place on entry.</p>
    </Panel>
  </Reveal>
);

export const Staggered = () => (
  <ul className="flex flex-col gap-3">
    {["Python", "PyTorch", "FastAPI"].map((label, i) => (
      <Reveal key={label} as="li" delay={i * 0.08}>
        <Panel className="p-4">
          <p className="label text-accent">{label}</p>
        </Panel>
      </Reveal>
    ))}
  </ul>
);

export const LongerTravel = () => (
  <Reveal y={32} delay={0.1}>
    <Panel className="p-5">
      <p>A larger y value travels further before settling.</p>
    </Panel>
  </Reveal>
);
