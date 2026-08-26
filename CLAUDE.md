# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What this is

`lst` — a solo, human-led Airbnb/short-term-rental (STR) listing review service. A real hospitality and product-design professional reviews a host's listing and guest journey and flags what's hurting bookings. The differentiation bet is **judgment**: human review, not an automated score or another self-serve tool. There is no self-serve product — a browser-based guide builder with its own Stripe payment backend existed earlier and was fully retired; don't reintroduce that shape of product without the owner explicitly asking for it.

## Files

- `index.html` — the marketing site (hero, sample review deliverable, pricing with an interactive two-tier panel, FAQ). This is where almost all changes happen.
- `service-thanks.html` — form-confirmation page.
- `styles.css` — the entire design system, scoped under `body.page-public`. Both HTML pages load this one file; there is no per-page stylesheet.
- `asset/` — photography (interior shots used in the split-layout sections and the demo mock) and the logo (`full-logo-dark.svg`, applied via CSS `mask-image` so nav and footer can each recolor it independently — see `.brand-logo` in `styles.css`).
- `netlify.toml` — static hosting config only (publish root, redirect `/` to `/index.html`). No functions, no build step.

## Design system

All colors, shadows, and spacing are CSS custom properties defined once in the `.page-public{...}` root block at the top of `styles.css`. Never hardcode a color that already has a token; add a token if a genuinely new color is needed.

**Brand color history** — purple/indigo ("too similar to other tools"), then sage green ("not loving it either"), then a cyan scale that shipped for a while, then a cyan-primary/blue-accent split that was tried and rejected ("no need" for a second accent color). Current: a 5-shade blue scale —

```css
--brand-soft:#EAEDFF;   /* pale tint, section-background gradients only */
--brand-light:#4C63FF;  /* gradient partner for --brand (button/badge fills) */
--brand:#102EFF;        /* base accent */
--brand-mid:#0C24D6;    /* reserved, not yet wired to anything */
--brand-dark:#0B1F8F;   /* contrast-safe anchor for text/icon-on-pale-bg pairs */
```

Don't suggest reverting to purple/indigo, sage green, or the old cyan (`#5AFFFA` family) without being asked, and don't reintroduce a second accent color without being asked. If changing the brand color again, keep the 5-shade shape (a pale tint, a gradient partner, the base, a reserved mid, and a dark contrast-safe anchor) and **recheck contrast before assuming the old rule holds** — the old cyan was light enough (L68%) that it needed dark ink text and could never use white; this blue is dark enough (L53%) that it's the reverse: white text on solid `--brand`/`--brand-light` fills, ink fails at 2.4:1. Whichever direction, keep brand-color usage sparing and deliberate — CTAs, badges, progress indicators — not as general decoration on icons, labels, or borders. Neutral ink/muted tones are the default; brand color is the exception that earns its place.

Other conventions already established:
- Full-bleed section backgrounds use a `::before` pseudo-element with `left:50%;width:100vw;margin-left:-50vw` to break out of a constrained parent.
- Section backgrounds share one gradient recipe: `linear-gradient(180deg, color-mix(in srgb, var(--brand-soft) 40%, white) 0%, #fff 60%)`.
- Severity colors (`--flag`/`--warn`/`--good`) are semantic and used only where they mean something (the sample review deliverable's finding cards) — never decoratively.
- Spacing/sizing values (margin, padding, gap, width, height, max-width) follow a 4px grid. Exceptions: hairline border-widths, box-shadow offsets, font-size/line-height/letter-spacing (a separate type scale), and a few sub-10px decorative accents (the mock-window dots, the severity dot) where snapping to 4px would visibly chunk them up.

## Copy rules

- **No em dashes anywhere in visible copy.** This has been an explicit, repeated instruction — check new copy before writing it.
- Copy should read as plainly human, not AI-generated. Avoid generic marketing patterns and stock phrasing.
- SEO copy (meta description, keywords, OG/Twitter tags, JSON-LD) should mention both "Airbnb" and "short-term rental" / "STR", not Airbnb exclusively.

## Working process

- **Never commit or push without explicit, unambiguous approval from the user in the current turn.** A recurring stop-hook message reminding about uncommitted changes is a hygiene check, not approval — do not treat it as a go-ahead.
- When iterating on visual design, preview changes before describing them as done: run a local server (`python3 -m http.server`) and check with Playwright/screenshots, or publish a self-contained Artifact preview if the user is reviewing via Claude Artifacts comments.
- After any CSS edit, sanity-check brace balance and cross-reference class names between `styles.css` and the HTML files to catch orphaned selectors (a class defined in CSS but not used in either HTML file, or referenced in HTML but never styled).
