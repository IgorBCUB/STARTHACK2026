import { useNavigate } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { useState } from "react";
import { useNestorMode } from "@/contexts/NestorModeContext";
import NestorInsightPanel from "@/components/NestorInsightPanel";

const AssetDetailScreen = () => {
  const navigate = useNavigate();
  const { isNestorMode } = useNestorMode();
  const [showInsight, setShowInsight] = useState(false);

  const chartPath = "M 20 120 Q 60 130, 80 110 Q 100 90, 130 100 Q 160 110, 200 85 Q 230 65, 260 90 Q 290 115, 310 60 Q 325 35, 340 45";

  const questions = [
    { label: "📰 What news affected the price?", question: "What recent news or events have affected the price of Core DAX EUR (Acc) by iShares (EXS1)? Include specific dates and sources." },
    { label: "🔮 What are analysts predicting?", question: "What are analysts and market experts predicting for the iShares Core DAX ETF? Include price targets and timeframes." },
    { label: "📊 How does it compare to alternatives?", question: "How does the iShares Core DAX ETF compare to other similar European index ETFs? What are the pros and cons?" },
    { label: "⚡ Is now a good time to invest more?", question: "The iShares Core DAX ETF is at €126.55 with a YTD return of +9.85%. Is now a good time to invest more?" },
  ];

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="px-5 pt-14 pb-4">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate("/explore")} className="text-foreground">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Core DAX EUR (Acc)</h1>
          </div>

          {/* Asset Info */}
          <div className={`flex flex-col items-center mb-6 ${isNestorMode ? "cursor-pointer" : ""}`}
            onClick={() => isNestorMode && setShowInsight(true)}
          >
            <div className={`w-14 h-14 rounded-full bg-foreground flex items-center justify-center mb-3 transition-all ${isNestorMode ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}>
              <span className="text-[9px] font-bold text-primary-foreground leading-tight text-center">iShares</span>
            </div>
            <p className="text-4xl font-bold text-foreground mb-1">126.55 €</p>
            <p className="text-sm font-medium text-success">▲ 0.78 € · 0.61 %</p>
            <p className="text-xs text-muted-foreground mt-1">April 16, 14:33</p>
          </div>

          {/* Chart */}
          <div className={`relative w-full h-40 mb-4 ${isNestorMode ? "opacity-50" : ""}`}>
            <svg viewBox="0 0 360 150" className="w-full h-full" preserveAspectRatio="none">
              <path d={chartPath} fill="none" stroke="hsl(165, 100%, 32%)" strokeWidth="2" />
            </svg>
            <div className="absolute top-2 right-0 text-[10px] text-muted-foreground">126.88 €</div>
            <div className="absolute bottom-6 left-1/3 text-[10px] text-muted-foreground">124.32 €</div>
          </div>

          {/* Time Range */}
          <div className={`flex rounded-lg bg-secondary overflow-hidden mb-6 ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
            {["1W", "1M", "1Y", "5Y"].map((period, i) => (
              <button
                key={period}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  i === 3 ? "bg-foreground text-primary-foreground rounded-lg" : "text-muted-foreground"
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Info pills */}
          <div className={`flex gap-2 mb-6 ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-full text-sm text-foreground">
              🐢 Start small
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-full text-sm text-foreground">
              📊 What's an ETF?
            </div>
          </div>

          {/* Key Information */}
          <div className={`mb-6 ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
            <h3 className="font-bold text-foreground mb-3">Key Information</h3>
            <div className="bg-secondary rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">YTD Return</span>
                <Info className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <span className="text-sm font-semibold text-success">▲ 9.85 %</span>
            </div>
          </div>

          {/* Nestor AI button (replaces invest in nestor mode) */}
          {isNestorMode ? (
            <div className="space-y-3">
              <button
                onClick={() => setShowInsight(true)}
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl text-base font-semibold"
              >
                🧠 Ask NestorTheInvestor
              </button>
              <button
                onClick={() => navigate("/invest")}
                className="w-full py-4 bg-secondary text-foreground rounded-xl text-base font-semibold border border-primary/30"
              >
                Invest
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/invest")}
              className="w-full py-4 bg-primary text-primary-foreground rounded-xl text-base font-semibold"
            >
              Invest
            </button>
          )}
        </div>

        {/* Nestor Insight Panel */}
        {showInsight && (
          <NestorInsightPanel
            context="Core DAX EUR (Acc) - iShares EXS1 - 126.55 €, ▲ 0.61%, YTD +9.85%"
            questions={questions}
            onClose={() => setShowInsight(false)}
            onNavigate={(route) => { setShowInsight(false); navigate(route); }}
          />
        )}
      </div>
    </div>
  );
};

export default AssetDetailScreen;
