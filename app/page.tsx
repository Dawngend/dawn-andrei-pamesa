import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import StatsStrip from "@/components/StatsStrip";
import Projects from "@/components/Projects";
import ImpactChart from "@/components/ImpactChart";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Credentials from "@/components/Credentials";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Ticks } from "@/components/Frame";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-[0.8125rem] focus:text-accent-ink"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />

        {/* Top-line numbers, straight under the fold ---------------- */}
        <section className="border-b border-line py-12 sm:py-14">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal>
              <p className="label mb-5">Measured impact</p>
            </Reveal>
            <StatsStrip />
          </div>
        </section>

        <Section
          id="work"
          index="01"
          title="Selected work"
          lead="Each build is stated the same way: the problem that made it necessary, what was actually engineered, and the measured result. Open a card for the full record."
        >
          <Projects />
        </Section>

        <Section
          id="impact"
          index="02"
          title="Measured impact"
          lead="Numbers reported per project, on the scale they were actually measured on. The throughput figure is a multiplier, so it is plotted separately rather than flattened onto the percentage axis."
        >
          <div className="tick-host relative border border-line bg-surface p-5 sm:p-7">
            <Ticks />
            <ImpactChart />
          </div>
        </Section>

        <Section
          id="experience"
          index="03"
          title="Experience"
          lead="Machine learning in production, backend architecture from scratch, and the infrastructure work that keeps a student chapter running."
        >
          <Experience />
        </Section>

        <Section
          id="stack"
          index="04"
          title="Stack"
          lead="What I reach for, grouped by where it sits in the system."
        >
          <Stack />
        </Section>

        <Section
          index="05"
          title="Education & certifications"
          lead="Coursework in data science, plus the certifications backing the applied side."
        >
          <Credentials />
        </Section>
      </main>

      <Footer />
    </>
  );
}
