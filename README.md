# 4ormex.com

Static site. No framework, no build step, no package.json.

**The repository must stay private.** This file, `check.sh` and the `.banned-*`
lists do not ship (see `.vercelignore`), because a note describing what the site
must not say is itself a description of what the site must not say.

## What this surface is

4ormfinance.com carries the company, the vision and the sales story.
This site carries the screens.

It shows **what the platform produces**. It does not describe how anything is
produced. Patent applications are pending, so that boundary is not a style
preference, it is the point of the site.

If you are about to add a sentence and you are unsure which side of the line it
sits on, the test is: **would a competent engineer be able to build something
closer to ours after reading it?** If yes, it does not go on a public page. It
goes in a walkthrough, under a written agreement.

Safe to publish: the five screen names and the question each answers, an
illustrative dashboard clearly labelled as a drawing, public law and its dates
and penalties, outcome-level statements about what comes out, and the things we
refuse to build.

Never publish: timings, sequences, anything about what runs without a person
present, how records are kept or proved, how one platform serves more than one
regulator, anything about feeds or storage, pricing, financials, team, or the
name of any supplier.

## Pages

| File | Route | `data-page` |
| --- | --- | --- |
| `index.html` | `/` | `home` |
| `the-duty.html` | `/the-duty` | `the-duty` |
| `platform.html` | `/platform` | `platform` |
| `inside-the-platform.html` | `/inside-the-platform` | `screens` |
| `contact.html` | `/contact` | `contact` |
| `404.html` | not found | `404` |

## Assets

- `assets/styles.css` - the design system. Tokens carried forward unchanged.
- `assets/chrome.js` - injects the legend strip, nav, closing CTA, family block
  and footer into empty mount divs, and drives the screen switcher on
  `/inside-the-platform`. All config is in the CONFIG block at the top.
- `assets/favicon.svg` - navy tile, white 4, gold dot.

## The logo

The nav renders a typographic wordmark, so nothing is broken today.

To use the real mark: drop a **transparent PNG** at `assets/logo.png` and set
`USE_LOGO = true` in `chrome.js`. The nav sizes it at 120px tall on desktop and
steps down at 1240px and 1080px. If the source has a solid background baked in:

```bash
convert logo-input.png -fuzz 12% -transparent "#000000" assets/logo.png
```

## Local preview

```bash
python3 -m http.server 8080
```

`cleanUrls` is a Vercel behaviour, so locally you need the `.html` on the end.

## Deploy

Vercel, static. `vercel.json` sets `cleanUrls: true`, so `/the-duty` serves
`the-duty.html`. Push to `main` and it deploys.

Push from Cursor's Source Control UI, not from a terminal. The in-editor agent
terminal cannot authenticate to GitHub for this account.

After a large content change, run "Redeploy without build cache" from Vercel's
Deployments tab if the apex URL serves stale HTML.

## Before every commit

```bash
./check.sh
```

Six checks: three typographic, three disclosure. All must pass. Adding a term to
a `.banned-*` list is routine. Removing one is a decision, so say why in the
commit message.
