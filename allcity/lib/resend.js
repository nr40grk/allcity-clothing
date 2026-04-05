import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'ALLCITY <noreply@allcity-clothing.com>';
export const STORE_NAME = 'ALLCITY';
