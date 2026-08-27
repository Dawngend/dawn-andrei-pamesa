# design-sync notes for dawn-pamesa-portfolio

First sync started 2026-08-27, **not completed**. Project `Blueprint`, id `66cd9278-5fd5-4fc3-b956-851b324c06ef`. **Nothing has been uploaded yet** — the project is empty and un-anchored, which is the documented safe state.

## Scope decision

Dawn chose the 7 composable components on 2026-08-27: `Section`, `Panel`, `Callout`, `Ticks`, `Reveal`, `CountUp`, `ThemeToggle`.

Excluded via `componentSrcMap` nulls: the 8 hardcoded page sections (`Hero`, `Nav`, `Footer`, `Projects`, `Experience`, `Credentials`, `Stack`, `StatsStrip`) and the 3 custom visualisations (`EmbeddingField`, `ImpactChart`, `RagPipeline`). All take no props and are one-off compositions, so a design agent cannot build anything new from them. `Stack` is **not** a layout primitive despite the name — it renders a hardcoded skills grid.

## Solved, do not rediscover

- **`srcDir` must be `components`.** The heuristic picks the first of `src/` | `lib/` | `components/`, and this repo has a `lib/` holding only `content.ts`, so it wins and finds zero components.
- **`components/index.tsx` barrel is required, and must be `.tsx` not `.ts`.** The synth entry re-exports with `export *`, which does **not** carry default exports, so `Section`, `Reveal`, `CountUp` and `ThemeToggle` were invisible (`[BUNDLE_EXPORT] 4/7`). The barrel re-exports them by name. The source scan glob is `/\.(tsx|jsx|mdx?)$/`, so a `.ts` barrel is silently ignored.
- **Do not pass `--entry`.** It is only consumed by the storybook shape; in package shape it breaks package resolution and drops the component count to zero.
- **`cssEntry` must point at compiled CSS.** `app/globals.css` opens with `@import "tailwindcss"`, a bare specifier that cannot resolve inside the bundle (`[CSS_IMPORT_MISSING]`). Fix: `npm run build`, then copy the largest file from `.next/static/chunks/*.css` to `.design-sync/blueprint-compiled.css`. **The build filename is content-hashed and changes every build**, hence the stable copy. Regenerate it whenever `globals.css` or the components' utility classes change, or the design system ships stale styles.
- **Self-link junction**, same as the AndyHub sync. `dts.mjs` resolves `PKG_DIR` as `node_modules/<pkg>`, which npm never self-installs:

  ```powershell
  New-Item -ItemType Junction -Path "node_modules\dawn-pamesa-portfolio" -Target "D:\Personal Projects\my-portfolio"
  ```

  **Remove it after every sync** — a self-referential entry in `node_modules` can send webpack/tsc file walkers into recursion.
- **`runtimeFontPrefixes`** suppresses `[FONT_MISSING]` for "Cascadia Code" and "JetBrains Mono". These are deliberately OS-provided: the portfolio uses system font stacks with no webfont load, as a performance choice. Falling back to Consolas/monospace is the intended behaviour, not a substitution.
- **`dtsPropsFor` is hand-written and must stay true.** Synth-entry mode extracts nothing, so every contract came out as `[key: string]: unknown`. The bodies in the config were transcribed from the real `type Props` declarations. **If a component's props change, update the config or the design agent will code against a lie.**

## THE OPEN BLOCKER

Preview cards render, but **content inside `Reveal` is invisible in every capture**. `Reveal` is `initial={{opacity: 0, y}}` + `whileInView` + `viewport={{once: true, amount: 0.2}}`. In a static headless screenshot that animation never settles, so the element captures at opacity 0.

`Section` wraps its index, title and lead in a `Reveal`, so its cards show only the child paragraph and no heading. Confirmed visually on the review sheet, twice.

**Tried and did not work:** re-exporting `MotionConfig` from the barrel and setting `cfg.provider = {component: "MotionConfig", props: {reducedMotion: "always"}}`. That disables transforms but opacity still animates, and `whileInView` still depends on the intersection observer firing.

**Recommended fix, and it is worth doing for its own sake:** make `Reveal` honour `prefers-reduced-motion` in source, rendering at its final state (opacity 1, y 0) instead of animating. Headless chromium reports reduced motion, so previews would capture correctly, and it is a genuine accessibility improvement to the live site rather than a workaround. The `better-accessibility` skill calls for exactly this.

Other options, both worse: `cfg.overrides.Section.skip` hides the component entirely; rewriting the previews to avoid `Reveal` would misrepresent how the component actually renders.

## Re-sync risks

- `.design-sync/blueprint-compiled.css` is a **snapshot**, not generated at sync time. It goes stale silently whenever styles change.
- `dtsPropsFor` is hand-maintained and drifts silently.
- `components/index.tsx` now defines the public design-system surface. Adding a component to the repo does **not** add it to Blueprint unless it is exported there.
- No conventions header has been authored yet — that step comes after previews verify.
- Nothing has been graded. `render check: 7/7 clean` is true but measures only that the root is non-empty; the sheets show the content is invisible.
