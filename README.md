# lst

A human-led Airbnb and short-term rental (STR) listing review service. A real hospitality and product-design professional reviews a host's listing and guest journey and flags what's costing them bookings — never an automated score.

## Pages

- `index.html` — the marketing site: hero, a sample review deliverable, an interactive two-tier pricing panel (Free Analysis / Expert Review) with the inquiry form, and FAQ.
- `service-thanks.html` — confirmation page shown after the inquiry form is submitted.
- `asset/` — photography (interior shots used across the page) and the logo.

Both pages share one stylesheet, `styles.css`, scoped under `body.page-public`.

## Pricing

- **Free Analysis** — $0, 3–5 findings, no obligation.
- **Expert Review** — $250, full listing and guest-journey review.

## Inquiry form

The intake form lives inside the pricing section (`#pricing`): clicking a tier's CTA slides a panel into view next to the selected card, embedding one of two [Tally](https://tally.so) forms (`#pricing-form-free` / `#pricing-form-paid`) depending on the tier chosen. Each form is built and edited entirely in Tally, not in this repo — update fields, logic, notification emails, and the post-submit redirect from your Tally dashboard (Settings → After submission).

## Run locally

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/`.

## Deployment

Static hosting via Vercel. No build step, no functions, no dependencies — everything here is plain HTML/CSS/vanilla JS.

## Design system

`styles.css` defines the `.page-public` design tokens once: a 5-shade blue brand scale (`--brand-soft`, `--brand-light`, `--brand`, `--brand-mid`, `--brand-dark`), ink/muted neutrals, and severity colors (flag/warn/good) used in the sample review deliverable. Brand color is used sparingly — CTAs, badges, and progress indicators — not as general decoration.

## Copy conventions

- No em dashes in visible copy.
- Keep copy plain and human, not AI-sounding.
- SEO should mention both "Airbnb" and "short-term rental" / STR, not Airbnb exclusively.
