import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Send, Volume2, VolumeX, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSpeechRecognition, speak, stopSpeaking } from "@/hooks/useVoice";
import { LangCode, getLang, t } from "@/lib/languages";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

interface Props { lang: LangCode; }

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/nyaya-chat`;

export const VoiceChat = ({ lang }: Props) => {
  const language = getLang(lang);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: language.greeting + " 🙏" },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { supported, listening, transcript, start, stop } = useSpeechRecognition(language.bcp47);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  // greet again if language changes
  useEffect(() => {
    setMessages([{ role: "assistant", content: getLang(lang).greeting + " 🙏" }]);
  }, [lang]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || streaming) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setStreaming(true);
    stopSpeaking();
    setIsSpeaking(false);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.content !== getLang(lang).greeting + " 🙏") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: next.map(m => ({ role: m.role, content: m.content })),
          language: lang,
        }),
      });

      if (!resp.ok) {
        if (resp.status === 429) toast.error("Too many requests. Please wait a moment.");
        else if (resp.status === 402) toast.error("AI credits exhausted.");
        else toast.error("Could not reach NyayaSakshi. Please try again.");
        setStreaming(false);
        return;
      }
      if (!resp.body) throw new Error("no body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const c = parsed.choices?.[0]?.delta?.content;
            if (c) upsert(c);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      if (voiceEnabled && assistantSoFar) {
        setIsSpeaking(true);
        speak(assistantSoFar, language.bcp47);
        // rough end detection
        const dur = Math.min(60000, Math.max(2000, assistantSoFar.length * 70));
        setTimeout(() => setIsSpeaking(false), dur);
      }
    } catch (e) {
      console.error(e);
      toast.error("Connection problem.");
    } finally {
      setStreaming(false);
    }
  };

  const handleMic = () => {
    if (!supported) {
      toast.error("Voice input not supported on this browser. Please use Chrome.");
      return;
    }
    if (listening) { stop(); return; }
    start((finalText) => { if (finalText) sendMessage(finalText); });
  };

  const toggleVoice = () => {
    if (voiceEnabled) { stopSpeaking(); setIsSpeaking(false); }
    setVoiceEnabled(v => !v);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] sm:h-[600px] rounded-3xl border bg-card shadow-card overflow-hidden">
      {/* Header */}
      <div className="trust-bg px-5 py-4 flex items-center justify-between text-secondary-foreground">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full warm-bg grid place-items-center shadow-warm">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-semibold leading-tight">NyayaSakhi AI</div>
            <div className="text-xs opacity-80">{streaming ? "..." : isSpeaking ? t(lang, "speaking") : language.native}</div>
          </div>
        </div>
        <Button size="icon" variant="ghost" onClick={toggleVoice} className="text-secondary-foreground hover:bg-white/10 rounded-full"
          aria-label={voiceEnabled ? "Mute voice" : "Enable voice"}>
          {voiceEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </Button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3 dawn-bg">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex animate-float-up", m.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed shadow-soft",
              m.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "bg-card text-card-foreground rounded-bl-sm border"
            )}>
              {m.content || <span className="opacity-50">…</span>}
            </div>
          </div>
        ))}
        {streaming && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="bg-card border rounded-2xl rounded-bl-sm px-4 py-3 shadow-soft">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        {listening && transcript && (
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] bg-primary/10 border border-primary/30 italic">
              {transcript}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t bg-card p-3">
        <div className="flex items-end gap-2">
          <button
            onClick={handleMic}
            disabled={streaming}
            className={cn(
              "relative h-12 w-12 shrink-0 rounded-full grid place-items-center transition-all",
              listening
                ? "bg-destructive text-destructive-foreground animate-pulse-ring"
                : "warm-bg text-primary-foreground shadow-warm hover:scale-105 active:scale-95",
              streaming && "opacity-50"
            )}
            aria-label={listening ? "Stop" : t(lang, "tapToSpeak")}
          >
            {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder={t(lang, "chatPlaceholder")}
            rows={1}
            className="min-h-[48px] max-h-32 resize-none rounded-2xl border-input"
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || streaming}
            size="icon"
            className="h-12 w-12 rounded-full warm-bg text-primary-foreground border-0 shadow-warm hover:opacity-90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-[11px] text-muted-foreground text-center mt-2 px-2">
          {t(lang, "disclaimer")}
        </p>
      </div>
    </div>
  );
};
