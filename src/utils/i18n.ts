// i18n.ts - Internationalization utilities
// Handles language switching and text translation for the BEMYTECH landing page

export interface TranslationData {
  [key: string]: any;
}

export type SupportedLanguages = 'es' | 'en';

export const DEFAULT_LANGUAGE: SupportedLanguages = 'es';

export const SUPPORTED_LANGUAGES: SupportedLanguages[] = ['es', 'en'];

// Language labels for UI
export const LANGUAGE_LABELS: Record<SupportedLanguages, string> = {
  es: 'Español',
  en: 'English'
};

// Cache for loaded translations
const translationCache: Record<string, TranslationData> = {};

/**
 * Loads translation data for a specific language
 * @param lang - Language code to load
 * @returns Translation data object
 */
export async function loadTranslations(lang: SupportedLanguages): Promise<TranslationData> {
  // Check if already cached
  if (translationCache[lang]) {
    return translationCache[lang];
  }

  try {
    // Dynamic import based on language
    const translations = await import(`../i18n/${lang}.json`);
    translationCache[lang] = translations.default;
    return translations.default;
  } catch (error) {
    console.error(`Failed to load translations for language: ${lang}`, error);
    
    // Fallback to default language if current language fails
    if (lang !== DEFAULT_LANGUAGE) {
      return loadTranslations(DEFAULT_LANGUAGE);
    }
    
    // Return empty object if even default fails
    return {};
  }
}

/**
 * Gets a nested value from an object using dot notation
 * @param obj - Object to search in
 * @param key - Dot-separated key path
 * @returns Value at the specified path or the key itself if not found
 */
function getNestedValue(obj: any, key: string): any {
  return key.split('.').reduce((current, keyPart) => {
    return current?.[keyPart];
  }, obj);
}

/**
 * Creates a translation function for a specific language
 * @param lang - Language code
 * @returns Translation function
 */
export async function createTranslationFunction(lang: SupportedLanguages) {
  const translations = await loadTranslations(lang);
  
  return function t(key: string, fallback?: string): string {
    const value = getNestedValue(translations, key);
    
    if (value !== undefined && value !== null) {
      return String(value);
    }
    
    // Return fallback if provided
    if (fallback) {
      return fallback;
    }
    
    // Return the key itself as fallback
    console.warn(`Translation missing for key: ${key} in language: ${lang}`);
    return key;
  };
}

/**
 * Detects the preferred language from browser settings
 * @returns Detected language code or default language
 */
export function detectLanguage(): SupportedLanguages {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }
  
  // Check localStorage first
  const storedLang = localStorage.getItem('preferred-language') as SupportedLanguages;
  if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang)) {
    return storedLang;
  }
  
  // Check browser language
  const browserLang = navigator.language.split('-')[0] as SupportedLanguages;
  if (SUPPORTED_LANGUAGES.includes(browserLang)) {
    return browserLang;
  }
  
  return DEFAULT_LANGUAGE;
}

/**
 * Saves the preferred language to localStorage
 * @param lang - Language code to save
 */
export function saveLanguagePreference(lang: SupportedLanguages): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', lang);
  }
}

/**
 * Gets the current language from URL params or localStorage
 * @returns Current language code
 */
export function getCurrentLanguage(): SupportedLanguages {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }
  
  // Check URL params first
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang') as SupportedLanguages;
  
  if (urlLang && SUPPORTED_LANGUAGES.includes(urlLang)) {
    // Save to localStorage for future visits
    saveLanguagePreference(urlLang);
    return urlLang;
  }
  
  // Fallback to detection
  return detectLanguage();
}

/**
 * Switches to a different language
 * @param lang - Language code to switch to
 */
export function switchLanguage(lang: SupportedLanguages): void {
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    console.error(`Unsupported language: ${lang}`);
    return;
  }
  
  // Save preference
  saveLanguagePreference(lang);
  
  // Update URL without reload
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url.toString());
  
  // Trigger page reload to apply new language
  window.location.reload();
}

/**
 * Utility function to get language-specific class names
 * @param lang - Language code
 * @returns CSS class string for language-specific styling
 */
export function getLanguageClass(lang: SupportedLanguages): string {
  return `lang-${lang}`;
}

/**
 * Checks if a language is right-to-left (RTL)
 * @param lang - Language code
 * @returns True if RTL, false otherwise
 */
export function isRTL(lang: SupportedLanguages): boolean {
  const rtlLanguages: SupportedLanguages[] = [];
  return rtlLanguages.includes(lang);
}

/**
 * Astro-specific helper to get translations for server-side rendering
 * @param lang - Language code
 * @returns Translation object and function
 */
export async function getTranslationsForSSR(lang: SupportedLanguages = DEFAULT_LANGUAGE) {
  const translations = await loadTranslations(lang);
  const t = (key: string, fallback?: string): string => {
    const value = getNestedValue(translations, key);
    
    if (value !== undefined && value !== null) {
      return String(value);
    }
    
    if (fallback) {
      return fallback;
    }
    
    return key;
  };
  
  return { translations, t, lang };
} 