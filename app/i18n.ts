import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import MAIN_EN from "./locales/en/main.json";
import MAIN_VI from "./locales/vi/main.json";

const resources = {
  en: {
    main: MAIN_EN,
  },
  vi: {
    main: MAIN_VI,
  },
};

const defaultNS = "main";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    defaultNS,
    ns: ["main"],
    fallbackLng: "vi",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;