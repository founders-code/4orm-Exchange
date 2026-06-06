# 4orm Finance Data Room

Static site for `data.4ormfinance.com`. Two pages, same visual system as the demo-site methodology page (Inter + 4orm brand tokens + dark navy + gold accent + red/green race-track pair pattern).

## Pages

| Page | URL | What it shows |
|---|---|---|
| Public landing | `/` (`index.html`) | Hero · 4 site thumbnails · 5 paired category previews · request access + sign in forms · CTA |
| Member data room | `/data-room` (`data-room.html`) | Same hero + 4 thumbnails + paired category cards, but each bullet is now a clickable PDF link. No sign-in gate (yet). |

**Phase 1 (this repo, today): auth disabled.**
Clicking "Sign in", "Request access", any OAuth button, or submitting the request form simply redirects to `data-room.html`. This lets us build out the frontend + document library without touching auth.

**Phase 2 (next): add Clerk middleware.**
Wrap `data-room.html` and any future `/admin/*` routes behind a Clerk-authenticated, founder-approved gate. Replace the redirects in `assets/dataroom.js` with real Clerk SDK calls.

**Phase 3: real documents + admin upload + ClickUp webhook.**

## Repo layout

```
.
├── index.html                  Public landing
├── data-room.html              Member view (file links to PDFs)
├── vercel.json                 Security headers + asset caching
├── README.md                   This file
├── .gitignore
└── assets/
    ├── styles.css              Shared design system (the demo-site stylesheet, verbatim)
    ├── dataroom.js             Front-end interactions (auto-login stubs)
    ├── 4orm-logo.png           Brand mark in the nav
    ├── thumb-kcs-capital.png   ← drop your screenshots here (1280×720 PNG)
    ├── thumb-4orm-finance.png
    ├── thumb-4ormex.png
    ├── thumb-demo-exchange.png
    └── docs/                   ← drop your PDFs/XLSXs here
        ├── 01-pitch-deck.pdf
        ├── 01-executive-summary.pdf
        ├── 01-one-pager.pdf
        ├── 01-founder-narrative.pdf
        ├── 02-market-sizing.pdf
        ├── 02-mckinsey-base-case.pdf
        ├── 02-project-samara.pdf
        ├── 02-canadian-rwa-landscape.pdf
        ├── 03-control-plane-capabilities.pdf
        ├── 03-lifecycle-architecture.pdf
        ├── 03-integration-model.pdf
        ├── 03-demo-walkthrough.pdf
        ├── 04-founder-bios.pdf
        ├── 04-advisor-roster.pdf
        ├── 04-hiring-plan.pdf
        ├── 04-org-chart.pdf
        ├── 05-five-year-model.xlsx
        ├── 05-revenue-drivers.pdf
        ├── 05-scenario-sensitivities.pdf
        ├── 05-operating-cost-surface.pdf
        ├── 06-ciro-mapping.pdf
        ├── 06-regulator-pathway.pdf
        ├── 06-alberta-sandbox.pdf
        ├── 06-regulatory-roadmap.pdf
        ├── 07-active-lois.pdf
        ├── 07-partnership-pipeline.pdf
        ├── 07-tier1-discussions.pdf
        ├── 07-partner-stack.pdf
        ├── 08-entity-structure.pdf
        ├── 08-cap-table.xlsx
        ├── 08-kcs-relationship.pdf
        ├── 08-articles-board.pdf
        ├── 09-round-terms.pdf
        ├── 09-use-of-proceeds.pdf
        ├── 09-safe-template.pdf
        ├── 09-committed-capital.pdf
        ├── 10-reviewer-questions.pdf
        ├── 10-indicative-responses.pdf
        └── 10-diligence-checklist.pdf
```

The four screenshot filenames and the 39 document filenames are already wired into the HTML. As soon as a file lands at the matching path, the link starts working — no code change needed.

## Deploy to Vercel

1. Push this folder to a new GitHub repo, e.g. `founders-code/4orm-dataroom`.
2. In Vercel, "Add new project" → import the repo. Framework preset: **Other**. Build command: empty. Output directory: empty. Vercel will serve it as a static site.
3. Add the custom domain `data.4ormfinance.com` and point DNS as Vercel instructs.
4. Done. Both `/` and `/data-room` are live.

## Phase 2 setup (when you're ready to gate the member view)

1. Create a Clerk account at clerk.com. Enable Email/Password + Google OAuth + Microsoft OAuth.
2. Add the three founder emails as admins in Clerk's dashboard.
3. Convert this repo to a Next.js app (or add `middleware.ts` to gate `/data-room/*` and serve via Clerk's static-site SDK).
4. In `assets/dataroom.js`, replace the three `window.location.href = 'data-room.html'` lines with the real Clerk SDK calls.
5. Build an admin queue at `/admin` for the three founders to approve new sign-ups.
6. Wire approved sign-ups to ClickUp (or GoHighLevel) via a serverless webhook.

## Visual system

This site reuses the same `styles.css` as the 4orm Finance demo site (the methodology page in particular). All colors, fonts, gradients, and component patterns are identical:

- Hero: dark navy gradient (`#1F3CA8 → #15233F → #0B1220`) with gold + blue radial glows
- Type: Inter, 400 → 900
- Brand: `#2E6BF2` blue, `#E7C76C` / `#FFD9A8` gold, `#7BE3B0` emerald, `#FF8095` coral, `#C8B0EF` lilac
- Component reuse: `meth-hero`, `meth-toc-band`, `meth-sec`, `ms-head`, `ms-viz`, `race-mini`, `race-track.bad`, `race-track.good`, `iw-cta`

If anything looks visually off vs. the demo site, the fix is in `assets/styles.css` (which is checked in verbatim).
