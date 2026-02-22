import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from "recharts";

interface AssetData {
  name: string;
  ticker: string;
  currentPrice: number;
  outlook: "bullish" | "bearish" | "stable";
  historicalData: { month: string; price: number; projected?: boolean }[];
  projectionStart: number;
  summary: string;
  sources: string[];
}

const assetsDb: Record<string, AssetData> = {
  apple: {
    name: "Apple Inc.",
    ticker: "AAPL",
    currentPrice: 227.48,
    outlook: "bullish",
    historicalData: [
      { month: "Jun 25", price: 192 }, { month: "Jul 25", price: 196 }, { month: "Aug 25", price: 210 },
      { month: "Sep 25", price: 205 }, { month: "Oct 25", price: 215 }, { month: "Nov 25", price: 220 },
      { month: "Dec 25", price: 224 }, { month: "Jan 26", price: 222 }, { month: "Feb 26", price: 227 },
      { month: "Mar 26", price: 235, projected: true }, { month: "Apr 26", price: 242, projected: true },
      { month: "May 26", price: 248, projected: true }, { month: "Jun 26", price: 255, projected: true },
    ],
    projectionStart: 8,
    summary: "Apple shows a solid bullish trend driven by record iPhone 16 sales and steady growth in its services division, which already accounts for 25% of revenue. Analysts at Goldman Sachs and Morgan Stanley have raised their price targets following the latest quarterly results. The integration of AI features across Apple's ecosystem is seen as a key catalyst for the coming quarters.",
    sources: ["Bloomberg Intelligence, Feb 2026", "Reuters Markets, Feb 2026", "Goldman Sachs Research"],
  },
  msft: {
    name: "Microsoft",
    ticker: "MSFT",
    currentPrice: 415.20,
    outlook: "bullish",
    historicalData: [
      { month: "Jun 25", price: 370 }, { month: "Jul 25", price: 378 }, { month: "Aug 25", price: 385 },
      { month: "Sep 25", price: 390 }, { month: "Oct 25", price: 398 }, { month: "Nov 25", price: 405 },
      { month: "Dec 25", price: 400 }, { month: "Jan 26", price: 408 }, { month: "Feb 26", price: 415 },
      { month: "Mar 26", price: 425, projected: true }, { month: "Apr 26", price: 435, projected: true },
      { month: "May 26", price: 442, projected: true }, { month: "Jun 26", price: 450, projected: true },
    ],
    projectionStart: 8,
    summary: "Microsoft maintains its AI leadership with Copilot integrated across its Office ecosystem and Azure growing at double digits. Demand for cloud infrastructure and enterprise contracts is at all-time highs. JP Morgan analysts highlight that AI monetization is just beginning and place the growth potential at 8-12% over the next 6 months.",
    sources: ["Financial Times, Feb 2026", "JP Morgan Equity Research", "Bloomberg Technology"],
  },
  vwce: {
    name: "Vanguard FTSE All-World",
    ticker: "VWCE",
    currentPrice: 118.34,
    outlook: "stable",
    historicalData: [
      { month: "Jun 25", price: 112 }, { month: "Jul 25", price: 113 }, { month: "Aug 25", price: 114 },
      { month: "Sep 25", price: 113 }, { month: "Oct 25", price: 115 }, { month: "Nov 25", price: 116 },
      { month: "Dec 25", price: 117 }, { month: "Jan 26", price: 117 }, { month: "Feb 26", price: 118 },
      { month: "Mar 26", price: 119, projected: true }, { month: "Apr 26", price: 120, projected: true },
      { month: "May 26", price: 121, projected: true }, { month: "Jun 26", price: 121, projected: true },
    ],
    projectionStart: 8,
    summary: "As a globally diversified ETF with over 3,700 holdings, VWCE tends to mirror the average performance of the global market. The outlook remains stable with moderate growth of 2-3% expected for the next half. Geographic diversification protects against regional shocks, though exposure to emerging markets adds some volatility.",
    sources: ["Morningstar Fund Analysis, Feb 2026", "Vanguard Market Outlook Q1 2026"],
  },
  btc: {
    name: "Bitcoin",
    ticker: "BTC",
    currentPrice: 97420,
    outlook: "bullish",
    historicalData: [
      { month: "Jun 25", price: 68000 }, { month: "Jul 25", price: 72000 }, { month: "Aug 25", price: 71000 },
      { month: "Sep 25", price: 76000 }, { month: "Oct 25", price: 82000 }, { month: "Nov 25", price: 88000 },
      { month: "Dec 25", price: 91000 }, { month: "Jan 26", price: 94000 }, { month: "Feb 26", price: 97420 },
      { month: "Mar 26", price: 102000, projected: true }, { month: "Apr 26", price: 108000, projected: true },
      { month: "May 26", price: 112000, projected: true }, { month: "Jun 26", price: 115000, projected: true },
    ],
    projectionStart: 8,
    summary: "Bitcoin continues its bullish trend following the approval of spot ETFs in the U.S. and the effect of the April 2024 halving. Institutional flows into Bitcoin ETFs have surpassed $50B cumulative, according to CoinShares data. Standard Chartered analysts maintain their $120,000 target for mid-2026, citing programmed scarcity and institutional adoption as the main catalysts.",
    sources: ["CoinShares Digital Asset Fund Flows, Feb 2026", "Reuters Crypto Markets", "Standard Chartered Research"],
  },
  eth: {
    name: "Ethereum",
    ticker: "ETH",
    currentPrice: 3480,
    outlook: "stable",
    historicalData: [
      { month: "Jun 25", price: 3100 }, { month: "Jul 25", price: 3200 }, { month: "Aug 25", price: 3150 },
      { month: "Sep 25", price: 3250 }, { month: "Oct 25", price: 3300 }, { month: "Nov 25", price: 3350 },
      { month: "Dec 25", price: 3400 }, { month: "Jan 26", price: 3450 }, { month: "Feb 26", price: 3480 },
      { month: "Mar 26", price: 3520, projected: true }, { month: "Apr 26", price: 3550, projected: true },
      { month: "May 26", price: 3580, projected: true }, { month: "Jun 26", price: 3600, projected: true },
    ],
    projectionStart: 8,
    summary: "Ethereum remains stable with modest projected growth of 3-4%. While the network continues to lead in DeFi and NFTs, competition from Layer 2 solutions like Arbitrum and Base is fragmenting activity. ETH staking provides 4% annual yields, attracting long-term investors. Analysts expect potential catalysts from institutional adoption of ETH ETFs.",
    sources: ["CoinDesk Research, Feb 2026", "Messari Crypto Theses 2026"],
  },
  tesla: {
    name: "Tesla Inc.",
    ticker: "TSLA",
    currentPrice: 248.50,
    outlook: "bearish",
    historicalData: [
      { month: "Jun 25", price: 290 }, { month: "Jul 25", price: 285 }, { month: "Aug 25", price: 278 },
      { month: "Sep 25", price: 272 }, { month: "Oct 25", price: 268 }, { month: "Nov 25", price: 262 },
      { month: "Dec 25", price: 258 }, { month: "Jan 26", price: 253 }, { month: "Feb 26", price: 248 },
      { month: "Mar 26", price: 238, projected: true }, { month: "Apr 26", price: 228, projected: true },
      { month: "May 26", price: 220, projected: true }, { month: "Jun 26", price: 214, projected: true },
    ],
    projectionStart: 8,
    summary: "Tesla faces margin pressure due to intense competition from Chinese manufacturers like BYD and slowing sales growth in Europe. Price cuts have negatively impacted profitability. Bernstein analysts note that the valuation remains elevated for the current delivery pace. The energy division shows potential but doesn't offset the pressure on the core vehicle business.",
    sources: ["Bloomberg Intelligence Auto, Feb 2026", "Bernstein Research", "Financial Times Autos"],
  },
};

const AssetFutureDetailScreen = () => {
  const { assetId } = useParams<{ assetId: string }>();
  const navigate = useNavigate();
  const asset = assetsDb[assetId || ""];

  if (!asset) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Asset not found</p>
      </div>
    );
  }

  const outlookColors = {
    bullish: { stroke: "hsl(145, 63%, 42%)", fill: "hsl(145, 63%, 42%)", label: "Bullish", textColor: "text-success" },
    bearish: { stroke: "hsl(0, 72%, 51%)", fill: "hsl(0, 72%, 51%)", label: "Bearish", textColor: "text-danger" },
    stable: { stroke: "hsl(165, 100%, 40%)", fill: "hsl(165, 100%, 40%)", label: "Stable", textColor: "text-primary" },
  };

  const config = outlookColors[asset.outlook];
  const projectionMonth = asset.historicalData[asset.projectionStart]?.month;

  const historicalSlice = asset.historicalData.map((d, i) => ({
    ...d,
    historical: i <= asset.projectionStart ? d.price : undefined,
    projected: i >= asset.projectionStart ? d.price : undefined,
  }));

  const prices = asset.historicalData.map((d) => d.price);
  const minPrice = Math.floor(Math.min(...prices) * 0.97);
  const maxPrice = Math.ceil(Math.max(...prices) * 1.03);

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="px-5 pt-14 pb-2">
          <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-primary">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Portfolio</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-black text-foreground">{asset.name}</h1>
              <p className="text-sm text-muted-foreground">{asset.ticker}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-foreground">
                {asset.currentPrice.toLocaleString("de-DE", { minimumFractionDigits: asset.currentPrice > 1000 ? 0 : 2 })} €
              </p>
              <span className={`text-xs font-semibold ${config.textColor} px-2 py-0.5 rounded-full bg-secondary`}>
                {config.label}
              </span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="px-2 pt-4 pb-2">
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalSlice} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="historicalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={config.stroke} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={config.stroke} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="projectedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={config.stroke} stopOpacity={0.1} />
                    <stop offset="100%" stopColor={config.stroke} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "hsl(0,0%,55%)" }}
                  interval={2}
                />
                <YAxis
                  domain={[minPrice, maxPrice]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "hsl(0,0%,55%)" }}
                  width={45}
                  tickFormatter={(v: number) => v > 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`}
                />
                {projectionMonth && (
                  <ReferenceLine
                    x={projectionMonth}
                    stroke="hsl(0,0%,40%)"
                    strokeDasharray="4 4"
                    strokeWidth={1}
                    label={{ value: "Projection", position: "top", fontSize: 9, fill: "hsl(0,0%,50%)" }}
                  />
                )}
                <Area
                  type="monotone"
                  dataKey="historical"
                  stroke={config.stroke}
                  strokeWidth={2.5}
                  fill="url(#historicalGrad)"
                  connectNulls={false}
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="projected"
                  stroke={config.stroke}
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  fill="url(#projectedGrad)"
                  connectNulls={false}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-1 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-4 h-0.5 rounded" style={{ backgroundColor: config.stroke }} /> Historical
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-0.5 rounded border-dashed border-t-2" style={{ borderColor: config.stroke }} /> Projection
            </span>
          </div>
        </div>

        {/* Analysis */}
        <div className="px-5 pt-4 pb-20 flex-1">
          <h2 className="text-base font-bold text-foreground mb-2">Analysis & Outlook</h2>
          <p className="text-sm text-foreground/80 leading-relaxed text-justify">{asset.summary}</p>

          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mb-2">Sources</p>
            {asset.sources.map((s, i) => (
              <p key={i} className="text-[11px] text-muted-foreground leading-relaxed">• {s}</p>
            ))}
          </div>

          <p className="text-[9px] text-muted-foreground/60 text-center mt-6">
            This information is for guidance only and does not constitute financial advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssetFutureDetailScreen;
