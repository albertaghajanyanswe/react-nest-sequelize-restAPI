import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';

import enTranslation from './lang/en';
import ruTranslation from './lang/ru';

const resources = {
  en: { translation: enTranslation },
  ru: { translation: ruTranslation },
};

i18n
  // .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // debug: true,
    resources,
    lng: window.localStorage.getItem('i18nextLng') || 'en', // Default language
    fallbackLng: window.localStorage.getItem('i18nextLng') || 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: true
    }
  });

export default i18n;