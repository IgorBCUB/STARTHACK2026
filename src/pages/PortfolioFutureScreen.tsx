import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, ChevronRight } from "lucide-react";

type AssetOutlook = "bullish" | "bearish" | "stable";

interface FutureAsset {
  id: string;
  name: string;
  ticker: string;
  currentPrice: number;
  allocation: number;
  outlook: AssetOutlook;
  changePercent: number;
  reason: string;
}

const assets: FutureAsset[] = [
  {
    id: "apple",
    name: "Apple Inc.",
    ticker: "AAPL",
    currentPrice: 227.48,
    allocation: 820,
    outlook: "bullish",
    changePercent: 12,
    reason: "Fuerte demanda del iPhone 16 y crecimiento en servicios.",
  },
  {
    id: "msft",
    name: "Microsoft",
    ticker: "MSFT",
    currentPrice: 415.20,
    allocation: 640,
    outlook: "bullish",
    changePercent: 8,
    reason: "Liderazgo en IA con Copilot y Azure en máximos.",
  },
  {
    id: "vwce",
    name: "Vanguard FTSE All-World",
    ticker: "VWCE",
    currentPrice: 118.34,
    allocation: 560,
    outlook: "stable",
    changePercent: 2,
    reason: "ETF global diversificado, rendimiento estable esperado.",
  },
  {
    id: "btc",
    name: "Bitcoin",
    ticker: "BTC",
    currentPrice: 97420,
    allocation: 680,
    outlook: "bullish",
    changePercent: 18,
    reason: "Aprobación de ETFs spot y halving reciente impulsan demanda.",
  },
  {
    id: "eth",
    name: "Ethereum",
    ticker: "ETH",
    currentPrice: 3480,
    allocation: 382,
    outlook: "stable",
    changePercent: 3,
    reason: "Red estable pero competencia creciente de L2s.",
  },
  {
    id: "tesla",
    name: "Tesla Inc.",
    ticker: "TSLA",
    currentPrice: 248.50,
    allocation: 200,
    outlook: "bearish",
    changePercent: -14,
    reason: "Márgenes bajo presión y competencia en EV desde China.",
  },
];

const outlookConfig: Record<AssetOutlook, { label: string; color: string; bgColor: string; icon: typeof TrendingUp }> = {
  bullish: { label: "Alcista", color: "text-success", bgColor: "bg-success/10", icon: TrendingUp },
  bearish: { label: "Bajista", color: "text-danger", bgColor: "bg-danger/10", icon: TrendingDown },
  stable: { label: "Estable", color: "text-primary", bgColor: "bg-primary/10", icon: Minus },
};

const PortfolioFutureScreen = () => {
  const navigate = useNavigate();

  const bullish = assets.filter((a) => a.outlook === "bullish");
  const stable = assets.filter((a) => a.outlook === "stable");
  const bearish = assets.filter((a) => a.outlook === "bearish");

  const renderSection = (title: string, sectionAssets: FutureAsset[], outlook: AssetOutlook) => {
    if (sectionAssets.length === 0) return null;
    const config = outlookConfig[outlook];
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-2 h-2 rounded-full ${outlook === "bullish" ? "bg-success" : outlook === "bearish" ? "bg-danger" : "bg-primary"}`} />
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">{title}</h3>
        </div>
        <div className="space-y-2">
          {sectionAssets.map((asset) => {
            const Icon = config.icon;
            return (
              <button
                key={asset.id}
                onClick={() => navigate(`/portfolio-future/${asset.id}`)}
                className="w-full bg-secondary rounded-xl p-4 flex items-center justify-between hover:bg-secondary/80 transition-colors active:scale-[0.98]"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">{asset.ticker} · {asset.allocation.toLocaleString()} €</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-sm font-bold ${config.color}`}>
                    {asset.changePercent > 0 ? "+" : ""}{asset.changePercent}%
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="px-5 pt-14 pb-4">
          <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-primary">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Volver</span>
          </button>
          <h1 className="text-2xl font-black text-foreground leading-tight">Futuro de tu Cartera</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Proyección basada en análisis de mercado y noticias recientes
          </p>

          {/* Portfolio summary bar */}
          <div className="mt-5 bg-secondary rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Distribución de perspectiva</p>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden bg-muted gap-0.5">
              <div className="bg-success rounded-l-full" style={{ width: `${(bullish.length / assets.length) * 100}%` }} />
              <div className="bg-primary" style={{ width: `${(stable.length / assets.length) * 100}%` }} />
              <div className="bg-danger rounded-r-full" style={{ width: `${(bearish.length / assets.length) * 100}%` }} />
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success" /> {bullish.length} Alcistas</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> {stable.length} Estables</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-danger" /> {bearish.length} Bajistas</span>
            </div>
          </div>
        </div>

        {/* Asset sections */}
        <div className="px-5 pb-20 flex-1">
          {renderSection("Tendencia alcista", bullish, "bullish")}
          {renderSection("Se mantiene estable", stable, "stable")}
          {renderSection("Tendencia bajista", bearish, "bearish")}

          <p className="text-[10px] text-muted-foreground text-center mt-4 leading-relaxed">
            Las proyecciones se basan en datos de mercado, análisis de tendencias y noticias financieras de fuentes como Bloomberg, Reuters y FT. No constituyen asesoramiento financiero.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioFutureScreen;
