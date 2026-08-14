"use client";

import { useCallback, useEffect, useState } from "react";

type Mode = "light" | "dark";

const STORAGE_KEY = "dap-theme";

function systemMode(): Mode {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function currentMode(): Mode {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return systemMode();
}

export default function ThemeToggle() {
  // Undefined until mounted so SSR markup never disagrees with the client.
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    setMode(currentMode());

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!document.documentElement.getAttribute("data-theme")) {
        setMode(systemMode());
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next: Mode = currentMode() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — the in-session choice still applies */
    }
    setMode(next);
  }, []);

  const isDark = mode === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mode === null
          ? "Toggle colour theme"
          : `Switch to ${isDark ? "light" : "dark"} theme`
      }
      aria-pressed={mode === null ? undefined : isDark}
      title="Toggle theme"
      className="group relative flex h-8 w-8 items-center justify-center border border-line text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="tick tick-tl scale-75 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="tick tick-br scale-75 opacity-0 transition-opacity group-hover:opacity-100" />
      <svg
        viewBox="0 0 20 20"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        {/* Half-filled disc: the drafting convention for a tone swatch. */}
        <circle cx="10" cy="10" r="5.5" />
        <path
          d="M10 4.5a5.5 5.5 0 0 0 0 11z"
          fill="currentColor"
          stroke="none"
          className={isDark ? "opacity-100" : "opacity-40"}
        />
        <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2" />
      </svg>
    </button>
  );
}
