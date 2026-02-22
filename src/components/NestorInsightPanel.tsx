import { useState, useEffect } from "react";
import { X, Sparkles, ArrowRight, Loader2, ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useNestorMode } from "@/contexts/NestorModeContext";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface QuestionOption {
  label: string;
  question: string;
  actionRoute?: string;
}

interface NestorInsightPanelProps {
  context: string;
  questions: QuestionOption[];
  initialQuestion?: QuestionOption;
  onClose: () => void;
  onNavigate?: (route: string) => void;
}

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/nestor-insights`;

/** Parse response into summary bullets and accordion sections */
function parseResponse(text: string) {
  // Split off sources at the end
  const sourceMarkers = ["⚠️", "Fuentes:", "Sources:", "Referencias:"];
  const splitIndex = sourceMarkers.reduce((idx, marker) => {
    const i = text.lastIndexOf(marker);
    return i !== -1 && (idx === -1 || i < idx) ? i : idx;
  }, -1);
  const mainContent = splitIndex !== -1 ? text.slice(0, splitIndex).trim() : text;
  const sources = splitIndex !== -1 ? text.slice(splitIndex).trim() : null;

  // Split main content into summary (before first ##) and sections
  const sectionRegex = /^## .+$/gm;
  const firstMatch = sectionRegex.exec(mainContent);

  let summary = "";
  let sections: { title: string; content: string }[] = [];

  if (firstMatch) {
    summary = mainContent.slice(0, firstMatch.index).trim();
    const rest = mainContent.slice(firstMatch.index);
    // Split into sections by ## headers
    const parts = rest.split(/^## /gm).filter(Boolean);
    sections = parts.map((part) => {
      const newline = part.indexOf("\n");
      const title = newline !== -1 ? part.slice(0, newline).trim() : part.trim();
      const content = newline !== -1 ? part.slice(newline + 1).trim() : "";
      return { title, content };
    });
  } else {
    summary = mainContent;
  }

  return { summary, sections, sources };
}

const NestorInsightPanel = ({ context, questions, initialQuestion, onClose, onNavigate }: NestorInsightPanelProps) => {
  const { setIsPanelOpen } = useNestorMode();
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(initialQuestion?.label ?? null);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsPanelOpen(true);
    return () => setIsPanelOpen(false);
  }, [setIsPanelOpen]);

  // Auto-fetch if initialQuestion is provided
  useEffect(() => {
    if (initialQuestion) {
      fetchAnswer(initialQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAnswer = async (q: QuestionOption) => {
    setSelectedQuestion(q.label);
    setResponse("");
    setIsLoading(true);

    try {
      const resp = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ context, question: q.question }),
      });

      if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({ error: "Failed" }));
        setResponse(`❌ ${err.error || "Something went wrong. Try again."}`);
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              accumulated += content;
              setResponse(accumulated);
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch {
      setResponse("❌ Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (q: QuestionOption) => {
    fetchAnswer(q);
  };

  const { summary, sections, sources } = parseResponse(response);

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[430px] max-h-[85vh] bg-[#1a1a1a] rounded-t-2xl flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-white">NestorTheInvestor</span>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {!selectedQuestion ? (
            <div className="space-y-3">
              <p className="text-white/60 text-sm mb-4">What would you like to know about <span className="text-primary font-semibold">{context}</span>?</p>
              {questions.map((q) => (
                <button
                  key={q.label}
                  onClick={() => handleQuestionClick(q)}
                  className="w-full text-left px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all text-sm text-white font-medium flex items-center justify-between group"
                >
                  {q.label}
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          ) : (
            <div>
              <button
                onClick={() => { setSelectedQuestion(null); setResponse(""); }}
                className="text-primary text-xs font-medium mb-3 flex items-center gap-1"
              >
                ← Back to questions
              </button>
              <div className="bg-white/5 rounded-xl px-4 py-3 mb-4 border border-primary/20">
                <p className="text-primary text-sm font-semibold">{selectedQuestion}</p>
              </div>
              {isLoading && !response && (
                <div className="flex items-center gap-2 text-white/50 text-sm py-8 justify-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Nestor is thinking...
                </div>
              )}
              {response && (
                <div>
                  {/* Summary bullets */}
                  {summary && (
                    <div className="prose prose-sm prose-invert max-w-none text-white/90 [&_p]:mb-2 [&_ul]:mb-3 [&_ol]:mb-3 [&_li]:text-white/80 [&_strong]:text-white mb-4">
                      <ReactMarkdown>{summary}</ReactMarkdown>
                    </div>
                  )}
                  {/* Accordion sections */}
                  {sections.length > 0 && (
                    <Accordion type="multiple" className="space-y-2">
                      {sections.map((section, i) => (
                        <AccordionItem key={i} value={`section-${i}`} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                          <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-primary hover:no-underline">
                            {section.title}
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-3">
                            <div className="prose prose-sm prose-invert max-w-none text-white/80 [&_p]:mb-2 [&_strong]:text-white [&_a]:text-primary [&_ul]:mb-2 [&_ol]:mb-2">
                              <ReactMarkdown>{section.content}</ReactMarkdown>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </div>
              )}
              {/* Action buttons after response */}
              {!isLoading && response && onNavigate && (
                <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
                  <p className="text-white/40 text-xs font-medium mb-2">Quick actions</p>
                  <button
                    onClick={() => onNavigate("/explore")}
                    className="w-full text-left px-4 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-medium flex items-center justify-between"
                  >
                    Explore investments
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
              {/* Sources */}
              {!isLoading && sources && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-white/30 text-[11px] leading-relaxed whitespace-pre-line">{sources}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NestorInsightPanel;
