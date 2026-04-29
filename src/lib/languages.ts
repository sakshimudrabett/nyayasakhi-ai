export type LangCode =
  | "en" | "hi" | "bn" | "ta" | "te" | "mr"
  | "gu" | "kn" | "ml" | "pa" | "or" | "as";

export interface Language {
  code: LangCode;
  name: string;        // English name
  native: string;      // Native script
  bcp47: string;       // for SpeechRecognition / SpeechSynthesis
  greeting: string;
}

export const LANGUAGES: Language[] = [
  { code: "hi", name: "Hindi",      native: "हिन्दी",     bcp47: "hi-IN", greeting: "नमस्ते, मैं न्यायसाक्षी हूँ" },
  { code: "en", name: "English",    native: "English",    bcp47: "en-IN", greeting: "Hello, I am NyayaSakshi" },
  { code: "bn", name: "Bengali",    native: "বাংলা",      bcp47: "bn-IN", greeting: "নমস্কার, আমি ন্যায়সাক্ষী" },
  { code: "ta", name: "Tamil",      native: "தமிழ்",      bcp47: "ta-IN", greeting: "வணக்கம், நான் நியாயசாக்ஷி" },
  { code: "te", name: "Telugu",     native: "తెలుగు",     bcp47: "te-IN", greeting: "నమస్తే, నేను న్యాయసాక్షి" },
  { code: "mr", name: "Marathi",    native: "मराठी",      bcp47: "mr-IN", greeting: "नमस्कार, मी न्यायसाक्षी आहे" },
  { code: "gu", name: "Gujarati",   native: "ગુજરાતી",   bcp47: "gu-IN", greeting: "નમસ્તે, હું ન્યાયસાક્ષી છું" },
  { code: "kn", name: "Kannada",    native: "ಕನ್ನಡ",      bcp47: "kn-IN", greeting: "ನಮಸ್ಕಾರ, ನಾನು ನ್ಯಾಯಸಾಕ್ಷಿ" },
  { code: "ml", name: "Malayalam",  native: "മലയാളം",    bcp47: "ml-IN", greeting: "നമസ്കാരം, ഞാൻ ന്യായസാക്ഷി" },
  { code: "pa", name: "Punjabi",    native: "ਪੰਜਾਬੀ",     bcp47: "pa-IN", greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ ਨਿਆਂਸਾਕਸ਼ੀ ਹਾਂ" },
  { code: "or", name: "Odia",       native: "ଓଡ଼ିଆ",      bcp47: "or-IN", greeting: "ନମସ୍କାର, ମୁଁ ନ୍ୟାୟସାକ୍ଷୀ" },
  { code: "as", name: "Assamese",   native: "অসমীয়া",    bcp47: "as-IN", greeting: "নমস্কাৰ, মই ন্যায়সাক্ষী" },
];

export const getLang = (code: LangCode) =>
  LANGUAGES.find(l => l.code === code) ?? LANGUAGES[0];

// UI strings — kept short, will fall back to English for unknowns
type StringKey =
  | "tagline" | "subtitle" | "startTalking" | "chooseLanguage" | "findHelp"
  | "knowRights" | "saveCase" | "heroCtaPrimary" | "heroCtaSecondary"
  | "chatPlaceholder" | "send" | "tapToSpeak" | "listening" | "speaking"
  | "directoryTitle" | "directorySub" | "selectState" | "callNow" | "lawyers" | "ngos" | "helplines"
  | "guidanceTitle" | "guidanceSub" | "disclaimer" | "back"
  | "feature1Title" | "feature1Desc" | "feature2Title" | "feature2Desc" | "feature3Title" | "feature3Desc"
  | "loginOptional" | "anonymous";

export const UI: Record<LangCode, Partial<Record<StringKey, string>>> = {
  en: {
    tagline: "Your voice. Your rights. Your inheritance.",
    subtitle: "A gentle, voice-first guide for rural women in India to understand inheritance rights and find nearby legal help — in your own language.",
    heroCtaPrimary: "Start talking",
    heroCtaSecondary: "Find legal help",
    chooseLanguage: "Choose your language",
    chatPlaceholder: "Type or tap the mic to speak…",
    send: "Send",
    tapToSpeak: "Tap to speak",
    listening: "Listening…",
    speaking: "Speaking…",
    directoryTitle: "Nearby legal help",
    directorySub: "Free legal aid, NGOs and women's helplines across India.",
    selectState: "Select your state",
    callNow: "Call now",
    lawyers: "Legal Aid",
    ngos: "NGOs",
    helplines: "Helplines",
    guidanceTitle: "Voice chatbot",
    guidanceSub: "Ask anything about your inheritance rights.",
    disclaimer: "This is general guidance, not a substitute for a lawyer.",
    back: "Back",
    feature1Title: "Talk in your language",
    feature1Desc: "12 Indian languages with voice in and voice out.",
    feature2Title: "Simple legal guidance",
    feature2Desc: "Plain answers about your share, daughters' rights, and the law.",
    feature3Title: "Real human help nearby",
    feature3Desc: "Free legal aid, NGOs, and women's helplines in your state.",
    anonymous: "Continue without login",
    loginOptional: "Save my case (optional)",
  },
  hi: {
    tagline: "आपकी आवाज़। आपके अधिकार। आपकी विरासत।",
    subtitle: "ग्रामीण महिलाओं के लिए एक आसान, आवाज़-आधारित साथी — अपनी भाषा में विरासत के अधिकार समझें और मदद पाएँ।",
    heroCtaPrimary: "बात शुरू करें",
    heroCtaSecondary: "कानूनी मदद खोजें",
    chooseLanguage: "अपनी भाषा चुनें",
    chatPlaceholder: "लिखें या माइक दबाकर बोलें…",
    send: "भेजें",
    tapToSpeak: "बोलने के लिए दबाएँ",
    listening: "सुन रही हूँ…",
    speaking: "बोल रही हूँ…",
    directoryTitle: "पास की कानूनी मदद",
    directorySub: "नि:शुल्क कानूनी सहायता, NGO और महिला हेल्पलाइन।",
    selectState: "अपना राज्य चुनें",
    callNow: "अभी कॉल करें",
    lawyers: "कानूनी सहायता",
    ngos: "एनजीओ",
    helplines: "हेल्पलाइन",
    guidanceTitle: "आवाज़ चैटबॉट",
    guidanceSub: "विरासत के अधिकारों के बारे में कुछ भी पूछें।",
    disclaimer: "यह सामान्य जानकारी है, वकील का विकल्प नहीं।",
    back: "वापस",
    feature1Title: "अपनी भाषा में बात",
    feature1Desc: "12 भारतीय भाषाओं में आवाज़ से सवाल-जवाब।",
    feature2Title: "आसान कानूनी सलाह",
    feature2Desc: "आपका हिस्सा, बेटियों के अधिकार, और कानून — सरल भाषा में।",
    feature3Title: "पास में असली मदद",
    feature3Desc: "आपके राज्य की कानूनी सहायता और महिला हेल्पलाइन।",
    anonymous: "बिना लॉगिन जारी रखें",
    loginOptional: "मेरा मामला सुरक्षित रखें (वैकल्पिक)",
  },
  bn: {}, ta: {}, te: {}, mr: {}, gu: {}, kn: {}, ml: {}, pa: {}, or: {}, as: {},
};

export function t(lang: LangCode, key: StringKey): string {
  return UI[lang]?.[key] ?? UI.en[key] ?? key;
}
