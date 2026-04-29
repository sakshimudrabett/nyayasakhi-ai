import { useMemo, useState } from "react";
import { Phone, MapPin, Search, Scale, HeartHandshake, PhoneCall } from "lucide-react";
import { DIRECTORY, HelpContact } from "@/lib/legalDirectory";
import { LangCode, t } from "@/lib/languages";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props { lang: LangCode; }

const TYPE_META = {
  "legal-aid": { icon: Scale,         label: "Legal Aid", className: "bg-secondary/10 text-secondary border-secondary/20" },
  "ngo":       { icon: HeartHandshake, label: "NGO",      className: "bg-primary/10 text-primary border-primary/20" },
  "helpline":  { icon: PhoneCall,     label: "Helpline",  className: "bg-accent/30 text-accent-foreground border-accent/40" },
} as const;

export const HelpDirectory = ({ lang }: Props) => {
  const [state, setState] = useState<string>(DIRECTORY[0].state);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | HelpContact["type"]>("all");

  const contacts = useMemo(() => {
    const dir = DIRECTORY.find(d => d.state === state)?.contacts ?? [];
    return dir.filter(c => {
      const matchesQ = !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.description.toLowerCase().includes(query.toLowerCase());
      const matchesType = filter === "all" || c.type === filter;
      return matchesQ && matchesType;
    });
  }, [state, query, filter]);

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <Select value={state} onValueChange={setState}>
          <SelectTrigger className="h-12 rounded-2xl bg-card">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <SelectValue placeholder={t(lang, "selectState")} />
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {DIRECTORY.map(d => (
              <SelectItem key={d.state} value={d.state}>{d.state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(lang, "search")}
            className="h-12 pl-9 rounded-2xl bg-card"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(["all", "legal-aid", "ngo", "helpline"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors",
              filter === f
                ? "warm-bg text-primary-foreground border-transparent shadow-warm"
                : "bg-card hover:bg-accent/30 border-border"
            )}
          >
            {f === "all" ? t(lang, "all") : f === "legal-aid" ? t(lang, "lawyers") : f === "ngo" ? t(lang, "ngos") : t(lang, "helplines")}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {contacts.map((c, i) => {
          const meta = TYPE_META[c.type];
          const Icon = meta.icon;
          return (
            <div key={`${c.name}-${i}`} className="rounded-2xl border bg-card p-5 shadow-soft hover:shadow-card transition-shadow animate-float-up">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className={cn("h-9 w-9 rounded-xl grid place-items-center border", meta.className)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", meta.className)}>
                    {meta.label}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-base leading-snug mb-1">{c.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{c.description}</p>
              {c.hours && <p className="text-xs text-muted-foreground mb-3">🕒 {c.hours}</p>}
              <a href={`tel:${c.phone.replace(/[^\d+]/g, "")}`}>
                <Button className="w-full rounded-full warm-bg text-primary-foreground border-0 shadow-warm hover:opacity-90 gap-2">
                  <Phone className="h-4 w-4" />
                  {t(lang, "callNow")} · {c.phone}
                </Button>
              </a>
            </div>
          );
        })}
        {contacts.length === 0 && (
          <div className="sm:col-span-2 text-center py-12 text-muted-foreground">
            {t(lang, "noResults")}
          </div>
        )}
      </div>
    </div>
  );
};
