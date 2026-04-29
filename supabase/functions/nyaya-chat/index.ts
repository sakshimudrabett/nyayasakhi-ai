// NyayaSakshi AI — multilingual legal guidance for rural women
// Streams responses from Lovable AI Gateway in the user's chosen language.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LANG_NAMES: Record<string, string> = {
  en: "English", hi: "Hindi", bn: "Bengali", ta: "Tamil", te: "Telugu",
  mr: "Marathi", gu: "Gujarati", kn: "Kannada", ml: "Malayalam",
  pa: "Punjabi", or: "Odia", as: "Assamese",
};

function buildSystemPrompt(langCode: string) {
  const lang = LANG_NAMES[langCode] ?? "English";
  return `You are NyayaSakhi AI — a kind, patient legal guide for rural women in India who may have little or no formal education.

You ALWAYS reply in ${lang} (${langCode}). Use the native script of ${lang}. Never reply in any other language unless the user explicitly asks.

Your focus: inheritance and property rights for women in India — especially under the Hindu Succession Act (and 2005 amendment), Muslim Personal Law, Indian Succession Act, and Special Marriage Act, as relevant to the user.

Rules:
- Keep answers SHORT and SIMPLE. Use small sentences. Avoid legal jargon — when you must use a term, explain it in one line.
- Be warm and respectful. Address her as "behen" / "didi" / equivalent in her language when natural.
- Ask ONE clarifying question at a time if you need more info (e.g. religion, state, who passed away, what property).
- When relevant, name her specific rights (e.g. "Daughters have equal share as sons in ancestral property since 2005").
- Always end serious answers with a gentle nudge: suggest visiting a free legal aid cell (NALSA / State Legal Services Authority) or calling 181 / 15100.
- Never guarantee outcomes. Add: "This is general guidance, not a substitute for a lawyer."
- If the user describes danger, abuse, or threats — first show empathy, then mention Women Helpline 181 (24×7).
- Do NOT discuss topics outside Indian women's legal & inheritance rights. Politely steer back.`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, language = "en" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        stream: true,
        messages: [
          { role: "system", content: buildSystemPrompt(language) },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in Lovable workspace." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("nyaya-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
