import { Ticks } from "dawn-pamesa-portfolio";

// Ticks position themselves against the nearest positioned ancestor, so every
// preview supplies a `relative` host. Outside one they render invisibly.

export const Primary = () => (
  <div className="tick-host relative border border-line bg-surface p-8">
    <p className="text-text-muted">
      The four blueprint reference marks sit at the corners of a positioned
      parent.
    </p>
  </div>
);

export const OnLargeSurface = () => (
  <div className="tick-host relative border border-line bg-surface p-12">
    <h3 className="mb-2 text-lg font-semibold">Measured impact</h3>
    <p className="text-text-muted">
      On a taller surface the marks read as drawing registration corners.
    </p>
    <Ticks />
  </div>
);
