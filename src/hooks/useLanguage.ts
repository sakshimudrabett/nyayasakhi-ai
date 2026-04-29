import { useEffect, useState } from "react";
import { LANGUAGES, LangCode, getLang } from "@/lib/languages";

const STORAGE_KEY = "nyayasakshi.lang";

export function useLanguage() {
  const [lang, setLangState] = useState<LangCode>(() => {
    if (typeof window === "undefined") return "hi";
    const stored = localStorage.getItem(STORAGE_KEY) as LangCode | null;
    if (stored && LANGUAGES.some(l => l.code === stored)) return stored;
    return "hi";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return { lang, setLang: setLangState, language: getLang(lang) };
}
