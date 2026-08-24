import { getStore } from '@netlify/blobs';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

const STORE_NAME = 'guide-entitlements-v1';
const UPDATE_WINDOW_DAYS = 30;
const MAX_RETRIES = 4;

function store() {
  return getStore({ name: STORE_NAME, consistency: 'strong' });
}

export function validGuideId(value) {
  return typeof value === 'string' && /^[a-zA-Z0-9-]{12,100}$/.test(value);
}

export function clean(value, maxLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export function createOwnerToken() {
  return randomBytes(32).toString('base64url');
}

function tokenHash(value) {
  return createHash('sha256').update(String(value || ''), 'utf8').digest('hex');
}

function safeTokenMatch(expectedHash, suppliedToken) {
  if (!expectedHash || !suppliedToken) return false;
  const suppliedHash = tokenHash(suppliedToken);
  const left = Buffer.from(expectedHash, 'hex');
  const right = Buffer.from(suppliedHash, 'hex');
  return left.length === right.length && timingSafeEqual(left, right);
}

function addDays(iso, days) {
  const date = new Date(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString();
}

function normalizeRecord(record, guideId) {
  const value = record && typeof record === 'object' ? record : {};
  return {
    guideId,
    ownerTokenHash: clean(value.ownerTokenHash, 128),
    ownerEmail: clean(value.ownerEmail, 320).toLowerCase(),
    createdAt: clean(value.createdAt, 40),
    latestVersion: Number.isInteger(value.latestVersion) && value.latestVersion >= 0 ? value.latestVersion : 0,
    purchases: Array.isArray(value.purchases) ? value.purchases : []
  };
}

async function readWithEtag(guideId) {
  const result = await store().getWithMetadata(`guide/${guideId}`, { type: 'json', consistency: 'strong' });
  if (!result) return { record: null, etag: null };
  return { record: normalizeRecord(result.data, guideId), etag: result.etag || null };
}

async function writeRecord(record, etag) {
  const options = etag ? { onlyIfMatch: etag } : { onlyIfNew: true };
  return store().setJSON(`guide/${record.guideId}`, record, options);
}

async function mutateGuide(guideId, mutator) {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt += 1) {
    const { record, etag } = await readWithEtag(guideId);
    const working = normalizeRecord(record, guideId);
    const result = await mutator(working, Boolean(record));
    if (result && result.skipWrite) return result.value;
    const write = await writeRecord(working, etag);
    if (write.modified) return result ? result.value : working;
  }
  throw new Error('The guide record changed while it was being updated. Please try again.');
}

function publicPurchase(purchase) {
  return {
    id: purchase.id,
    kind: purchase.kind,
    paidAt: purchase.paidAt,
    updateExpiresAt: purchase.updateExpiresAt,
    initialDownloadUsedAt: purchase.initialDownloadUsedAt || null,
    includedUpdateUsedAt: purchase.includedUpdateUsedAt || null
  };
}

function statusFor(record, nowIso = new Date().toISOString()) {
  const purchases = [...record.purchases].sort((a, b) => String(a.paidAt).localeCompare(String(b.paidAt)));
  const latest = purchases[purchases.length - 1] || null;
  if (!latest) {
    return {
      managed: false,
      guideId: record.guideId,
      latestVersion: record.latestVersion,
      nextDownload: 'payment_required',
      purchase: null
    };
  }
  let nextDownload = 'payment_required';
  if (!latest.initialDownloadUsedAt) nextDownload = 'paid_download';
  else if (!latest.includedUpdateUsedAt && latest.updateExpiresAt && nowIso <= latest.updateExpiresAt) nextDownload = 'included_update';
  return {
    managed: true,
    guideId: record.guideId,
    latestVersion: record.latestVersion,
    nextDownload,
    purchase: publicPurchase(latest)
  };
}

export async function recordPurchase({ guideId, ownerToken, sessionId, kind, paidAt, customerEmail }) {
  if (!validGuideId(guideId)) throw new Error('Invalid guide ID.');
  if (!ownerToken || ownerToken.length < 24) throw new Error('Invalid guide owner token.');
  if (!/^cs_(?:test_|live_)?[a-zA-Z0-9]+$/.test(sessionId)) throw new Error('Invalid Stripe session.');
  const normalizedPaidAt = new Date(paidAt || Date.now()).toISOString();
  return mutateGuide(guideId, (record, existed) => {
    const suppliedHash = tokenHash(ownerToken);
    if (existed && record.ownerTokenHash && record.ownerTokenHash !== suppliedHash) {
      throw new Error('This payment does not belong to the saved guide.');
    }
    record.ownerTokenHash = suppliedHash;
    if (!record.createdAt) record.createdAt = normalizedPaidAt;
    if (customerEmail) record.ownerEmail = clean(customerEmail, 320).toLowerCase();
    const existing = record.purchases.find((purchase) => purchase.id === sessionId);
    if (!existing) {
      record.purchases.push({
        id: sessionId,
        kind: kind === 'paid_update' ? 'paid_update' : 'initial',
        paidAt: normalizedPaidAt,
        updateExpiresAt: addDays(normalizedPaidAt, UPDATE_WINDOW_DAYS),
        initialDownloadUsedAt: null,
        includedUpdateUsedAt: null
      });
    }
    return { value: statusFor(record) };
  });
}

export async function getEntitlement({ guideId, ownerToken }) {
  if (!validGuideId(guideId)) return { managed: false, nextDownload: 'payment_required', guideId };
  const { record } = await readWithEtag(guideId);
  if (!record) return { managed: false, nextDownload: 'payment_required', guideId, latestVersion: 0 };
  if (!safeTokenMatch(record.ownerTokenHash, ownerToken)) {
    return { managed: true, ownerVerified: false, guideId, nextDownload: 'ownership_required' };
  }
  return { ...statusFor(record), ownerVerified: true };
}

export async function verifyOwner({ guideId, ownerToken }) {
  if (!validGuideId(guideId)) return false;
  const { record } = await readWithEtag(guideId);
  return Boolean(record && safeTokenMatch(record.ownerTokenHash, ownerToken));
}

export async function claimDownload({ guideId, ownerToken, claimId }) {
  if (!validGuideId(guideId)) throw new Error('Invalid guide ID.');
  if (!/^[a-zA-Z0-9-]{12,100}$/.test(String(claimId || ''))) throw new Error('Invalid download claim.');
  return mutateGuide(guideId, (record, existed) => {
    if (!existed || !safeTokenMatch(record.ownerTokenHash, ownerToken)) {
      const error = new Error('This guide purchase could not be verified.');
      error.code = 'ownership_required';
      throw error;
    }
    const existingClaim = record.purchases.flatMap((purchase) => purchase.claims || []).find((claim) => claim.id === claimId);
    if (existingClaim) return { skipWrite: true, value: { allowed: true, mode: existingClaim.mode, version: existingClaim.version, entitlement: statusFor(record) } };

    const purchases = [...record.purchases].sort((a, b) => String(a.paidAt).localeCompare(String(b.paidAt)));
    const latest = purchases[purchases.length - 1];
    if (!latest) {
      const error = new Error('Payment is required for this guide.');
      error.code = 'payment_required';
      throw error;
    }

    const now = new Date().toISOString();
    let mode = '';
    if (!latest.initialDownloadUsedAt) {
      mode = latest.kind === 'paid_update' ? 'paid_update' : 'initial';
      latest.initialDownloadUsedAt = now;
    } else if (!latest.includedUpdateUsedAt && latest.updateExpiresAt && now <= latest.updateExpiresAt) {
      mode = 'included_update';
      latest.includedUpdateUsedAt = now;
    } else {
      const error = new Error('A new payment is required to create this updated guide.');
      error.code = 'payment_required';
      throw error;
    }

    record.latestVersion += 1;
    latest.claims = Array.isArray(latest.claims) ? latest.claims : [];
    latest.claims.push({ id: claimId, mode, version: record.latestVersion, claimedAt: now });
    return { value: { allowed: true, mode, version: record.latestVersion, entitlement: statusFor(record) } };
  });
}

export const entitlementConstants = { UPDATE_WINDOW_DAYS };
