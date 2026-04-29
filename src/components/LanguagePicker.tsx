import { Check, ChevronDown, Languages } from "lucide-react";
import { useState } from "react";
import { LANGUAGES, LangCode } from "@/lib/languages";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  value: LangCode;
  onChange: (l: LangCode) => void;
  variant?: "ghost" | "outline" | "warm";
}

export const LanguagePicker = ({ value, onChange, variant = "outline" }: Props) => {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === value) ?? LANGUAGES[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant === "warm" ? "default" : (variant as any)}
          className={cn(
            "gap-2 rounded-full font-medium",
            variant === "warm" && "warm-bg text-primary-foreground border-0 shadow-warm hover:opacity-90"
          )}
        >
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">{current.native}</span>
          <span className="sm:hidden">{current.code.toUpperCase()}</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-2" align="end">
        <div className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Choose your language
        </div>
        <div className="max-h-80 overflow-y-auto">
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => { onChange(l.code); setOpen(false); }}
              className={cn(
                "w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left",
                "hover:bg-accent/40 transition-colors",
                l.code === value && "bg-accent/50"
              )}
            >
              <div>
                <div className="font-semibold text-base leading-tight">{l.native}</div>
                <div className="text-xs text-muted-foreground">{l.name}</div>
              </div>
              {l.code === value && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
