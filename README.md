# lst

A human-led Airbnb and short-term rental (STR) listing review service. A real hospitality and product-design professional reviews a host's listing and guest journey and flags what's costing them bookings — never an automated score.

## Pages

- `index.html` — the marketing site: hero, a sample review deliverable, pricing (Free Analysis / Expert Review / Review + Implementation), an inquiry form, and FAQ.
- `service-thanks.html` — confirmation page shown after the inquiry form is submitted.

Both pages share one stylesheet, `styles.css`, scoped under `body.page-public`.

## Pricing

- **Free Analysis** — $0, 3–5 findings, no obligation.
- **Expert Review** — $249, full listing and guest-journey review.
- **Review + Implementation** — from $549, review plus the fixes applied.

## Inquiry form

`index.html#get-started` has the intake form (name, email, listing link, tier). It's a Netlify Forms submission (`data-netlify="true"`, with a honeypot field for spam) — no backend needed. After deploying to Netlify, submissions appear in the Netlify project under **Forms**; configure email notifications there if you want them.

## Run locally

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/`.

## Deployment

Static hosting via Netlify (`netlify.toml`: publish the repo root, redirect `/` to `/index.html`). No build step, no functions, no dependencies — everything here is plain HTML/CSS/vanilla JS.

## Design system

`styles.css` defines the `.page-public` design tokens once: a 5-shade cyan brand scale (`--brand-soft`, `--brand-light`, `--brand`, `--brand-mid`, `--brand-dark`), ink/muted neutrals, and severity colors (flag/warn/good) used in the sample review deliverable. Brand color is used sparingly — CTAs, badges, and progress indicators — not as general decoration.

## Copy conventions

- No em dashes in visible copy.
- Keep copy plain and human, not AI-sounding.
- SEO should mention both "Airbnb" and "short-term rental" / STR, not Airbnb exclusively.
