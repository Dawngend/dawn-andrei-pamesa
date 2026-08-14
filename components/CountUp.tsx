"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type Props = {
  to: number;
  /** Decimal places to render. */
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
};

/** Counts from zero to `to` the first time it scrolls into view. */
export default function CountUp({
  to,
  decimals = 0,
  duration = 1.1,
  delay = 0,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration, delay, reduced]);

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {value.toFixed(decimals)}
    </span>
  );
}
