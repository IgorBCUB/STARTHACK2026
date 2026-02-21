import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { context, question } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are "NestorTheInvestor", a friendly and knowledgeable investment advisor AI assistant inside a finance app. Your job is to explain complex financial topics in a way that a child or complete beginner could understand, BUT without losing any useful or actionable information.

Rules:
- Use simple analogies and short paragraphs
- EVERY section header MUST start with an emoji and use markdown ## format (e.g. "## 📊 Market Overview")
- Leave clear spacing between sections
- Always cite real, well-known financial news sources when mentioning news (e.g. Bloomberg, Reuters, CNBC, Financial Times)
- When discussing predictions, clearly state they are opinions/forecasts and not financial advice
- Include specific numbers, percentages, and dates when relevant
- At the end, suggest 1-2 concrete actions the user could take (e.g. "Set a price alert", "Consider diversifying")
- Keep responses comprehensive but readable (300-500 words)
- IMPORTANT: At the very end of your response, after the disclaimer, add a "📚 Fuentes / Sources:" section listing ALL sources you referenced with their names
- Always end with: "⚠️ This is not financial advice. Always do your own research." BEFORE the sources section
- Answer in the same language the question is asked in`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Context: The user is looking at "${context}" in their finance app.\n\nQuestion: ${question}`,
          },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("nestor-insights error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
