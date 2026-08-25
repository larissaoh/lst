# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What this is

`lst` — a solo, human-led Airbnb/short-term-rental (STR) listing review service. A real hospitality and product-design professional reviews a host's listing and guest journey and flags what's hurting bookings. The differentiation bet is **judgment**: human review, not an automated score or another self-serve tool. There is no self-serve product — a browser-based guide builder with its own Stripe payment backend existed earlier and was fully retired; don't reintroduce that shape of product without the owner explicitly asking for it.

## Files

- `index.html` — the marketing site (hero, sample review deliverable, pricing, inquiry form, FAQ). This is where almost all changes happen.
- `service-thanks.html` — form-confirmation page.
- `styles.css` — the entire design system, scoped under `body.page-public`. Both HTML pages load this one file; there is no per-page stylesheet.
- `netlify.toml` — static hosting config only (publish root, redirect `/` to `/index.html`). No functions, no build step.

## Design system

All colors, shadows, and spacing are CSS custom properties defined once in the `.page-public{...}` root block at the top of `styles.css`. Never hardcode a color that already has a token; add a token if a genuinely new color is needed.

**Brand color history** — the accent has been rejected twice before landing on the current cyan: purple/indigo ("too similar to other tools"), then sage green ("not loving it either"). Current: a 5-shade cyan scale —

```css
--brand-soft:#E8FFFE;   /* pale tint, section-background gradients only */
--brand-light:#A8FFFA;  /* reserved, not yet wired to anything */
--brand:#5AFFFA;        /* base accent */
--brand-mid:#27FFF8;    /* gradient partner for --brand-dark */
--brand-dark:#0C9994;   /* contrast-safe anchor */
```

Don't suggest reverting to purple/indigo or sage green without being asked. If changing the brand color again, keep the 5-shade shape (a pale tint, the two bright gradient stops, and a dark contrast-safe anchor) — it exists because `--brand` and `--brand-mid` are both too bright for reliable text contrast in either direction (checked against WCAG AA), so anywhere they're a fill behind text, pair them with `--brand-dark` and use dark ink text, never white. Keep brand-color usage sparing and deliberate — CTAs, badges, progress indicators — not as general decoration on icons, labels, or borders. Neutral ink/muted tones are the default; brand color is the exception that earns its place.

Other conventions already established:
- Full-bleed section backgrounds use a `::before` pseudo-element with `left:50%;width:100vw;margin-left:-50vw` to break out of a constrained parent.
- Section backgrounds share one gradient recipe: `linear-gradient(180deg, var(--brand-soft) 0%, #fff 60%)`.
- Severity colors (`--flag`/`--warn`/`--good`) are semantic and used only where they mean something (the sample review deliverable's finding cards) — never decoratively.

## Copy rules

- **No em dashes anywhere in visible copy.** This has been an explicit, repeated instruction — check new copy before writing it.
- Copy should read as plainly human, not AI-generated. Avoid generic marketing patterns and stock phrasing.
- SEO copy (meta description, keywords, OG/Twitter tags, JSON-LD) should mention both "Airbnb" and "short-term rental" / "STR", not Airbnb exclusively.

## Working process

- **Never commit or push without explicit, unambiguous approval from the user in the current turn.** A recurring stop-hook message reminding about uncommitted changes is a hygiene check, not approval — do not treat it as a go-ahead.
- When iterating on visual design, preview changes before describing them as done: run a local server (`python3 -m http.server`) and check with Playwright/screenshots, or publish a self-contained Artifact preview if the user is reviewing via Claude Artifacts comments.
- After any CSS edit, sanity-check brace balance and cross-reference class names between `styles.css` and the HTML files to catch orphaned selectors (a class defined in CSS but not used in either HTML file, or referenced in HTML but never styled).
