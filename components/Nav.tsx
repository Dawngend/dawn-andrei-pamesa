"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { sections } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section spy — the last heading whose top has crossed the nav line wins.
  useEffect(() => {
    const ids = sections.map((s) => s.id);

    const spy = () => {
      const line = window.innerHeight * 0.35;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    spy();
    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("resize", spy);
    return () => {
      window.removeEventListener("scroll", spy);
      window.removeEventListener("resize", spy);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] border-b transition-colors duration-200 ${
        scrolled
          ? "border-line bg-bg/85 backdrop-blur-md"
          : "border-transparent bg-bg/60 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Section navigation"
        className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-2.5 font-mono text-[0.8125rem] tracking-tight text-ink"
        >
          <span className="relative grid h-7 w-7 place-items-center bg-accent text-[0.8125rem] font-bold text-accent-ink">
            D
            <span className="tick tick-tl !border-accent-ink/60" />
            <span className="tick tick-br !border-accent-ink/60" />
          </span>
          <span className="hidden font-semibold sm:inline">
            Dawn Andrei Pamesa
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-0.5 md:flex">
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block px-3 py-1.5 font-mono text-[0.75rem] uppercase tracking-[0.12em] transition-colors ${
                      isActive
                        ? "text-accent"
                        : "text-faint hover:text-ink"
                    }`}
                  >
                    {s.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-2 -bottom-0.5 h-px bg-accent"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 34,
                        }}
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            className="border border-line px-3 py-1.5 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink transition-colors hover:border-accent hover:text-accent md:hidden"
          >
            Contact
          </a>

          <ThemeToggle />
        </div>
      </nav>

      {/* Read-progress hairline */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
    </header>
  );
}
