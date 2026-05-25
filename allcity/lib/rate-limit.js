// Simple in-memory rate limiter for serverless environments.
// For production with multiple instances, switch to Redis / Vercel KV.

const buckets = new Map();

function getBucketKey(identifier, windowSeconds) {
  const windowStart = Math.floor(Date.now() / 1000 / windowSeconds) * windowSeconds;
  return `${identifier}:${windowStart}`;
}

export function rateLimit(identifier, { max = 10, windowSeconds = 60 } = {}) {
  const key = getBucketKey(identifier, windowSeconds);
  const now = Date.now();

  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { count: 0, resetAt: now + windowSeconds * 1000 };
    buckets.set(key, bucket);
  }

  // Clean up expired entries occasionally
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (v.resetAt < now) buckets.delete(k);
    }
  }

  if (bucket.count >= max) {
    return { allowed: false, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return { allowed: true, remaining: max - bucket.count };
}

export function getClientIP(req) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}
