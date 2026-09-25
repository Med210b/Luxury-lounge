import { SUPPORTED_LANGUAGES, LanguageOption } from '../types/language';

const STORAGE_KEY = 'luxury_lounge_selected_lang';
const GOOGTRANS_COOKIE = 'googtrans';

export const getStoredLanguageCode = (): string => {
  if (typeof window === 'undefined') return 'en';

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      return saved;
    }

    // Check googtrans cookie: format is /en/fr or /en/ar
    const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    if (match && match[1]) {
      const parts = decodeURIComponent(match[1]).split('/');
      const code = parts[parts.length - 1];
      if (code && SUPPORTED_LANGUAGES.some((l) => l.code === code)) {
        return code;
      }
    }
  } catch {
    // Ignore storage errors
  }

  return 'en';
};

export const getLanguageByCode = (code: string): LanguageOption => {
  return (
    SUPPORTED_LANGUAGES.find((lang) => lang.code === code) ||
    SUPPORTED_LANGUAGES[0]
  );
};

export const applyDirectionAndLangAttributes = (code: string) => {
  if (typeof document === 'undefined') return;

  const isRtl = code === 'ar';
  const html = document.documentElement;
  const body = document.body;

  if (isRtl) {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
    body.classList.add('rtl-layout');
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', code);
    body.classList.remove('rtl-layout');
  }
};

const setGoogleTranslateCookie = (code: string) => {
  if (typeof document === 'undefined') return;

  const host = window.location.hostname;
  const domainParts = host.split('.');

  const clearCookieForDomain = (domainStr: string) => {
    document.cookie = `${GOOGTRANS_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    if (domainStr) {
      document.cookie = `${GOOGTRANS_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domainStr};`;
    }
  };

  // Clear existing cookies
  clearCookieForDomain('');
  clearCookieForDomain(host);
  if (domainParts.length > 1) {
    clearCookieForDomain(`.${host}`);
    // Also try parent domain
    const parentDomain = domainParts.slice(1).join('.');
    if (parentDomain && parentDomain.includes('.')) {
      clearCookieForDomain(`.${parentDomain}`);
    }
  }

  if (code === 'en') {
    // Reset to English
    document.cookie = `${GOOGTRANS_COOKIE}=/en/en; path=/;`;
    document.cookie = `${GOOGTRANS_COOKIE}=/en/en; path=/; domain=${host};`;
  } else {
    const val = `/en/${code}`;
    document.cookie = `${GOOGTRANS_COOKIE}=${val}; path=/;`;
    document.cookie = `${GOOGTRANS_COOKIE}=${val}; path=/; domain=${host};`;
    if (domainParts.length > 1) {
      document.cookie = `${GOOGTRANS_COOKIE}=${val}; path=/; domain=.${host};`;
    }
  }
};

export const triggerGoogleTranslate = (code: string): boolean => {
  if (typeof document === 'undefined') return false;

  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (!select) return false;

  let targetValue = '';

  if (code === 'en') {
    // In Google Translate, original English is option with value="" or "en"
    targetValue = '';
  } else {
    targetValue = code;
  }

  // Find exact matching option or prefix matching option
  let matchedIndex = -1;
  for (let i = 0; i < select.options.length; i++) {
    const opt = select.options[i];
    if (code === 'en') {
      if (opt.value === '' || opt.value === 'en' || opt.text.toLowerCase().includes('english') || opt.text.toLowerCase().includes('select')) {
        matchedIndex = i;
        break;
      }
    } else {
      if (opt.value.toLowerCase() === code.toLowerCase()) {
        matchedIndex = i;
        break;
      }
    }
  }

  if (matchedIndex === -1 && code !== 'en') {
    const prefix = code.split('-')[0].toLowerCase();
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value.toLowerCase().startsWith(prefix)) {
        matchedIndex = i;
        break;
      }
    }
  }

  if (matchedIndex !== -1) {
    select.selectedIndex = matchedIndex;
    select.value = select.options[matchedIndex].value;
  } else {
    select.value = targetValue;
  }

  // Dispatch change events to trigger Google's translation engine
  select.dispatchEvent(new Event('change', { bubbles: true }));
  select.dispatchEvent(new Event('input', { bubbles: true }));

  if (typeof (select as any).onchange === 'function') {
    try {
      (select as any).onchange(new Event('change'));
    } catch {
      // safe ignore
    }
  }

  // If restoring to English, also attempt to trigger the restore button in Google banner if present
  if (code === 'en') {
    try {
      const bannerIframe = document.querySelector<HTMLIFrameElement>('iframe.goog-te-banner-frame');
      if (bannerIframe && bannerIframe.contentWindow) {
        const doc = bannerIframe.contentWindow.document;
        const finishBtn = doc.querySelector<HTMLButtonElement>('button[id*="restore"], .goog-te-button button, button');
        if (finishBtn) {
          finishBtn.click();
        }
      }
    } catch {
      // cross-origin safe
    }
  }

  return true;
};

export const switchLanguage = (code: string) => {
  const lang = getLanguageByCode(code);

  // 1. Update Direction and HTML language attributes immediately (Arabic RTL)
  applyDirectionAndLangAttributes(lang.code);

  // 2. Persist in localStorage
  try {
    localStorage.setItem(STORAGE_KEY, lang.code);
  } catch {
    // ignore
  }

  // 3. Set Google Translate Cookie
  setGoogleTranslateCookie(lang.code);

  // 4. Trigger Google Translate DOM translation
  const triggered = triggerGoogleTranslate(lang.code);

  // If Google Translate combo is still loading in DOM, poll for it
  if (!triggered) {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const success = triggerGoogleTranslate(lang.code);
      if (success || attempts >= 30) {
        clearInterval(interval);
      }
    }, 100);
  }

  // 5. Notify React components (e.g. LanguageSwitcher active indicator)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('luxuryLanguageChanged', { detail: { code: lang.code } })
    );
  }
};

export const initLanguageManager = () => {
  if (typeof window === 'undefined') return;

  // Active guard against Google Translate top banner & body.style.top push
  const enforceZeroTop = () => {
    if (document.body && document.body.style.top && document.body.style.top !== '0px') {
      document.body.style.setProperty('top', '0px', 'important');
    }
  };

  try {
    const observer = new MutationObserver(() => {
      enforceZeroTop();
      const bannerIframes = document.querySelectorAll<HTMLElement>(
        '.VIpgJd-ZVi9od-ORHb-OEVmcd, iframe.VIpgJd-ZVi9od-ORHb-OEVmcd, .goog-te-banner-frame, iframe[class*="VIpgJd"]'
      );
      bannerIframes.forEach((b) => {
        b.style.setProperty('display', 'none', 'important');
        b.style.setProperty('visibility', 'hidden', 'important');
        b.style.setProperty('height', '0px', 'important');
        b.style.setProperty('max-height', '0px', 'important');
      });
    });

    if (document.body) {
      observer.observe(document.body, { attributes: true, attributeFilter: ['style'], childList: true });
    }
    if (document.documentElement) {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
    }
  } catch {
    // safe ignore
  }

  const current = getStoredLanguageCode();
  applyDirectionAndLangAttributes(current);

  if (current !== 'en') {
    setGoogleTranslateCookie(current);

    // Watch for .goog-te-combo injection to trigger translation automatically on load
    let tries = 0;
    const checkInterval = setInterval(() => {
      tries++;
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        triggerGoogleTranslate(current);
        clearInterval(checkInterval);
      } else if (tries > 40) {
        clearInterval(checkInterval);
      }
    }, 120);
  }
};
