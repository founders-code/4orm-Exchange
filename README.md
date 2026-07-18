# 4ormEx (v20)

Static placeholder site for the planned 4ormEx trading venue. Pillar 02 of the 4orm Finance neutral settlement layer.

- Live: https://www.4ormex.com
- Status: design preview, pre-registration
- Stack: HTML / CSS / JS, no framework, no build
- Deploy: Vercel auto-deploy on push to `main`

## Pages

- `/` Home (layer-first hero, Solution section, tiles, pillar row, mini asset categories)
- `/what-we-do`
- `/settlement-layer`
- `/asset-categories`
- `/dvp`
- `/finality`
- `/404`

## Required asset

Drop `4orm-finance-logo.png` (silver-chrome parent wordmark) into `assets/` before deploying. The nav references it at `/assets/4orm-finance-logo.png`.

## Local preview

Open any `.html` in a browser, or run a static server from the repo root:

```
python3 -m http.server 8080
```

## Compliance

The site is a design preview only. Not a registered marketplace, dealer, exchange, MSB, or bank. Full disclosure in the footer legal block.

The build enforces four hard rules (dash discipline, banned technology / marketing tokens, quote style, and one two-letter machine-learning acronym). Rule text and grep patterns live in the v20 Cursor build prompt; do not restate them in this file.
