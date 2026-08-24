# Guest Guide Hospitality v2.13.0

> **Agent handoff:** Start with `PRODUCT-BRIEF-AGENT-HANDOFF.md`. It distinguishes the current implemented v2.13.0 behavior from the proposed hosted-publishing direction and lists unresolved product decisions.

This package contains a two-offer public homepage, an expert-service page and inquiry form, the browser-based guide builder, generated-guide template, Stripe Checkout functions, and Netlify Blobs entitlement storage.

## Pages

- `index.html`: two-offer public homepage
- `expert-service.html`: detailed Expert Review and Review + Implementation packages
- `service-thanks.html`: inquiry confirmation page
- `builder.html`: guide creation workspace

Landing-page calls to action open `builder.html?from=landing`.

## Two-offer business model

The homepage presents two clear paths:

1. **Self-Serve Guide Builder**
   - Primary CTA: **Create your guide**
   - Opens `builder.html?from=landing`
   - Automatically restores any existing unpaid draft
   - $5 per guide package, including one updated download within 30 days

2. **Listing and Guest Experience Upgrade**
   - Expert-led service informed by professional experience across hospitality, hotel consulting, guest experience, and product design
   - **Expert Review:** $249 for one property
   - **Review + Implementation:** starts at $549
   - Neutral brand voice is used throughout; the product does not present the service in first person

The service is positioned around clarity, booking confidence, guest friction, and information quality. It does not promise ranking, occupancy, revenue, conversion, or rating outcomes.

## Expert inquiry form

`expert-service.html` includes a Netlify Forms-compatible inquiry form named `expert-review-inquiry`. After deployment, submissions appear in the Netlify project under **Forms**. Configure email notifications in Netlify if desired.

The form collects:

- Name and email
- Optional listing link
- Package interest
- A short description of the requested help

## Draft behavior

- A saved, unpaid draft is restored automatically when the host enters through the landing-page CTA.
- The host does not need to use **Open** for ordinary unfinished work.
- **Open** is reserved for importing a previously downloaded guide package.
- A paid or imported guide is not automatically substituted for a fresh landing-page session.
- Refreshing the current builder tab still restores the active editing state.

## Pricing and updates

Every $5 purchase includes:

- The first downloadable guide package
- One updated download within 30 days of successful payment
- Unlimited editing and previewing before either download
- No subscription
- PNG and SVG QR-code generation after the host pastes the published guide URL

After the included update is used or expires, the host can import the original package, keep all existing content, and create another updated package for $5. Each new $5 purchase includes another 30-day update allowance.

After publishing, the host can paste the live Netlify URL into the publishing modal and download a QR code as PNG or SVG.

## Backend entitlement model

Stripe is the payment source of truth. Netlify Blobs stores the guide entitlement using:

- Guide ID
- Hashed private owner token
- Stripe Checkout Session ID
- Successful payment time
- Included-update expiration
- Initial and included-update usage timestamps
- Latest generated version

The Stripe webhook records the successful-payment timestamp. The return verification function provides an idempotent fallback if the webhook has not been processed yet.

## Download package

Each download contains:

```text
PUBLISH-THIS-FOLDER/
  index.html
  guide.json
  images/

KEEP-FOR-EDITS/
  guide-backup.json

HOW-TO-PUBLISH.txt
```

Only `PUBLISH-THIS-FOLDER` should be uploaded to Netlify. `KEEP-FOR-EDITS` contains the private restoration credential and must remain private.

## Editing an old guide

1. Choose **Open** in the builder.
2. Upload the original guide package ZIP.
3. The builder restores its content, photos, theme, and private entitlement token.
4. Edit and preview for free.
5. The backend determines whether the next download is included or requires $5.

Legacy ZIPs from earlier builder versions remain importable. They do not contain a private entitlement token, so their next generated version starts a new managed $5 purchase.

## Run locally

For interface testing:

```bash
python3 -m http.server 8000
```

Open:

- `http://localhost:8000/`
- `http://localhost:8000/builder.html`

Payment and entitlement testing requires deployment through Netlify Functions. Local static serving does not emulate Stripe or production Netlify Blobs.

## Accessibility

The landing page and builder retain semantic landmarks, labels, keyboard-visible focus, live status regions, reduced-motion support, increased-contrast support, responsive reflow, and the required public-guide safety confirmation. This is an implementation audit, not third-party accessibility certification.

## Shared visual system

The public homepage, expert-service page, builder, and confirmation page all load `styles.css`. The shared stylesheet uses Harbor Blue (`#506D79`) as the primary brand color and Apricot (`#E07A5F`) as the secondary expressive accent. Generated guest guides retain their independent theme CSS so downloaded guides remain portable and visually distinct from the business website.
