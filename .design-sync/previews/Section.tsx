import { Section } from "dawn-pamesa-portfolio";

export const Primary = () => (
  <Section
    id="work"
    index="01"
    title="Selected work"
    lead="Each build is stated the same way: the problem that made it necessary, what was actually engineered, and the measured result."
  >
    <p className="text-text-muted">
      Section wraps a numbered heading, an optional lead paragraph, and whatever
      children it is given.
    </p>
  </Section>
);

export const WithoutLead = () => (
  <Section id="experience" index="03" title="Experience">
    <p className="text-text-muted">
      The lead is optional. Without it the heading sits directly above the
      content.
    </p>
  </Section>
);

export const Stacked = () => (
  <div>
    <Section
      id="impact"
      index="02"
      title="Measured impact"
      lead="Numbers reported per project, on the scale they were actually measured on."
    >
      <p className="text-text-muted">First section.</p>
    </Section>
    <Section id="contact" index="04" title="Contact">
      <p className="text-text-muted">
        Consecutive sections show how the index numbering reads down a page.
      </p>
    </Section>
  </div>
);
