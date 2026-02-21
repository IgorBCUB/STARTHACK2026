import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Building2, TrendingUp, Globe, BarChart3 } from "lucide-react";
import { useState } from "react";
import { useNestorMode } from "@/contexts/NestorModeContext";
import NestorInsightPanel from "@/components/NestorInsightPanel";

const etfs = [
  { name: "Core DAX (Acc)", issuer: "iShares", ticker: "EXS1", price: "127.90 €", change: "0.36 %", down: true, logo: "iShares" },
  { name: "FTSE All-World (Dist)", issuer: "Vanguard", ticker: "VGWL", price: "16.03 €", change: "0.89 %", down: false, logo: "V" },
  { name: "Core MSCI World (Acc)", issuer: "Amundi", ticker: "LCUW", price: "32.23 €", change: "8.22 %", down: false, logo: "Amundi" },
  { name: "Nasdaq 100 (Dist)", issuer: "iShares", ticker: "EXXT", price: "24.74 €", change: "7.14 %", down: false, logo: "iShares" },
  { name: "MSCI World (Dist)", issuer: "Amundi", ticker: "LYYA", price: "24.66 €", change: "2.44 %", down: true, logo: "Amundi" },
  { name: "DAX (Acc)", issuer: "Xtrackers", ticker: "DBXD", price: "112.13 €", change: "1.43 %", down: false, logo: "X" },
  { name: "EURO STOXX (Dist)", issuer: "Deka", ticker: "EL4B", price: "32.23 €", change: "8.22 %", down: false, logo: "Deka" },
];

const logoColors: Record<string, string> = {
  iShares: "bg-foreground text-primary-foreground",
  V: "bg-red-600 text-primary-foreground",
  Amundi: "bg-foreground text-primary-foreground",
  X: "bg-foreground text-primary-foreground",
  Deka: "bg-yellow-500 text-foreground",
};

const ExploreScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"stocks" | "etfs">("etfs");
  const { isNestorMode } = useNestorMode();
  const [selectedAsset, setSelectedAsset] = useState<typeof etfs[0] | null>(null);

  const handleAssetClick = (etf: typeof etfs[0]) => {
    if (isNestorMode) {
      setSelectedAsset(etf);
    } else {
      navigate("/asset");
    }
  };

  const getAssetQuestions = (etf: typeof etfs[0]) => [
    { label: "📰 What news affected the price?", question: `What recent news or events have affected the price of ${etf.name} (${etf.ticker}) by ${etf.issuer}? Include specific dates and sources.` },
    { label: "🔮 What predictions are being made?", question: `What are analysts and experts predicting for ${etf.name} (${etf.ticker})? Include price targets, ratings, and timeframes.` },
    { label: "⚖️ Should I buy, hold, or sell?", question: `Given that ${etf.name} (${etf.ticker}) is currently at ${etf.price} with a ${etf.down ? "negative" : "positive"} trend of ${etf.change}, what would be the smart move? Buy, hold, or sell?` },
  ];

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="px-5 pt-14 pb-4">
          <div className="flex items-center gap-4 mb-5">
            <button onClick={() => navigate("/")} className="text-foreground">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Explore Investments</h1>
          </div>

          {/* Search */}
          <div className={`relative mb-4 ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, ticker or ISIN"
              className="w-full pl-10 pr-4 py-3 bg-secondary rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Tabs */}
          <div className={`flex border border-border rounded-lg overflow-hidden mb-4 ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
            <button
              onClick={() => setActiveTab("stocks")}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                activeTab === "stocks" ? "bg-foreground text-primary-foreground" : "bg-background text-foreground"
              }`}
            >
              Stocks
            </button>
            <button
              onClick={() => setActiveTab("etfs")}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                activeTab === "etfs" ? "bg-foreground text-primary-foreground" : "bg-background text-foreground"
              }`}
            >
              ETFs
            </button>
          </div>

          {/* Filters */}
          <div className={`flex gap-2 overflow-x-auto pb-2 ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
            {[
              { icon: <Building2 className="w-3.5 h-3.5" />, label: "Issuer" },
              { icon: <TrendingUp className="w-3.5 h-3.5" />, label: "Index" },
              { icon: <Globe className="w-3.5 h-3.5" />, label: "Region" },
              { icon: <BarChart3 className="w-3.5 h-3.5" />, label: "Industry" },
            ].map((f) => (
              <button
                key={f.label}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-border text-xs font-medium text-foreground whitespace-nowrap"
              >
                {f.icon}
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ETF List */}
        <div className="flex-1 px-5 overflow-y-auto">
          {etfs.map((etf, i) => (
            <button
              key={i}
              onClick={() => handleAssetClick(etf)}
              className={`w-full flex items-center justify-between py-4 transition-all ${
                isNestorMode
                  ? `rounded-xl px-3 my-1 border-2 ${
                      etf.down
                        ? "border-danger bg-danger/5 hover:bg-danger/10"
                        : "border-success bg-success/5 hover:bg-success/10"
                    }`
                  : "border-b border-border last:border-b-0"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold ${logoColors[etf.logo] || "bg-muted text-foreground"}`}>
                  {etf.logo === "iShares" ? (
                    <span className="text-[8px] leading-tight text-center">iShares</span>
                  ) : (
                    etf.logo
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">{etf.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {etf.issuer} · {etf.ticker}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{etf.price}</p>
                <p className={`text-xs font-medium ${etf.down ? "text-danger" : "text-success"}`}>
                  {etf.down ? "▼" : "▲"} {etf.change}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Nestor Insight Panel */}
        {selectedAsset && (
          <NestorInsightPanel
            context={`${selectedAsset.name} (${selectedAsset.ticker}) - ${selectedAsset.price}, ${selectedAsset.down ? "▼" : "▲"} ${selectedAsset.change}`}
            questions={getAssetQuestions(selectedAsset)}
            onClose={() => setSelectedAsset(null)}
            onNavigate={(route) => { setSelectedAsset(null); navigate(route); }}
          />
        )}
      </div>
    </div>
  );
};

export default ExploreScreen;
