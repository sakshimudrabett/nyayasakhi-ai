import { useState } from "react";
import { Mic, MapPin, ScrollText, ShieldCheck, ArrowRight, Phone, Sparkles, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguagePicker } from "@/components/LanguagePicker";
import { VoiceChat } from "@/components/VoiceChat";
import { HelpDirectory } from "@/components/HelpDirectory";
import { LegalGuidance } from "@/components/LegalGuidance";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/languages";
import heroImg from "@/assets/hero-woman.jpg";

type View = "home" | "chat" | "help" | "guidance";

const Index = () => {
  const { lang, setLang, language } = useLanguage();
  const [view, setView] = useState<View>("home");

  return (
    <div className="min-h-screen hero-bg">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <button onClick={() => setView("home")} className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl warm-bg grid place-items-center shadow-warm group-hover:scale-105 transition-transform">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="text-left leading-tight">
              <div className="font-bold display text-lg">NyayaSakhi <span className="text-primary">AI</span></div>
              <div className="text-[11px] text-muted-foreground hidden sm:block">{language.native}</div>
            </div>
          </button>
          <div className="flex items-center gap-2">
            {view !== "home" && (
              <Button variant="ghost" onClick={() => setView("home")} className="rounded-full">
                {t(lang, "back")}
              </Button>
            )}
            <LanguagePicker value={lang} onChange={setLang} variant="warm" />
          </div>
        </div>
      </header>

      {/* HOME */}
      {view === "home" && (
        <main>
          {/* Hero */}
          <section className="container mx-auto px-4 pt-10 sm:pt-16 pb-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-7 animate-float-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border shadow-soft">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-medium text-muted-foreground">{t(lang, "forRuralWomen")}</span>
                </div>
                <h1 className="display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-balance">
                  {t(lang, "tagline")}
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl text-balance">
                  {t(lang, "subtitle")}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    size="lg"
                    onClick={() => setView("chat")}
                    className="warm-bg text-primary-foreground border-0 shadow-warm hover:opacity-90 rounded-full h-14 px-7 text-base gap-2 font-semibold"
                  >
                    <Mic className="h-5 w-5" />
                    {t(lang, "heroCtaPrimary")}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setView("guidance")}
                    className="rounded-full h-14 px-7 text-base gap-2 bg-card border-2 hover:bg-accent/20"
                  >
                    <FileText className="h-5 w-5 text-primary" />
                    {t(lang, "heroCtaGuidance")}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setView("help")}
                    className="rounded-full h-14 px-7 text-base gap-2 bg-card border-2 hover:bg-accent/20"
                  >
                    <MapPin className="h-5 w-5 text-secondary" />
                    {t(lang, "heroCtaSecondary")}
                  </Button>
                </div>
                {/* Quick helpline */}
                <a href="tel:181" className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-secondary/5 border border-secondary/20 hover:bg-secondary/10 transition-colors">
                  <div className="h-10 w-10 rounded-full trust-bg grid place-items-center shadow-trust">
                    <Phone className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{t(lang, "womenHelpline")}</div>
                    <div className="font-bold text-secondary text-lg leading-tight">181</div>
                  </div>
                </a>
              </div>

              <div className="relative animate-float-up" style={{ animationDelay: "120ms" }}>
                <div className="absolute -inset-4 warm-bg rounded-[2.5rem] opacity-20 blur-2xl" />
                <div className="relative rounded-[2rem] overflow-hidden shadow-warm border-4 border-card">
                  <img src={heroImg} alt="Rural Indian woman holding scales of justice" className="w-full h-auto" width={1024} height={1024} />
                </div>
                {/* Floating language chip */}
                <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl px-4 py-3 shadow-card border flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full warm-bg grid place-items-center text-primary-foreground font-bold text-sm">
                    {language.code.toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{t(lang, "talkingIn")}</div>
                    <div className="font-semibold leading-tight">{language.native}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="container mx-auto px-4 pb-20">
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { icon: Mic,        title: t(lang, "feature1Title"), desc: t(lang, "feature1Desc"), grad: "warm-bg",  fg: "text-primary-foreground", onClick: () => setView("chat") },
                { icon: ScrollText, title: t(lang, "feature2Title"), desc: t(lang, "feature2Desc"), grad: "trust-bg", fg: "text-secondary-foreground", onClick: () => setView("guidance") },
                { icon: ShieldCheck,title: t(lang, "feature3Title"), desc: t(lang, "feature3Desc"), grad: "bg-accent", fg: "text-accent-foreground", onClick: () => setView("help") },
              ].map(({ icon: I, title, desc, grad, fg, onClick }, i) => (
                <button
                  key={i}
                  onClick={onClick}
                  className="text-left group rounded-3xl bg-card border p-7 shadow-soft hover:shadow-card transition-all hover:-translate-y-1 animate-float-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className={`h-14 w-14 rounded-2xl ${grad} ${fg} grid place-items-center mb-5 shadow-soft`}>
                    <I className="h-6 w-6" />
                  </div>
                  <h3 className="display text-xl font-bold mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* CTA strip */}
          <section className="container mx-auto px-4 pb-20">
            <div className="rounded-[2rem] trust-bg text-secondary-foreground p-8 sm:p-12 shadow-trust relative overflow-hidden">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
              <div className="relative grid sm:grid-cols-[1fr_auto] gap-6 items-center">
                <div>
                  <h2 className="display text-3xl sm:text-4xl font-bold mb-3 leading-tight">{t(lang, "ctaTitle")}</h2>
                  <p className="opacity-90 text-balance">{t(lang, "ctaDesc")}</p>
                </div>
                <Button
                  size="lg"
                  onClick={() => setView("chat")}
                  className="warm-bg text-primary-foreground border-0 shadow-warm hover:opacity-90 rounded-full h-14 px-7 text-base gap-2 font-semibold whitespace-nowrap"
                >
                  {t(lang, "heroCtaPrimary")} <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>

          <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
            <p>{t(lang, "disclaimer")} · 🇮🇳 {t(lang, "footerNote")}</p>
          </footer>
        </main>
      )}

      {/* CHAT */}
      {view === "chat" && (
        <main className="container mx-auto px-4 py-6 max-w-3xl">
          <div className="mb-5 animate-float-up">
            <h1 className="display text-3xl font-bold">{t(lang, "guidanceTitle")}</h1>
            <p className="text-muted-foreground">{t(lang, "guidanceSub")}</p>
          </div>
          <VoiceChat lang={lang} />
        </main>
      )}

      {/* HELP */}
      {view === "help" && (
        <main className="container mx-auto px-4 py-6 max-w-5xl pb-20">
          <div className="mb-6 animate-float-up">
            <h1 className="display text-3xl font-bold">{t(lang, "directoryTitle")}</h1>
            <p className="text-muted-foreground">{t(lang, "directorySub")}</p>
          </div>
          <HelpDirectory lang={lang} />
        </main>
      )}

      {/* GUIDANCE */}
      {view === "guidance" && (
        <main className="container mx-auto px-4 py-6 max-w-4xl pb-20">
          <div className="mb-6 animate-float-up">
            <h1 className="display text-3xl font-bold">{t(lang, "docsTitle")}</h1>
            <p className="text-muted-foreground">{t(lang, "docsSub")}</p>
          </div>
          <LegalGuidance lang={lang} onAskChat={() => setView("chat")} onFindHelp={() => setView("help")} />
        </main>
      )}
    </div>
  );
};

export default Index;
