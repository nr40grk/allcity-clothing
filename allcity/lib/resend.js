export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'ALLCITY <noreply@allcity-clothing.com>';
export const STORE_NAME = 'ALLCITY';

// Lazy init — avoids crash at build time when env var isn't set
let _resend = null;
export function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) {
    const { Resend } = require('resend');
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}
