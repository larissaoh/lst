# Payment and entitlement setup

The builder uses Stripe Checkout for payment and Netlify Blobs for guide ownership, timestamps, versions, and the included 30-day update.

## Install dependencies

This package includes `package.json` with `@netlify/blobs`. Netlify installs it during deployment. For local Netlify CLI testing, run:

```bash
npm install
```

## Required environment variables

Add these variables to the Netlify project with Functions scope:

- `STRIPE_SECRET_KEY`: Stripe test or live secret key
- `STRIPE_WEBHOOK_SECRET`: signing secret for the Stripe webhook endpoint
- `BUILDER_URL`: public site origin, without a trailing slash
- `GUIDE_PRICE_CENTS`: optional, defaults to `500`
- `GUIDE_CURRENCY`: optional, defaults to `usd`

## Stripe webhook

Create a Stripe webhook endpoint pointing to:

```text
https://YOUR-BUILDER-DOMAIN/.netlify/functions/stripe-webhook
```

Listen for:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`

The webhook verifies Stripe's signature and records the payment timestamp and entitlement in Netlify Blobs. Stripe metadata carries the guide ID, purchase kind, and private owner token.

## Checkout and download flow

1. The host drafts and previews for free.
2. The host manually confirms that the public guide has no access credentials.
3. The builder creates a Stripe Checkout Session.
4. Stripe redirects back after payment.
5. The verification function confirms amount, currency, guide ID, product, and payment status.
6. The builder claims the next eligible download from the backend.
7. The backend marks either the paid download or the included update as used and assigns a version number.
8. The browser creates the package locally and downloads it.

## Included update rules

Each successful $5 purchase creates a purchase record with:

- One initial download
- One included updated download
- A 30-day expiration measured from successful payment

A later $5 paid update is added to the same guide and receives its own initial download and 30-day included update.

## Private restoration credential

The raw owner token is never placed in the public Netlify folder. It is saved only in:

```text
KEEP-FOR-EDITS/guide-backup.json
```

The backend stores only its SHA-256 hash. Importing the original package restores the token and allows the backend to verify the guide across browsers and devices.

## Optional feedback contact

The post-download contact form remains optional and separately consented. It verifies the associated paid Stripe Checkout Session before writing feedback opt-in metadata to Stripe.

## Tracking success

Use Stripe completed payments as the primary commercial metric. Use Netlify Blobs to distinguish:

- Unique guides
- Initial downloads
- Included updates
- Paid updates
- Update expiration and usage
- Latest guide version

One payment may now correspond to two package downloads, so payment count measures paid guide purchases rather than total ZIP generations.

## Production notes

- Add privacy, terms, refund, and support links before launch.
- Decide whether tax collection is required.
- Test webhook delivery and retries in Stripe test mode.
- Do not expose or log raw owner tokens.
- Netlify Blobs uses strong consistency in the entitlement data layer, with conditional writes to reduce duplicate download claims.
