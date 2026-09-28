import { en, Translations } from "./locales/en";
import { hi } from "./locales/hi";
import { te } from "./locales/te";
import { ur } from "./locales/ur";
import { pa } from "./locales/pa";
import { sa } from "./locales/sa";
import { ar } from "./locales/ar";
import { ta } from "./locales/ta";
import { bn } from "./locales/bn";
import { mr } from "./locales/mr";
import { gu } from "./locales/gu";
import { kn } from "./locales/kn";
import { ml } from "./locales/ml";

export type LanguageCode =
  | "en"
  | "hi"
  | "te"
  | "ur"
  | "pa"
  | "sa"
  | "ar"
  | "ta"
  | "bn"
  | "mr"
  | "gu"
  | "kn"
  | "ml";

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  community: string;
  dir: "ltr" | "rtl";
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    community: "Pan-India & Trade",
    dir: "ltr",
  },
  {
    code: "hi",
    label: "Hindi",
    nativeLabel: "हिन्दी",
    community: "National & North India",
    dir: "ltr",
  },
  {
    code: "te",
    label: "Telugu",
    nativeLabel: "తెలుగు",
    community: "Telangana & Andhra Pradesh",
    dir: "ltr",
  },
  {
    code: "ur",
    label: "Urdu",
    nativeLabel: "اردو",
    community: "Deccani & Muslim Heritage",
    dir: "rtl",
  },
  {
    code: "pa",
    label: "Punjabi",
    nativeLabel: "ਪੰਜਾਬੀ",
    community: "Sikh & Punjab Heritage",
    dir: "ltr",
  },
  {
    code: "sa",
    label: "Sanskrit",
    nativeLabel: "संस्कृतम्",
    community: "Classical Hindu & Sacred",
    dir: "ltr",
  },
  {
    code: "ar",
    label: "Arabic",
    nativeLabel: "العربية",
    community: "Islamic Liturgical & Madrasa",
    dir: "rtl",
  },
  {
    code: "ta",
    label: "Tamil",
    nativeLabel: "தமிழ்",
    community: "Tamil Nadu & Temple Heritage",
    dir: "ltr",
  },
  {
    code: "bn",
    label: "Bengali",
    nativeLabel: "বাংলা",
    community: "Bengal & Cultural Heritage",
    dir: "ltr",
  },
  {
    code: "mr",
    label: "Marathi",
    nativeLabel: "मराठी",
    community: "Maharashtra & Varkari",
    dir: "ltr",
  },
  {
    code: "gu",
    label: "Gujarati",
    nativeLabel: "ગુજરાતી",
    community: "Jain, Hindu & Parsi Heritage",
    dir: "ltr",
  },
  {
    code: "kn",
    label: "Kannada",
    nativeLabel: "ಕನ್ನಡ",
    community: "Karnataka & Veerashaiva",
    dir: "ltr",
  },
  {
    code: "ml",
    label: "Malayalam",
    nativeLabel: "മലയാളം",
    community: "Kerala Christian, Muslim & Hindu",
    dir: "ltr",
  },
];

export const translations: Record<LanguageCode, Translations> = {
  en,
  hi,
  te,
  ur,
  pa,
  sa,
  ar,
  ta,
  bn,
  mr,
  gu,
  kn,
  ml,
};

export type { Translations };
