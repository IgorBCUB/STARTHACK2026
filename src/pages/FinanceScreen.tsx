import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Info, CreditCard, Plus, Monitor, TrendingUp, Bitcoin, ArrowRight } from "lucide-react";
import { useNestorMode } from "@/contexts/NestorModeContext";
import NestorInsightPanel from "@/components/NestorInsightPanel";
import BottomNav from "@/components/BottomNav";

type InsightTarget = "main-account" | "stocks" | "crypto" | null;

const insightQuestions: Record<string, { context: string; questions: { label: string; question: string }[] }> = {
  "main-account": {
    context: "Main Account (12,026.00 €)",
    questions: [
      { label: "💰 Am I saving enough?", question: "Based on a main account balance of €12,026, am I saving enough? What benchmarks should I compare against?" },
      { label: "📊 How should I allocate my money?", question: "I have €12,026 in my main account. How should I think about allocating between savings, investments, and emergency fund?" },
      { label: "⚡ What's the opportunity cost?", question: "I have €12,026 sitting in my main account. What is the opportunity cost of not investing this money? What are safe options?" },
    ],
  },
  stocks: {
    context: "Stocks & ETFs portfolio (2,620.00 €, +6%)",
    questions: [
      { label: "📈 Is my portfolio well diversified?", question: "I have €2,620 in Stocks & ETFs with a 6% return. Is my portfolio well diversified? What should I look out for?" },
      { label: "🔮 What are the market forecasts?", question: "What are the current market forecasts for European and global stock/ETF markets? Any major risks ahead?" },
      { label: "💡 Should I invest more or hold?", question: "My Stocks & ETFs portfolio is at €2,620 with +6% returns. Should I invest more now or hold? What does the market sentiment suggest?" },
    ],
  },
  crypto: {
    context: "Crypto portfolio (1,262.00 €, +12%)",
    questions: [
      { label: "⚠️ Is my position at risk?", question: "I have €1,262 in crypto with +12% returns. Is my position at risk? What are the main dangers right now?" },
      { label: "🔮 What predictions are being made?", question: "What are experts and analysts predicting for the crypto market in the coming months? Any major events to watch?" },
      { label: "🔄 Should I take profits?", question: "My crypto is up 12% at €1,262. Should I take some profits or hold? What strategies do experts recommend?" },
    ],
  },
};

const InlineQuestions = ({ target, onSelect }: { target: InsightTarget; onSelect: (q: { label: string; question: string }) => void }) => {
  if (!target || !insightQuestions[target]) return null;
  return (
    <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
      {insightQuestions[target].questions.map((q) => (
        <button
          key={q.label}
          onClick={(e) => { e.stopPropagation(); onSelect(q); }}
          className="w-full text-left px-4 py-3 rounded-xl bg-primary/10 border border-primary/30 hover:border-primary hover:bg-primary/15 transition-all text-sm text-foreground font-medium flex items-center justify-between group"
        >
          {q.label}
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      ))}
    </div>
  );
};

const FinanceScreen = () => {
  const navigate = useNavigate();
  const { isNestorMode } = useNestorMode();
  const [insightTarget, setInsightTarget] = useState<InsightTarget>(null);
  const [activeQuestion, setActiveQuestion] = useState<{ context: string; questions: { label: string; question: string }[]; selected: { label: string; question: string } } | null>(null);

  const handleBoxClick = (target: InsightTarget, defaultNav?: string) => {
    if (isNestorMode) {
      setInsightTarget((prev) => (prev === target ? null : target));
    } else if (defaultNav) {
      navigate(defaultNav);
    }
  };

  const handleQuestionSelect = (q: { label: string; question: string }) => {
    if (insightTarget && insightQuestions[insightTarget]) {
      setActiveQuestion({
        context: insightQuestions[insightTarget].context,
        questions: insightQuestions[insightTarget].questions,
        selected: q,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="px-5 pt-14 pb-2">
          <div className={`flex items-center justify-between mb-6 transition-opacity duration-300 ${insightTarget ? "opacity-20 pointer-events-none" : ""}`}>
            <h1 className="text-2xl font-bold text-foreground">Finances</h1>
            <div className={`flex items-center gap-3 ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
              <Eye className="w-5 h-5 text-muted-foreground" />
              <Info className="w-5 h-5 text-muted-foreground" />
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground">
                AB
              </div>
            </div>
          </div>

          {/* Spaces */}
          <div className={`mb-6 transition-opacity duration-300 ${insightTarget ? "opacity-20 pointer-events-none" : ""}`}>
            <p className="text-sm text-muted-foreground mb-1">Spaces</p>
            <p className="text-3xl font-bold text-foreground">12,026.00 €</p>
          </div>

          {/* Action buttons */}
          <div className={`flex gap-6 mb-6 transition-opacity duration-300 ${insightTarget ? "opacity-20 pointer-events-none" : ""}`}>
            <button
              onClick={() => navigate("/explore")}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                <Plus className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xs text-foreground font-medium">New Space</span>
            </button>
            <button className={`flex flex-col items-center gap-2 ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                <Monitor className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-xs text-foreground font-medium">Automations</span>
            </button>
          </div>

          {/* Main account */}
          <div className={`mb-8 transition-opacity duration-300 ${insightTarget && insightTarget !== "main-account" ? "opacity-20 pointer-events-none" : ""}`}>
            <button
              onClick={() => handleBoxClick("main-account")}
              className={`w-full bg-secondary rounded-xl p-4 flex items-center justify-between transition-all ${
                isNestorMode
                  ? insightTarget === "main-account"
                    ? "border-2 border-primary ring-2 ring-primary/30"
                    : "border-2 border-primary/60 hover:border-primary cursor-pointer"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <div className="w-6 h-6 rounded bg-primary/30" />
                </div>
                <span className="font-semibold text-foreground">Main Account</span>
              </div>
              <span className="font-semibold text-foreground">12,026.00 €</span>
            </button>
            {insightTarget === "main-account" && (
              <InlineQuestions target="main-account" onSelect={handleQuestionSelect} />
            )}
          </div>

          {/* Investments */}
          <div className={`transition-opacity duration-300 ${insightTarget && insightTarget !== "stocks" && insightTarget !== "crypto" ? "opacity-20 pointer-events-none" : ""}`}>
            <div className={`flex items-center justify-between mb-1 transition-opacity duration-300 ${insightTarget ? "opacity-20 pointer-events-none" : ""}`}>
              <p className="font-bold text-foreground">Investments</p>
            </div>
            <p className={`text-3xl font-bold text-foreground mb-1 transition-opacity duration-300 ${insightTarget ? "opacity-20 pointer-events-none" : ""}`}>3,882.00 €</p>
            <p className={`text-xs text-muted-foreground mb-4 transition-opacity duration-300 ${insightTarget ? "opacity-20 pointer-events-none" : ""}`}>Last updated 12:05</p>

            {/* Stocks & ETFs */}
            <div className={`mb-3 transition-opacity duration-300 ${insightTarget && insightTarget !== "stocks" ? "opacity-20 pointer-events-none" : ""}`}>
              <button
                onClick={() => handleBoxClick("stocks", "/explore")}
                className={`w-full bg-secondary rounded-xl p-4 flex items-center justify-between transition-all ${
                  isNestorMode
                    ? insightTarget === "stocks"
                      ? "border-2 border-primary ring-2 ring-primary/30"
                      : "border-2 border-primary/60 hover:border-primary"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">Stocks & ETFs</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">2,620.00 €</p>
                  <p className="text-xs text-success font-medium">▲ 6 %</p>
                </div>
              </button>
              {insightTarget === "stocks" && (
                <InlineQuestions target="stocks" onSelect={handleQuestionSelect} />
              )}
            </div>

            {/* Crypto */}
            <div className={`transition-opacity duration-300 ${insightTarget && insightTarget !== "crypto" ? "opacity-20 pointer-events-none" : ""}`}>
              <button
                onClick={() => handleBoxClick("crypto")}
                className={`w-full bg-secondary rounded-xl p-4 flex items-center justify-between transition-all ${
                  isNestorMode
                    ? insightTarget === "crypto"
                      ? "border-2 border-primary ring-2 ring-primary/30"
                      : "border-2 border-primary/60 hover:border-primary"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Bitcoin className="w-5 h-5 text-foreground" />
                  </div>
                  <span className="font-semibold text-foreground">Crypto</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">1,262.00 €</p>
                  <p className="text-xs text-success font-medium">▲ 12 %</p>
                </div>
              </button>
              {insightTarget === "crypto" && (
                <InlineQuestions target="crypto" onSelect={handleQuestionSelect} />
              )}
            </div>
          </div>
        </div>

        <BottomNav />

        {/* Nestor Insight Panel - only when a question is selected */}
        {activeQuestion && (
          <NestorInsightPanel
            context={activeQuestion.context}
            questions={activeQuestion.questions}
            onClose={() => { setActiveQuestion(null); setInsightTarget(null); }}
            onNavigate={(route) => { setActiveQuestion(null); setInsightTarget(null); navigate(route); }}
          />
        )}
      </div>
    </div>
  );
};

export default FinanceScreen;
