"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Tag = "div" | "li" | "section" | "article" | "header" | "footer";

const TAGS = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
} satisfies Record<Tag, unknown>;

type Props = {
  children: ReactNode;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Travel distance in px before settling. */
  y?: number;
  className?: string;
  as?: Tag;
};

/**
 * Fast, restrained scroll reveal: ~12px of travel, 240ms, no bounce.
 * Renders statically when the user prefers reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 12,
  className,
  as = "div",
}: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = TAGS[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.24, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
