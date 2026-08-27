import { CountUp } from "dawn-pamesa-portfolio";

export const Primary = () => (
  <p className="text-4xl font-semibold">
    <CountUp to={30000} />
  </p>
);

export const WithDecimals = () => (
  <p className="text-4xl font-semibold">
    <CountUp to={0.726} decimals={3} />
  </p>
);

export const StatRow = () => (
  <div className="grid grid-cols-3 gap-4">
    <div>
      <p className="label mb-1 text-accent">Pages ranked</p>
      <p className="text-3xl font-semibold">
        <CountUp to={30000} />
      </p>
    </div>
    <div>
      <p className="label mb-1 text-accent">Clients</p>
      <p className="text-3xl font-semibold">
        <CountUp to={32} delay={0.1} />
      </p>
    </div>
    <div>
      <p className="label mb-1 text-accent">Lift</p>
      <p className="text-3xl font-semibold">
        <CountUp to={1.44} decimals={2} delay={0.2} />
      </p>
    </div>
  </div>
);
