import { Callout } from "dawn-pamesa-portfolio";

export const Numbered = () => (
  <Callout index="01">Ranking content decay across 30,000 pages</Callout>
);

export const Unnumbered = () => (
  <Callout>Client-grouped 5-fold split</Callout>
);

export const InSequence = () => (
  <div className="flex flex-col gap-3">
    <Callout index="01">Problem</Callout>
    <Callout index="02">What was engineered</Callout>
    <Callout index="03">Measured result</Callout>
  </div>
);
