import { useEffect, useRef, useState, useCallback } from "react";

// Browser SpeechRecognition wrapper
type Rec = any;

export function useSpeechRecognition(bcp47: string) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recRef = useRef<Rec | null>(null);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setSupported(!!SR);
  }, []);

  const start = useCallback((onFinal: (text: string) => void) => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec: Rec = new SR();
    rec.lang = bcp47;
    rec.interimResults = true;
    rec.continuous = false;
    setTranscript("");
    rec.onresult = (e: any) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) final += r[0].transcript;
        else interim += r[0].transcript;
      }
      setTranscript(final || interim);
      if (final) onFinal(final.trim());
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    rec.start();
    recRef.current = rec;
    setListening(true);
  }, [bcp47]);

  const stop = useCallback(() => {
    recRef.current?.stop();
    setListening(false);
  }, []);

  return { supported, listening, transcript, start, stop };
}

export function speak(text: string, bcp47: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = bcp47;
  // Try to pick a matching voice
  const voices = window.speechSynthesis.getVoices();
  const match = voices.find(v => v.lang?.toLowerCase() === bcp47.toLowerCase())
             || voices.find(v => v.lang?.toLowerCase().startsWith(bcp47.split("-")[0]));
  if (match) u.voice = match;
  u.rate = 0.95;
  u.pitch = 1;
  window.speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}
