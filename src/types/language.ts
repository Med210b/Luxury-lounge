export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flagEmoji: string;
  dir: 'ltr' | 'rtl';
  countryCode: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flagEmoji: '🇬🇧',
    dir: 'ltr',
    countryCode: 'gb',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flagEmoji: '🇫🇷',
    dir: 'ltr',
    countryCode: 'fr',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flagEmoji: '🇸🇦',
    dir: 'rtl',
    countryCode: 'sa',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flagEmoji: '🇪🇸',
    dir: 'ltr',
    countryCode: 'es',
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flagEmoji: '🇮🇹',
    dir: 'ltr',
    countryCode: 'it',
  },
  {
    code: 'zh-CN',
    name: 'Chinese',
    nativeName: '中文',
    flagEmoji: '🇨🇳',
    dir: 'ltr',
    countryCode: 'cn',
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flagEmoji: '🇷🇺',
    dir: 'ltr',
    countryCode: 'ru',
  },
  {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    flagEmoji: '🇹🇷',
    dir: 'ltr',
    countryCode: 'tr',
  },
  {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    flagEmoji: '🇳🇱',
    dir: 'ltr',
    countryCode: 'nl',
  },
];
