// utils/cookieConsent.ts

const COOKIE_KEY = 'cookie_consent';

export function setCookieConsent(consent: boolean) {
  document.cookie = `${COOKIE_KEY}=${consent}; path=/; max-age=31536000`; // 1 year
}

export function getCookieConsent(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.includes(`${COOKIE_KEY}=true`);
}
