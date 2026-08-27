import { Panel } from "dawn-pamesa-portfolio";

export const Primary = () => (
  <Panel className="p-5 sm:p-7">
    <h3 className="mb-2 text-lg font-semibold">Refresh queue</h3>
    <p className="text-text-muted">
      A bordered surface with blueprint reference marks at each corner. This is
      the default container for content blocks across the site.
    </p>
  </Panel>
);

export const TickHost = () => (
  <Panel tickHost className="p-5 sm:p-7">
    <h3 className="mb-2 text-lg font-semibold">Measured impact</h3>
    <p className="text-text-muted">
      With tickHost set, the panel becomes the positioning context for its
      corner ticks.
    </p>
  </Panel>
);

export const Dense = () => (
  <div className="grid gap-4 md:grid-cols-2">
    <Panel className="p-4">
      <p className="label mb-1 text-accent">Precision@1000</p>
      <p className="text-2xl font-semibold">0.726</p>
    </Panel>
    <Panel className="p-4">
      <p className="label mb-1 text-accent">Base rate</p>
      <p className="text-2xl font-semibold">0.542</p>
    </Panel>
  </div>
);
