import { useState } from "react";
import { FileText, Home, Users, Scroll, Stamp, Lightbulb, ListChecks, Sparkles } from "lucide-react";
import { LangCode, t } from "@/lib/languages";
import { ChecklistWizard } from "@/components/ChecklistWizard";
import { cn } from "@/lib/utils";

interface Props {
  lang: LangCode;
  onAskChat?: () => void;
  onFindHelp?: () => void;
}

export const LegalGuidance = ({ lang, onAskChat, onFindHelp }: Props) => {
  const [mode, setMode] = useState<"wizard" | "all">("wizard");

  const items = [
    { icon: FileText, title: t(lang, "docsIdentity"),     desc: t(lang, "docsIdentityDesc"),     bg: "warm-bg",  fg: "text-primary-foreground" },
    { icon: Home,     title: t(lang, "docsProperty"),     desc: t(lang, "docsPropertyDesc"),     bg: "trust-bg", fg: "text-secondary-foreground" },
    { icon: Users,    title: t(lang, "docsRelationship"), desc: t(lang, "docsRelationshipDesc"), bg: "bg-accent", fg: "text-accent-foreground" },
    { icon: Scroll,   title: t(lang, "docsDeath"),        desc: t(lang, "docsDeathDesc"),        bg: "warm-bg",  fg: "text-primary-foreground" },
    { icon: Stamp,    title: t(lang, "docsLegal"),        desc: t(lang, "docsLegalDesc"),        bg: "trust-bg", fg: "text-secondary-foreground" },
  ];

  return (
    <div className="space-y-5">
      {/* Mode toggle */}
      <div className="inline-flex p-1 rounded-full border bg-card shadow-soft">
        {([
          { k: "wizard", icon: Sparkles, label: t(lang, "wizardPickCase") },
          { k: "all",    icon: ListChecks, label: t(lang, "docsTitle") },
        ] as const).map(({ k, icon: I, label }) => (
          <button
            key={k}
            onClick={() => setMode(k)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
              mode === k ? "warm-bg text-primary-foreground shadow-warm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <I className="h-4 w-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {mode === "wizard" ? (
        <ChecklistWizard lang={lang} onAskChat={onAskChat} onFindHelp={onFindHelp} />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map(({ icon: Icon, title, desc, bg, fg }, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-card p-5 shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5 animate-float-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 h-12 w-12 rounded-2xl ${bg} ${fg} grid place-items-center shadow-soft`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-muted-foreground">#{i + 1}</span>
                      <h3 className="font-semibold text-base leading-snug">{title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-accent/30 border border-accent p-5 flex gap-4 animate-float-up">
            <div className="shrink-0 h-10 w-10 rounded-full bg-accent grid place-items-center text-accent-foreground">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold mb-1">{t(lang, "docsTip")}</div>
              <p className="text-sm text-foreground/80 leading-relaxed">{t(lang, "docsTipText")}</p>
            </div>
          </div>

          <p className="text-[12px] text-muted-foreground text-center pt-2">{t(lang, "disclaimer")}</p>
        </>
      )}
    </div>
  );
};
