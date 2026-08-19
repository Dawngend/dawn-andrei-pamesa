# dawn.pamesa — portfolio

Personal portfolio site. Next.js (App Router) + TypeScript + Tailwind v4, with Framer Motion for scroll and interaction work.

```
my-portfolio/
├── app/
│   ├── layout.tsx     # metadata, OG/Twitter tags, pre-paint theme bootstrap
│   ├── page.tsx       # section composition
│   ├── globals.css    # blueprint design tokens, graph paper, corner ticks
│   └── icon.svg       # favicon (Next.js file convention)
├── components/        # one file per section + the interactive visuals
├── lib/content.ts     # all copy and project data, kept out of the components
└── public/
```

## Design

Navy/cream "blueprint" identity: graph-paper ground, corner-bracket reference
marks, monospace for headings and labels. Theme tokens live in `:root` in
`app/globals.css` and are exposed to Tailwind through `@theme inline`. Dark mode
follows the OS by default and can be overridden by the nav toggle, which
persists to `localStorage` and is applied before first paint to avoid a flash.

## Interactive pieces

- `EmbeddingField` — subject-scoped vector retrieval, the Andy's Hub idea drawn literally
- `ImpactChart` — per-project metrics; the throughput multiplier is plotted on its own scale rather than flattened onto the percentage axis
- `Projects` — expandable problem → built → impact records
- `RagPipeline` — ingestion-to-retrieval flow

## Develop

```bash
npm install
npm run dev
```

Deployed via Vercel. Pushes to `main` redeploy automatically.

**Production URL: https://dawn-andrei-pamesa.vercel.app**

Check changes there, not on a deployment link of the form
`dawn-andrei-pamesa-<hash>-dawngends-projects.vercel.app`. Those URLs are pinned to a
single build, never update no matter how many times you push, and sit behind Vercel
Authentication. A stale one of those cost a debugging round on 2026-08-19.
