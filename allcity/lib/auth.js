import { createHmac, randomBytes, timingSafeEqual } from 'crypto';

const SECRET = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSWORD || 'change-me';

function base64UrlEncode(str) {
  return Buffer.from(str).toString('base64url');
}

function base64UrlDecode(str) {
  return Buffer.from(str, 'base64url').toString('utf8');
}

function sign(payload) {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64UrlEncode(JSON.stringify(payload));
  const sig = createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${sig}`;
}

function verify(token) {
  try {
    const [header, body, signature] = token.split('.');
    if (!header || !body || !signature) return null;
    const expectedSig = createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url');
    const bufSig = Buffer.from(signature);
    const bufExpected = Buffer.from(expectedSig);
    if (bufSig.length !== bufExpected.length) return null;
    if (!timingSafeEqual(bufSig, bufExpected)) return null;
    const payload = JSON.parse(base64UrlDecode(body));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch { return null; }
}

export function createAdminToken() {
  return sign({ admin: true, iat: Date.now(), exp: Date.now() + 24 * 60 * 60 * 1000 });
}

export function isAdmin(req) {
  const token = req.headers.get('x-admin-token');
  if (!token) return false;
  const payload = verify(token);
  return payload?.admin === true;
}

export function requireAdmin(req) {
  if (!isAdmin(req)) {
    return { ok: false, error: 'Unauthorized', status: 401 };
  }
  return { ok: true };
}
