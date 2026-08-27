// Public component surface for the Blueprint design system.
//
// This barrel exists because the design-sync converter re-exports with
// `export *`, which does not carry default exports. Anything that should be
// reachable as `window.Blueprint.<Name>` in Claude Design must be a NAMED
// export, so default-exported components are re-exported by name here.
//
// Page sections (Hero, Nav, Footer, Projects, Experience, Credentials, Stack,
// StatsStrip) and the custom visualisations (EmbeddingField, ImpactChart,
// RagPipeline) are deliberately absent: they take no props and are one-off
// compositions, so a design agent cannot build anything new out of them.

export { default as Section } from "./Section";
export { default as Reveal } from "./Reveal";
export { default as CountUp } from "./CountUp";
export { default as ThemeToggle } from "./ThemeToggle";
export { Panel, Callout, Ticks } from "./Frame";

// Re-exported so design-sync can wrap previews in it. `Reveal` starts at
// opacity 0 and animates in via `whileInView`, which never settles in a static
// headless screenshot, so preview cards would capture invisible content.
export { MotionConfig } from "framer-motion";
