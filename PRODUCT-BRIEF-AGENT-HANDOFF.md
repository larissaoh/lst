# Guest Guide Hospitality — Product Brief & Agent Handoff

**Current codebase:** v2.13.0  
**Handoff date:** August 20, 2026  
**Status:** Working browser-based guide builder + two-offer marketing/service site. Hosted path-based guide publishing is the recommended next engineering direction, but is **not implemented yet**.

---

## 1. Executive summary

Guest Guide Hospitality is evolving from a simple downloadable short-term-rental welcome-guide builder into a broader hospitality product and service business.

The business currently has two offers:

1. **Self-Serve Guide Builder** — a low-cost browser-based tool for independent hosts to create a polished digital guest guide.
2. **Listing and Guest Experience Upgrade** — a higher-value, human-led hospitality and product-design service that reviews the listing and the guest journey from discovery through post-stay communication, with optional implementation.

The key strategic insight is that the business should **not** become “another hosted guidebook tool” competing feature-for-feature with Hostfully, Touch Stay, Guesty, etc. Hosting should be treated as necessary delivery infrastructure that removes friction. The intended differentiation is the combination of:

- Hospitality experience and human judgment
- Product-design thinking
- Guest-journey analysis
- Information architecture and communication clarity
- A simple self-serve product for independent hosts
- An optional real-human expert layer

A strong long-term positioning direction is:

> **Thoughtful guest experiences for independent hosts.**

The near-term product can credibly promise a hospitality-led guest guide plus access to real human expertise. The longer-term product opportunity is a coherent guest-experience system that organizes information across the listing, pre-arrival communication, arrival, the stay, checkout, and the guide itself.

---

## 2. Product philosophy

The product should feel:

- Warm and hospitality-led
- Highly polished and intentional
- Easy for nontechnical hosts
- Calm rather than feature-dense
- Opinionated rather than endlessly customizable
- Human-centered without being anti-technology
- Credible and professional rather than “AI-generated” or “vibe coded”

The user wants the product partner/agent to challenge assumptions rather than automatically agree. Decisions should be evaluated against:

- Real user value
- Profitability
- Scalability
- Operational cost
- Support burden
- Differentiation
- Technical feasibility
- Activation/conversion risk

Do not optimize only for visual polish when there is a larger funnel or infrastructure problem.

---

## 3. Target customer

The strongest initial segment is **independent short-term-rental hosts with roughly 1–3 properties** who care about presentation and guest experience but do not need a full property-management platform.

They may use Airbnb, Vrbo, direct booking, email, text, or QR codes, but “works across booking channels” should remain a secondary benefit rather than the primary positioning.

Avoid trying to compete head-on for large professional operators that value PMS integrations, large portfolio management, automated operations, guest verification, upsells, and enterprise workflows.

---

## 4. Business model: two offers

### Offer 1 — Self-Serve Guide Builder

Current offer:

- Public browser-based builder
- Primary CTA: **Create your guide**
- CTA opens `builder.html?from=landing`
- Existing unpaid draft is automatically restored
- Build and preview for free
- Current monetization: **$5 per guide package**
- Current purchase includes first download + one updated download within 30 days
- No subscription

Important: **$5 is not considered a settled long-term price.** It has been treated as a validation price.

The current $5/download model becomes less appropriate if the business starts hosting guides. Hosted publishing creates ongoing operational responsibilities and likely calls for a different price/renewal model.

Potential future pricing hypotheses after hosted publishing works include a publish/hosting fee or low annual per-property fee, but no final pricing decision has been made.

### Offer 2 — Listing and Guest Experience Upgrade

The expert service should not be framed as “we build your guide for you.” It is broader.

It reviews the guest journey across:

- Listing first impression
- Cover photo and photo sequence
- Title and opening description
- Amenities and differentiators
- Missing or unclear information
- House-rule language and expectations
- Booking/pre-arrival communication
- Parking, check-in, and access instructions
- On-property information
- Welcome guide content
- Local recommendations
- Checkout communication
- Review/post-stay communication

#### Expert Review

Current displayed price:

**$249 for one property**

Current intended deliverables include:

- Human-led listing and guest-journey review
- Annotated and prioritized findings
- Cover-photo / photo-order recommendation
- 2–3 title directions
- Rewritten opening description
- Selected sample message/check-in/checkout improvements
- Suggested welcome-guide structure
- 15–25 minute recorded walkthrough
- 30-minute follow-up call
- One clarification round within seven days

The review should explain, for each important finding:

1. What was noticed
2. Why it may matter to the guest
3. What should change
4. An example of the improved direction

#### Review + Implementation

Current displayed price:

**From $549**

Includes the review plus implementation of the agreed scope, such as:

- Listing title/opening rewrite
- Photo sequencing
- Amenities/differentiator improvements
- Up to five rewritten guest messages
- Revised check-in and checkout instructions
- Completed digital guide
- QR code
- One simple printable welcome card
- One revision round

Additional properties, platforms, messages, or broader collateral should be separately scoped.

### Service positioning rules

Do not use first-person “I” in product/service copy for now.

Preferred language:

- “Human-led hospitality and product-design review”
- “Reviewed by a real hospitality and product-design professional”
- “Human judgment for a human-centered hospitality experience”

Avoid absolute “no AI” claims. Technology may support organization or administration, but the key promise is that analysis, prioritization, recommendations, judgment, and final quality review are human-led.

Do not promise:

- Airbnb ranking improvements
- Higher occupancy
- Revenue lifts
- Booking conversion increases
- Higher ratings

unless sufficient data exists to support those claims.

---

## 5. Differentiation / USP direction

### What is *not* enough to differentiate

These are useful features but are not strong USPs by themselves:

- Hosted guide
- Public link
- QR code
- Mobile layout
- No guest app
- Beautiful templates
- One-time price
- “Human-led” by itself

Established guidebook products already offer many of these.

### Stronger wedge

The intended differentiator is:

> **Hotel-quality guest-experience thinking for independent hosts who do not need a complicated property-management platform.**

The builder should gradually embody hospitality expertise rather than acting as a neutral set of form fields.

Examples of future hospitality-led product guidance:

- What guests need before arrival versus during the stay
- Whether essential arrival information is buried
- Whether wording feels welcoming, vague, or unnecessarily hostile
- Whether checkout tasks feel excessive
- Whether expectations are clear before booking
- Whether local recommendations feel curated
- Whether a host is exposing unsafe access information publicly
- Whether the information hierarchy matches the guest’s real journey

A longer-term scalable opportunity is to let a host enter property information once and generate/coordinate multiple outputs:

- Hosted guide
- Pre-arrival message
- Check-in message
- Checkout message
- House-information summary
- Printable QR card
- Listing-information checklist
- Human-review readiness package

A possible long-term concept is **one source of truth for the guest experience from booking to checkout**.

Do not claim that broader system exists today. Today, the builder primarily creates the guide; the broader journey is delivered through the service.

---

## 6. Brand and visual direction

### Current brand palette

Harbor Blue is the primary brand color.

- **Harbor Blue:** `#506D79`
- **Dark Harbor:** `#354F5A`
- **Soft Harbor:** `#E6EFF0`
- **Apricot:** `#E07A5F`
- **Soft Apricot:** `#F7E4DC`

Use Apricot as an expressive secondary accent, not as a competing primary brand.

Green should primarily communicate success. Red should primarily communicate error/danger. Neutral colors should carry most surfaces and structure.

### Design references

Visual references discussed:

- Airbnb
- Notion
- Monday
- Stripe
- Headspace
- Duolingo
- Linear

Desired characteristics:

- Generous whitespace
- Clear hierarchy
- Few unnecessary borders/boxes/dividers
- Warm but professional
- High legibility
- Consistent spacing and controls
- WCAG 2.2 AA target

### Shared CSS

As of v2.13.0:

- `index.html`
- `expert-service.html`
- `builder.html`
- `service-thanks.html`

share `styles.css` for brand consistency.

The public homepage and expert-service page use the same 1180px content-width token.

Generated guest-guide themes remain independent because the exported guide should not depend on the business website stylesheet.

Note: moving builder styles into `styles.css` centralized them but did not remove all accumulated legacy override layers. A later CSS cleanup should consolidate duplicate/overridden builder styles instead of adding more patches.

---

## 7. Current homepage direction

The homepage currently presents two paths:

1. **Create your guide** — primary CTA
2. Expert service — clearly visible secondary path

The business has not yet made a final strategic decision about whether the homepage should become builder-led or expert-service-led.

### Builder-led benefits

- Low commitment
- Immediate activation
- Highly scalable fulfillment
- Demonstrates product quality
- Broad top-of-funnel acquisition
- Can generate leads for expert services

### Builder-led risks

- Weak revenue at $5
- Free/low-cost competition exists
- Current publishing flow is materially worse than hosted competitors
- Paid customer acquisition would be difficult at a $5 price point
- Support can quickly exceed transaction value
- Leading with a $5 tool can make the premium service feel disconnected

### Expert-led benefits

- Much stronger revenue per customer
- Better differentiation through real human judgment
- Produces case studies and deeper customer insight
- Can fund development of the scalable product
- Better expression of hospitality + product-design expertise

### Expert-led risks

- Requires more trust and proof
- Less scalable without standardization
- Scope creep risk
- Can consume product-development capacity
- New independent brand does not yet have its own public case studies/testimonials

### Current strategic recommendation

Near term: **builder-visible, service-commercial**.

Keep the builder easy to discover and use, while treating the expert service as the higher-value commercial path. Use the first few service engagements to establish case studies, real delivery time, repeatable scope, and product insight. Revisit homepage dominance after evidence exists.

---

## 8. Current builder — implemented capabilities

The browser builder currently supports:

- Browser-based form workflow
- Live preview
- Local autosave
- Unpaid-draft auto-restore from landing CTA
- IndexedDB storage for photos
- Browser-side image resize/compression/WebP
- Structured `guide.json`
- Dynamic photo gallery
- Photo descriptions
- Vertical photo reorder
- Cover image behavior
- Accessible menu controls
- Structured local recommendations
- Google/Apple Maps links
- Optional recommendation images and alt text
- Empty-section hiding
- Multiple distinct themes
- QR generation after publishing
- Access-credential safety detection
- Required manual public-content confirmation before payment
- Safe DOM rendering / textContent-based content insertion
- URL validation
- Content Security Policy in generated guides
- Object URL cleanup
- Legacy guide import support
- Stripe Checkout
- Netlify Blobs entitlement storage
- Server-side payment/update entitlement verification

Themes currently include:

- Coastal
- Cabin
- Modern Loft

Themes should remain meaningfully different layouts/presentations rather than simple recolors.

---

## 9. Current publishing architecture — implemented today

**Important for the next agent:** The repository still uses the existing ZIP + Netlify Drop publication model.

Current flow:

1. Host builds and previews guide.
2. Host confirms no door/gate/keypad/lockbox/access credentials are included publicly.
3. Stripe Checkout is completed.
4. Backend verifies payment and entitlement.
5. Browser claims an eligible download.
6. Browser generates a ZIP locally.
7. ZIP contains:

```text
PUBLISH-THIS-FOLDER/
  index.html
  guide.json
  images/

KEEP-FOR-EDITS/
  guide-backup.json

HOW-TO-PUBLISH.txt
```

8. Host manually uploads `PUBLISH-THIS-FOLDER` to Netlify Drop.
9. Host copies the Netlify URL back into the builder.
10. Builder generates PNG/SVG QR codes.

`KEEP-FOR-EDITS/guide-backup.json` contains the private restoration credential and must not be published.

### Why this is now considered the biggest builder risk

For nontechnical hosts, the experience becomes:

> Build → Pay → Download ZIP → Unzip → Find correct folder → Create/sign into Netlify → Upload folder → Find live URL → Return to builder → Paste URL → QR

This breaks the otherwise polished, low-friction experience and creates activation/support risk.

The current product should not be considered ready to scale the builder until publishing friction is validated or removed.

---

## 10. Current payment / entitlement architecture

The current backend treats the commercial unit as a **download**.

Stripe is the payment source of truth. Netlify Blobs stores server-side entitlement data including:

- Stable guide ID
- Hashed owner token
- Stripe Checkout Session ID
- Payment timestamp
- Included-update expiration
- Download usage timestamps
- Latest generated version

Each $5 purchase currently grants:

- Initial download
- One included updated download within 30 days

After that update is used or expires, another $5 purchase starts another update cycle.

The raw owner token is stored only in the private guide backup; the server stores only its SHA-256 hash.

Current backend files:

```text
netlify/lib/entitlements.mjs
netlify/functions/payment-config.mjs
netlify/functions/create-checkout-session.mjs
netlify/functions/stripe-webhook.mjs
netlify/functions/get-guide-entitlement.mjs
netlify/functions/verify-checkout-session.mjs
netlify/functions/claim-guide-download.mjs
netlify/functions/save-feedback-contact.mjs
```

---

## 11. Recommended next architecture — path-based hosted publishing

This is the most important proposed next product/engineering direction.

### Goal

Replace:

> ZIP → Netlify Drop

with:

> Build → Preview → Pay → Publish → Share

A host should click Publish and immediately receive a live branded URL and QR code.

### Recommended initial URL model

Prefer path-based publishing first:

```text
https://yourdomain.com/g/ocean-house-a7k2
```

or later:

```text
https://stay.yourdomain.com/ocean-house-a7k2
```

Do **not** begin with one unique subdomain per property. Wildcard subdomains are technically feasible but add DNS/SSL/routing complexity without solving a meaningful additional user problem at MVP stage.

### Architecture direction

Use one shared guide renderer plus per-property structured data and assets.

Do not create a full separate deployed site for every guide.

Suggested storage model:

```text
publications/{guideId}
slugs/{slug}
revisions/{guideId}/{revisionId}/guide.json
assets/{guideId}/{revisionId}/cover.webp
assets/{guideId}/{revisionId}/photo-02.webp
```

Publication records should have a stable public slug and point to a current revision.

Use immutable/versioned revisions so a failed update never breaks the currently live guide.

### Suggested new backend modules

```text
netlify/lib/publications.mjs
netlify/lib/render-guide.mjs

netlify/functions/begin-guide-publish.mjs
netlify/functions/upload-guide-asset.mjs
netlify/functions/finalize-guide-publish.mjs
netlify/functions/get-guide-publication.mjs
netlify/functions/unpublish-guide.mjs
netlify/functions/serve-public-guide.mjs
netlify/functions/serve-guide-asset.mjs
```

### Suggested publication flow

1. Validate the guide.
2. Prepare/compress photos and recommendation assets.
3. Confirm payment/publishing entitlement.
4. Begin a publication revision.
5. Upload each asset separately.
6. Upload/finalize guide data.
7. Verify all expected assets exist.
8. Atomically switch the publication record to the new revision.
9. Return the permanent URL.
10. Generate/display the QR automatically.

Do not upload every image plus the guide in one large function request. Keep asset uploads individual and size-limited.

### Builder functions that should eventually change

Current download-oriented flow:

```text
requestGuideDownload()
claimCurrentDownload()
downloadGuideFiles()
makePublishInstructions()
```

Future hosted flow:

```text
requestGuidePublish()
checkPublishEntitlement()
publishGuide()
beginPublication()
uploadPublicationAssets()
finalizePublication()
```

### What should eventually leave the normal customer flow

After hosted publishing is validated:

- Netlify Drop instructions
- Manual unzip steps
- `PUBLISH-THIS-FOLDER`
- `HOW-TO-PUBLISH.txt`
- Manual live-URL input
- “Create guide files” wording
- Automatic ZIP download as the primary outcome

### What should remain

Keep JSZip / legacy imports for:

- Older guide-package compatibility
- Private backup/export
- Customer data portability
- Possible optional static export later

A future backup could be:

```text
property-guide-backup.zip
  guide-backup.json
  images/
  README.txt
```

The live hosted guide should be the main product experience; the ZIP becomes a backup/ownership feature.

---

## 12. Hosted model: unresolved product decisions

Do **not** hard-code final business rules until these are decided.

Open questions:

- What is the price to publish?
- How long is hosting included?
- Are guide updates unlimited while hosting is active?
- Is there an annual renewal?
- What happens when hosting expires?
- Does a host need an account, or can the MVP continue with owner tokens?
- What recovery path exists when local storage or backup files are lost?
- What quotas exist for images/storage?
- What happens when a guide is unpublished?

Important strategic point: **$5 lifetime hosting is probably not a good long-term business model.** Hosted publishing transfers uptime, support, storage, abuse, maintenance, deletion, and account-recovery responsibilities to the product.

Do not finalize pricing until the hosted publishing UX is working and the cost/support assumptions can be tested.

---

## 13. Recommended implementation sequence

### Phase 1 — Hosted publishing proof of concept

Build this beside the current ZIP flow first.

- Feature-flag hosted publishing
- Publish a test guide to `/g/:slug`
- Store guide JSON + assets server-side
- Keep stable URL through an update
- Test mobile/desktop
- Test QR
- Test partial upload failure
- Test rollback/current-revision safety
- Do not consume production Stripe entitlements yet
- Keep current ZIP fallback intact

Suggested feature flag:

```js
const HOSTED_PUBLISHING_ENABLED = false;
```

### Phase 2 — Builder integration

- New Publish CTA/state
- Publish progress UI
- Stable live URL
- Automatic QR
- Publish update
- Unpublish
- Save publication metadata with guide state
- Keep legacy package import

### Phase 3 — Commercial model

After the hosted flow is reliable:

- Decide hosting term
- Decide pricing
- Decide update policy
- Rename/rework download entitlements into publishing entitlements
- Update Stripe product/copy

### Phase 4 — Retire Netlify Drop

Only after real-user validation:

- Remove manual Netlify UI
- Remove `HOW-TO-PUBLISH.txt`
- Stop generating `PUBLISH-THIS-FOLDER`
- Retain backup export + legacy import

---

## 14. Current code architecture / important files

```text
index.html
  Public two-offer homepage

expert-service.html
  Expert Review + Review & Implementation details and inquiry form

service-thanks.html
  Service inquiry confirmation

builder.html
  Main browser-based builder and current publishing/download workflow

styles.css
  Shared brand/site/builder CSS

index-template.html
  Generated guest-guide template

template-source.js
  Template source helper used by builder generation

themes.js
  Theme configuration

jszip.min.js
  ZIP generation/import support

qrcode-bundle.js
  QR generation

papaparse.min.js
  Existing bundled CSV parser dependency

netlify.toml
  Netlify build/functions configuration

netlify/lib/entitlements.mjs
  Netlify Blobs entitlement persistence

netlify/functions/*
  Stripe payment, entitlement, feedback functions

README.md
IMPLEMENTATION-NOTES.md
PAYMENTS-SETUP.md
  Existing implementation documentation
```

---

## 15. UX / content rules to preserve

### General

- Avoid excessive borders, frames, dividers, and heavy controls.
- Use cards primarily where selection/grouping benefits from them.
- Prefer whitespace and hierarchy over decoration.
- Maintain consistent labels, hint spacing, radii, control heights, and focus states.
- Avoid “AI-generated” visual tropes.

### Builder

- Landing CTA should continue to auto-restore an unpaid draft.
- **Open** should remain for imported/previously downloaded packages, not routine unfinished work.
- Public access credentials must remain blocked/flagged.
- Public-content confirmation must start unchecked.
- Guest-guide preview should hide empty content.
- Photos should remain reorderable.
- Photo descriptions are optional.
- Recommendation map links should be validated.
- Theme layouts should remain distinct.

### Service

- Avoid first-person “I” in current product copy.
- Emphasize real human review and context-specific judgment.
- Do not define the service as only “done-for-you guide creation.”
- Avoid unsupported revenue/booking/ranking claims.

---

## 16. Metrics that should be added before serious growth work

The product currently needs better funnel evidence.

Recommended events:

```text
landing_create_guide_clicked
landing_expert_service_clicked
builder_started
unpaid_draft_restored
preview_opened
payment_started
payment_completed
guide_downloaded                 # legacy flow
hosted_publish_started           # future
hosted_publish_completed         # future
hosted_publish_failed            # future
guide_update_published           # future
qr_generated
expert_service_viewed
expert_inquiry_submitted
```

The central activation metric for the builder should eventually be **successfully published live guide**, not ZIP download.

---

## 17. Critical risks

### 1. Publishing friction

Currently the largest builder risk. A polished builder can still fail commercially if the host cannot comfortably get the guide online.

### 2. Weak $5 unit economics

At $5, paid acquisition and manual support are difficult to sustain. Do not optimize for volume before testing a healthier hosted pricing model.

### 3. Becoming a generic guidebook competitor

Hosted publishing makes the product easier to compare with Hostfully/Touch Stay/etc. Do not respond with feature parity. Keep the focus on independent hosts, hospitality judgment, simplicity, and the human expertise layer.

### 4. Service scope creep

The $249/$549 service must remain productized. Do not let every project become bespoke consulting across revenue management, interior design, pricing, or general property operations.

### 5. Service/product time conflict

Service work should generate revenue, customer research, case studies, and product insight — not consume all capacity indefinitely.

### 6. Ownership/recovery

Owner-token + local backup may be enough for an MVP, but hosted guides will eventually increase expectations around cross-device access and account recovery. Email magic-link accounts may become necessary after validation.

---

## 18. Decisions explicitly *not* made yet

The next agent should not assume these have been decided:

- Final homepage dominance: builder vs expert service
- Final builder price
- Final hosted-guide price
- Hosting duration / renewal policy
- Unlimited vs limited hosted updates
- Whether to add user accounts immediately
- Whether to use `yourdomain.com/g/...` or a dedicated `stay.yourdomain.com/...` origin at launch
- Whether/when to migrate hosting infrastructure away from Netlify Blobs/Functions
- Final name/brand identity beyond the current Guest Guide Hospitality working presentation

---

## 19. Recommended next task for the agent

**Do not begin by redesigning the homepage.**

The highest-value next task is a contained hosted-publishing technical spike:

1. Audit current `builder.html`, `index-template.html`, entitlement functions, and Netlify configuration.
2. Design the smallest server-side publication record/schema that can coexist with the existing entitlement model.
3. Implement a feature-flagged `/g/:slug` proof of concept using one shared renderer and versioned assets.
4. Keep the current ZIP/Netlify Drop workflow untouched as fallback.
5. Demonstrate:
   - first publish
   - stable public URL
   - image serving
   - update to same URL
   - failed update does not break current live version
   - unpublish behavior
6. Only after this works, propose the exact migration of the builder UI and entitlement language.

Before deleting legacy code, confirm backward compatibility for existing v2.11–v2.13 guide packages.

---

## 20. Agent operating instructions

When continuing development:

- Read this brief, `README.md`, `IMPLEMENTATION-NOTES.md`, and `PAYMENTS-SETUP.md` before editing.
- Treat v2.13.0 as the current working baseline.
- Preserve working Stripe, entitlement, backup, import, accessibility, and safety behavior unless a migration explicitly replaces it.
- Do not silently remove legacy import support.
- Do not hard-code unsettled pricing/hosting assumptions.
- Prefer small, testable architectural steps over large rewrites.
- Distinguish clearly between **currently implemented behavior** and **proposed future behavior**.
- Challenge product assumptions when a request increases complexity, support burden, or weakens differentiation.
- Prioritize activation and commercial viability over cosmetic iteration when they conflict.

---

## 21. One-sentence handoff

**Current product:** a polished self-serve guest-guide builder plus a human-led listing/guest-experience service; **next technical priority:** prove one-click path-based hosted publishing without breaking the existing ZIP/payment/import system; **long-term differentiation:** hospitality judgment and product-design clarity for independent hosts, with software and real-human expertise working together.
