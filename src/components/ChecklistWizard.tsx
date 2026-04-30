import { useMemo, useState } from "react";
import {
  FileText, Home, Users, Scroll, Stamp, Lightbulb,
  Heart, UserX, Sprout, Scale, ArrowLeft, ArrowRight, RotateCcw, CheckCircle2, MessageCircle, MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LangCode, t } from "@/lib/languages";
import { cn } from "@/lib/utils";

export type DocKey = "identity" | "property" | "relationship" | "death" | "legal";
export type CaseKey = "father" | "husband" | "denied" | "agri";

interface Props {
  lang: LangCode;
  onAskChat?: () => void;
  onFindHelp?: () => void;
}

type StepKey = "will" | "religion" | "land";

const CASES: {
  key: CaseKey;
  icon: any;
  titleKey: any;
  descKey: any;
  steps: StepKey[];
  baseDocs: DocKey[];
  baseSteps: any[];
}[] = [
  {
    key: "father", icon: Scale,
    titleKey: "caseFatherTitle", descKey: "caseFatherDesc",
    steps: ["will", "religion", "land"],
    baseDocs: ["identity", "relationship", "death", "property"],
    baseSteps: ["nextFatherDLSA", "nextFatherMutation"],
  },
  {
    key: "husband", icon: Heart,
    titleKey: "caseHusbandTitle", descKey: "caseHusbandDesc",
    steps: ["will", "land"],
    baseDocs: ["identity", "relationship", "death", "property"],
    baseSteps: ["nextHusbandShare", "nextHusbandSuccession"],
  },
  {
    key: "denied", icon: UserX,
    titleKey: "caseDeniedTitle", descKey: "caseDeniedDesc",
    steps: ["religion"],
    baseDocs: ["identity", "relationship", "property", "legal"],
    baseSteps: ["nextDeniedSection6", "nextDeniedNotice", "nextFatherFIR"],
  },
  {
    key: "agri", icon: Sprout,
    titleKey: "caseAgriTitle", descKey: "caseAgriDesc",
    steps: ["will", "religion"],
    baseDocs: ["identity", "relationship", "property", "legal"],
    baseSteps: ["nextAgriPatta", "nextAgriRevenue"],
  },
];

const DOC_META: Record<DocKey, { icon: any; titleKey: any; descKey: any; bg: string; fg: string }> = {
  identity:     { icon: FileText, titleKey: "docsIdentity",     descKey: "docsIdentityDesc",     bg: "warm-bg",  fg: "text-primary-foreground" },
  property:     { icon: Home,     titleKey: "docsProperty",     descKey: "docsPropertyDesc",     bg: "trust-bg", fg: "text-secondary-foreground" },
  relationship: { icon: Users,    titleKey: "docsRelationship", descKey: "docsRelationshipDesc", bg: "bg-accent", fg: "text-accent-foreground" },
  death:        { icon: Scroll,   titleKey: "docsDeath",        descKey: "docsDeathDesc",        bg: "warm-bg",  fg: "text-primary-foreground" },
  legal:        { icon: Stamp,    titleKey: "docsLegal",        descKey: "docsLegalDesc",        bg: "trust-bg", fg: "text-secondary-foreground" },
};

type Answers = Partial<Record<StepKey, string>>;

function computeChecklist(caseKey: CaseKey, ans: Answers): { docs: DocKey[]; steps: any[] } {
  const c = CASES.find(x => x.key === caseKey)!;
  const docs = new Set<DocKey>(c.baseDocs);
  const steps = [...c.baseSteps];

  // Will = yes -> always need legal certificates / probate
  if (ans.will === "yes") docs.add("legal");
  // Will = no/unknown for father/husband -> definitely need legal heir certificate
  if ((ans.will === "no" || ans.will === "unknown") && (caseKey === "father" || caseKey === "husband")) {
    docs.add("legal");
  }
  // Land involved -> ensure property docs and add patta step
  if (ans.land === "yes") {
    docs.add("property");
    if (!steps.includes("nextAgriPatta")) steps.push("nextAgriPatta");
  }
  // Hindu daughter "denied" -> add Section 6 reminder (already in baseSteps for denied)
  if (caseKey !== "denied" && ans.religion === "hindu") {
    // emphasise daughters' equal share for father case
    if (caseKey === "father" && !steps.includes("nextDeniedSection6")) steps.push("nextDeniedSection6");
  }

  return { docs: Array.from(docs), steps };
}

export const ChecklistWizard = ({ lang, onAskChat, onFindHelp }: Props) => {
  const [caseKey, setCaseKey] = useState<CaseKey | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const activeCase = caseKey ? CASES.find(c => c.key === caseKey)! : null;
  const totalSteps = activeCase?.steps.length ?? 0;
  const finished = activeCase && stepIdx >= totalSteps;

  const result = useMemo(
    () => (caseKey && finished ? computeChecklist(caseKey, answers) : null),
    [caseKey, finished, answers]
  );

  const reset = () => { setCaseKey(null); setStepIdx(0); setAnswers({}); };

  // ---------- 1. CASE PICKER ----------
  if (!activeCase) {
    return (
      <div className="space-y-5 animate-float-up">
        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <p className="text-sm text-foreground/80 leading-relaxed">{t(lang, "wizardIntro")}</p>
        </div>
        <h2 className="display text-xl font-bold">{t(lang, "wizardPickCase")}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CASES.map(({ key, icon: Icon, titleKey, descKey }) => (
            <button
              key={key}
              onClick={() => { setCaseKey(key); setStepIdx(0); setAnswers({}); }}
              className="text-left rounded-2xl border bg-card p-5 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 h-12 w-12 rounded-xl warm-bg text-primary-foreground grid place-items-center shadow-warm">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold leading-snug mb-1">{t(lang, titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(lang, descKey)}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ---------- 2. QUESTION STEPS ----------
  if (!finished) {
    const stepKey = activeCase.steps[stepIdx];
    const questions: Record<StepKey, { titleKey: any; options: { value: string; labelKey: any }[] }> = {
      will: {
        titleKey: "qWillTitle",
        options: [
          { value: "yes", labelKey: "qWillYes" },
          { value: "no", labelKey: "qWillNo" },
          { value: "unknown", labelKey: "qWillUnknown" },
        ],
      },
      religion: {
        titleKey: "qReligionTitle",
        options: [
          { value: "hindu", labelKey: "qHindu" },
          { value: "muslim", labelKey: "qMuslim" },
          { value: "christian", labelKey: "qChristian" },
          { value: "other", labelKey: "qOther" },
        ],
      },
      land: {
        titleKey: "qLandTitle",
        options: [
          { value: "yes", labelKey: "qLandYes" },
          { value: "no", labelKey: "qLandNo" },
        ],
      },
    };
    const q = questions[stepKey];
    const selected = answers[stepKey];

    return (
      <div className="space-y-5 animate-float-up">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            {t(lang, "wizardStep")} {stepIdx + 1} {t(lang, "wizardOf")} {totalSteps}
          </div>
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full warm-bg transition-all" style={{ width: `${((stepIdx) / totalSteps) * 100}%` }} />
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-soft">
          <h3 className="display text-xl font-bold mb-4">{t(lang, q.titleKey)}</h3>
          <div className="grid gap-2">
            {q.options.map(opt => (
              <button
                key={opt.value}
                onClick={() => setAnswers(a => ({ ...a, [stepKey]: opt.value }))}
                className={cn(
                  "text-left rounded-xl border-2 px-4 py-3 transition-all flex items-center gap-3",
                  selected === opt.value
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:bg-accent/20"
                )}
              >
                <span className={cn(
                  "h-5 w-5 rounded-full border-2 grid place-items-center shrink-0",
                  selected === opt.value ? "border-primary bg-primary" : "border-muted-foreground/40"
                )}>
                  {selected === opt.value && <CheckCircle2 className="h-4 w-4 text-primary-foreground" />}
                </span>
                <span className="font-medium">{t(lang, opt.labelKey)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-between">
          <Button
            variant="outline"
            onClick={() => stepIdx === 0 ? reset() : setStepIdx(i => i - 1)}
            className="rounded-full gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> {t(lang, "wizardPrev")}
          </Button>
          <Button
            onClick={() => setStepIdx(i => i + 1)}
            disabled={!selected}
            className="rounded-full gap-2 warm-bg text-primary-foreground border-0 shadow-warm hover:opacity-90"
          >
            {t(lang, "wizardNext")} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // ---------- 3. RESULT ----------
  const { docs, steps } = result!;
  return (
    <div className="space-y-5 animate-float-up">
      <div className="rounded-2xl trust-bg text-secondary-foreground p-5 shadow-trust flex items-start gap-3">
        <CheckCircle2 className="h-6 w-6 shrink-0 mt-0.5" />
        <div>
          <div className="font-semibold mb-0.5">{t(lang, "wizardYourChecklist")}</div>
          <div className="text-sm opacity-90">{t(lang, activeCase.titleKey)}</div>
        </div>
      </div>

      {/* Documents */}
      <div className="grid gap-3 sm:grid-cols-2">
        {docs.map((d, i) => {
          const meta = DOC_META[d];
          const Icon = meta.icon;
          return (
            <div key={d} className="rounded-2xl border bg-card p-5 shadow-soft animate-float-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-start gap-3">
                <div className={`shrink-0 h-11 w-11 rounded-xl ${meta.bg} ${meta.fg} grid place-items-center shadow-soft`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 leading-snug">{t(lang, meta.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(lang, meta.descKey)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next steps */}
      <div className="rounded-2xl border bg-card p-5 shadow-soft">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">{t(lang, "wizardNextSteps")}</h3>
        </div>
        <ul className="space-y-2.5">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="shrink-0 h-6 w-6 rounded-full warm-bg text-primary-foreground grid place-items-center text-xs font-bold shadow-warm">
                {i + 1}
              </span>
              <span className="text-foreground/90">{t(lang, s)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-2">
        {onAskChat && (
          <Button onClick={onAskChat} className="rounded-full gap-2 warm-bg text-primary-foreground border-0 shadow-warm hover:opacity-90">
            <MessageCircle className="h-4 w-4" /> {t(lang, "wizardAskChat")}
          </Button>
        )}
        {onFindHelp && (
          <Button onClick={onFindHelp} variant="outline" className="rounded-full gap-2 border-2">
            <MapPin className="h-4 w-4" /> {t(lang, "wizardFindHelp")}
          </Button>
        )}
        <Button onClick={reset} variant="ghost" className="rounded-full gap-2 ml-auto">
          <RotateCcw className="h-4 w-4" /> {t(lang, "wizardRestart")}
        </Button>
      </div>

      <p className="text-[12px] text-muted-foreground text-center pt-1">{t(lang, "disclaimer")}</p>
    </div>
  );
};
