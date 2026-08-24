# Implementation notes, v2.13.0

## New entitlement architecture

- Browser storage is used for draft convenience, not paid ownership.
- Stripe Checkout and a verified webhook establish payment.
- Netlify Blobs stores guide entitlement records across deploys and devices.
- The successful-payment time begins the 30-day included-update window.
- Download claims are recorded server-side and assigned version numbers.
- Every new $5 purchase includes an initial package and one updated package within 30 days.
- The owner token is random, stored hashed on the backend, and included only in the private backup inside the host's package.

## Draft and import behavior

- Landing-page CTA entry automatically restores only unpaid drafts.
- The Open action imports prior guide packages and is not required for an unfinished first guide.
- Imported guides autosave during the active editing session but are not automatically substituted when the host starts from the landing page.
- v2.11 packages restore from `KEEP-FOR-EDITS/guide-backup.json` and load photos from `PUBLISH-THIS-FOLDER/images/`.
- Earlier root-level `guide.json` packages and legacy `config.js` ZIPs remain supported.

## Package safety

The downloaded outer ZIP separates public and private files:

- `PUBLISH-THIS-FOLDER` contains only the static guest website.
- `KEEP-FOR-EDITS` contains the private builder restoration state and entitlement token.
- Publishing instructions explicitly tell hosts never to upload the private folder.

## Existing platform safeguards retained

- User content is rendered through safe DOM construction and `textContent`.
- External URLs are validated.
- Generated pages use a nonce-based Content Security Policy.
- Images are resized and compressed in the browser.
- Text autosaves to localStorage and draft images to IndexedDB.
- Empty sections are removed from published guides.
- Entry credentials are detected and the manual safety confirmation is required before payment.
- Object URLs are revoked.
- Builder and guide controls retain labels, keyboard behavior, focus states, live regions, reduced-motion support, and WCAG-oriented contrast.

## Storage implementation

`netlify/lib/entitlements.mjs` wraps Netlify Blobs with strong-consistency reads and conditional writes. Records contain purchases rather than a single paid flag, allowing a guide to have multiple paid update cycles while retaining one stable guide ID.


## v2.13.0 expert-service positioning refinement

- Replaced the single-product landing page with the approved two-offer homepage direction.
- Kept **Create your guide** as the primary CTA and preserved unpaid-draft auto-restore.
- Refined `expert-service.html` package presentation:
  - Expert Review: $249 for one property
  - Review + Implementation: starts at $549
- Added a Netlify Forms inquiry flow and `service-thanks.html`.
- Positioned the service as expert-led hospitality and product-design work rather than a simple done-for-you guide.
- Avoided first-person service copy. Professional credibility is described through experience across hospitality, hotel consulting, guest experience, and product design.
- Added clear boundaries against booking, ranking, revenue, occupancy, or rating guarantees.

- Removed “founding,” “founding-client,” and discount-style pricing language.
- Added human-led review as a primary differentiator across the homepage and service page.
- Clarified that technology may support the process, while analysis, recommendations, judgment, and final quality review remain human-led.
- Added limited-availability language to communicate focused attention without implying a temporary discount.
